import React, { useState } from "react";
import "./terms.css";
import { Link } from "react-router-dom";

const Section = ({ id, title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(!!defaultOpen);
    return (
        <section className={`terms__section ${open ? "is-open" : ""}`} id={id}>
            <button
                className="terms__toggle"
                aria-expanded={open}
                aria-controls={`${id}-content`}
                onClick={() => setOpen(o => !o)}
            >
                <span className="terms__title">{title}</span>
                <span className="terms__chev" aria-hidden>{open ? "−" : "+"}</span>
            </button>

            <div
                id={`${id}-content`}
                className="terms__content"
                role="region"
                aria-labelledby={id}
                style={{ display: open ? "block" : "none" }}
            >
                {children}
            </div>
        </section>
    );
};

export default function TermsPage() {
    return (
        <main className="terms">
            <header className="terms__header">
                <Link to="/">
                    <div className="terms__badge">
                        <img src="https://res.cloudinary.com/dbrjr5zqp/image/upload/v1759347257/Primary_Light_oeo21s.svg" alt="mexuri logo" />
                    </div>
                </Link>
                <h1 className="terms__headline">Terms &amp; Conditions</h1>
                <p className="terms__lead">
                    Last updated: <strong>14 November, 2025</strong>
                </p>
            </header>

            <div className="terms__container">
                <Section id="introduction" title="1. Introduction" defaultOpen>
                    <p>
                        Welcome to <strong>Mexuri</strong>. By accessing or using our website
                        and services you agree to be bound by these Terms &amp; Conditions.
                        If you do not agree, please discontinue use of our services. Mexuri
                        provides branding and business development services as set out in
                        the Scope of Services.
                    </p>
                </Section>

                <Section id="scope" title="2. Scope of Services">
                    <p>
                        Mexuri provides brand identity design, business development
                        strategy, market and brand research, brand storytelling and
                        positioning, website and digital brand asset creation, and brand
                        advisory. All services are delivered in accordance with an agreed
                        project scope, proposal or contract. <br />
                        <strong>Note:</strong>Custom projects will only be recognized as such if they meet the established standards.
                    </p>
                </Section>

                <Section id="client-obligations" title="3. Client Obligations">
                    <ul>
                        <li>Provide accurate and complete information required for the project.</li>
                        <li>Ensure submitted materials are owned or licensed for use.</li>
                        <li>Respond promptly to communications, feedback requests and approvals.</li>
                        <li>Respect project timelines and payment terms in the agreement.</li>
                    </ul>
                </Section>

                <Section id="payments" title="4. Payments">
                    <ul>
                        <li>The payment amount is determined based on the packages offered by Mexuri, as detailed on <a href="https://mexuri.com.ng/pricing">the pricing page</a>.</li>
                        <li>Project fees must be paid in full, unless explicitly stated otherwise by Mexuri.</li>
                        <li>Payment amounts will not be reduced by Mexuri, except where explicitly indicated.</li>
                    </ul>
                </Section>

                <Section id="ip" title="5. Intellectual Property Rights">
                    <p>
                        All concepts, drafts, designs and materials created by Mexuri remain
                        the property of Mexuri until full payment is made. Upon full
                        payment, ownership of the final approved deliverables transfers to
                        the client. Mexuri reserves the right to showcase completed work in
                        its portfolio unless the client requests confidentiality in writing
                        prior to project start.
                    </p>
                </Section>

                <Section id="confidentiality" title="6. Confidentiality">
                    <p>
                        Mexuri will keep client information confidential. We will not share
                        client data except with service providers assisting project delivery
                        or where required by law. Proprietary information received from a
                        client will be treated with strict confidentiality.
                    </p>
                </Section>

                <Section id="website-use" title="7. Use of the Website">
                    <p>By using the website you agree not to:</p>
                    <ul>
                        <li>Attempt unauthorized access, hacking or disruption of systems.</li>
                        <li>Upload harmful, illegal or infringing content.</li>
                        <li>Copy or distribute Mexuri website content without permission.</li>
                    </ul>
                </Section>

                <Section id="third-party" title="8. Third-Party Services">
                    <p>
                        Mexuri may use third-party tools (hosting, analytics, payment
                        gateways, design tools). We are not responsible for outages,
                        limitations, or policy changes of those services.
                    </p>
                </Section>

                <Section id="timelines" title="9. Project Timelines">
                    <p>
                        Timelines are estimates based on the agreed scope. Delays caused by
                        late client responses or approvals are not Mexuri’s responsibility.
                        Mexuri will communicate adjustments when operational issues arise.
                    </p>
                </Section>

                <Section id="liability" title="10. Limitation of Liability">
                    <p>
                        Mexuri is not liable for loss of revenue, missed opportunities,
                        business decisions made by the client, or outcomes outside Mexuri’s
                        control. Our responsibility is limited to the services described in
                        the project contract.
                    </p>
                </Section>

                <Section id="termination" title="11. Termination of Services">
                    <p>
                        Either party may terminate if the other breaches the agreement, the
                        client fails to provide necessary cooperation or payments, or Mexuri
                        determines the project is not feasible. Work completed up to the
                        termination date remains payable.
                    </p>
                </Section>

                <Section id="changes" title="12. Changes to Terms">
                    <p>
                        Mexuri may update these Terms. Updated Terms will be posted on the
                        website with a revised “Last Updated” date. Continued use after
                        modification indicates acceptance.
                    </p>
                </Section>

                <Section id="contact" title="13. Contact Information">
                    <p>
                        For questions about these Terms, contact us at:
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:mexuri.info@gmail.com">mexuri.info@gmail.com</a>
                        <br />
                        <strong>Phone:</strong> 08089031254
                    </p>
                </Section>

                {/* Refund Policy Section */}
                <header className="terms__subheader">
                    <h2>Refund Policy</h2>
                </header>

                <Section id="refund-general" title="Refund — General Principle" defaultOpen>
                    <p>
                        Mexuri issues refunds only under specific conditions. Because our
                        services involve time-based expertise and creative work, refunds are
                        not automatic once a project has started.
                    </p>
                </Section>

                <Section id="refund-eligibility" title="Refund Eligibility">
                    <p>Clients may be eligible for a full or partial refund only if:</p>
                    <ul>
                        <li><strong>Work has not started:</strong> Cancellation before work begins may receive a full deposit refund.</li>
                        <li><strong>Mexuri cannot deliver:</strong> If we are unable to complete the agreed services due to internal reasons, a 75% refund will be issued.</li>
                        <li><strong>Major deviation:</strong> If delivered work significantly deviates from agreed scope and cannot be corrected, a 65% refund may be issued based on work completed.</li>
                    </ul>
                </Section>

                <Section id="refund-non" title="Non-Refundable Situations">
                    <p>Refunds will not be issued for:</p>
                    <ul>
                        <li>Work already started (deposits non-refundable after commencement).</li>
                        <li>Client-caused delays, failure to provide materials, or unresponsiveness.</li>
                        <li>Change of mind or business reprioritization.</li>
                        <li>Completed and approved deliverables.</li>
                    </ul>
                </Section>

                <Section id="refund-processing" title="Refund Processing & Contact">
                    <p>
                        Approved refunds will be processed within <strong>7–14 business days</strong> using the original payment method unless otherwise agreed.
                    </p>
                    <p>
                        Submit refund requests in writing to{" "}
                        <a href="mailto:mexuri.info@gmail.com">mexuri.info@gmail.com</a> with:
                    </p>
                    <ul>
                        <li>Full name and business name</li>
                        <li>Project reference</li>
                        <li>Reason for request and supporting evidence</li>
                    </ul>
                </Section>
            </div>
        </main>
    );
}
