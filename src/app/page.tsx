import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex flex-col items-start gap-4">
            <div className="grid h-56 w-56 place-items-center overflow-hidden rounded-full border border-[var(--line)] bg-white/80 shadow-[var(--shadow)]">
              <Image
                src="/logo.jpg"
                alt="Woollilly logo"
                width={224}
                height={224}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="font-display text-3xl text-[var(--ink)]">Woollilly · With You</div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs text-[var(--muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            With You — ei standardeja, vaan sinä
          </div>

          <h1 className="font-display text-4xl tracking-tight text-[var(--ink)] lg:text-5xl">
            Neuleohje, joka kulkee{" "}
            <span className="text-[var(--accent-2)]">kanssasi</span>.
          </h1>

          <p className="text-[var(--muted)] text-lg leading-relaxed">
            Käsityö ansaitsee yksilöllisyyden, jonka teollinen tuotanto vei siltä pois.
            Syötä mitat ja neuletiheys — saat ohjeen, joka alkaa sinusta.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/wizard"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-2)]"
            >
              Räätälöi ohje →
            </Link>
            <a
              href="#story"
              className="rounded-full border border-[var(--line)] bg-white/70 px-6 py-3 text-sm text-[var(--muted)] transition hover:bg-white"
            >
              Lue tarina
            </a>
          </div>

          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            {[
              ["Sinusta alkaen", "Mitat eivät luokittele – ne kuuntelevat."],
              ["Deterministinen", "Numerot tulevat moottorista, ei arvauksista."],
              ["Lämmin kokemus", "Yksi kysymys kerrallaan, selkeästi."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--line)] bg-white/70 p-4 shadow-sm"
              >
                <div className="font-medium text-[var(--ink)]">{title}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-[color:var(--accent)]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-white/70 shadow-[var(--shadow)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/hero-1.jpg"
                alt="Mrs Woollilly knitting"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="border-t border-[var(--line)] p-5">
              <div className="text-sm text-[var(--muted)]">
                “Neuleohje ei ole kaava, vaan keskustelu vaatteen ja ihmisen välillä.”
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="mt-16 border-t border-[var(--line)]/40 pt-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl text-[var(--ink)]">Miksi With You?</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Kauneus ei ole keskiarvo. Sinä et ole poikkeama standardista — olet lähtökohta.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-4 text-[var(--muted)] leading-relaxed">
            <p>
              Woollilly · With You syntyi yksinkertaisesta havainnosta: vaatteet tehdään
              ihmisille, mutta ohjeet tehdään yhä koolle. Teollinen maailma opetti meille
              standardit ja taulukot, mutta käsityön ytimessä ne tuntuvat vierailta.
            </p>
            <p>
              With You tarkoittaa, että me aloitamme sinusta. Se kuuntelee sinun mittojasi,
              sinun käsialaasi ja sinun tapaa olla kehossa. Ei siksi, että sinua pitäisi
              korjata — vaan siksi, että olet jo riittävä lähtökohta.
            </p>
            <p>
              Kun ihminen typistetään keskiarvoksi, kaikki häviävät. Siksi With You on
              vastalause: neuleohje ei ole kaava, vaan keskustelu vaatteen ja ihmisen välillä.
              Syötät mitat ja neuletiheyden, ja saat ohjeen, joka kulkee rinnallasi.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-white/70 shadow-[var(--shadow)]">
            <div className="relative h-full min-h-[340px] lg:min-h-[420px]">
              <Image
                src="/hero-2.jpg"
                alt="Woollilly story imagery"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-[var(--line)] bg-white/70 p-6 shadow-[var(--shadow)]">
            <h3 className="font-display text-2xl text-[var(--ink)]">
              Neuleohje ei ole kaava, vaan keskustelu
            </h3>
            <p className="mt-3 text-[var(--muted)] leading-relaxed">
              With You -ohje sanoo: “kerro kuka olet, niin tehdään tämä yhdessä.”
              Se on kuunteleva ja kunnioittava keskustelu vaatteen ja ihmisen välillä.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
