/**
 * Render One Number reels to MP4.
 *
 * One browser stays open and is seeked frame by frame, which is the whole trick:
 * launching Chrome per frame took ~1.5s and would have meant 22 minutes for a
 * single 30-second reel. Reusing the page brings it to roughly a minute.
 *
 * The page exposes a deterministic seek(t), so a frame depends only on t. That
 * means a render is reproducible and a failed run can resume.
 *
 *   node render.mjs              all reels in reels.json
 *   node render.mjs r01-size-bands   just one
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SERVE = "http://localhost:8899/reels";
const OUT = path.resolve(HERE, "../../docs/ig/reels");
const MIRROR = path.resolve(HERE, "../../public/ig/reels");

const FPS = 30;
const DUR = 30.0;              // must match DUR in reel.html
const FRAMES = Math.round(FPS * DUR);

const only = process.argv[2];
const reels = JSON.parse(readFileSync(path.join(HERE, "reels.json"), "utf8"))
  .filter((r) => !only || r.id === only);

if (!reels.length) {
  console.error(only ? `no reel with id ${only}` : "reels.json is empty");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
mkdirSync(MIRROR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
});

for (const reel of reels) {
  const t0 = Date.now();
  const tmp = path.join("/tmp", `reel-${reel.id}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });

  const page = await browser.newPage();
  // 540x960 at scale 2 is exactly 1080x1920, so nothing is ever upscaled.
  await page.setViewport({ width: 540, height: 960, deviceScaleFactor: 2 });
  await page.goto(`${SERVE}/reel.html?id=${reel.id}`, { waitUntil: "networkidle0" });
  await page.waitForFunction("window.__ready === true", { timeout: 30000 });

  for (let f = 0; f < FRAMES; f++) {
    const t = f / FPS;
    await page.evaluate((tt) => window.seek(tt), t);
    await page.screenshot({
      path: path.join(tmp, `f${String(f).padStart(4, "0")}.png`),
      optimizeForSpeed: true,
    });
  }
  await page.close();

  const mp4 = path.join(OUT, `${reel.id}.mp4`);
  // Silent AAC track: a video-only MP4 can fail Instagram ingest, and adding
  // real narration later replaces this stream without touching the frames.
  execFileSync("ffmpeg", [
    "-loglevel", "error", "-y",
    "-framerate", String(FPS),
    "-i", path.join(tmp, "f%04d.png"),
    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-vf", "format=yuv420p",
    "-c:v", "libx264", "-preset", "medium", "-crf", "20",
    "-c:a", "aac", "-b:a", "96k", "-shortest",
    "-movflags", "+faststart",
    mp4,
  ], { env: { ...process.env, PATH: `/opt/homebrew/bin:${process.env.PATH}` } });

  // cover frame for the grid thumbnail, taken from the figure beat at 4:5
  execFileSync("ffmpeg", [
    "-loglevel", "error", "-y",
    "-i", path.join(tmp, `f${String(Math.round(FPS * 8)).padStart(4, "0")}.png`),
    "-vf", "crop=1080:1350:0:285",
    path.join(OUT, `${reel.id}-cover.png`),
  ], { env: { ...process.env, PATH: `/opt/homebrew/bin:${process.env.PATH}` } });

  execFileSync("cp", [mp4, path.join(MIRROR, `${reel.id}.mp4`)]);
  execFileSync("cp", [
    path.join(OUT, `${reel.id}-cover.png`),
    path.join(MIRROR, `${reel.id}-cover.png`),
  ]);
  rmSync(tmp, { recursive: true, force: true });

  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`  ${reel.id}  ${FRAMES} frames  ${secs}s  ->  ${path.basename(mp4)}`);
}

await browser.close();
console.log(`done: ${reels.length} reel(s)`);
