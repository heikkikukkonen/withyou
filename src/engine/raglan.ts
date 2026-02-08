import { PatternTemplate, ProfileInput, GeneratedPattern } from "@/types/withyou";
import { clamp, roundToMultiple, stPerCm, rowsPerCm } from "./math";

const ENGINE_VERSION = "0.1.0";

function easeCm(ease: ProfileInput["ease"], bustCircCm: number) {
  // MVP: helppo ja ymmärrettävä
  // close: +0..+4 cm, regular: +6..+10, relaxed: +12..+18 (skaalaa hieman koon mukana)
  const base = bustCircCm < 95 ? 6 : bustCircCm < 115 ? 8 : 10;
  if (ease === "close") return clamp(base - 6, 0, 4);
  if (ease === "regular") return clamp(base, 6, 10);
  return clamp(base + 6, 12, 18);
}

export function generateTopDownRaglan(
  template: PatternTemplate,
  input: ProfileInput
): GeneratedPattern {
  const spc = stPerCm(input.gauge.stitchesPer10cm);
  const rpc = rowsPerCm(input.gauge.rowsPer10cm);

  const bust = input.measurements.bustCircCm;
  const targetBust = bust + easeCm(input.ease, bust);

  // MVP: kaula-aukon ympärys oletuksena, jos ei anneta
  const neck = input.measurements.neckCircCm ?? clamp(bust * 0.38, 34, 48);

  // Luo kaula-aloitus: pyöreä, jaollinen 4:ään (usein helpottaa jakamista)
  const castOnRaw = neck * spc;
  const castOn = Math.max(56, roundToMultiple(castOnRaw, 4));

  // Raglan-linja: 4 linjaa
  const raglanLines = 4 * template.raglan.raglanStitches;

  // Kaarroke kasvatetaan, kunnes vartalon ympärys täyttyy (approksimaatio)
  const targetBodySts = Math.round(targetBust * spc);
  // Yksinkertainen malli: jokaisella lisäyskierroksella +8s (2 per raglan-sauma)
  const incPerRound = 8;
  const availableForBodyAtSeparation = targetBodySts - template.raglan.underarmStitches;

  // Arvioi lisäyskierrosten määrä:
  const yokeIncRounds = Math.max(0, Math.ceil((availableForBodyAtSeparation - castOn) / incPerRound));

  // Erotus silmukat vartalolle (karkeasti)
  const sepBodySts = castOn + yokeIncRounds * incPerRound + template.raglan.underarmStitches;

  const bodyLenRows = Math.max(20, Math.round(input.measurements.bodyLenUnderarmCm * rpc));
  const sleeveLenRows = Math.max(20, Math.round(input.measurements.sleeveLenUnderarmCm * rpc));

  // Kalvosilmukat: olkavarsi → ranne (MVP: karkea, myöhemmin muotoilu)
  const cuffCircCm = clamp(input.measurements.upperArmCircCm * 0.55, 16, 24);
  const cuffSts = roundToMultiple(cuffCircCm * spc, 2);

  const createdAtISO = new Date().toISOString();

  return {
    engineVersion: ENGINE_VERSION,
    createdAtISO,
    templateId: template.id,
    input,
    results: {
      targetBustCircCm: Math.round(targetBust * 10) / 10,
      castOnStitches: castOn,
      yokeIncreaseRounds: yokeIncRounds,
      separationStitchesBody: sepBodySts,
      bodyLenRows,
      sleeveLenRows,
      cuffStitchesEstimate: Math.max(28, cuffSts),
    },
  };
}
