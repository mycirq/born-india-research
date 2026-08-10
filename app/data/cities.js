/* Canonical city dataset — ported verbatim from the Groundwork design system.
 *
 * ⚠️ All figures are ILLUSTRATIVE DESK ESTIMATES, not registered transaction
 * evidence. groundwork-be will replace these values while keeping this shape.
 */

export const CITIES = [
  {
    id: 'gurgaon', name: 'Gurgaon', lon: 77.03, lat: 28.46, coords: '28.46°N 77.03°E',
    stage: 'Live', focus: 'NCR apartments and high-street retail',
    rate: '₹14,000', move: '+12.0%', up: true,
    kicker: 'Dwarka Expressway and Golf Course Extension',
    summary: 'A corridor that has moved hard on infrastructure promises. The question is no longer whether it rose, but whether the asking prices have run ahead of what actually registers.',
    asOf: 'Desk estimates, Aug 2026',
    headline: [
      { key: 'median_psf', label: 'Median rate', value: '14,000', note: '₹/sqft, apartments' },
      { key: 'yoy_change_pct', label: '1-year change', value: '+12.0', note: 'Corridor level' },
      { key: 'gross_yield_pct', label: 'Gross yield', value: '2.1', note: 'Residential, before costs' },
      { key: 'overhang_months', label: 'Overhang', value: '19', note: 'Months of unsold stock' },
    ],
    rows: [
      { key: 'rate_range', k: 'Rate range', v: '₹11,000 to ₹16,750' },
      { k: '3-year change', v: '+75.0%' },
      { k: '5-year change', v: '+152.3%' },
      { k: 'Asking vs registered', v: 'Gap not yet measured' },
      { k: 'Quarterly absorption', v: '~4,900 units' },
      { k: 'RERA-registered share', v: 'Under verification' },
      { k: 'Metro extension', v: '2026-27, slipped twice' },
    ],
    micro: [
      { name: 'Dwarka Expressway', rate: '₹14,000', verdict: 'Watch', tone: 'caution' },
      { name: 'Sector 113', rate: '₹12,100', verdict: 'Unpriced', tone: 'flag' },
      { name: 'Golf Course Ext.', rate: '₹16,750', verdict: 'Liquid', tone: 'verified' },
      { name: 'Sohna Road', rate: '₹11,000', verdict: 'Watch', tone: 'caution' },
    ],
    note: 'Corridor averages here mix residential and retail stock. Treat them as context for a specific unit, never as a comparable set.',
  },
  {
    id: 'mumbai', name: 'Mumbai', lon: 72.88, lat: 19.08, coords: '19.08°N 72.88°E',
    stage: 'Live', focus: 'MMR redevelopment and resale stock',
    rate: '₹28,400', move: '+6.4%', up: true,
    kicker: 'MMR, with the redevelopment question at the centre',
    summary: 'The most liquid market we cover and the least forgiving on entry price. Most of the risk sits in society redevelopment timelines and carpet-area arithmetic.',
    asOf: 'Desk estimates, Aug 2026',
    headline: [
      { key: 'median_psf', label: 'Median rate', value: '28,400', note: '₹/sqft, MMR blended' },
      { key: 'yoy_change_pct', label: '1-year change', value: '+6.4', note: 'Blended, all segments' },
      { key: 'gross_yield_pct', label: 'Gross yield', value: '3.0', note: 'Residential, before costs' },
      { key: 'overhang_months', label: 'Overhang', value: '26', note: 'Months of unsold stock' },
    ],
    rows: [
      { key: 'rate_range', k: 'Rate range', v: '₹12,500 to ₹92,000' },
      { k: '3-year change', v: '+21.5%' },
      { k: '5-year change', v: '+38.0%' },
      { k: 'Carpet-to-super ratio', v: 'Checked per project' },
      { k: 'Redevelopment stock', v: 'High share of resale' },
      { k: 'Days on market', v: '~110 days, resale' },
      { k: 'Stamp duty', v: '6% plus cess' },
    ],
    micro: [
      { name: 'Chembur', rate: '₹27,000', verdict: 'Liquid', tone: 'verified' },
      { name: 'Mulund', rate: '₹24,500', verdict: 'Liquid', tone: 'verified' },
      { name: 'Panvel', rate: '₹12,500', verdict: 'Watch', tone: 'caution' },
      { name: 'Wadala', rate: '₹34,000', verdict: 'Watch', tone: 'caution' },
    ],
    note: 'A redevelopment offer is a construction risk dressed as a property purchase. We price the delay, not the brochure.',
  },
  {
    id: 'bengaluru', name: 'Bengaluru', lon: 77.59, lat: 12.97, coords: '12.97°N 77.59°E',
    stage: 'Live', focus: 'Plotted land, east and north corridors',
    rate: '₹9,600', move: '+9.2%', up: true,
    kicker: 'East corridor plotted land and the airport belt',
    summary: 'The market where title work matters most and where the cheapest headline rate is usually the one with the worst paperwork behind it.',
    asOf: 'Desk estimates, Aug 2026',
    headline: [
      { key: 'median_psf', label: 'Median rate', value: '9,600', note: '₹/sqft, apartments' },
      { key: 'yoy_change_pct', label: '1-year change', value: '+9.2', note: 'City level' },
      { key: 'gross_yield_pct', label: 'Gross yield', value: '3.4', note: 'Strongest of the four' },
      { key: 'overhang_months', label: 'Overhang', value: '14', note: 'Months of unsold stock' },
    ],
    rows: [
      { key: 'rate_range', k: 'Rate range', v: '₹6,200 to ₹14,800' },
      { k: '3-year change', v: '+31.0%' },
      { k: 'Plotted land, east', v: '₹1,900 to ₹2,400' },
      { k: 'Conversion orders', v: 'Checked per layout' },
      { k: 'Quarterly absorption', v: '~13,000 units' },
      { k: 'Rental comparables', v: 'Deepest of the four' },
      { k: 'Litigation screen', v: 'Parent parcel, always' },
    ],
    micro: [
      { name: 'Sarjapur North', rate: '₹2,140', verdict: 'Clear', tone: 'verified' },
      { name: 'Devanahalli East', rate: '₹1,870', verdict: 'Clear', tone: 'verified' },
      { name: 'Hoskote Ring', rate: '₹1,240', verdict: 'Watch', tone: 'caution' },
      { name: 'Anekal West', rate: '₹1,080', verdict: 'Disputed', tone: 'flag' },
    ],
    note: 'Plotted rates are quoted per sqft of land, not built-up area. Comparing them against apartment rates is the most common error we see.',
  },
  {
    id: 'dehradun', name: 'Dehradun', lon: 78.03, lat: 30.32, coords: '30.32°N 78.03°E',
    stage: 'Opening', focus: 'Valley belt and second homes',
    rate: '₹6,300', move: '+7.8%', up: true,
    kicker: 'Valley belt, second homes and land',
    summary: 'A thin market where appreciation stories are easy to tell and exits are hard to find. We cover it because clients keep asking, and we say so when liquidity is the problem.',
    asOf: 'Desk estimates, Aug 2026',
    headline: [
      { key: 'median_psf', label: 'Median rate', value: '6,300', note: '₹/sqft, apartments' },
      { key: 'yoy_change_pct', label: '1-year change', value: '+7.8', note: 'City level' },
      { key: 'gross_yield_pct', label: 'Gross yield', value: '2.4', note: 'Thin rental market' },
      { key: 'resale_depth', label: 'Resales', value: 'Low', note: 'Liquidity is the risk' },
    ],
    rows: [
      { key: 'rate_range', k: 'Rate range', v: '₹4,100 to ₹9,800' },
      { k: '3-year change', v: '+24.0%' },
      { k: 'Land, valley belt', v: '₹1,500 to ₹4,200' },
      { k: 'Second-home share', v: 'Majority of demand' },
      { k: 'Days on market', v: 'Long, seasonal' },
      { k: 'Hill-area rules', v: 'Slope and access checks' },
      { k: 'Ceiling on land', v: 'Non-agriculturist limits' },
    ],
    micro: [
      { name: 'Rajpur Road', rate: '₹9,800', verdict: 'Liquid', tone: 'verified' },
      { name: 'Sahastradhara', rate: '₹6,400', verdict: 'Watch', tone: 'caution' },
      { name: 'Doiwala', rate: '₹4,100', verdict: 'Thin', tone: 'caution' },
      { name: 'Mussoorie Road', rate: '₹7,200', verdict: 'Watch', tone: 'caution' },
    ],
    note: 'Land purchase by non-agriculturists is capped in Uttarakhand. Any pitch that skips this is a pitch we would not act on.',
  },
];

export const TONES = {
  verified: ['var(--verified-100)', 'var(--verified-500)'],
  caution: ['var(--caution-100)', 'var(--caution-500)'],
  flag: ['var(--flag-100)', 'var(--flag-500)'],
};

/* Micro-market pins with real coordinates, for the CARTO basemap on the city
 * pages. Lon/lat are approximate micro-market centroids. */
export const PINS = {
  gurgaon: [
    { name: 'Dwarka Expressway', lon: 77.04, lat: 28.50, tone: 'caution', verdict: 'Watch', note: 'The most launched-into corridor in NCR. Rates hold up, but the pipeline arriving over the next eight quarters is the risk, not the price.', rows: [['Median ₹/sqft', '14,000'], ['1-year', '+12.0%'], ['Unsold units', '~11,400'], ['Completions due', '18,900 by 2028'], ['RERA share', 'Under check']] },
    { name: 'Sector 113', lon: 77.03, lat: 28.56, tone: 'flag', verdict: 'Unpriced', note: 'Three listings for near-identical units imply rates 32 percent apart. We hold zero registered comparables here.', rows: [['Quoted ₹/sqft', '12,100'], ['Implied high', '18,857'], ['Registered comps', '0'], ['RERA', 'Unconfirmed'], ['Our stance', 'Do not commit']] },
    { name: 'Golf Course Ext.', lon: 77.06, lat: 28.41, tone: 'verified', verdict: 'Liquid', note: 'The one part of this market with genuine resale depth. You pay for that, and in our view it is worth paying for.', rows: [['Median ₹/sqft', '16,750'], ['1-year', '+9.4%'], ['Days on market', '~64'], ['Resales per quarter', '~310'], ['Gross yield', '2.4%']] },
    { name: 'Sohna Road', lon: 77.04, lat: 28.40, tone: 'caution', verdict: 'Watch', note: 'Cheapest of the established corridors. Commute times, not price, are what cap demand here.', rows: [['Median ₹/sqft', '11,000'], ['1-year', '+6.8%'], ['Unsold units', '~6,200'], ['Days on market', '~120'], ['Gross yield', '2.6%']] },
    { name: 'Sector 65', lon: 77.08, lat: 28.40, tone: 'verified', verdict: 'Liquid', note: 'Established stock with working social infrastructure. Slower growth, far fewer surprises.', rows: [['Median ₹/sqft', '15,200'], ['1-year', '+7.1%'], ['Days on market', '~72'], ['Delay rate', 'Low'], ['Gross yield', '2.3%']] },
    { name: 'New Gurgaon Sec 90', lon: 76.95, lat: 28.42, tone: 'caution', verdict: 'Thin', note: 'Prices look attractive against the expressway. Rental demand has not arrived at the same speed.', rows: [['Median ₹/sqft', '9,400'], ['1-year', '+8.2%'], ['Rental depth', 'Thin'], ['Days on market', '~145'], ['Gross yield', '1.9%']] },
  ],
  mumbai: [
    { name: 'Chembur', lon: 72.90, lat: 19.06, tone: 'verified', verdict: 'Liquid', note: 'Central, connected, and deep enough that you can sell in a normal market without discounting.', rows: [['Median ₹/sqft', '27,000'], ['1-year', '+6.1%'], ['Days on market', '~78'], ['Gross yield', '3.2%'], ['Redevelopment share', 'Moderate']] },
    { name: 'Mulund', lon: 72.96, lat: 19.17, tone: 'verified', verdict: 'Liquid', note: 'Strong end-user demand and comparatively honest pricing. Our default recommendation for a first MMR purchase.', rows: [['Median ₹/sqft', '24,500'], ['1-year', '+7.0%'], ['Days on market', '~84'], ['Gross yield', '3.1%'], ['Delay rate', 'Low']] },
    { name: 'Wadala', lon: 72.86, lat: 19.02, tone: 'caution', verdict: 'Watch', note: 'Priced on a monorail-and-eastern-freeway story. Verify that the story has actually reached the building you are buying in.', rows: [['Median ₹/sqft', '34,000'], ['1-year', '+5.2%'], ['Days on market', '~102'], ['Gross yield', '2.7%'], ['Pipeline', 'Heavy']] },
    { name: 'Panvel', lon: 73.11, lat: 18.99, tone: 'caution', verdict: 'Watch', note: 'The airport trade. Cheap entry, long horizon, and an exit that depends entirely on infrastructure landing on time.', rows: [['Median ₹/sqft', '12,500'], ['1-year', '+9.8%'], ['Days on market', '~160'], ['Gross yield', '2.9%'], ['Exit depth', 'Thin']] },
    { name: 'Thane', lon: 72.97, lat: 19.22, tone: 'verified', verdict: 'Liquid', note: 'Large, well-supplied and genuinely liquid. Choose the project on delivery record, not on rate.', rows: [['Median ₹/sqft', '19,800'], ['1-year', '+6.9%'], ['Days on market', '~90'], ['Gross yield', '3.3%'], ['Unsold units', 'High']] },
    { name: 'Andheri East', lon: 72.87, lat: 19.12, tone: 'caution', verdict: 'Watch', note: 'Office-led rental demand makes yield look good until a tenant leaves. Model a vacant quarter, not a vacant month.', rows: [['Median ₹/sqft', '31,500'], ['1-year', '+4.8%'], ['Days on market', '~96'], ['Gross yield', '3.4%'], ['Tenant type', 'Corporate']] },
  ],
  bengaluru: [
    { name: 'Sarjapur North', lon: 77.70, lat: 12.90, tone: 'verified', verdict: 'Clear', note: 'Best road access of the plotted markets we assessed, with two schools already operating rather than promised.', rows: [['Land ₹/sqft', '2,140'], ['1-year', '+11.4%'], ['Title', 'Clear'], ['RERA', 'Registered'], ['Site visits', '3']] },
    { name: 'Devanahalli East', lon: 77.72, lat: 13.25, tone: 'verified', verdict: 'Clear', note: 'Airport corridor. Slower rental market, stronger appreciation, and paperwork that stood up to checking.', rows: [['Land ₹/sqft', '1,870'], ['1-year', '+14.2%'], ['Title', 'Clear'], ['RERA', 'Registered'], ['Rental depth', 'Thin']] },
    { name: 'Hoskote Ring', lon: 77.80, lat: 13.07, tone: 'caution', verdict: 'Watch', note: 'Priced well, but the ring-road timeline has slipped twice. We model the case where it slips again.', rows: [['Land ₹/sqft', '1,240'], ['1-year', '+6.1%'], ['Title', 'Clear'], ['RERA', 'Pending'], ['Infra dependency', 'High']] },
    { name: 'Anekal West', lon: 77.70, lat: 12.71, tone: 'flag', verdict: 'Disputed', note: 'Litigation on the parent parcel is listed and active. We stopped the assessment rather than estimate around it.', rows: [['Land ₹/sqft', '1,080'], ['1-year', '−1.2%'], ['Title', 'Disputed'], ['RERA', 'Not found'], ['Our stance', 'Avoid']] },
    { name: 'Whitefield', lon: 77.75, lat: 12.97, tone: 'verified', verdict: 'Liquid', note: 'Deepest rental market in the city and the easiest place to exit an apartment at a fair price.', rows: [['Median ₹/sqft', '9,800'], ['1-year', '+8.4%'], ['Gross yield', '3.6%'], ['Days on market', '~70'], ['Tenant depth', 'Strong']] },
    { name: 'Hennur', lon: 77.63, lat: 13.06, tone: 'caution', verdict: 'Watch', note: 'Airport-road demand with lake-belt drainage questions. Worth a monsoon-season visit before committing.', rows: [['Median ₹/sqft', '8,200'], ['1-year', '+9.0%'], ['Gross yield', '3.3%'], ['Days on market', '~95'], ['Drainage', 'Check on site']] },
  ],
  dehradun: [
    { name: 'Rajpur Road', lon: 78.07, lat: 30.36, tone: 'verified', verdict: 'Liquid', note: 'The one address here with a genuine resale market. You pay a premium and you get an exit.', rows: [['Median ₹/sqft', '9,800'], ['1-year', '+8.6%'], ['Days on market', '~120'], ['Gross yield', '2.6%'], ['Resale depth', 'Best in city']] },
    { name: 'Sahastradhara', lon: 78.11, lat: 30.38, tone: 'caution', verdict: 'Watch', note: 'Second-home demand, seasonal and sentiment-driven. Prices hold on the way up and gap on the way down.', rows: [['Median ₹/sqft', '6,400'], ['1-year', '+7.2%'], ['Days on market', '~180'], ['Gross yield', '2.1%'], ['Demand type', 'Second home']] },
    { name: 'Doiwala', lon: 78.12, lat: 30.18, tone: 'caution', verdict: 'Thin', note: 'Cheapest entry in the valley and the hardest place to sell. Buy only with a long horizon and no need for liquidity.', rows: [['Median ₹/sqft', '4,100'], ['1-year', '+6.4%'], ['Days on market', '~220'], ['Gross yield', '2.2%'], ['Resale depth', 'Very thin']] },
    { name: 'Mussoorie Road', lon: 78.05, lat: 30.40, tone: 'caution', verdict: 'Watch', note: 'Slope stability and access in monsoon are the real questions, not the view from the balcony.', rows: [['Median ₹/sqft', '7,200'], ['1-year', '+8.0%'], ['Slope checks', 'Required'], ['Access in monsoon', 'Verify'], ['Gross yield', '2.0%']] },
    { name: 'Selaqui', lon: 77.86, lat: 30.36, tone: 'caution', verdict: 'Thin', note: 'Industrial-adjacent land. Real employment nearby, very little residential depth so far.', rows: [['Land ₹/sqft', '1,500'], ['1-year', '+5.8%'], ['Employment nodes', 'Present'], ['Rental demand', 'Minimal'], ['Exit', 'Slow']] },
    { name: 'Clement Town', lon: 78.00, lat: 30.27, tone: 'verified', verdict: 'Steady', note: 'Established, well-serviced and unexciting, which in this market counts as a compliment.', rows: [['Median ₹/sqft', '5,600'], ['1-year', '+6.9%'], ['Days on market', '~150'], ['Gross yield', '2.5%'], ['Infrastructure', 'In place']] },
  ],
};

export const toneColor = (tone) =>
  tone === 'verified' ? 'var(--verified-500)' : tone === 'flag' ? 'var(--flag-500)' : 'var(--caution-500)';

export const getCity = (id) => CITIES.find((c) => c.id === id) || CITIES[0];
export const getPins = (id) => PINS[id] || [];
