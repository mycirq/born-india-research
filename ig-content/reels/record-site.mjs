/**
 * Screen-record the live Groundwork site as reel footage.
 *
 * Why this and not generated b-roll: a research brand's most honest visual is its
 * own research. The globe drilling from world to India to Gurgaon, and the city
 * page with real dated figures, is footage no competitor has and no model can
 * fabricate. It also doubles as proof the product exists.
 *
 * Captures a 9:16 viewport at 30fps by driving real interaction, then ffmpeg
 * assembles. Output has no audio; narration is muxed in separately.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = process.argv[2] || "/tmp/site-rec";
const SECONDS = Number(process.argv[3] || 31);
const FPS = 30;
const SITE = "https://mybornindiaresearch.com";

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
});
const page = await browser.newPage();
// 540x960 at scale 2 lands on exactly 1080x1920.
await page.setViewport({ width: 540, height: 960, deviceScaleFactor: 2 });

console.log("loading landing page...");
await page.goto(SITE, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500)); // let the globe finish its intro

const total = SECONDS * FPS;
let frame = 0;
const shoot = async () => {
  await page.screenshot({
    path: path.join(OUT, `f${String(frame).padStart(4, "0")}.png`),
    optimizeForSpeed: true,
  });
  frame++;
};

/** Capture for n seconds while an optional action runs alongside. */
async function capture(seconds, label) {
  const n = Math.round(seconds * FPS);
  for (let i = 0; i < n && frame < total; i++) await shoot();
  console.log(`  ${label}: ${frame} frames`);
}

// Beat 1: the globe as it sits, spinning and settled on India.
await capture(6, "globe");

// Beat 2: scroll slowly through the city cards so real figures pass camera.
for (let i = 0; i < Math.round(9 * FPS) && frame < total; i++) {
  await page.evaluate(() => window.scrollBy(0, 7));
  await shoot();
}
console.log(`  scroll: ${frame} frames`);

// Beat 3: the Gurgaon city page, which is where the actual numbers live.
console.log("loading Gurgaon page...");
await page.goto(`${SITE}/cities/gurgaon/`, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
await capture(5, "gurgaon top");

for (let i = 0; i < Math.round(8 * FPS) && frame < total; i++) {
  await page.evaluate(() => window.scrollBy(0, 6));
  await shoot();
}
console.log(`  gurgaon scroll: ${frame} frames`);

// hold on whatever is on screen to fill the remaining duration
while (frame < total) await shoot();

await browser.close();

const mp4 = path.join(OUT, "site.mp4");
execFileSync(
  "ffmpeg",
  ["-loglevel", "error", "-y", "-framerate", String(FPS),
   "-i", path.join(OUT, "f%04d.png"),
   "-vf", "format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-crf", "20", mp4],
  { env: { ...process.env, PATH: `/opt/homebrew/bin:${process.env.PATH}` } }
);
console.log(`done: ${frame} frames -> ${mp4}`);
