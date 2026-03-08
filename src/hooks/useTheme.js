import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sp-theme';

/**
 * useTheme
 * - 初始化：localStorage > prefers-color-scheme > 'dark'
 * - 操作 document.documentElement 的 data-theme attribute
 * - 持久化到 localStorage
 */
function useTheme() {
    const getInitialTheme = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const [theme, setTheme] = useState(() => {
        // SSR guard（雖然這是 CSR 專案，保險起見）
        if (typeof window === 'undefined') return 'dark';
        return getInitialTheme();
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return { theme, toggleTheme };
}

export default useTheme;
