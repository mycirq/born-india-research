import { CITIES, getCity } from '../../data/cities';
import CityView from '../CityView';

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.id }));
}

export function generateMetadata({ params }) {
  const city = CITIES.find((c) => c.id === params.city);
  if (!city) return { title: 'City research · Groundwork' };
  return {
    title: `${city.name} research · Groundwork`,
    description: `Independent research on ${city.name} real estate: micro-markets, pricing, yields and supply overhang. ${city.summary}`,
    alternates: { canonical: `/cities/${city.id}/` },
    openGraph: {
      title: `${city.name} research · Groundwork`,
      description: city.summary,
      url: `https://mybornindiaresearch.com/cities/${city.id}/`,
    },
  };
}

export default function CityPage({ params }) {
  const city = getCity(params.city);
  return <CityView city={city} />;
}
