import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-semibold">Woollilly · With You</h1>
      <p className="text-slate-600">
        Neuleohjeet, jotka kulkevat kanssasi – eivät standardin mukaan.
      </p>
      <Link className="underline" href="/wizard">Avaa räätälöintiwizard →</Link>
    </main>
  );
}
