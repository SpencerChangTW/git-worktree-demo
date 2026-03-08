import { useState, useRef } from 'react';
import { faqData } from '../data/faq';

function FAQItem({ item, isOpen, onToggle }) {
    const contentRef = useRef(null);

    return (
        <div className={`faq__item${isOpen ? ' faq__item--open' : ''}`}>
            <button
                className="faq__question"
                onClick={onToggle}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onToggle();
                    }
                }}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-btn-${item.id}`}
            >
                <span className="faq__question-text">{item.question}</span>
                <span className="faq__icon" aria-hidden="true">
                    <svg
                        className="faq__icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>
            <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
                className="faq__answer"
                style={{
                    maxHeight: isOpen
                        ? `${contentRef.current?.scrollHeight ?? 500}px`
                        : '0px',
                }}
            >
                <div ref={contentRef} className="faq__answer-inner">
                    {item.answer}
                </div>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [openIds, setOpenIds] = useState(new Set());

    const toggle = (id) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <section className="faq" id="faq" aria-label="常見問題">
            <div className="container">
                <header className="section-header">
                    <span className="section-header__badge">FAQ</span>
                    <h2 className="section-header__title">常見問題解答</h2>
                    <p className="section-header__desc">
                        找不到答案？隨時與我們的客服團隊聯繫，我們平均回覆時間不到 2 小時。
                    </p>
                </header>

                <div className="faq__list" role="list">
                    {faqData.map((item) => (
                        <FAQItem
                            key={item.id}
                            item={item}
                            isOpen={openIds.has(item.id)}
                            onToggle={() => toggle(item.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
