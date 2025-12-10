import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./project.css";

const Step1BrandInfo = ({ formData, handleInputChange, handleButtonSelect, isActive, validationErrors }) => (
    <div className="form-step">
        <div className="heading"><h1>The Brand - Tell us about your brand</h1></div>

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

                <label htmlFor="projectDescription" style={{ margin: "1.3rem 0" }}>Describe your project</label>
                <textarea
                    name="projectDescription"
                    id="projectDescription"
                    placeholder="Describe your project"
                    value={formData.projectDescription || ''}
                    onChange={handleInputChange}
                ></textarea>
            </div>
            {validationErrors.projectDescription && (
                <p className="error-message">{validationErrors.projectDescription}</p>
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
                <p className="error-message">{validationErrorsconversionVolume}</p>
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

const Step4ContactInfo = ({ handleButtonSelect, isActive, validationErrors }) => (
    <div className="form-step">
        <div className="heading"><h1>Conversion Health</h1></div>

        <div className="field">
            <label htmlFor="websiteTraffic">What is your monthly website traffic?</label>
            <div className="websiteTraffic">
                <div className="input">
                    <input
                        type="button"
                        value="< 100 visitors"
                        className={isActive("websiteTraffic", "< 100 visitors") ? "active" : ""}
                        onClick={() => handleButtonSelect("websiteTraffic", "< 100 visitors")}
                    />
                    <input
                        type="button"
                        value="100 - 500 visitors"
                        className={isActive("websiteTraffic", "100 - 500 visitors") ? "active" : ""}
                        onClick={() => handleButtonSelect("websiteTraffic", "100 - 500 visitors")}
                    />
                    <input
                        type="button"
                        value="> 500 Visitors"
                        className={isActive("websiteTraffic", "> 500 Visitors") ? "active" : ""}
                        onClick={() => handleButtonSelect("websiteTraffic", "> 500 Visitors")}
                    />
                </div>
            </div>
            {validationErrors.websiteTraffic && (
                <p className="error-message">{validationErrors.websiteTraffic}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="websiteLeads">How much of these leads converts to sales?</label>
            <div className="websiteLeads">
                <div className="input">
                    <input
                        type="button"
                        value="< 10%"
                        className={isActive("websiteLeads", "< 5%") ? "active" : ""}
                        onClick={() => handleButtonSelect("websiteLeads", "< 5%")}
                    />
                    <input
                        type="button"
                        value="10 - 30%"
                        className={isActive("websiteLeads", "10 - 30%") ? "active" : ""}
                        onClick={() => handleButtonSelect("websiteLeads", "10 - 30%")}
                    />
                    <input
                        type="button"
                        value="> 30%"
                        className={isActive("websiteLeads", "> 30%") ? "active" : ""}
                        onClick={() => handleButtonSelect("websiteLeads", "> 30%")}
                    />
                </div>
            </div>
            {validationErrors.websiteLeads && (
                <p className="error-message">{validationErrors.websiteLeads}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="conversionGoal">What is your Conversion Rate goal?</label>
            <div className="conversionGoal">
                <div className="input">
                    <input
                        type="button"
                        value="15%"
                        className={isActive("conversionGoal", "15%") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionGoal", "15%")}
                    />
                    <input
                        type="button"
                        value="15 - 30%"
                        className={isActive("conversionGoal", "15 - 30%") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionGoal", "15 - 30%")}
                    />
                    <input
                        type="button"
                        value="> 30%"
                        className={isActive("conversionGoal", "> 30%") ? "active" : ""}
                        onClick={() => handleButtonSelect("conversionGoal", "> 30%")}
                    />
                </div>
            </div>
            {validationErrors.conversionGoal && (
                <p className="error-message">{validationErrors.conversionGoal}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="vouchMetrics">Vouch Metrics - How often do you receive referrals? </label>
            <div className="vouchMetrics">
                <div className="input">
                    <input
                        type="button"
                        value="Not Often"
                        className={isActive("vouchMetrics", "Not Often") ? "active" : ""}
                        onClick={() => handleButtonSelect("vouchMetrics", "Not Often")}
                    />
                    <input
                        type="button"
                        value="Moderate"
                        className={isActive("vouchMetrics", "Moderate") ? "active" : ""}
                        onClick={() => handleButtonSelect("vouchMetrics", "Moderate")}
                    />
                    <input
                        type="button"
                        value="> 30%"
                        className={isActive("vouchMetrics", "> 30%") ? "active" : ""}
                        onClick={() => handleButtonSelect("vouchMetrics", "> 30%")}
                    />
                </div>
            </div>
            {validationErrors.vouchMetrics && (
                <p className="error-message">{validationErrors.vouchMetrics}</p>
            )}
        </div>

        <div className="field">
            <label htmlFor="revenueChecker">What is your Yearly Revenue like? (Optional)</label>
            <div className="revenueChecker">
                <div className="input">
                    <input
                        type="button"
                        value="₦35M - ₦50M"
                        className={isActive("revenueChecker", "₦35M - ₦50M") ? "active" : ""}
                        onClick={() => handleButtonSelect("revenueChecker", "₦35M - ₦50M")}
                    />
                    <input
                        type="button"
                        value="₦100M - ₦250M"
                        className={isActive("revenueChecker", "₦100M - ₦250M") ? "active" : ""}
                        onClick={() => handleButtonSelect("revenueChecker", "₦100M - ₦250M")}
                    />
                    <input
                        type="button"
                        value="> ₦300M"
                        className={isActive("revenueChecker", "> ₦300M") ? "active" : ""}
                        onClick={() => handleButtonSelect("revenueChecker", "> ₦300M")}
                    />
                </div>
            </div>
            {validationErrors.revenueChecker && (
                <p className="error-message">{validationErrors.revenueChecker}</p>
            )}
        </div>
    </div>
);

// =======================================================
// 2. MAIN project COMPONENT
// =======================================================

const Project = () => {
    const totalSteps = 4;

    // --- State Management ---
    const [currentStep, setCurrentStep] = useState(1);
    const [buttonMessage, setButtonMessage] = useState("Request for Quote");
    const [showPrompt, setShowPrompt] = useState(false); // Changed initial state to false
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const [navigationMessage, setNavigationMessage] = useState("")

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("projectFormData");
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
        localStorage.setItem("projectFormData", JSON.stringify(updatedData));
        setValidationErrors({}); // Clear errors immediately on user interaction
    };

    const handleButtonSelect = (groupName, value) => {
        const updatedData = {
            ...formData,
            [groupName]: value,
        };

        setFormData(updatedData);
        localStorage.setItem("projectFormData", JSON.stringify(updatedData));
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard basic email regex
            if (!formData.companyEmail) {
                errors.companyEmail = "Company Email is required.";
            } else if (!emailRegex.test(formData.companyEmail)) {
                errors.companyEmail = "Please enter a valid email address.";
            }
            if (!formData.product) errors.product = "Products/Services is required.";
            if (!formData.targetAudience) errors.targetAudience = "Target Audience is required.";
            if (!formData.valueProp) errors.valueProp = "Value Proposition is required.";
            if (!formData.businessModel) errors.businessModel = "Please select a Business Model.";
        }

        if (step === 2) {
            if (!formData.brandNeeds) errors.brandNeeds = "Please select a primary constraint.";
            if (!formData.projectDescription) errors.projectDescription = "Please fill this field"
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
            if (!formData.websiteTraffic) error.websiteTraffic = "This field is required";
            if (!formData.websiteLeads) error.websiteLeads = "This field is required";
            if (!formData.conversionGoal) error.conversionGoal = "This field is required";
            if (!formData.vouchMetrics) error.vouchMetrics = "This field is required";
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

            const response = await fetch('http://localhost:5000/api/main-project-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setButtonMessage("✅ Request Sent!");
                setFormData({});
                localStorage.removeItem("projectFormData");
                setShowPrompt(true);

                // Reset button text after 5 seconds
                setTimeout(() => setButtonMessage('Request for Quote'), 5000);

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
        <div className="project-container">
            <div className="project-main">
                <div className="project-description">
                    <div className="project-header">
                        <h1>Transform Your Pipeline: The Mexuri Full-Funnel Build & Conversion Program</h1>
                    </div>
                    <div className="project-body">
                        <p>
                            This isn't just an audit—it's a strategic partnership designed to fix your biggest revenue bottlenecks. We rebuild the foundations of your growth by optimizing your brand messaging and converting more leads into guaranteed sales.
                        </p>
                        <p>
                            Stop losing qualified customers due to weak messaging or leaky funnels. Our program provides the strategic assets and technical optimizations needed to achieve sustainable scale.
                        </p>
                        <p id="packageRequirement" style={{ fontWeight: "600" }}>The Full Conversion Program Delivers:</p>

                        <ul>
                            <li>Brand Messaging Architecture: Clarifying your unique value to attract your ICP.</li>
                            <li>Technical CRO Setup & Strategy: Maximizing conversions through data-driven testing.</li>
                            <li>Customized Lead Strategy Roadmap</li>
                            <li>Performance & Funnel Health Audit</li>
                            <li>Dedicated Strategy Sessions & Results Handover</li>
                            <li>Conversion System Optimisation</li>
                            <li>Performance Reports</li>
                        </ul>
                    </div>
                </div>

                <div className="project-form">
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
                        Thank you for reaching out to Mexuri! We've successfully received your project request.
                        A member of the Mexuri Team will personally review your project needs and get
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

export default Project;