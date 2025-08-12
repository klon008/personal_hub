'use client';

import { useState, useEffect } from 'react';

type Props = {
    onAccept: () => void;
};

export default function CookieConsent({ onAccept }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookie_consent');
        if (!accepted) {
            setVisible(true);
        } else {
            onAccept();
        }
    }, [onAccept]);

    const accept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
        onAccept();
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900/50 text-white p-4 text-sm flex flex-col sm:flex-row items-center justify-between z-50  backdrop-blur-sm">
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
