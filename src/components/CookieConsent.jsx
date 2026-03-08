import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookieConsent';

function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === null) {
            // Delay slightly so the slide-in feels intentional
            const timer = setTimeout(() => setVisible(true), 600);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismiss = (choice) => {
        localStorage.setItem(STORAGE_KEY, choice);
        setHiding(true);
        setTimeout(() => setVisible(false), 400);
    };

    if (!visible) return null;

    return (
        <div
            className={`cookie-banner${hiding ? ' cookie-banner--hiding' : ' cookie-banner--visible'}`}
            role="dialog"
            aria-live="polite"
            aria-label="Cookie 同意通知"
            id="cookie-consent-banner"
        >
            <div className="cookie-banner__inner">
                <div className="cookie-banner__icon" aria-hidden="true">🍪</div>
                <div className="cookie-banner__content">
                    <p className="cookie-banner__text">
                        我們使用 Cookie 改善您的瀏覽體驗、分析網站流量並提供個人化功能。
                        繼續使用即表示您同意我們的{' '}
                        <a
                            href="/privacy"
                            className="cookie-banner__link"
                            id="cookie-privacy-link"
                        >
                            隱私政策
                        </a>
                        。
                    </p>
                </div>
                <div className="cookie-banner__actions">
                    <button
                        id="cookie-decline-btn"
                        className="btn btn--sm btn--outline cookie-banner__btn-decline"
                        onClick={() => dismiss('declined')}
                        type="button"
                    >
                        拒絕
                    </button>
                    <button
                        id="cookie-accept-btn"
                        className="btn btn--sm btn--primary cookie-banner__btn-accept"
                        onClick={() => dismiss('accepted')}
                        type="button"
                    >
                        接受
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieConsent;
