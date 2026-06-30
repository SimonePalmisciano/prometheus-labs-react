import "../styles/AboutUs.css";
 

export default function AboutUs() {
    return (
        <div className="about-page">

            {/* HERO SECTION */}
            <section className="hero-section">
                <h1 className="hero-title">
                    We Shape the Future of Human Potential
                </h1>
                <p className="hero-subtitle">
                    PrometheusLABS is built on one belief: humanity evolves when individuals are empowered.
                </p>
            </section>

            {/* PILLARS SECTION */}
            <section className="pillars-section">
                <h2 className="section-title">Our Pillars</h2>

                <div className="pillars-grid">

                    <div className="pillar-card">
                        <h3 className="pillar-title">Choose Your Power</h3>
                        <p className="pillar-text">
                            Every individual carries untapped potential. We create the tools that allow you to unlock it,
                            shape it, and use it when it matters most.
                        </p>
                    </div>

                    <div className="pillar-card">
                        <h3 className="pillar-title">Illuminate Evolution</h3>
                        <p className="pillar-text">
                            Human progress has always begun with a spark. Our mission is to bring new possibilities into the
                            light and transform extraordinary ideas into everyday reality.
                        </p>
                    </div>

                    <div className="pillar-card">
                        <h3 className="pillar-title">Empower the Future</h3>
                        <p className="pillar-text">
                            Power should not belong to a select few. We believe every person deserves access to opportunities
                            that help them grow, overcome limits, and redefine what they can become.
                        </p>
                    </div>

                </div>
            </section>

            {/* EMOTIONAL BRAND STATEMENT */}
            <section className="emotional-section">
                <div className="emotional-content container">
                    <p>
                        Humanity has always been driven by a single force: the desire to become more.
                    </p>
                    <p>
                        From the first fire that illuminated the darkness to the innovations that reshape our world today,
                        every great leap forward began with someone willing to imagine a brighter future. At PrometheusLABS,
                        we exist to carry that flame forward.
                    </p>
                    <p>
                        We create new possibilities for people who refuse to stand still, who believe their limits are not
                        boundaries but starting points. Our mission is simple: to place extraordinary power within reach,
                        helping individuals discover new strengths, seize new opportunities, and shape the lives they truly want.
                    </p>
                    <p>
                        Because when people are empowered, the future becomes brighter for everyone.
                    </p>
                </div>
            </section>

            {/* INNOVATION LINES */}
            <section className="innovation-section">
                <h2 className="section-title">Innovation Lines</h2>

                <div className="innovation-grid">

                    <div className="innovation-card">
                        <h3 className="innovation-title">NOVAMORPH — Your Inner Power</h3>
                        <p className="innovation-text">
                            An annual breakthrough capsule engineered for those ready to transcend ordinary existence.
                            NOVAMORPH unlocks extraordinary abilities, turning rare possibilities into a personal reality
                            for an entire year.
                        </p>
                    </div>

                    <div className="innovation-card">
                        <h3 className="innovation-title">DailySUPer — Your best, every day.</h3>
                        <p className="innovation-text">
                            Daily nutrition for everyday heroes. Shakes and bars designed to support enhanced performance,
                            helping you unlock practical superpowers that make work, training, studying, and life feel easier
                            every day.
                        </p>
                    </div>

                    <div className="innovation-card">
                        <h3 className="innovation-title">PowerSHOT — Drink. Dope. Repeat.</h3>
                        <p className="innovation-text">
                            Instant fun in a bottle. PowerSHOT delivers short bursts of quirky abilities and unexpected
                            experiences, giving every party, adventure, game session, or late-night mission an extra spark.
                        </p>
                    </div>

                </div>
            </section>

            {/* OUR MISSION */}
            <section className="mission-section">
                <div className="mission-vision-content">
                    <h2 className="section-title">Our Mission</h2>
                    <p className="mission-vision-text">
                        Our mission is to democratize human enhancement. We believe extraordinary abilities should be
                        accessible, safe, and designed to help people grow — not divide them.
                    </p>
                </div>
            </section>
            <hr />

            {/* OUR VISION */}
            <section className="vision-section">
                <div className="mission-vision-content">
                    <h2 className="section-title">Our Vision</h2>
                    <p className="mission-vision-text">
                        We envision a future where human potential is limitless — a world where technology and biology
                        work together to elevate everyday life and empower individuals to become the best version of themselves.
                    </p>
                </div>
            </section>

        </div>
    );
}
