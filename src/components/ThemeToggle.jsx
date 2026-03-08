import { useState } from 'react';

function ThemeToggle({ theme, onToggle }) {
    const [animating, setAnimating] = useState(false);

    const handleClick = () => {
        if (animating) return;
        setAnimating(true);
        // 動畫完成後再切換，讓 icon 有淡出再淡入的效果
        setTimeout(() => {
            onToggle();
            setAnimating(false);
        }, 150);
    };

    const isDark = theme === 'dark';

    return (
        <button
            id="theme-toggle-btn"
            className={`theme-toggle ${animating ? 'theme-toggle--animating' : ''}`}
            onClick={handleClick}
            aria-label={isDark ? '切換為淺色模式' : '切換為深色模式'}
            title={isDark ? '切換為淺色模式' : '切換為深色模式'}
        >
            <span className="theme-toggle__icon" aria-hidden="true">
                {isDark ? '☀️' : '🌙'}
            </span>
        </button>
    );
}

export default ThemeToggle;
