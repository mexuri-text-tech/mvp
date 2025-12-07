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
            const response = await axios.post('http://localhost:5000/api/send-email', formData);

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
                        <h1 className="headline">The Bridge Between Your Product and Your Audience.</h1>
                        <p className="subHeadline">
                            We offer Lead Management for start ups and scale-ups, helping these brands generate and handle leads to lead to increase in sales and business growth.
                            <br />
                            We build deep connections through branding and turn traffic into revenue with CRO.
                        </p>
                    </div>

                    <div className="button">
                        <button onClick={() => navigate("/demo")}>
                            Request a Free Demo
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
                                Start ups in their early stage experience 80-94% of lead loss, most scale ups lose 74-85% of potential clients due to inorganic leads generation.
                                <br />
                                Ads are good, but you need effective CRO, so your brand doesn't just get views, but also convert to clients.
                                <br />
                                We offer brand-centric lead management, that reduces the lead loss rate.
                            </p>

                            <a href="/demo" id="demoLink">
                                Get a free demo today
                            </a>
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section className="startUp">
                <figure>
                    <figcaption>
                        <h3>For Start Ups</h3>

                        <h1>Starting something new?</h1>

                        <p>
                            Mexuri acts as a growth partner for start ups, using
                            branding to create a relationship between them and
                            their audience then integrating our CRO framework to
                            ensure that they get high conversion metrics.
                        </p>

                        <a href="/demo">
                            Let's get started
                        </a>
                    </figcaption>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/c_crop,ar_3:4/v1764808456/Gemini_2_ekusop.png" alt="start up founder" />
                    </div>
                </figure>
            </section>

            <section className="goal">
                <div className="main">
                    <figcaption>
                        <h1>Growing 100 African Brands by 2028</h1>

                        <p>
                            Mexuri is working on growing 100 African brands to
                            become Global names by 2028.

                            <br />
                            <br />
                            We believe that African brands have the potential
                            to be global names, and catering for the needs of
                            the global market.
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

                        <h1>Your Business growth is in the Conversion</h1>

                        <p>
                            Your conversion metrics should be your major concern as a
                            growing business.
                            <br />
                            You are getting recognition, but is that recognition turning
                            into sales?
                        </p>

                        <div className="links">
                            <a href="#">What is my conversion rate?</a>
                            <a href="#">Optimise Leads</a>
                        </div>
                    </figcaption>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1764802934/Whisk_7b9c46ffd494b20908149293a43263bddr_yafxwq.jpg" alt="start up founder" />
                    </div>
                </figure>
            </section>

            <section className="end">
                <div className="main">
                    <figcaption>
                        <h1>You can track your growth with mexuri</h1>

                        <p>
                            We use a data driven approach to track your company’s
                            growth. We provide you with detailed weekly/bi-weekly
                            reports on how your business is growing.
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
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765016513/Contact_Us_eu4efp.png" alt="" />
                    </div>

                    <figcaption>
                        <form action="POST" onSubmit={handleSubmit}>
                            <div className="contactHeader">
                                <h1>Contact Us</h1>
                            </div>
                            <div className="field">
                                <label htmlFor="companyName">Company/Client's Name</label>
                                <input
                                    type="text"
                                    placeholder="Business Name"
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    style={{ textTransform: "capitalize" }} />
                            </div>
                            <div className="field">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    placeholder="e.g Nigeria, South Africa"
                                    id="country"
                                    value={formData.country}
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
                                    placeholder="Provide us with futher details"
                                    value={formData.message}
                                    onChange={handleChange}></textarea>
                            </div>

                            <button type="submit" disabled={status === 'Sending...'}>
                                {status === 'Sending...' ? 'Sending...' : 'Send'}
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