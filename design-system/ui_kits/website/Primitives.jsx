/* Browser-global mirror of components/ — same code, no ES exports, so the kit
   runs standalone from file/preview without a bundler. Keep in sync with components/. */
const S = {
  label: { font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' },
};

function Button({ variant = 'primary', size = 'md', href, icon, children, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const sizes = { sm: { padding: '7px 14px', fontSize: 13 }, md: { padding: '11px 20px', fontSize: 14 }, lg: { padding: '14px 26px', fontSize: 15 } };
  const v = {
    primary: { background: h ? 'var(--laterite-600)' : 'var(--ink-900)', color: '#fffdf8' },
    secondary: { background: 'transparent', color: 'var(--ink-900)', borderColor: h ? 'var(--ink-900)' : 'var(--line-strong)' },
    accent: { background: h ? 'var(--laterite-600)' : 'var(--laterite-500)', color: '#fffdf8' },
    quiet: { background: 'transparent', color: 'var(--laterite-600)', padding: 0, borderRadius: 0, borderBottom: '1px solid ' + (h ? 'var(--laterite-600)' : 'var(--laterite-200)') },
  }[variant];
  const T = href ? 'a' : 'button';
  return <T href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} {...rest}
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontWeight: 500,
      textDecoration: 'none', border: '1px solid transparent', borderRadius: 'var(--radius-1)', cursor: 'pointer',
      transition: 'var(--transition)', whiteSpace: 'nowrap', ...(variant === 'quiet' ? {} : sizes[size]), ...v, ...style }}>{icon}{children}</T>;
}

function Card({ marker, title, children, footer, tone = 'default', style }) {
  const inv = tone === 'inverse';
  const t = { default: { background: 'var(--surface-card)', borderColor: 'var(--line)' }, sunk: { background: 'var(--paper-sunk)', borderColor: 'var(--line-strong)' }, inverse: { background: 'var(--surface-inverse)', borderColor: 'var(--surface-inverse)' } }[tone];
  return <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid', borderRadius: 'var(--radius-2)', padding: 'var(--card-padding)', ...t, ...style }}>
    {marker && <div style={{ ...S.label, color: inv ? 'var(--laterite-200)' : 'var(--laterite-500)', marginBottom: 12 }}>{marker}</div>}
    {title && <div style={{ font: 'var(--type-subtitle)', color: inv ? 'var(--text-on-dark)' : 'var(--text-heading)', marginBottom: 8 }}>{title}</div>}
    <div style={{ font: 'var(--type-small)', color: inv ? 'var(--text-on-dark-muted)' : 'var(--text-muted)' }}>{children}</div>
    {footer && <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid ' + (inv ? 'rgba(255,253,248,.15)' : 'var(--line)'), font: 'var(--type-caption)', color: inv ? 'var(--text-on-dark-muted)' : 'var(--text-faint)' }}>{footer}</div>}
  </div>;
}

function Badge({ tone = 'neutral', children, style }) {
  const c = { neutral: ['var(--paper-sunk)', 'var(--ink-500)'], accent: ['var(--laterite-100)', 'var(--laterite-600)'], verified: ['var(--verified-100)', 'var(--verified-500)'], caution: ['var(--caution-100)', 'var(--caution-500)'], flag: ['var(--flag-100)', 'var(--flag-500)'] }[tone];
  return <span style={{ display: 'inline-block', ...S.label, padding: '5px 9px', borderRadius: 'var(--radius-1)', background: c[0], color: c[1], ...style }}>{children}</span>;
}

function Tag({ children, style }) {
  return <span style={{ display: 'inline-block', font: 'var(--type-caption)', color: 'var(--text-body)', padding: '4px 10px', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-1)', ...style }}>{children}</span>;
}

function SectionMarker({ number, children, style }) {
  return <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, ...style }}>
    {number && <span style={{ ...S.label, color: 'var(--laterite-500)' }}>{number}</span>}
    <span style={{ ...S.label, color: 'var(--text-muted)' }}>{children}</span>
    <span style={{ flex: 1, borderTop: '1px solid var(--line-strong)' }} />
  </div>;
}

function StatBlock({ label, value, unit, note, style }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
    <span style={{ ...S.label, color: 'var(--text-faint)' }}>{label}</span>
    <span style={{ font: 'var(--type-figure)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>{value}{unit && <span style={{ fontSize: 18, color: 'var(--text-muted)', marginLeft: 2 }}>{unit}</span>}</span>
    {note && <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{note}</span>}
  </div>;
}

function KeyValueRow({ label, value, style }) {
  return <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, font: 'var(--type-data)', fontSize: 14, color: 'var(--text-body)', padding: '9px 0', ...style }}>
    <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
    <span style={{ flex: '1 1 12px', minWidth: 12, borderBottom: '1px dotted var(--ink-100)', margin: '0 6px', transform: 'translateY(-4px)' }} />
    <span style={{ color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums', textAlign: 'right', minWidth: 0 }}>{value}</span></div>;
}

function Callout({ title, tone = 'accent', children, style }) {
  const c = { accent: 'var(--laterite-500)', caution: 'var(--caution-500)', flag: 'var(--flag-500)', neutral: 'var(--ink-500)' }[tone];
  const r = tone === 'neutral' ? 'var(--line-strong)' : c;
  return <div style={{ borderLeft: '2px solid ' + r, paddingLeft: 16, ...style }}>
    {title && <div style={{ ...S.label, color: c, marginBottom: 6 }}>{title}</div>}
    <div style={{ font: 'var(--type-small)', color: 'var(--text-body)', maxWidth: 'var(--measure-prose)' }}>{children}</div></div>;
}

function Input({ label, hint, prefix, ...rest }) {
  const [fo, setFo] = React.useState(false);
  return <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <span style={{ ...S.label, color: 'var(--text-muted)' }}>{label}</span>}
    <span style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', borderRadius: 'var(--radius-1)', padding: '0 12px', transition: 'var(--transition)', border: '1px solid ' + (fo ? 'var(--border-focus)' : 'var(--line-strong)'), boxShadow: fo ? 'var(--shadow-focus)' : 'none' }}>
      {prefix && <span style={{ font: 'var(--type-data)', color: 'var(--text-faint)' }}>{prefix}</span>}
      <input onFocus={() => setFo(true)} onBlur={() => setFo(false)} style={{ flex: 1, border: 0, outline: 0, background: 'transparent', font: 'var(--type-body)', color: 'var(--ink-900)', padding: '11px 0' }} {...rest} />
    </span>
    {hint && <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{hint}</span>}
  </label>;
}

function Select({ label, options = [], ...rest }) {
  return <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <span style={{ ...S.label, color: 'var(--text-muted)' }}>{label}</span>}
    <select {...rest} style={{ appearance: 'none', font: 'var(--type-body)', color: 'var(--ink-900)', background: 'var(--surface)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-1)', padding: '11px 34px 11px 12px', cursor: 'pointer',
      backgroundImage: 'linear-gradient(45deg,transparent 50%,var(--ink-500) 50%),linear-gradient(135deg,var(--ink-500) 50%,transparent 50%)', backgroundPosition: 'calc(100% - 18px) 50%, calc(100% - 13px) 50%', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select></label>;
}

function Checkbox({ label, checked, onChange }) {
  return <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
    <span style={{ width: 17, height: 17, flex: '0 0 auto', marginTop: 2, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-1)', transition: 'var(--transition)', border: '1px solid ' + (checked ? 'var(--laterite-500)' : 'var(--line-strong)'), background: checked ? 'var(--laterite-500)' : 'var(--surface)' }}>
      {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fffdf8" strokeWidth="3.5"><path d="M4 12.5l5.5 5.5L20 6" /></svg>}
    </span>
    <span style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>{label}</span>
  </label>;
}
