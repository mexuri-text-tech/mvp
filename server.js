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

    // ... (inside app.post('/api/send-email', async (req, res) => { ...
    sendSmtpEmail.subject = `NEW GENERAL INQUIRY: ${companyName || 'Unknown Sender'}`;

    sendSmtpEmail.htmlContent = `
    <div style="max-width: 640px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #1f1b18; line-height: 1.5;">

        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1f1b18;">
            New General Contact Form Submission
        </h3>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            Inquirer Details
        </h4>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Company Name</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${companyName || 'N/A'}
            </div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Country</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${country || 'N/A'}
            </div>
        </div>

        <div style="margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Client Email</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                <a href="mailto:${email}" style="color: #1a73e8; text-decoration: none;">${email || 'N/A'}</a>
            </div>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            Message
        </h4>

        <div style="margin-bottom: 24px;">
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; min-height: 80px;">
                ${message || 'No message provided.'}
            </div>
        </div>

        <p style="font-size: 14px; color: #6b7280;">
            Please follow up with the client directly using the provided email address.
        </p>
    </div>
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

        internalEmail.subject = `🚨 NEW 14-Day Demo Request — ${companyName || 'Unknown Company'}`;

        internalEmail.htmlContent = `
    <div style="max-width: 640px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #1f1b18; line-height: 1.5;">

        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1f1b18;">
            🚀 New 14-Day Demo Request
        </h3>

        <p style="font-size: 14px; margin-bottom: 16px;">
            A new client has submitted a request for the 14-Day Demo. Please review the details below immediately for qualification and scheduling.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            1. Brand Overview
        </h4>

        ${[
                { label: 'Company Name', value: companyName },
                { label: 'Product / Service', value: product },
                { label: 'Target Audience', value: targetAudience },
                { label: 'Value Proposition', value: valueProp },
                { label: 'Business Model', value: businessModel },
            ].map(item => `
            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">${item.label}</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                    ${item.value || 'Nothing was specified'}
                </div>
            </div>
        `).join('')}


        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            2. Needs & Goals
        </h4>

        ${[
                { label: 'Primary Bottleneck', value: brandNeeds },
                { label: 'Other Needs', value: otherNeeds },
            ].map(item => `
            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">${item.label}</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                    ${item.value || 'Nothing was specified'}
                </div>
            </div>
        `).join('')}


        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            3. Conversion Health & Contact
        </h4>

        ${[
                { label: 'Monthly Conversions', value: conversionVolume },
                { label: 'Conversion Source', value: conversionSource },
                { label: 'Business Link', value: `<a href="${businessLink}" style="color: #1a73e8; text-decoration: none;">${businessLink || 'Nothing was specified'}</a>` },
                { label: 'Client Email', value: `<a href="mailto:${companyEmail}" style="color: #1a73e8; text-decoration: none;">${companyEmail}</a>` },
            ].map(item => `
            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">${item.label}</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                    ${item.value || 'Nothing was specified'}
                </div>
            </div>
        `).join('')}

    </div>
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

        autoReplyEmail.subject = `✅ Your 14-Day Demo Request has been received`;

        autoReplyEmail.htmlContent = `
    <div style="max-width: 640px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #1f1b18; line-height: 1.5;">

        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1f1b18;">
            ✅ Request Received: 14-Day Demo
        </h3>

        <p style="font-size: 14px; margin-bottom: 16px;">
            Dear ${companyName || 'Partner'},
        </p>

        <p style="font-size: 14px; margin-bottom: 16px;">
            Thank you for requesting the <strong>Mexuri 14-Day Demo</strong>. We are excited to evaluate your current setup and identify tailored growth opportunities. Our team has successfully logged your details.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #1f1b18;">
            What Happens Next
        </h4>

        <div style="margin-bottom: 16px; font-size: 14px;">
            <ul style="padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 8px;">We review your brand profile and conversion setup.</li>
                <li style="margin-bottom: 8px;">We identify specific growth and system opportunities.</li>
                <li style="margin-bottom: 8px;">We will contact you within 1-2 business days to schedule the consultation and launch your demo.</li>
            </ul>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            Key Details Submitted
        </h4>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Product / Service</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                ${product || 'N/A'}
            </div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Main Goal (Primary Bottleneck)</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                ${brandNeeds || 'N/A'}
            </div>
        </div>

        <div style="margin-bottom: 24px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Monthly Conversion Volume</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                ${conversionVolume || 'N/A'}
            </div>
        </div>


        <p style="font-size: 14px; margin-top: 30px;">
            Warm regards,<br>
            <strong>The Mexuri Team</strong><br>
            <a href="https://mexuri.com.ng" style="color: #1a73e8; text-decoration: none;">mexuri.com.ng</a>
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
       <div style="max-width: 640px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #1f1b18; line-height: 1.5;">

            <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">
                New Project Request
            </h3>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />

            <!-- STEP 1 -->
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
                Step 1: The Brand
            </h4>

            <!-- Field -->
            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Company Name</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${companyName || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Company Email</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${companyEmail || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Products / Services</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${product || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Ideal Customer Profile (ICP)</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${targetAudience || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 16px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Core Value Proposition</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${valueProp || 'Nothing was specified'}
                </div>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

            <!-- STEP 2 -->
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
                Step 2: Brand Needs
            </h4>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Primary Bottleneck</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${brandNeeds || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 16px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Project Description</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${projectDescription || 'None'}
                </div>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

            <!-- STEP 3 -->
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
                Step 3: Conversion Health
            </h4>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Monthly Conversion Volume</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${conversionVolume || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Conversion Source</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${conversionSource || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 16px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Conversion Platform Link</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                <a href="${businessLink}" style="color: #1a73e8; text-decoration: none;">
                    ${businessLink || 'Nothing was specified'}
                </a>
                </div>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

            <!-- STEP 4 -->
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
                Step 4: Client Conversion Metrics
            </h4>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Website Traffic</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${websiteTraffic || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Website Leads</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${websiteLeads || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Conversion Goal</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${conversionGoal || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Vouch Metrics</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${vouchMetrics || 'Nothing was specified'}
                </div>
            </div>

            <div style="margin-bottom: 8px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Yearly Revenue</div>
                <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${revenueChecker || 'Nothing was specified'}
                </div>
            </div>

            </div>
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
            <div style="max-width: 640px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #1f1b18; line-height: 1.5;">

                <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">
                    ✅ Project Request Confirmed
                </h3>

                <p style="font-size: 14px; margin-bottom: 16px;">
                    Thank you for submitting your project request. We have received your brief and will review the details to understand how Mexuri can best assist ${companyName || 'your company'}.
                </p>

                <p style="font-size: 14px; margin-bottom: 20px;">
                    Next Step: Our team will be in touch within 1-2 business days to schedule a brief discovery call.
                </p>

                <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />

                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
                    Key Project Summary
                </h4>

                <div style="margin-bottom: 12px;">
                    <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Company Name</div>
                    <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                    ${companyName || 'Nothing was specified'}
                    </div>
                </div>

                <div style="margin-bottom: 12px;">
                    <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Primary Bottleneck</div>
                    <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                    ${brandNeeds || 'Nothing was specified'}
                    </div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Conversion Goal</div>
                    <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                    ${conversionGoal || 'Nothing was specified'} growth in ${brandNeeds || "Nothing specified"}
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Project Description</div>
                    <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                    ${projectDescription || 'None'}
                    </div>
                </div>


                <p style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">
                    The Mexuri Team
                </p>
                <p style="font-size: 14px; margin-top: 0;">
                    We look forward to connecting with you.
                </p>

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

    sendSmtpEmail.sender = {
        email: 'mexuri.info@gmail.com',
        name: `New Conversion Audit Request`
    };
    sendSmtpEmail.subject = `🎯 NEW CONVERSION AUDIT REQUEST: ${companyName || 'Unknown Company'}`;

    sendSmtpEmail.htmlContent = `
    <div style="max-width: 640px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #1f1b18; line-height: 1.5;">

        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1f1b18;">
            🎯 New Conversion Audit Request
        </h3>

        <p style="font-size: 14px; margin-bottom: 16px;">
            A new request for the Conversion Audit has been submitted with key sales data. Action required immediately to run the report.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            Audit Data
        </h4>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Company Name</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${companyName || 'N/A'}
            </div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Company Email</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                <a href="mailto:${companyEmail}" style="color: #1a73e8; text-decoration: none;">${companyEmail || 'N/A'}</a>
            </div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Sales (Previous Month)</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                ${sales || 'N/A'}
            </div>
        </div>

        <div style="margin-bottom: 24px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Core Website Link</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px;">
                <a href="${websiteLink}" style="color: #1a73e8; text-decoration: none;">${websiteLink || 'N/A'}</a>
            </div>
        </div>

        <p style="font-size: 14px; color: #6b7280;">
            Priority Status: High. Run audit and prepare report/quote.
        </p>
    </div>
`;

    const autoSMTPReplyEmail = new Brevo.SendSmtpEmail();

    autoSMTPReplyEmail.to = [
        { email: companyEmail, name: companyName || 'Partner' }
    ];

    autoSMTPReplyEmail.sender = {
        email: 'mexuri.info@gmail.com',
        name: 'The Mexuri Audit Team'
    };

    autoSMTPReplyEmail.subject = `⏳ Your Conversion Audit is now being prepared`;

    autoSMTPReplyEmail.htmlContent = `
    <div style="max-width: 640px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; color: #1f1b18; line-height: 1.5;">

        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1f1b18;">
            ⏳ Conversion Audit Initiated
        </h3>

        <p style="font-size: 14px; margin-bottom: 16px;">
            Dear ${companyName || 'Partner'},
        </p>

        <p style="font-size: 14px; margin-bottom: 16px;">
            Thank you for requesting a Conversion Audit from Mexuri. We’ve received your details and have immediately started processing your report.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #1f1b18;">
            Your Next Steps (Timeline)
        </h4>

        <div style="margin-bottom: 16px; font-size: 14px;">
            <ul style="padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 8px;">Audit report will be sent within 30 minutes.</li>
                <li style="margin-bottom: 8px;">We will prepare a quote, KPIs, and milestones based on the audit findings.</li>
                <li style="margin-bottom: 8px;">A follow-up consultation call will be scheduled to discuss the report and potential project requirements.</li>
            </ul>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
            Submitted Data
        </h4>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Company Name</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                ${companyName || 'N/A'}
            </div>
        </div>
        
        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Monthly Sales Volume</div>
            <div style="border: 1px solid #dcdcdc; padding: 10px 12px; border-radius: 6px; font-size: 14px; background-color: #f7f7f7;">
                ${sales || 'N/A'}
            </div>
        </div>

        <p style="font-size: 14px; margin-top: 30px;">
            Warm regards,<br>
            <strong>The Mexuri Audit Team</strong><br>
            <a href="https://mexuri.com.ng" style="color: #1a73e8; text-decoration: none;">mexuri.com.ng</a>
        </p>
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