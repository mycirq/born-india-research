'use client';

const label = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
};

/**
 * One headline figure with its provenance.
 *
 * Three states, matching the promise on the landing page — every figure sourced
 * and dated, and the gaps marked as gaps:
 *   sourced  value + source name + as-of date
 *   desk     value, carried by the page-level "illustrative" badge
 *   gap      no number at all, just what is missing and why
 */
export default function Figure({ entry }) {
  const { label: name, value, note, status, source, url, asOf } = entry;

  if (status === 'gap') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ ...label, color: 'var(--text-faint)' }}>{name}</span>
        <span style={{ font: 'var(--type-subtitle)', color: 'var(--text-faint)' }}>Not measured</span>
        <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{note}</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...label, color: 'var(--text-faint)' }}>{name}</span>
      <span style={{ font: 'var(--type-figure)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>
      <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{note}</span>
      {status === 'sourced' && (
        <span style={{ font: 'var(--type-caption)', color: 'var(--verified-500)' }}>
          {url ? (
            <a href={url} target="_blank" rel="noopener" style={{ color: 'inherit', borderBottom: '1px solid var(--verified-100)' }}>
              {source}
            </a>
          ) : source}
          {asOf ? ` · ${asOf}` : ''}
        </span>
      )}
    </div>
  );
}
