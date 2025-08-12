import { NextResponse } from "next/server";

// Простая in-memory карта для rate limit (в продакшене — Redis/Upstash)
const requestLog = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 минута
const MAX_REQUESTS = 3; // Макс. кол-во заявок с одного IP за окно

export async function POST(request: Request) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "unknown";

    const now = Date.now();
    const prev = requestLog.get(ip) || 0;

    if (now - prev < RATE_LIMIT_WINDOW) {
        return NextResponse.json(
            { ok: false, error: "Слишком частые запросы. Подождите." },
            { status: 429 }
        );
    }
    requestLog.set(ip, now);

    const body = await request.json();

    // 1. Honeypot
    if (body.email && body.email.trim() !== "") {
        return NextResponse.json(
            { ok: false, error: "Похоже, вы бот 🤖" },
            { status: 400 }
        );
    }

    // Подробная валидация с конкретными причинами
    if (!body.name || body.name.trim().length === 0) {
        return NextResponse.json(
            { ok: false, error: "Поле 'Имя' обязательно для заполнения." },
            { status: 400 }
        );
    }
    if (body.name.length > 100) {
        return NextResponse.json(
            { ok: false, error: "Поле 'Имя' слишком длинное (максимум 100 символов)." },
            { status: 400 }
        );
    }

    if (!body.contact || body.contact.trim().length === 0) {
        return NextResponse.json(
            { ok: false, error: "Поле 'Контакт' обязательно для заполнения." },
            { status: 400 }
        );
    }
    if (body.contact.length > 100) {
        return NextResponse.json(
            { ok: false, error: "Поле 'Контакт' слишком длинное (максимум 100 символов)." },
            { status: 400 }
        );
    }

    if (!body.message || body.message.trim().length === 0) {
        return NextResponse.json(
            { ok: false, error: "Поле 'Сообщение' обязательно для заполнения." },
            { status: 400 }
        );
    }
    if (body.message.length > 2000) {
        return NextResponse.json(
            { ok: false, error: "Поле 'Сообщение' слишком длинное (максимум 2000 символов)." },
            { status: 400 }
        );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_CHAT_ID!;
    const siteUrl =
        request.headers.get("origin") ||
        request.headers.get("referer") ||
        "неизвестно";

    const text =
        `📩 Новое сообщение с сайта: ${siteUrl}\n` +
        `👤 Имя: ${body.name}\n` +
        `📞 Контакт: ${body.contact}\n` +
        `💬 Сообщение: ${body.message}`;

    const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!resp.ok) {
        const err = await resp.text();
        return NextResponse.json(
            { ok: false, error: "Ошибка отправки в Telegram", details: err },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true });
}
