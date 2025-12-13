import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./calc.css";

// --- Form Component (Consolidated) ---

const BrandInfoForm = ({ formData, handleInputChange, validationErrors }) => (
    <div className="form-step-calc">
        <div className="heading"><h1>Conversion Audit Form</h1><hr style={{ width: "40%", margin: "0.5rem auto" }} /></div>

        <div className="field">
            <label htmlFor="companyName">Company Name</label>
            <input
                type="text"
                id="companyName"
                placeholder="What is your company's name?"
                value={formData.companyName || ''}
                onChange={handleInputChange}
            />
            {validationErrors.companyName && (
                <p className="error-message">{validationErrors.companyName}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="companyEmail">Company Email</label>
            <input
                type="email"
                id="companyEmail"
                placeholder="What is your company's email?"
                value={formData.companyEmail || ''}
                onChange={handleInputChange}
                autoComplete="email"
            />
            {validationErrors.companyEmail && (
                <p className="error-message">{validationErrors.companyEmail}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="sales">What was the total number of clients acquired?</label>
            <input
                type="number"
                id="sales"
                placeholder="e.g. 100, 200, 250"
                value={formData.sales || ''}
                onChange={handleInputChange}
                autoComplete="off"
            />
            {validationErrors.sales && (
                <p className="error-message">{validationErrors.sales}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="websiteLink">Website link</label>
            <input
                type="url"
                id="websiteLink"
                placeholder="e.g. https://yourwebsite.com"
                value={formData.websiteLink || ''}
                onChange={handleInputChange}
            />
            {validationErrors.websiteLink && (
                <p className="error-message">{validationErrors.websiteLink}</p>
            )}
        </div>
    </div>
);


// --- Main Component ---

const ConversionAuditRequest = () => {

    // --- State Management ---
    const [showPrompt, setShowPrompt] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [navigationMessage, setNavigationMessage] = useState("");
    // 💡 Added loading state for disabling the button
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitButton, setSubmitButton] = useState("Submit Audit Request");

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("calcFormData");
        return saved ? JSON.parse(saved) : {};
    });

    // --- Handlers & Helpers ---

    const handleClosePrompt = () => {
        setShowPrompt(false);
        // Cleaned up navigation state logic for clarity
        navigate("/");
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const fieldId = id || e.target.name;

        // Clear the specific error for the field being typed in
        setValidationErrors(prev => ({ ...prev, [fieldId]: undefined }));

        const updatedData = { ...formData, [fieldId]: value };

        setFormData(updatedData);
        localStorage.setItem("calcFormData", JSON.stringify(updatedData));
    };

    // ✅ CONSOLIDATED VALIDATION LOGIC
    const validateForm = () => {
        let errors = {};
        const urlRegex = /^((http|https):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 1. Company Name
        if (!formData.companyName) errors.companyName = "Company Name is required.";

        // 2. Company Email
        if (!formData.companyEmail) {
            errors.companyEmail = "Company Email is required.";
        } else if (!emailRegex.test(formData.companyEmail)) {
            errors.companyEmail = "Please enter a valid email address.";
        }

        // 3. Sales (Clients Acquired)
        const numSales = Number(formData.sales);
        if (!formData.sales) {
            errors.sales = "Acquisition rate is required.";
        } else if (isNaN(numSales) || numSales < 0) {
            errors.sales = "Please enter a valid number for clients acquired.";
        }

        // 4. Website Link
        if (!formData.websiteLink) {
            errors.websiteLink = "Website Link is required.";
        } else if (!urlRegex.test(formData.websiteLink)) {
            errors.websiteLink = "Please enter a valid URL (e.g., https://websitelink.com).";
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    // --- Submission Logic ---

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🛑 Final Validation before submission
        const validationResult = validateForm();

        if (validationResult !== true) {
            setValidationErrors(validationResult);
            return;
        }

        // 1. START SUBMISSION FEEDBACK
        setValidationErrors({});
        setIsSubmitting(true);
        setSubmitButton("Sending..."); // 💡 Set button text to "Sending..."

        try {
            // Delay submission (for better UX when server is too fast)
            const delaySubmission = () => new Promise(resolve => setTimeout(resolve, 500));
            await delaySubmission();

            const response = await fetch('http://localhost:5000/api/main-calc-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // 2. SUCCESS
                setSubmitButton("Audit Request Sent"); // 💡 Set button text to "Audit Request Sent"
                setFormData({});
                localStorage.removeItem("calcFormData");
                setShowPrompt(true);

                // No need for a timeout here, as the success prompt handles navigation.
                setNavigationMessage(""); // Clear any previous error messages

            } else {
                // 3. SERVER ERROR
                const errorMessage = "Submission failed. Please try again.";
                console.error("Submission failed on server side.", await response.text());
                setNavigationMessage(errorMessage);
                setSubmitButton("Submit Audit Request"); // 💡 Reset button text on failure

            }
        } catch (error) {
            // 4. NETWORK ERROR
            const errorMessage = "A network error occurred. Could not reach the server.";
            console.error("Network error during submission:", error);
            setNavigationMessage(errorMessage);
            setSubmitButton("Submit Audit Request"); // 💡 Reset button text on failure

        } finally {
            // 5. CLEANUP
            setIsSubmitting(false);
        }
    };


    return (<>
        <div className="calc-container">
            <div className="calc-main">
                <div className="calc-description">
                    <div className="calc-header">
                        <h1>Conversion Rate Audit Request</h1>
                    </div>
                    <div className="calc-body">
                        <p>
                            Stop losing qualified customers. Our assessment is designed to move you beyond guesswork
                            and into a data-driven strategy that converts more existing leads into guaranteed sales.
                        </p>
                        <p>
                            Your submitted audit request will be subjected to testing and analysis
                            by our internal systems. We anticipate communicating the findings and
                            next steps within a timeframe of 5 to 15 minutes
                        </p>
                    </div>
                </div>

                <div className="calc-form">
                    <form onSubmit={handleSubmit}>

                        <BrandInfoForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            validationErrors={validationErrors}
                        />

                        <button type="submit" disabled={isSubmitting}> {/* 💡 Button is disabled during submission */}
                            {submitButton}
                        </button>
                    </form>

                    <p
                        style={{ textAlign: "center", color: 'red', marginTop: '1rem' }}>
                        {navigationMessage}
                    </p>
                </div>
            </div>
        </div>

        {/* Success Prompt */}
        {showPrompt && (
            <div className={`successPrompt ${showPrompt ? 'is-visible' : ''}`}>
                <div className="message">
                    <img src="/check.png" alt="success" />
                    <h1>We've received your request</h1>
                    <p>
                        Thank you for reaching out to Mexuri! We've successfully received your conversion audit request.
                        We would review it and get back to you via email within 15 minutes
                    </p>

                    <button onClick={handleClosePrompt}>
                        Done
                    </button>
                </div>
            </div>
        )}
    </>);
};

export default ConversionAuditRequest;