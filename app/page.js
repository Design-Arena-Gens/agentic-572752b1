import IdeaGenerator from '../components/IdeaGenerator';

export default function Page() {
  return (
    <main className="container">
      <section className="hero">
        <h1>What would you do with a rope, a coin, and a broken DVD player?</h1>
        <p className="subtitle">A playful generator for creative, useful, and slightly chaotic ideas.</p>
      </section>
      <section className="example">
        <h2>Example ideas</h2>
        <ul>
          <li><strong>Rope</strong>: improv clothesline, tripod lashing for a camp cooker, rescue throw line.</li>
          <li><strong>Coin</strong>: screwdriver for battery doors, emergency washer/shim, decision coinflip app token.</li>
          <li><strong>Broken DVD player</strong>: harvest DC motors/gears, LED/IR parts for DIY remote tester, retro case for a Raspberry Pi.</li>
        </ul>
      </section>
      <IdeaGenerator defaultItems="rope, coin, broken dvd player" />
    </main>
  );
}
