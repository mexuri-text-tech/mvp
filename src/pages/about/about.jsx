import Footer from "../../components/footer/footer";
import Navbar from "../../components/nav/navbar";
import "./about.css"

const About = () => {
    return (<>
        <Navbar />
        <div className="about-container">
            <div className="about-main">
                <section className="intro">
                    <div className="header">
                        <h1>About Us</h1>
                    </div>

                    <div className="description">
                        <p>
                            Mexuri is a Brand Development Agency targeted to African Start-ups and Scale-ups,
                            providing them with lead management systems that optimises leads and converts
                            them into sales leading to growth in revenue for the company.

                            <br />

                            We employ branding and conversion rate optimisation techniques, using them to engineer a two-way lead management system
                            that not only generates leads but equally use these generated leads to generate another set of leads (what we refer to as
                            vouched leads). creating a steady revenue flow for the company.
                        </p>
                    </div>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1764802934/Whisk_374f85525293b12b0c44fcc920d32b25dr_siy2ss.jpg" alt="about us" />
                    </div>
                </section>

                <section className="mission">
                    <div className="side">
                        <div className="header">
                            <h1>Our Mission</h1>
                        </div>

                        <div className="description">
                            <p>
                                African brand visibility on the global scale is less than 1%,
                                and in terms of conversions the African brands have one of the lowest conversion
                                rates making us remain virtually unseen next to other brands.

                                Mexuri's purpose is to engineer systems for African brands, that would in turn
                                generate revenue through lead conversion and create brand loyalty between the brand and their audience/customers
                            </p>
                        </div>
                    </div>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1752326350/Image_fx_2_zizmcr.png" alt="image" />
                    </div>
                </section>

                <section className="vision" id="vision">
                    <div className="text">
                        <div className="header">
                            <h1>Our Vision</h1>
                        </div>

                        <div className="description">
                            <p>
                                We see Mexuri not just as a random agency, but one that would stand the test of time, growing businesses
                                and creating a steady revenue for start ups and scale ups through custom lead management systems.

                                We have a 13-year goal, that by 2028, we would have acchieved the following:
                                <ul>
                                    <li>Grow over 100 brands to global recognition</li>
                                    <li>Create a revenue-positive conversion system, that would be able to cater for over 1000 businesses at a time</li>
                                    <li>Have atleast 100 thriving start ups from our business community</li>
                                </ul>
                            </p>
                        </div>
                    </div>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765269256/__1_arjftv.jpg" alt="last" />
                    </div>
                </section>

                <section className="future">
                    <div className="text">
                        <div className="header">
                            <h1>The Future of Mexuri</h1>
                        </div>

                        <div className="description">
                            <p>
                                Right now we are an agency, however we use custom automation tools to work faster, engineering these custom systems for 40 - 60 brands per year.
                                However, we plan to grow into a platform that would help over 10,000 companies every year.
                                We are not just growing brands, we are growing Africa to be come the largest business-centric continent in the world
                            </p>
                        </div>
                    </div>

                    <div className="image">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1765270307/k_brruck.jpg" alt="last" />
                    </div>
                </section>
            </div>
        </div>

        <Footer />
    </>);
}

export default About;