// src/pages/Founder/Founder.jsx
import Navbar from "../../components/nav/navbar";
import Footer from "../../components/footer/footer";
import "./founder.css"; // Using SCSS import

const Founder = () => {
    return (
        <>
            <Navbar />

            <main className="founder-container">
                <section className="founder-hero">
                    <div className="founder-text">
                        <h1>Meet the Founder - Mathias EneikareAwaji Gogo (Founder, CEO)</h1>
                        <p className="founder-intro">
                            Mathias founded Mexuri with a single focus: to help African startups
                            and scale-ups build brands that convert consistently and grow
                            sustainably in their respective market.
                        </p>
                        <p className="founder-intro">
                            He storngly believes that the African market has the potential of being globally recognised for great innovations
                            in technology, e-commerce, business, agriculture and many more.
                        </p>
                    </div>

                    <div className="founder-image">
                        <img
                            src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765407539/1000833911_edx3xt.jpg"
                            alt="Founder of Mexuri"
                        />
                    </div>
                </section>

                <section className="founder-story">
                    <h2>Why Mexuri Exists</h2>
                    <p>
                        After working closely with growing businesses, it became evident
                        that many African brands struggled not because of poor products,
                        but because of weak brand positioning and inefficient conversion
                        systems.
                    </p>

                    <p>
                        Mexuri was created to bridge this gap by combining brand development
                        with measurable conversion strategies — ensuring that visibility
                        leads to real business outcomes.
                    </p>
                </section>

                <section className="founder-philosophy">
                    <h2>Founder’s Philosophy</h2>
                    <ul>
                        <li>Growth must be intentional, not accidental.</li>
                        <li>Branding is only valuable when it drives trust and action.</li>
                        <li>Strategy is neccessary to make brands relevant.</li>
                        <li>Long-term loyalty is more important than short-term attention.</li>
                    </ul>
                </section>

                <section className="founder-vision">
                    <h2>Looking Ahead</h2>
                    <p>
                        The long-term vision for Mexuri is to evolve from an agency into
                        a platform that enables thousands of African businesses to scale
                        efficiently through smart brand and conversion systems.
                    </p>

                    <p>
                        This journey is not just about business growth, but about building
                        structures that position African brands to compete globally.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Founder;