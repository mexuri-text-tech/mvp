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
    // Destructure ALL fields from the React formData object
    const formData = req.body;
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
    } = formData;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    // ... (Email setup: to, sender, subject, and the detailed HTML content 
    //      created in the previous response) ...
    sendSmtpEmail.to = [{ email: 'mexuri.info@gmail.com', name: 'Mexuri Customer Care Team' }];
    sendSmtpEmail.sender = {
        email: 'mexuri.info@gmail.com',
        name: 'Mexuri Audit Request'
    };
    sendSmtpEmail.subject = `New 14-Day Demo Request: ${companyName || 'Unknown Company'}`;
    sendSmtpEmail.htmlContent = `
        <h3>🚀 New 14-Day Demo Request</h3>
        <hr>
        <h4>Step 1: The Brand</h4>
        <ul>
            <li><strong>Company Name:</strong> ${companyName || 'N/A'}</li>
            <li><strong>Products/Services:</strong> ${product || 'N/A'}</li>
            <li><strong>ICP (Ideal Customer Profile):</strong> ${targetAudience || 'N/A'}</li>
            <li><strong>Core Value Proposition:</strong> ${valueProp || 'N/A'}</li>
            <li><strong>Business Model:</strong> ${businessModel || 'N/A'}</li>
        </ul>
        <hr>
        <h4>Step 2: Brand Needs</h4>
        <ul>
            <li><strong>Primary Bottleneck:</strong> ${brandNeeds || 'N/A'}</li>
            <li><strong>Other Needs Specified:</strong> ${otherNeeds || 'None'}</li>
        </ul>
        <hr>
        <h4>Step 3: Conversion Health</h4>
        <ul>
            <li><strong>Monthly Conversion Volume:</strong> ${conversionVolume || 'N/A'}</li>
            <li><strong>Conversion Source:</strong> ${conversionSource || 'N/A'}</li>
            <li><strong>Conversion Platform Link:</strong> <a href="${businessLink}">${businessLink || 'N/A'}</a></li>
        </ul>
        <hr>
        <h4>Step 4: Contact Info</h4>
        <ul>
            <li><strong>Company Email:</strong> ${companyEmail || 'N/A'}</li>
        </ul>
        <hr>
    `;

    try {
        await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
        res.status(200).send({ message: 'Audit Request submitted successfully!' });
    } catch (error) {
        console.error('Brevo API Error:', error);
        res.status(500).send({ message: 'Failed to send audit request email.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});