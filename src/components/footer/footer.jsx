import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (<>
        <div className="footer">
            <div className="footer-main">
                <div className="footer-top">
                    <div className="logo-tagline">
                        <div className="logo">
                            <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1759347257/Primary_Dark_uqt5xq.svg" alt="logo" />
                        </div>

                        <div className="tagline-links">
                            <div className="tagline">
                                <p>The business development agency for start-ups and scale-ups. We provide end-to-end Lead Management, ensuring your brand generates high-quality leads and efficiently converts them into sales.</p>
                            </div>

                            <div className="socials" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                {/* Instagram */}
                                <a href="https://www.instagram.com/mexuri__" target="_blank" rel="noopener noreferrer">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a href="https://www.linkedin.com/company/mexuri/" target="_blank" rel="noopener noreferrer">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.98 3.5C3.343 3.5 2 4.843 2 6.48c0 1.635 1.343 2.98 2.98 2.98s2.98-1.345 2.98-2.98C7.96 4.843 6.617 3.5 4.98 3.5ZM2.5 21.5h5V9h-5v12.5ZM9.5 9h4.78v1.71h.07c.665-1.26 2.292-2.59 4.715-2.59 5.037 0 5.965 3.318 5.965 7.63V21.5h-5v-6.56c0-1.564-.028-3.57-2.17-3.57-2.17 0-2.503 1.7-2.503 3.45V21.5h-5V9Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>

                                {/* X / Twitter
                                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12.66 2h3.64v1.96a4.82 4.82 0 0 0 2.91 0v3.25a7.92 7.92 0 1 1-6.55-0.06V2h0.00z" />
                                    </svg>
                                </a> */}
                            </div>

                        </div>
                    </div>
                    <div className="footer-links">
                        <div className="link">
                            <div className="heading">
                                <h1>Company</h1>
                            </div>
                            <ul>
                                {/* <li>Partnership</li>
                                <li>Leadership</li> */}
                                <li><a href="/#contact">Contact</a></li>
                                <li><a href="mailto:support@mexuri.com.ng?subject=Mexuri%20Support%20Request">Support</a></li>
                                <li><a href="mailto:support@mexuri.com.ng?subject=Mexuri%20Support%20Request">Career</a></li>
                            </ul>
                        </div>

                        <div className="link">
                            <div className="heading">
                                <h1>Resources</h1>
                            </div>
                            <ul>
                                <li><a href="#">Blog</a></li>
                                <li><a href="https://www.linkedin.com/company/mexuri/?viewAsMember=true">LinkedIn</a></li>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="#">Leadership</a></li>
                            </ul>
                        </div>

                        <div className="link">
                            <div className="heading">
                                <h1>Services</h1>
                            </div>
                            <ul>
                                <li><Link to="/portfolio">Conversion Tracker</Link></li>
                                <li><Link to="/pricing">Pricing</Link></li>
                                <li><Link to="/demo">Demo Package</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="copyright">
                        &copy; Mexuri {new Date().getFullYear()}
                    </div>
                    <div className="terms-and-conditions">
                        <ul>
                            <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
                            <li>||</li>
                            <li><Link to="/terms-and-conditions#refund-processing">Refund</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Footer; 