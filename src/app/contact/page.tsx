"use client";

import {useRef, useState} from "react";
import SliderCaptcha from "rc-slider-captcha";
import {createPuzzle} from "create-puzzle"; // <-- правильный пакет

import {SiteHeader} from "@/components/site-header";
import {SiteFooter} from "@/components/site-footer";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import * as Toast from "@radix-ui/react-toast";

export default function ContactPage() {
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const expectedXRef = useRef(null);
    const [toast, setToast] = useState({open: false, type: "success", message: ""});

    // Параметры: держи их одинаковыми для createPuzzle и для SliderCaptcha (чтобы координаты совпадали)
    const BG_W = 320;
    const BG_H = 160;
    const PIECE_W = 60;
    const PIECE_H = 60;

    async function generateCaptcha() {
        const images = ["/captcha/bg1.jpg", "/captcha/bg2.jpg", "/captcha/bg3.jpg"];
        const imgUrl = images[Math.floor(Math.random() * images.length)];

        // createPuzzle умеет принимать строку с URL и вернёт dataURL-ы
        const res = await createPuzzle(imgUrl, {
            width: PIECE_W,        // ширина пазл-кусочка
            height: PIECE_H,       // высота пазл-кусочка
            bgWidth: BG_W,         // ширина фона, важно совпадать с bgSize ниже
            bgHeight: BG_H,        // высота фона
            format: "dataURL",
            cacheImage: false
        });

        // res: { bgUrl, puzzleUrl, x, y }
        console.log("createPuzzle result", res);

        // @ts-ignore
        expectedXRef.current = res.x; // сохраним правильную позицию
        return {
            bgUrl: res.bgUrl,
            puzzleUrl: res.puzzleUrl
        };
    }

    async function handleVerify(verifyData: any) {
        // verifyData: объект от rc-slider-captcha (свойства: x, y, duration, trail, ...)
        console.log("verifyData from component:", verifyData, "expectedX:", expectedXRef.current);

        const tolerance = 6; // пиксели допуска — подбирай эмпирически
        if (expectedXRef.current == null) {
            return Promise.reject(new Error("no expectedX stored"));
        }

        // ВАЖНО: убедись в единицах — если координаты кажутся неверными, смотри console.log(verifyData)
        if (Math.abs(verifyData.x - expectedXRef.current) <= tolerance) {
            setCaptchaPassed(true);
            return Promise.resolve();
        } else {
            setCaptchaPassed(false);
            return Promise.reject(new Error("position mismatch"));
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!captchaPassed) {
            setToast({ open: true, type: "error", message: "Пожалуйста, пройдите капчу" });
            return;
        }

        const formData = {
            name: e.target.name.value,
            contact: e.target.contact.value,
            message: e.target.message.value,
            siteUrl: window.location.href
        };

        try {
            const res = await fetch("/api/send-telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                // Показываем сообщение ошибки из ответа сервера, если есть
                throw new Error(data.error || "Ошибка при отправке");
            }

            setToast({ open: true, type: "success", message: "Форма успешно отправлена!" });
            e.target.reset();
            setCaptchaPassed(false);
        } catch (err: any) {
            setToast({ open: true, type: "error", message: err.message || "Не удалось отправить сообщение" });
        }

    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader/>
            <main className="flex-1 py-20 sm:py-32">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-navy-900 mb-4">Свяжитесь со мной</h1>

                    <form className="max-w-xl mx-auto text-left" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Имя</label>
                                <Input type="text" id="name" name="name" placeholder="Ваше имя" required/>
                            </div>
                            <div>
                                <label htmlFor="contact"
                                       className="block text-sm font-medium text-slate-700 mb-2">Контакт</label>
                                <Input type="text" id="contact" placeholder="Ваш email, телефон или Telegram" required/>
                            </div>
                            <input type="email" name="email" style={{position: "absolute", left: "-9999px"}} tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Сообщение</label>
                            <Textarea id="message" name="message" placeholder="Ваше сообщение" rows={5} required/>
                        </div>

                        <div className="mb-6">
                            <SliderCaptcha
                                tipText={{
                                    default: "Перетащите, чтобы заполнить пазл",
                                    loading: "Загрузка...",
                                    moving: "Отпустите, чтобы проверить",
                                    verifying: "Проверка...",
                                    success: "Успешно!",
                                    error: "Ошибка",
                                    errors: "Слишком много ошибок",
                                    loadFailed: "Ошибка загрузки"
                                }}
                                mode="float"
                                request={generateCaptcha}             // <-- тут client-side генерация
                                onVerify={handleVerify}              // <-- проверка по сохранённому expectedX
                                bgSize={{width: BG_W, height: BG_H}}

                            />
                        </div>

                        <div className="text-center">
                            <Button type="submit">Отправить</Button>
                        </div>
                    </form>
                </div>
            </main>
            <SiteFooter/>
            {/* Toast уведомления */}
            <Toast.Provider swipeDirection="right">
                <Toast.Root
                    open={toast.open}
                    onOpenChange={(o) => setToast((t) => ({...t, open: o}))}
                    duration={3000} // авто-закрытие через 3 сек
                    className={`rounded-md p-4 shadow-lg ${
                        toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}
                >
                    <Toast.Title className="font-bold">
                        {toast.type === "success" ? "Успех" : "Ошибка"}
                    </Toast.Title>
                    <Toast.Description>{toast.message}</Toast.Description>
                </Toast.Root>
                <Toast.Viewport className="fixed bottom-4 right-4 w-96 max-w-full"/>
            </Toast.Provider>
        </div>
    );
}
