import '../../styles/HeroBanner.css';

export default function HeroBanner() {
    return (
        <section className="hero-banner">
            

            <div className="hero-content">
                <h1 className="hero-title">Enlight Your <span className="hero-t-span">Will</span></h1>
                <div className='d-flex'>
                <p className="hero-subtitle">
                    Choose the Power you need. <br />
                    When you need it.
                </p>

                <span className="hero-tagline">New Humans — New Light</span>
                </div>

                
            </div>
        </section>
    );
}
