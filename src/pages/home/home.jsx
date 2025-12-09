import { useState } from "react";
import Navbar from "../../components/nav/navbar";
import "./home.css";
import Footer from "../../components/footer/footer"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Home = () => {

    //Success Prompt
    const [showPrompt, setShowPrompt] = useState("");
    const navigate = useNavigate("")

    const handleClosePrompt = () => {
        setShowPrompt(false);
    }

    const [formData, setFormData] = useState({
        companyName: "",
        country: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState('');


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        // 1. Only prevent default once, at the very beginning.
        e.preventDefault();

        // Set status immediately to give user feedback
        setStatus('Sending...');

        // --- Validation Check ---
        const requiredFields = ['companyName', 'country', 'email', 'message'];
        const missingField = requiredFields.find(field => !formData[field]);

        if (missingField) {

            // Reset status, as we aren't sending the data
            setStatus(`Please fill in the blank field.`);

            setTimeout(() => {
                setStatus('');
            }, 3000);

            return; // Exit the function immediately
        }

        // --- Submission Logic ---
        try {
            const response = await axios.post('https://mexuri-mvp.onrender.com/api/send-email', formData);

            if (response.status === 200) {
                setStatus('Message Sent! We will be in touch shortly.');
                setFormData({ companyName: '', country: '', email: '', message: '' });
                setShowPrompt(true);

                setTimeout(() => {
                    setStatus('')
                }, 3000);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (<>
        <Navbar />
        <div className="container">
            <section className="hero">
                <div className="hero-main">
                    <div className="figcaption">
                        <h1 className="headline">Stop Leaking Leads. We Turn Your Traffic into Revenue.</h1>
                        <p className="subHeadline">
                            Mexuri is the growth partner for start-ups and scale-ups.
                            We fuse strategic branding with Conversion Rate Optimization (CRO)
                            to ensure high-quality leads turn into consistent, profitable sales.
                        </p>
                    </div>

                    <div className="button">
                        <button onClick={() => navigate("/demo")}>
                            Request a Free Demo
                        </button>


                        <button onClick={() => navigate("/project")} style={{ marginLeft: "2rem" }}>
                            Start your project
                        </button>
                    </div>
                </div>
            </section>

            <section className="next">
                <div className="main">
                    <header className="header">
                        <h1>Giving Brands Market Authority, <br /> Not Just Traffic</h1>
                    </header>

                    <figure>
                        <div className="image">
                            <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1764802934/Whisk_553affb85fd048e8e0944f789a16ced7dr_yimpfy.jpg" alt="business picture" />
                        </div>

                        <figcaption>
                            <header className="captionHeader">
                                <h1>Reduce Lead Loss and Low Conversions</h1>
                            </header>

                            <p>
                                About 80% of early-stage and growing brands lose a large share of potential clients
                                because their digital touchpoints aren’t optimized for conversion.
                                Ineffective lead generation and leaky funnels are costing you millions.
                                Mexuri implements a full-stack Lead Management system with integrated CRO,
                                ensuring every click moves closer to a signed contract
                            </p>

                            <a href="/demo" id="demoLink">
                                See how it works
                            </a>
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section className="startUp">
                <figure>
                    <figcaption>
                        <h3>For Start Ups</h3>

                        <h1>Build a Brand That Converts From Day One.</h1>

                        <p>
                            Mexuri partners with early-stage founders to build brands people trust and convert. We help you shape your brand identity,
                            understand your audience, and set up a conversion system that supports steady growth from day one.
                        </p>

                        <a href="/demo">
                            Let's get started
                        </a>
                    </figcaption>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765147418/Working_from_Home_Aesthetics_kgyhax.jpg" alt="start up founder" />
                    </div>
                </figure>
            </section>

            <section className="goal">
                <div className="main">
                    <figcaption>
                        <h1>Growing 100 African Brands by 2038</h1>

                        <p>
                            Our mission is to support 100 African brands in becoming globally recognized by 2038.
                            We believe African companies can compete at a global level with the
                            right strategy, structure, and brand visibility — and we’re committed to helping them get there.
                        </p>

                        <a href="#">
                            What is this about?
                        </a>
                    </figcaption>
                </div>
            </section>

            <section className="scaleUps">
                <figure>
                    <figcaption>
                        <h3>For Scale Ups</h3>

                        <h1>Your Growth Depends on Better Conversions</h1>

                        <p>
                            As your brand grows, recognition alone isn’t enough — you need a system that turns visibility into revenue.
                            We help scale-ups refine their conversion processes, optimize lead flow, and improve customer experience across every touchpoint.
                        </p>

                        <div className="links">
                            <a href="#">What is my conversion rate?</a>
                            <a href="/project">Optimise Leads</a>
                        </div>
                    </figcaption>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765150915/__h8pu84.png" alt="start up founder" />
                    </div>
                </figure>
            </section>

            <section className="end">
                <div className="main">
                    <figcaption>
                        <h1>The Data-Driven Results You Need</h1>

                        <p>
                            We provide detailed weekly reports focused not just on vanity metrics, but on pipeline health, LTV, and CAC.
                            <br />
                            Our data-driven approach gives you clear visibility into your brand’s performance. With timely reports and organic insights,
                            you’ll always know what’s working, what needs improvement, and how your business is growing.
                        </p>

                        <a href="/demo">
                            Start your demo now
                        </a>
                    </figcaption>
                </div>
            </section>

            <section className="contact" id="contact">
                <div className="main">
                    <div className="images">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765149796/__iarbkg.jpg" alt="picture" />
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765149429/afro_kmnzly.png" alt="picture" />
                    </div>

                    <figcaption>
                        <form action="POST" onSubmit={handleSubmit}>
                            <div className="contactHeader">
                                <h1>Get in Touch</h1>
                                <p>Please feel free to contact us, we would get back to you as soon as we can.</p>
                            </div>
                            <div className="field">
                                <label htmlFor="companyName">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Auctora Ltd."
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="name@yourcompany.com or company@gmail.com"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="field">
                                <label htmlFor="companyName">Your message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Provide us with further details"
                                    value={formData.message}
                                    onChange={handleChange}></textarea>
                            </div>

                            <button type="submit" disabled={status === 'Sending...'}>
                                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status && <p style={{ marginTop: '10px' }}>{status}</p>}
                        </form>
                    </figcaption>
                </div>
            </section>
        </div>

        {showPrompt && (
            <div className={`successPrompt ${showPrompt ? 'is-visible' : ''}`}>
                <div className="message">
                    <img src="/check.png" alt="success" />
                    <h1>We've recieved your request</h1>
                    <p>
                        Thank you for reaching out to Mexuri! We've successfully received your request.
                        A member of the Mexuri Team will personally review your inquiry and aim to get
                        back to you within 24 business hours
                    </p>

                    <button onClick={handleClosePrompt}>
                        Done
                    </button>
                </div>
            </div>
        )}

        <Footer />
    </>);
}

export default Home;