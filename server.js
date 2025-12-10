import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as Brevo from '@getbrevo/brevo';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Initialize Brevo SDK
const brevoApiKey = process.env.BREVO_API_KEY;
const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

// POST endpoint to handle the form submission
app.post('/api/send-email', async (req, res) => {
    const { companyName, country, email, message } = req.body;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    // ⚠️ IMPORTANT: Set the email recipient (who receives the form data)
    sendSmtpEmail.to = [{ email: 'mexuri.info@gmail.com', name: 'Mexuri Customer Care Team' }];

    // ⚠️ IMPORTANT: Set the verified sender email
    sendSmtpEmail.sender = {
        email: 'mexuri.info@gmail.com', // 👈 MUST be a verified sender in Brevo
        name: 'Mexuri Contact Form'
    };

    // 2. Add the CLIENT's email to the Reply-To field
    sendSmtpEmail.replyTo = {
        email: email, // 👈 The client's actual email
        name: companyName
    };

    sendSmtpEmail.subject = `Customer Care Request: ${companyName}`;

    // You can use templateId here or just pass HTML content
    sendSmtpEmail.htmlContent = `
        <h3>New Contact Form Submission</h3>
        <p><strong>Client/Company Name:</strong> ${companyName}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Client Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;

    try {
        await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Brevo API Error:', error);
        res.status(500).send({ message: 'Failed to send email.' });
    }
});

//Post End Point to get audit data
app.post('/api/audit-request', async (req, res) => {
    try {
        const {
            companyName,
            product,
            targetAudience,
            valueProp,
            businessModel,
            brandNeeds,
            otherNeeds,
            conversionVolume,
            conversionSource,
            businessLink,
            companyEmail
        } = req.body;

        /* ===========================
           1️⃣ INTERNAL EMAIL (Mexuri)
        ============================ */

        const internalEmail = new Brevo.SendSmtpEmail();

        internalEmail.to = [
            { email: 'mexuri.info@gmail.com', name: 'Mexuri Customer Care Team' }
        ];

        internalEmail.sender = {
            email: 'mexuri.info@gmail.com',
            name: 'Mexuri – Audit Requests'
        };

        internalEmail.replyTo = {
            email: companyEmail,
            name: companyName || 'Client'
        };

        internalEmail.subject = `New 14-Day Demo Request — ${companyName || 'Unknown Company'}`;

        internalEmail.htmlContent = `
            <h2>🚀 New 14-Day Demo Request</h2>
            <hr>

            <h4>Brand Details</h4>
            <ul>
                <li><strong>Company:</strong> ${companyName || 'N/A'}</li>
                <li><strong>Product / Service:</strong> ${product || 'N/A'}</li>
                <li><strong>Target Audience:</strong> ${targetAudience || 'N/A'}</li>
                <li><strong>Value Proposition:</strong> ${valueProp || 'N/A'}</li>
                <li><strong>Business Model:</strong> ${businessModel || 'N/A'}</li>
            </ul>

            <h4>Brand Needs</h4>
            <ul>
                <li><strong>Main Bottleneck:</strong> ${brandNeeds || 'N/A'}</li>
                <li><strong>Other Needs:</strong> ${otherNeeds || 'None'}</li>
            </ul>

            <h4>Conversion Health</h4>
            <ul>
                <li><strong>Monthly Conversions:</strong> ${conversionVolume || 'N/A'}</li>
                <li><strong>Source:</strong> ${conversionSource || 'N/A'}</li>
                <li><strong>Link:</strong> <a href="${businessLink}">${businessLink || 'N/A'}</a></li>
            </ul>

            <h4>Contact</h4>
            <p><a href="mailto:${companyEmail}">${companyEmail}</a></p>
        `;

        /* ===========================
           2️⃣ AUTO-REPLY (Client)
        ============================ */

        const autoReplyEmail = new Brevo.SendSmtpEmail();

        autoReplyEmail.to = [
            { email: companyEmail, name: companyName || 'Partner' }
        ];

        autoReplyEmail.sender = {
            email: 'mexuri.info@gmail.com',
            name: 'Olga From Mexuri'
        };

        autoReplyEmail.subject = 'We’ve received your 14-Day Demo request';

        autoReplyEmail.htmlContent = `
            <div style="font-family: Arial, sans-serif; color:#1f2933; line-height:1.6; max-width:600px;">
                <h2>Dear ${companyName},</h2>

                <p>
                    Thanks for reaching out to <strong>Mexuri</strong>.
                    We’ve received your <strong>14-Day Demo request</strong> and our team
                    has started the review process.
                </p>

                <p><strong>What happens next:</strong></p>
                <ul>
                    <li>We review your brand and conversion setup</li>
                    <li>We identify growth and system opportunities</li>
                    <li>We prepare insights tailored to your stage</li>
                </ul>

                <p><strong>Your submission summary:</strong></p>
                <ul>
                    <li><strong>Product / Service:</strong> ${product || 'N/A'}</li>
                    <li><strong>Main Goal:</strong> ${brandNeeds || 'N/A'}</li>
                    <li><strong>Conversion Volume:</strong> ${conversionVolume || 'N/A'}</li>
                </ul>

                <p>
                    If we need clarification, we’ll reach out via this email.
                </p>

                <p style="margin-top:30px;">
                    Warm regards,<br>
                    <strong>The Mexuri Team</strong><br>
                    <a href="https://mexuri.com.ng">mexuri.com.ng</a>
                </p>

                <hr>

                <p style="font-size:12px;color:#6b7280;">
                    This is an automated confirmation email.
                    No action is required from you at this time.
                </p>
            </div>
        `;

        /* ===========================
           3️⃣ SEND EMAILS
        ============================ */

        await transactionalEmailsApi.sendTransacEmail(internalEmail);
        await transactionalEmailsApi.sendTransacEmail(autoReplyEmail);

        res.status(200).json({
            message: 'Audit request submitted successfully'
        });

    } catch (error) {
        console.error('Brevo error:', error);
        res.status(500).json({
            message: 'Unable to submit audit request'
        });
    }
});

//Post End Point to get main project data
app.post('/api/main-project-request', async (req, res) => {
    // Destructure ALL fields from the React formData object
    const formData = req.body;
    const {
        companyName,
        companyEmail,
        product,
        targetAudience,
        valueProp,
        businessModel,
        brandNeeds,
        projectDescription,
        conversionVolume,
        conversionSource,
        businessLink,
        websiteTraffic,
        websiteLeads,
        conversionGoal,
        vouchMetrics,
        revenueChecker
    } = formData;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    // ... (Email setup: to, sender, subject, and the detailed HTML content 
    //      created in the previous response) ...
    sendSmtpEmail.to = [{ email: 'mexuri.info@gmail.com', name: 'Mexuri Customer Care Team' }];
    sendSmtpEmail.sender = {
        email: 'mexuri.info@gmail.com',
        name: 'Client Project Request'
    };
    sendSmtpEmail.subject = `New Project Request: ${companyName || 'Unknown Company'}`;
    sendSmtpEmail.htmlContent = `
        <h3>New Project Request</h3>
        <hr>
        <h4>Step 1: The Brand</h4>
        <ul>
            <li><strong>Company Name:</strong> ${companyName || 'N/A'}</li>
            <li><strong>Company Email:</strong> ${companyEmail || 'N/A'}</li>
            <li><strong>Products/Services:</strong> ${product || 'N/A'}</li>
            <li><strong>ICP (Ideal Customer Profile):</strong> ${targetAudience || 'N/A'}</li>
            <li><strong>Core Value Proposition:</strong> ${valueProp || 'N/A'}</li>
            <li><strong>Business Model:</strong> ${businessModel || 'N/A'}</li>
        </ul>
        <hr>
        <h4>Step 2: Brand Needs</h4>
        <ul>
            <li><strong>Primary Bottleneck:</strong> ${brandNeeds || 'N/A'}</li>
            <li><strong>Project Description:</strong> ${projectDescription || 'None'}</li>
        </ul>
        <hr>
        <h4>Step 3: Conversion Health</h4>
        <ul>
            <li><strong>Monthly Conversion Volume:</strong> ${conversionVolume || 'N/A'}</li>
            <li><strong>Conversion Source:</strong> ${conversionSource || 'N/A'}</li>
            <li><strong>Conversion Platform Link:</strong> <a href="${businessLink}">${businessLink || 'N/A'}</a></li>
        </ul>
        <hr>
        <h4>Step 4: Client's Conversion Health</h4>
        <ul>
            <li><strong>Website Traffic:</strong> ${websiteTraffic || 'N/A'}</li>
            <li><strong>Website Leads:</strong> ${websiteLeads || 'N/A'}</li>
            <li><strong>Client Conversion Goal:</strong> ${conversionGoal || 'N/A'}</li>
            <li><strong>Client's Vouch Metrics:</strong> ${vouchMetrics || 'N/A'}</li>
            <li><strong>Client's Yearly Revenue:</strong> ${revenueChecker || 'N/A'}</li>
        </ul>
        <hr>
    `;

    const autoSMTPReplyEmail = new Brevo.SendSmtpEmail();

    autoSMTPReplyEmail.to = [
        { email: companyEmail, name: companyName || 'Partner' }
    ];

    autoSMTPReplyEmail.sender = {
        email: 'mexuri.info@gmail.com',
        name: 'Pearl From Mexuri'
    };

    autoSMTPReplyEmail.subject = 'We’ve received your Project Details';

    autoSMTPReplyEmail.htmlContent = `
            <div style="font-family: Arial, sans-serif; color:#1f2933; line-height:1.6; max-width:600px;">
                <h2>Dear ${companyName},</h2>

                <p>
                    Thanks for reaching out to <strong>Mexuri</strong>.
                    We’ve received the data from your survey and our team
                    has started the review process.
                </p>

                <p><strong>What happens next:</strong></p>
                <ul>
                    <li>We review your brand and conversion setup</li>
                    <li>We identify growth and system opportunities</li>
                    <li>We would send a quote of the project and well as the KPIs and milestones for the project</li>
                    <li>Finally we would have a consultation call, to discuss about the project requirements and percieved outcome</li>
                </ul>

                <p><strong>Your submission summary:</strong></p>
                <ul>
                    <li><strong>Product / Service:</strong> ${product || 'N/A'}</li>
                    <li><strong>Main Goal:</strong> ${projectDescription || 'N/A'}</li>
                    <li><strong>Expected conversion goal:</strong> ${conversionGoal || 'N/A'}</li>
                </ul>

                <p>
                    If we need clarification, we’ll reach out via email.
                </p>

                <p style="margin-top:30px;">
                    Warm regards,<br>
                    <strong>The Mexuri Team</strong><br>
                    <a href="https://mexuri.com.ng">mexuri.com.ng</a>
                </p>

                <hr>
            </div>
        `;



    try {
        await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
        await transactionalEmailsApi.sendTransacEmail(autoSMTPReplyEmail);
        res.status(200).send({ message: 'Audit Request submitted successfully!' });
    } catch (error) {
        console.error('Brevo API Error:', error);
        res.status(500).send({ message: 'Failed to send audit request email.' });
    }
});

app.post('/api/main-calc-request', async (req, res) => {
    // Destructure ALL fields from the React formData object
    const formData = req.body;
    const {
        companyName,
        companyEmail,
        sales,
        websiteLink
    } = formData;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    // ... (Email setup: to, sender, subject, and the detailed HTML content 
    //      created in the previous response) ...
    sendSmtpEmail.to = [{ email: 'mexuri.info@gmail.com', name: 'Mexuri Customer Care Team' }];
    sendSmtpEmail.sender = {
        email: 'mexuri.info@gmail.com',
        name: `Conversion Audit Request`
    };
    sendSmtpEmail.subject = `New Conversion Audit Request: ${companyName || 'Unknown Company'}`;
    sendSmtpEmail.htmlContent = `
        <h1>New Project Request</h1>
        <hr>
        <h2>Conversion Audit Request</h2>
        <ul>
            <li><strong>Company Name:</strong> ${companyName || 'N/A'}</li>
            <li><strong>Company Email:</strong> ${companyEmail || 'N/A'}</li>
            <li><strong>Number of Sales (Previous Month):</strong> ${sales || 'N/A'}</li>
            <li><strong>Core Website Link:</strong> ${websiteLink || 'N/A'}</li>
        </ul>
        <hr>
    `;

    const autoSMTPReplyEmail = new Brevo.SendSmtpEmail();

    autoSMTPReplyEmail.to = [
        { email: companyEmail, name: companyName || 'Partner' }
    ];

    autoSMTPReplyEmail.sender = {
        email: 'mexuri.info@gmail.com',
        name: 'The Mexuri Audit Team'
    };

    autoSMTPReplyEmail.subject = 'We’ve received your Project Details';

    autoSMTPReplyEmail.htmlContent = `
            <div style="font-family: Arial, sans-serif; color:#1f2933; line-height:1.6; max-width:600px;">
                <h2>Dear ${companyName},</h2>

                <p>
                    Thanks for reaching out to <strong>Mexuri</strong>.
                    We’ve received your conversion audit request, we would run the test immediately and get the reports to you within 30 minutes.
                </p>

                <p><strong>What happens next:</strong></p>
                <ul>
                    <li>We review your brand and conversion setup</li>
                    <li>We identify growth and system opportunities</li>
                    <li>We would send a quote of the project and well as the KPIs and milestones for the project</li>
                    <li>Finally we would have a consultation call, to discuss about the project requirements and percieved outcome</li>
                </ul>

                <p><strong>Your submission summary:</strong></p>
                <ul>
                    <li><strong>Company Name:</strong> ${companyName || 'N/A'}</li>
                    <li><strong>Company Email:</strong> ${companyEmail || 'N/A'}</li>
                    <li><strong>Number of Sales (Previous Month):</strong> ${sales || 'N/A'}</li>
                    <li><strong>Core Website Link:</strong> ${websiteLink || 'N/A'}</li>
                </ul>

                <p>
                    If we need clarification, we’ll reach out via email.
                </p>

                <p style="margin-top:30px;">
                    Warm regards,<br>
                    <strong>The Mexuri Team</strong><br>
                    <a href="https://mexuri.com.ng">mexuri.com.ng</a>
                </p>

                <hr>
            </div>
        `;



    try {
        await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
        await transactionalEmailsApi.sendTransacEmail(autoSMTPReplyEmail);
        res.status(200).send({ message: 'Audit Request submitted successfully!' });
    } catch (error) {
        console.error('Brevo API Error:', error);
        res.status(500).send({ message: 'Failed to send audit request email.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});