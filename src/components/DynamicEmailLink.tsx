'use client';
import { Mail } from "lucide-react";
import { useCallback } from 'react';

export default function DynamicEmailLink() {
// Динамическая сборка email + base64 для защиты
    const handleClick = useCallback(() => {
        const email = atob('MzF3X2NhbGxiYWNr') + '@' + atob('bWFpbA==') + '.' + atob('cnU=');
        // window.location.href = `mailto:${email}`;
        window.open(`mailto:${email}`, '_self');
    }, []);

    return (
        <button
            onClick={handleClick}
            className="text-muted-foreground transition-colors hover:text-foreground"
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                font: 'inherit' // Сохраняет текстовые стили
            }}
            aria-label="Написать на email"
        >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
        </button>
    );
}