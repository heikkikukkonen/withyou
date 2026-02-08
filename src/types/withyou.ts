export type Gauge = {
  stitchesPer10cm: number; // e.g. 20
  rowsPer10cm: number;     // e.g. 28
  swatchWasWashed?: boolean;
};

export type EasePreference = "close" | "regular" | "relaxed";

export type Measurements = {
  bustCircCm: number;          // rinnanympärys
  upperArmCircCm: number;      // olkavarsi/hauis
  bodyLenUnderarmCm: number;   // kainalosta helmaan
  sleeveLenUnderarmCm: number; // kainalosta ranteeseen
  neckCircCm?: number;         // valinnainen MVP:ssä
};

export type ProfileInput = {
  gauge: Gauge;
  measurements: Measurements;
  ease: EasePreference;
};

export type PatternTemplate = {
  id: string;
  name: string;
  construction: "top_down_raglan";
  // MVP: kiinteät asetukset + muutama parametri
  raglan: {
    raglanStitches: number;     // esim 2 per saumalinja
    underarmStitches: number;   // esim 8–14
    increaseEvery: 2;           // joka 2. krs (MVP)
    necklineStyle: "crew";      // MVP: pyöreä
  };
};

export type GeneratedPattern = {
  engineVersion: string;
  createdAtISO: string;
  templateId: string;
  input: ProfileInput;
  results: {
    targetBustCircCm: number;
    castOnStitches: number;
    yokeIncreaseRounds: number;
    separationStitchesBody: number;
    bodyLenRows: number;
    sleeveLenRows: number;
    cuffStitchesEstimate: number;
  };
  // Renderöinti pidetään erillään, mutta MVP:ssä voi palauttaa myös valmiin HTML:n
  render?: {
    html: string;
  };
};
