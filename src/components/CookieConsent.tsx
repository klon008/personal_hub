'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookie_consent');
        if (!accepted) {
            setVisible(true);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed backdrop-blur-sm bottom-0 left-0 w-full bg-gray-900/50 text-white p-4 text-sm flex flex-col sm:flex-row items-center justify-between z-50">
            <p>
                Мы используем файлы cookie и Яндекс.Метрику для сбора статистики и улучшения работы сайта.
                Продолжая пользоваться сайтом, вы соглашаетесь на обработку персональных данных в соответствии с нашей{' '}
                <a href="/privacy" className="underline">политикой конфиденциальности</a>.
            </p>
            <button
                onClick={accept}
                className="mt-2 sm:mt-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
                Согласен
            </button>
        </div>
    );
}
