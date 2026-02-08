"use client";

import { useMemo, useState } from "react";
import type { EasePreference, ProfileInput } from "@/types/withyou";

const easeOptions: { value: EasePreference; label: string; desc: string }[] = [
  { value: "close", label: "Lähellä ihoa", desc: "Napakka istuvuus (0–4 cm väljyys)." },
  { value: "regular", label: "Mukava", desc: "Arkeen sopiva väljyys (6–10 cm)." },
  { value: "relaxed", label: "Väljä", desc: "Rento ja pehmeä (12–18 cm)." },
];

export default function WizardPage() {
  const [st10, setSt10] = useState(20);
  const [rows10, setRows10] = useState(28);
  const [washed, setWashed] = useState(true);

  const [bust, setBust] = useState(100);
  const [upperArm, setUpperArm] = useState(32);
  const [bodyLen, setBodyLen] = useState(35);
  const [sleeveLen, setSleeveLen] = useState(45);

  const [ease, setEase] = useState<EasePreference>("regular");

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const input: ProfileInput = useMemo(
    () => ({
      gauge: { stitchesPer10cm: st10, rowsPer10cm: rows10, swatchWasWashed: washed },
      measurements: {
        bustCircCm: bust,
        upperArmCircCm: upperArm,
        bodyLenUnderarmCm: bodyLen,
        sleeveLenUnderarmCm: sleeveLen,
      },
      ease,
    }),
    [st10, rows10, washed, bust, upperArm, bodyLen, sleeveLen, ease]
  );

  async function generate() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      setResult(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Woollilly · With You</h1>
        <p className="text-slate-600">
          Tämä ei yritä sovittaa sinua standardiin. Tämä alkaa sinusta.
        </p>
      </header>

      <section className="rounded-2xl border p-4 space-y-4">
        <h2 className="text-xl font-semibold">1) Neuletiheys</h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Silmukkaa / 10 cm</span>
            <input type="number" value={st10} onChange={(e) => setSt10(Number(e.target.value))}
              className="w-full rounded-lg border p-2" />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Kerrosta / 10 cm</span>
            <input type="number" value={rows10} onChange={(e) => setRows10(Number(e.target.value))}
              className="w-full rounded-lg border p-2" />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={washed} onChange={(e) => setWashed(e.target.checked)} />
          Tilkku on pesty/huuhdeltu (suositus)
        </label>
      </section>

      <section className="rounded-2xl border p-4 space-y-4">
        <h2 className="text-xl font-semibold">2) Sinun mitat</h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Rinnanympärys (cm)</span>
            <input type="number" value={bust} onChange={(e) => setBust(Number(e.target.value))}
              className="w-full rounded-lg border p-2" />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Olkavarsi/hauis (cm)</span>
            <input type="number" value={upperArm} onChange={(e) => setUpperArm(Number(e.target.value))}
              className="w-full rounded-lg border p-2" />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Kainalosta helmaan (cm)</span>
            <input type="number" value={bodyLen} onChange={(e) => setBodyLen(Number(e.target.value))}
              className="w-full rounded-lg border p-2" />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Kainalosta ranteeseen (cm)</span>
            <input type="number" value={sleeveLen} onChange={(e) => setSleeveLen(Number(e.target.value))}
              className="w-full rounded-lg border p-2" />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border p-4 space-y-3">
        <h2 className="text-xl font-semibold">3) Istuvuus</h2>
        <div className="grid gap-2">
          {easeOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setEase(o.value)}
              className={`text-left rounded-xl border p-3 hover:bg-slate-50 ${
                ease === o.value ? "border-slate-900" : "border-slate-200"
              }`}
            >
              <div className="font-medium">{o.label}</div>
              <div className="text-sm text-slate-600">{o.desc}</div>
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          onClick={generate}
          disabled={loading}
          className="rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Luodaan..." : "Luo räätälöity ohje"}
        </button>
        <span className="text-sm text-slate-600">MVP: yksi raglan-malli, deterministinen laskenta.</span>
      </div>

      {result?.render?.html && (
        <section className="rounded-2xl border p-4">
          <h2 className="text-xl font-semibold mb-3">Esikatselu</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: result.render.html }}
          />
          <pre className="mt-4 overflow-auto rounded-xl bg-slate-50 p-3 text-xs">
            {JSON.stringify(result.results, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}
