import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToHash() {
    const location = useLocation();

    useEffect(() => {
        // 1. Check if the URL has a hash fragment (e.g., #contact)
        if (location.hash) {
            // 2. Use setTimeout to ensure the target component has rendered
            // We use substring(1) to remove the leading '#'
            const targetId = location.hash.substring(1);

            setTimeout(() => {
                const element = document.getElementById(targetId);

                // 3. If the element exists, scroll it into view
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
        // Optional: If no hash, scroll to top on new page load
        else {
            window.scrollTo(0, 0);
        }
    }, [location]); // Re-run this effect every time the URL location object changes

    return null; // This component is purely functional and renders nothing
}

export default ScrollToHash;