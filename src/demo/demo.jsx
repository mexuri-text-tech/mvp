import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./demo.css";

const Step1BrandInfo = ({ formData, handleInputChange, handleButtonSelect, isActive, validationErrors }) => (
    <div className="form-step">
        <div className="heading"><h1>The Brand</h1></div>

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
            <label htmlFor="product">What products or services do you offer?</label>
            <input
                type="text"
                id="product"
                placeholder="SaaS, E-commerce, Product Manufacturing"
                value={formData.product || ''}
                onChange={handleInputChange}
            />
            {validationErrors.product && (
                <p className="error-message">{validationErrors.product}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="targetAudience">Who is your Ideal Customer Profile (ICP)?</label>
            <input
                type="text"
                id="targetAudience"
                placeholder="e.g. Women, Corporate Firms, Athletes"
                value={formData.targetAudience || ''}
                onChange={handleInputChange}
            />
            {validationErrors.targetAudience && (
                <p className="error-message">{validationErrors.targetAudience}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="valueProp">What is your Core Value Proposition?</label>
            <textarea
                id="valueProp"
                placeholder="e.g., Saves X hours, boosts Y revenue, prevents Z risk"
                value={formData.valueProp || ''}
                onChange={handleInputChange}
            ></textarea>
            {validationErrors.valueProp && (
                <p className="error-message">{validationErrors.valueProp}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="businessModel">Which of these best describes your business?</label>
            <div id="businessModel">
                <div className="input">
                    <input
                        type="button"
                        value="Manufacturer"
                        className={isActive("businessModel", "Manufacturer") ? "active" : ""}
                        onClick={() => handleButtonSelect("businessModel", "Manufacturer")}
                    />
                    <input
                        type="button"
                        value="Wholesaler/Distributor"
                        className={isActive("businessModel", "Wholesaler/Distributor") ? "active" : ""}
                        onClick={() => handleButtonSelect("businessModel", "Wholesaler/Distributor")}
                    />
                    <input
                        type="button"
                        value="Service Agency"
                        className={isActive("businessModel", "Service Agency") ? "active" : ""}
                        onClick={() => handleButtonSelect("businessModel", "Service Agency")}
                    />
                    <input
                        type="button"
                        value="SaaS Company"
                        className={isActive("businessModel", "SaaS Company") ? "active" : ""}
                        onClick={() => handleButtonSelect("businessModel", "SaaS Company")}
                    />
                </div>
            </div>
            {validationErrors.businessModel && (
                <p className="error-message">{validationErrors.businessModel}</p>
            )}
        </div>
    </div>
);

const Step2Needs = ({ formData, handleInputChange, handleButtonSelect, isActive, validationErrors }) => (
    <div className="form-step">
        <div className="heading"><h1>Brand Needs</h1></div>

        <div className="field">
            <label htmlFor="brandNeeds">What is your primary growth constraint right now?</label>
            <div className="brandNeeds">
                <div className="input">
                    <input
                        type="button"
                        value="Sales"
                        className={isActive("brandNeeds", "Sales") ? "active" : ""}
                        onClick={() => handleButtonSelect("brandNeeds", "Sales")}
                    />
                    <input
                        type="button"
                        value="Visibility"
                        className={isActive("brandNeeds", "Visibility") ? "active" : ""}
                        onClick={() => handleButtonSelect("brandNeeds", "Visibility")}
                    />
                    <input
                        type="button"
                        value="Lead Optimization"
                        className={isActive("brandNeeds", "Lead Optimization") ? "active" : ""}
                        onClick={() => handleButtonSelect("brandNeeds", "Lead Optimization")}
                    />
                    <input
                        type="button"
                        value="Sales Funnel Audit"
                        className={isActive("brandNeeds", "Sales Funnel Audit") ? "active" : ""}
                        onClick={() => handleButtonSelect("brandNeeds", "Sales Funnel Audit")}
                    />
                </div>
                <textarea
                    name="otherNeeds"
                    id="otherNeeds"
                    placeholder="Additional Notes? (Please specify)"
                    value={formData.otherNeeds || ''}
                    onChange={handleInputChange}
                ></textarea>
            </div>
            {validationErrors.brandNeeds && (
                <p className="error-message">{validationErrors.brandNeeds}</p>
            )}
        </div>
    </div>
);

const Step3Conversion = ({ formData, handleInputChange, handleButtonSelect, isActive, validationErrors }) => (
    <div className="form-step">
        <div className="heading"><h1>Current Conversion Health</h1></div>

        <div className="field">
            <label htmlFor="conversionVolume">How would you describe your current monthly conversion volume?</label>
            <div className="conversionVolume">
                <div className="input">
                    <input
                        type="button"
                        value="Low"
                        className={isActive("conversionVolume", "Low") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionVolume", "Low")}
                    />
                    <input
                        type="button"
                        value="Moderate"
                        className={isActive("conversionVolume", "Moderate") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionVolume", "Moderate")}
                    />
                    <input
                        type="button"
                        value="Unpredicatable"
                        className={isActive("conversionVolume", "Unpredicatable") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionVolume", "Unpredicatable")}
                    />
                </div>
            </div>
            {validationErrors.conversionVolume && (
                <p className="error-message">{validationErrors.conversionVolume}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="conversionSource">Where do you convert clients?</label>
            <div className="conversionSource">
                <div className="input">
                    <input
                        type="button"
                        value="Website"
                        className={isActive("conversionSource", "Website") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionSource", "Website")}
                    />
                    <input
                        type="button"
                        value="Social Media"
                        className={isActive("conversionSource", "Social Media") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionSource", "Social Media")}
                    />
                    <input
                        type="button"
                        value="Other"
                        className={isActive("conversionSource", "Other") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionSource", "Other")}
                    />
                </div>
            </div>
            {validationErrors.conversionSource && (
                <p className="error-message">{validationErrors.conversionSource}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="businessLink">Conversion Platform Link</label>
            <input
                type="url"
                name="url"
                id="businessLink"
                placeholder="e.g., Website URL, Social Platform Link, Landing Page"
                value={formData.businessLink || ''}
                onChange={handleInputChange}
            />
            {validationErrors.businessLink && (
                <p className="error-message">{validationErrors.businessLink}</p>
            )}
        </div>
    </div>
);

const Step4ContactInfo = ({ formData, handleInputChange, validationErrors }) => (
    <div className="form-step">
        <div className="heading"><h1>Contact Info</h1></div>

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
    </div>
);

// =======================================================
// 2. MAIN DEMO COMPONENT
// =======================================================

const Demo = () => {
    const totalSteps = 4;

    // --- State Management ---
    const [currentStep, setCurrentStep] = useState(1);
    const [buttonMessage, setButtonMessage] = useState("Submit for Audit");
    const [showPrompt, setShowPrompt] = useState(false); // Changed initial state to false
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [navigationMessage, setNavigationMessage] = useState("")

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("demoFormData");
        return saved ? JSON.parse(saved) : {};
    });

    // --- Handlers & Helpers ---

    const handleClosePrompt = () => {
        setShowPrompt(false);
        setNavigationMessage("Navigating to home page....");
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const fieldId = id || e.target.name;

        const updatedData = { ...formData, [fieldId]: value };

        setFormData(updatedData);
        localStorage.setItem("demoFormData", JSON.stringify(updatedData));
        setValidationErrors({}); // Clear errors immediately on user interaction
    };

    const handleButtonSelect = (groupName, value) => {
        const updatedData = {
            ...formData,
            [groupName]: value,
        };

        setFormData(updatedData);
        localStorage.setItem("demoFormData", JSON.stringify(updatedData));
        setValidationErrors({}); // Clear errors immediately on user interaction
    };

    const isActive = (groupName, value) => {
        return formData[groupName] === value;
    };

    // ✅ VALIDATION LOGIC
    const validateStep = (step) => {
        let errors = {};
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // Basic URL regex

        if (step === 1) {
            if (!formData.companyName) errors.companyName = "Company Name is required.";
            if (!formData.product) errors.product = "Products/Services is required.";
            if (!formData.targetAudience) errors.targetAudience = "Target Audience is required.";
            if (!formData.valueProp) errors.valueProp = "Value Proposition is required.";
            if (!formData.businessModel) errors.businessModel = "Please select a Business Model.";
        }

        if (step === 2) {
            if (!formData.brandNeeds) errors.brandNeeds = "Please select a primary constraint.";
        }

        if (step === 3) {
            if (!formData.conversionVolume) errors.conversionVolume = "Conversion Volume is required.";
            if (!formData.conversionSource) errors.conversionSource = "Conversion Source is required.";

            if (!formData.businessLink) {
                errors.businessLink = "Conversion Link is required.";
            } else if (!urlRegex.test(formData.businessLink)) {
                errors.businessLink = "Please enter a valid URL (using this format https://websitelink).";
            }
        }

        if (step === 4) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard basic email regex
            if (!formData.companyEmail) {
                errors.companyEmail = "Company Email is required.";
            } else if (!emailRegex.test(formData.companyEmail)) {
                errors.companyEmail = "Please enter a valid email address.";
            }
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    // --- Navigation Logic ---

    const nextStep = () => {
        const validationResult = validateStep(currentStep);

        if (validationResult === true) {
            setValidationErrors({});
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            setValidationErrors(validationResult);
        }
    };

    const prevStep = () => {
        setValidationErrors({});
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // --- Submission Logic ---

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🛑 Final Validation before submission
        const validationResult = validateStep(totalSteps);
        if (validationResult !== true) {
            setValidationErrors(validationResult);
            return;
        }

        // Clear errors and start submission process
        setValidationErrors({});
        setButtonMessage("Sending...");

        // Define the submission delay promise
        const delaySubmission = () => new Promise(resolve => {
            setTimeout(resolve, 1000); // 1-second delay
        });

        try {
            await delaySubmission();

            const response = await fetch('https://mexuri-mvp.onrender.com/api/audit-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setButtonMessage("✅ Request Sent!");
                setFormData({});
                localStorage.removeItem("demoFormData");
                setShowPrompt(true);

                // Reset button text after 5 seconds
                setTimeout(() => setButtonMessage('Submit for Audit'), 5000);

            } else {
                console.error("Submission failed on server side.");
                setButtonMessage('Retry Submit (Error)');
            }
        } catch (error) {
            console.error("Network error during submission:", error);
            setButtonMessage('Retry Submit (Error)');
        }
    };


    return (<>
        <div className="demo-container">
            <div className="demo-main">
                <div className="demo-description">
                    <div className="demo-header">
                        <h1>Scale Your Leads: Get Our 14-Day Performance Audit & Strategy</h1>
                    </div>
                    <div className="demo-body">
                        <p>
                            Discover your biggest lead constraints with our risk-free, <strong style={{ fontWeight: "600" }}>14-day Lead Management Audit</strong>.
                            You'll walk away with a clear strategy designed to immediately boost your conversion rate and pipeline health.
                        </p>
                        <p id="packageRequirement" style={{ fontWeight: "500" }}>The 14-Day Package Delivers:</p>
                        <ul>
                            <li>Customized Lead Strategy Roadmap</li>
                            <li>Research & Competitor Analysis</li>
                            <li>Performance & Funnel Health Audit</li>
                            <li>2x Strategy Sessions (Review & Roadmap Handover)</li>
                        </ul>
                    </div>
                </div>

                <div className="demo-form">
                    <form onSubmit={handleSubmit}>
                        {/* Progress Tracker */}
                        <div className="progress-tracker">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
                                    {step}
                                </div>
                            ))}
                        </div>

                        {/* Conditional Rendering of Steps */}
                        {currentStep === 1 && (
                            <Step1BrandInfo
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleButtonSelect={handleButtonSelect}
                                isActive={isActive}
                                validationErrors={validationErrors} // Passed down for error display
                            />
                        )}
                        {currentStep === 2 && (
                            <Step2Needs
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleButtonSelect={handleButtonSelect}
                                isActive={isActive}
                                validationErrors={validationErrors} // Passed down for error display
                            />
                        )}
                        {currentStep === 3 && (
                            <Step3Conversion
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleButtonSelect={handleButtonSelect}
                                isActive={isActive}
                                validationErrors={validationErrors} // Passed down for error display
                            />
                        )}
                        {currentStep === 4 && (
                            <Step4ContactInfo
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleButtonSelect={handleButtonSelect}
                                isActive={isActive}
                                validationErrors={validationErrors} // Passed down for error display
                            />
                        )}

                        {/* Navigation Buttons */}
                        <div className="navigation-buttons">
                            {/* Back Button */}
                            {currentStep > 1 && (
                                <button type="button" onClick={prevStep} className="prev-button">
                                    ← Back
                                </button>
                            )}

                            {/* Next Button */}
                            {currentStep < totalSteps && (
                                <button type="button" onClick={nextStep} className="next-button">
                                    Next →
                                </button>
                            )}

                            {/* Submit Button */}
                            {currentStep === totalSteps && (
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={buttonMessage === 'Sending...'}
                                >
                                    {buttonMessage}
                                </button>
                            )}
                        </div>

                        <div style={{ textAlign: "center", margin: "3rem auto 0 auto" }}>
                            <p>{navigationMessage}</p>
                        </div>
                    </form>
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
    </>);
};

export default Demo;