const BASE = import.meta.env.BASE_URL;

export const IMAGES = {
  hero: `${BASE}assets/hero.png`,
  wine: `${BASE}assets/wine.png`,
  sake: `${BASE}assets/sake.png`,
  salon: `${BASE}assets/salon.png`,
  glass: `${BASE}assets/glass.png`,
  counterInterior: `${BASE}assets/salon.png`,
  barCounterLight: `${BASE}assets/glass.png`,
};

export const NAV_ITEMS = [
  { id: "hero", label: "HOME", path: "/" },
  { id: "concept", label: "CONCEPT", path: "/concept" },
  { id: "event", label: "EVENT", path: "/event" },
  { id: "floor", label: "FLOOR", path: "/floor" },
  { id: "menu", label: "MENU", path: "/menu" },
  { id: "performer", label: "PERFORMER", path: "/performer" },
  { id: "contact", label: "CONTACT", path: "/contact" },
];
