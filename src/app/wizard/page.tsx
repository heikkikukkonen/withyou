"use client";

import { useMemo, useState } from "react";
import type { EasePreference, ProfileInput, GeneratedPattern } from "@/types/withyou";

const easeOptions: { value: EasePreference; label: string; desc: string }[] = [
  { value: "close", label: "Lähellä ihoa", desc: "Napakka istuvuus (0–4 cm väljyyttä)." },
  { value: "regular", label: "Mukava", desc: "Arkeen sopiva väljyys (6–10 cm)." },
  { value: "relaxed", label: "Väljä", desc: "Rento ja pehmeä (12–18 cm)." },
];

type StepConfig = {
  id: string;
  title: string;
  lead?: string;
  hint?: string;
  cta?: string;
  render: () => React.ReactNode;
  isValid?: () => boolean;
};

export default function WizardPage() {
  const [stepIndex, setStepIndex] = useState(0);

  const [name, setName] = useState("");
  const [st10, setSt10] = useState(20);
  const [rows10, setRows10] = useState(28);
  const [washed, setWashed] = useState(true);

  const [bust, setBust] = useState(100);
  const [upperArm, setUpperArm] = useState(32);
  const [bodyLen, setBodyLen] = useState(35);
  const [sleeveLen, setSleeveLen] = useState(45);

  const [ease, setEase] = useState<EasePreference>("regular");

  const [result, setResult] = useState<GeneratedPattern | null>(null);
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

  const steps: StepConfig[] = [
    {
      id: "welcome",
      title: "Tervetuloa, tehdään tästä sinun näköisesi.",
      lead:
        "Emme sovita sinua standardiin. Mittasi ovat juuri oikeat, ja ne ohjaavat kaikkea.",
      cta: "Aloita",
      render: () => (
        <div className="space-y-4 text-[15px] text-[var(--muted)]">
          <p>
            Kysymme yhden asian kerrallaan. Kerromme selkeästi, miten mitta otetaan.
          </p>
          <div className="rounded-2xl border border-[var(--line)] bg-white/60 p-4 text-sm">
            <div className="font-display text-lg text-[var(--ink)]">
              “Sinun mitat ovat juuri oikeat.”
            </div>
            <div className="mt-2 text-[var(--muted)]">
              Tämä neule rakentuu sinun kehostasi, ei valmiista kaavoista.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "name",
      title: "Miten haluat meidän kutsuvan sinua?",
      lead: "Nimi tekee tästä henkilökohtaisen.",
      hint: "Esim. Elli",
      render: () => (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kirjoita nimesi"
          className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[16px] text-[var(--ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      ),
      isValid: () => name.trim().length > 1,
    },
    {
      id: "st10",
      title: "Kuinka monta silmukkaa 10 sentissä?",
      lead: "Mittaa tilkusta suoraan silmukoiden määrä.",
      hint: "Esim. 20",
      render: () => (
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={6}
            value={st10}
            onChange={(e) => setSt10(Number(e.target.value))}
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[16px] text-[var(--ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)]">silmukkaa</span>
        </div>
      ),
      isValid: () => st10 > 0,
    },
    {
      id: "rows10",
      title: "Kuinka monta kerrosta 10 sentissä?",
      lead: "Laske kerrokset samasta tilkusta.",
      hint: "Esim. 28",
      render: () => (
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={6}
            value={rows10}
            onChange={(e) => setRows10(Number(e.target.value))}
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[16px] text-[var(--ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)]">kerrosta</span>
        </div>
      ),
      isValid: () => rows10 > 0,
    },
    {
      id: "washed",
      title: "Onko tilkku pesty tai huuhdeltu?",
      lead: "Pesty tilkku antaa luotettavimman mitan.",
      render: () => (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setWashed(true)}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              washed
                ? "border-[var(--accent)] bg-white shadow-sm"
                : "border-[var(--line)] bg-white/50"
            }`}
          >
            <div className="font-medium text-[var(--ink)]">Kyllä</div>
            <div className="text-sm text-[var(--muted)]">Suositeltu vaihtoehto</div>
          </button>
          <button
            type="button"
            onClick={() => setWashed(false)}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              !washed
                ? "border-[var(--accent)] bg-white shadow-sm"
                : "border-[var(--line)] bg-white/50"
            }`}
          >
            <div className="font-medium text-[var(--ink)]">Ei vielä</div>
            <div className="text-sm text-[var(--muted)]">Voimme huomioida sen</div>
          </button>
        </div>
      ),
    },
    {
      id: "bust",
      title: "Rinnanympärys",
      lead: "Mittaa rennossa asennossa, teippi vaakasuorassa.",
      hint: "cm",
      render: () => (
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={60}
            value={bust}
            onChange={(e) => setBust(Number(e.target.value))}
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[16px] text-[var(--ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)]">cm</span>
        </div>
      ),
      isValid: () => bust > 0,
    },
    {
      id: "upperArm",
      title: "Olkavarsi / hauis",
      lead: "Pidä käsi rentona, mittaa leveimmältä kohdalta.",
      hint: "cm",
      render: () => (
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={15}
            value={upperArm}
            onChange={(e) => setUpperArm(Number(e.target.value))}
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[16px] text-[var(--ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)]">cm</span>
        </div>
      ),
      isValid: () => upperArm > 0,
    },
    {
      id: "bodyLen",
      title: "Kainalosta helmaan",
      lead: "Mittaa kainalosta siihen kohtaan, johon haluat helman päättyvän.",
      hint: "cm",
      render: () => (
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={10}
            value={bodyLen}
            onChange={(e) => setBodyLen(Number(e.target.value))}
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[16px] text-[var(--ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)]">cm</span>
        </div>
      ),
      isValid: () => bodyLen > 0,
    },
    {
      id: "sleeveLen",
      title: "Kainalosta ranteeseen",
      lead: "Mittaa kainalosta ranteeseen käsivarsi kevyesti taivutettuna.",
      hint: "cm",
      render: () => (
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={10}
            value={sleeveLen}
            onChange={(e) => setSleeveLen(Number(e.target.value))}
            className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[16px] text-[var(--ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)]">cm</span>
        </div>
      ),
      isValid: () => sleeveLen > 0,
    },
    {
      id: "ease",
      title: "Millainen istuvuus tuntuu sinulta oikealta?",
      lead: "Valitse hetki, joka tuntuu sinulta.",
      render: () => (
        <div className="grid gap-3">
          {easeOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setEase(o.value)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                ease === o.value
                  ? "border-[var(--accent)] bg-white shadow-sm"
                  : "border-[var(--line)] bg-white/50"
              }`}
            >
              <div className="font-medium text-[var(--ink)]">{o.label}</div>
              <div className="text-sm text-[var(--muted)]">{o.desc}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "review",
      title: "Tässä ovat sinun mitat",
      lead: "Voit muokata mitä tahansa ennen vahvistusta.",
      cta: "Luo räätälöity ohje",
      render: () => (
        <div className="space-y-3 text-sm text-[var(--muted)]">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Nimi</span>
            <span className="font-medium text-[var(--ink)]">{name || "—"}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Silmukkaa / 10 cm</span>
            <span className="font-medium text-[var(--ink)]">{st10}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Kerrosta / 10 cm</span>
            <span className="font-medium text-[var(--ink)]">{rows10}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Tilkku pesty</span>
            <span className="font-medium text-[var(--ink)]">{washed ? "Kyllä" : "Ei vielä"}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Rinnanympärys</span>
            <span className="font-medium text-[var(--ink)]">{bust} cm</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Olkavarsi / hauis</span>
            <span className="font-medium text-[var(--ink)]">{upperArm} cm</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Kainalosta helmaan</span>
            <span className="font-medium text-[var(--ink)]">{bodyLen} cm</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Kainalosta ranteeseen</span>
            <span className="font-medium text-[var(--ink)]">{sleeveLen} cm</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span>Istuvuus</span>
            <span className="font-medium text-[var(--ink)]">
              {easeOptions.find((o) => o.value === ease)?.label}
            </span>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-3">
            <div className="font-display text-lg text-[var(--ink)]">
              Neulesi tehdään juuri sinulle.
            </div>
            <div className="text-[13px] text-[var(--muted)]">
              Kiitos, että jaoit nämä mitat.
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activeStep = steps[stepIndex];
  const progressTotal = steps.length - 1;
  const progressIndex = Math.max(0, stepIndex - 1);
  const canContinue = activeStep.isValid ? activeStep.isValid() : true;
  const isFinal = stepIndex === steps.length - 1;
  const primaryLabel = activeStep.cta ?? (isFinal ? "Luo räätälöity ohje" : "Seuraava");

  function goNext() {
    if (isFinal) {
      void generate();
      return;
    }
    setStepIndex((idx) => Math.min(idx + 1, steps.length - 1));
  }

  function goBack() {
    setStepIndex((idx) => Math.max(idx - 1, 0));
  }

  return (
    <main className="relative min-h-screen px-6 py-12">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#e7d6c4] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-[#f3e6d6] blur-3xl" />

      <div className="relative mx-auto max-w-3xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-white/70 text-sm font-semibold tracking-wide text-[var(--accent-2)]">
              WL
            </div>
            <div>
              <div className="font-display text-2xl text-[var(--ink)]">Woollilly · With You</div>
              <div className="text-sm text-[var(--muted)]">Yksilöllinen neulesuhde</div>
            </div>
          </div>
          <div className="text-sm text-[var(--muted)]">
            Pehmeä atelier · askel kerrallaan
          </div>
        </header>

        <section className="rounded-[28px] border border-[var(--line)] bg-[var(--bg-soft)]/80 p-8 shadow-[var(--shadow)] backdrop-blur">
          {stepIndex > 0 && (
            <div className="mb-6 flex items-center justify-between text-xs text-[var(--muted)]">
              <div>
                Askel {progressIndex + 1} / {progressTotal}
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: progressTotal }).map((_, idx) => (
                  <span
                    key={`dot-${idx}`}
                    className={`h-2.5 w-2.5 rounded-full border ${
                      idx <= progressIndex
                        ? "border-[var(--accent)] bg-[var(--accent)]"
                        : "border-[var(--line)] bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="font-display text-3xl text-[var(--ink)] sm:text-4xl">
                {activeStep.title}
              </h1>
              {activeStep.lead && <p className="text-[15px] text-[var(--muted)]">{activeStep.lead}</p>}
            </div>

            {activeStep.render()}

            {activeStep.hint && (
              <div className="text-xs text-[var(--muted)]">Vihje: {activeStep.hint}</div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="rounded-full border border-[var(--line)] bg-white/60 px-5 py-2 text-sm text-[var(--muted)] transition disabled:opacity-40"
            >
              Takaisin
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue || loading}
              className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-2)] disabled:opacity-60"
            >
              {loading ? "Luodaan..." : primaryLabel}
            </button>
          </div>
        </section>

        {result?.render?.html && (
          <section className="rounded-[28px] border border-[var(--line)] bg-white/70 p-6 shadow-[var(--shadow)]">
            <h2 className="font-display text-2xl text-[var(--ink)]">Esikatselu</h2>
            <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: result.render.html }} />
            <pre className="mt-4 overflow-auto rounded-2xl bg-[var(--bg-soft)] p-3 text-xs text-[var(--ink)]">
              {JSON.stringify(result.results, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
