import { NextResponse } from "next/server";
import { woollillyRaglanMVP } from "@/lib/templates";
import { generateTopDownRaglan } from "@/engine/raglan";
import { ProfileInput } from "@/types/withyou";

export async function POST(req: Request) {
  const body = (await req.json()) as ProfileInput;

  // Kevyt validointi MVP:ssä
  if (!body?.gauge?.stitchesPer10cm || !body?.measurements?.bustCircCm) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const generated = generateTopDownRaglan(woollillyRaglanMVP, body);

  // MVP: yksinkertainen HTML-renderi tässä samassa (myöhemmin oma render-moduuli)
  const html = `
    <h1>${woollillyRaglanMVP.name}</h1>
    <p><strong>With You</strong> – tämä ohje alkaa sinusta.</p>
    <h2>Yhteenveto</h2>
    <ul>
      <li>Tavoiterinnanympärys: ${generated.results.targetBustCircCm} cm</li>
      <li>Luo: ${generated.results.castOnStitches} s</li>
      <li>Lisäyskierrokset: ${generated.results.yokeIncreaseRounds} kpl</li>
      <li>Vartalon silmukat erotuksessa: ${generated.results.separationStitchesBody} s</li>
      <li>Vartalon pituus: ${generated.results.bodyLengthRows} krs</li>
      <li>Hihan pituus: ${generated.results.sleeveLengthRows} krs</li>
    </ul>
  `;

  return NextResponse.json({
    ...generated,
    render: { html },
  });
}
