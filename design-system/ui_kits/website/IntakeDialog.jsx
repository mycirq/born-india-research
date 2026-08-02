function IntakeDialog({ open, onClose }) {
  const [sent, setSent] = React.useState(false);
  const [note, setNote] = React.useState(true);
  const [name, setName] = React.useState('');
  const [city, setCity] = React.useState('Bengaluru');
  const [budget, setBudget] = React.useState('');
  if (!open) return null;
  const submit = () => {
    const subject = 'New enquiry — Born India Research';
    const body =
      'Name: ' + (name || '—') + '\n' +
      'City of interest: ' + city + '\n' +
      'Budget: ₹' + (budget || '—') + '\n' +
      'Quarterly market note: ' + (note ? 'Yes' : 'No') + '\n';
    window.location.href =
      'mailto:hello@mybornindiaresearch.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    setSent(true);
  };
  return <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(21,19,14,.42)', display: 'grid', placeItems: 'center', zIndex: 20, padding: 24 }}>
    <div onClick={e => e.stopPropagation()} style={{ width: 'min(520px,100%)', background: 'var(--surface-card)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-3)', boxShadow: 'var(--shadow-2)', padding: 'var(--space-6)' }}>
      {sent ? <div>
        <Badge tone="verified">Received</Badge>
        <h3 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '16px 0 8px' }}>We'll be in touch within two working days.</h3>
        <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)' }}>Your email app should have opened with the details ready to send — just hit send. No sales call: a short conversation about what you're trying to decide, and whether we're the right people to help.</p>
        <div style={{ marginTop: 24 }}><Button variant="secondary" onClick={onClose}>Close</Button></div>
      </div> : <div>
        <SectionMarker number="—">Start a conversation</SectionMarker>
        <h3 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '18px 0 6px' }}>Tell us what you're weighing up</h3>
        <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)', marginBottom: 22 }}>Three fields. We read every one ourselves.</p>
        <div style={{ display: 'grid', gap: 16 }}>
          <Input label="Name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Select label="City of interest" options={['Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Not decided']} value={city} onChange={e => setCity(e.target.value)} />
            <Input label="Budget" prefix="₹" placeholder="2,00,00,000" hint="Ballpark is fine." value={budget} onChange={e => setBudget(e.target.value)} />
          </div>
          <Checkbox label="Send me the quarterly market note" checked={note} onChange={e => setNote(e.target.checked)} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 26, alignItems: 'center' }}>
          <Button onClick={submit}>Send</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', marginLeft: 'auto' }}>We never pass your details to brokers.</span>
        </div>
      </div>}
    </div>
  </div>;
}
