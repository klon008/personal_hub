'use client';
import {useState} from "react";
import {Send} from "lucide-react";

export default function DelayedTelegramLink() {
    const [ready, setReady] = useState(false);

    const handleClick = (e: any) => {
        e.preventDefault();
        setReady(true);
        setTimeout(() => {
            window.open(atob('aHR0cHM6Ly90Lm1lLytkRGszcHpfcFk2ZzJNbVk2'), '_blank', 'noopener,noreferrer');
        }, 300);
    };

    return (
        <button
            onClick={handleClick}
            className="text-muted-foreground transition-colors hover:text-foreground"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
            <Send className="h-5 w-5" />
            {ready && <span className="sr-only">Открываем Telegram...</span>}
            {!ready && <span className="sr-only">Telegram</span>}
        </button>
    );
}