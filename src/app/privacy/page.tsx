'use client';

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 py-20 sm:py-32">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl font-semibold tracking-tight text-navy-900 mb-8">
                        Политика конфиденциальности
                    </h1>

                    <div className="space-y-6 text-slate-600">
                        <section>
                            <h2 className="text-2xl font-medium mb-4 text-navy-800">1. Общие положения</h2>
                            <p className="mb-4">
                                Настоящая Политика конфиденциальности регулирует порядок обработки и использования персональных данных пользователей сайта.
                            </p>
                            <p>
                                Используя сайт, вы соглашаетесь с условиями данной политики.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium mb-4 text-navy-800">2. Собираемые данные</h2>
                            <p className="mb-2">
                                Мы можем собирать следующую информацию:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Контактные данные (имя, email, телефон) при заполнении форм</li>
                                <li>Техническую информацию (IP-адрес, тип браузера, время посещения)</li>
                                <li>Данные о поведении на сайте (просмотренные страницы, время сеанса)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium mb-4 text-navy-800">3. Использование данных</h2>
                            <p className="mb-4">
                                Собранная информация используется для:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Обработки запросов и предоставления услуг</li>
                                <li>Улучшения работы сайта и пользовательского опыта</li>
                                <li>Отправки информационных сообщений (только с согласия пользователя)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium mb-4 text-navy-800">4. Защита данных</h2>
                            <p>
                                Мы принимаем необходимые меры для защиты персональных данных от несанкционированного доступа, изменения или уничтожения.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium mb-4 text-navy-800">5. Cookies и аналитика</h2>
                            <p className="mb-4">
                                Сайт использует файлы cookie и сервисы веб-аналитики для сбора статистики о посещаемости.
                            </p>
                            <p>
                                Вы можете отключить cookies в настройках браузера, но это может повлиять на функциональность сайта.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium mb-4 text-navy-800">6. Изменения в политике</h2>
                            <p>
                                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на этой странице.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium mb-4 text-navy-800">7. Контакты</h2>
                            <p>
                                По вопросам, связанным с защитой персональных данных, вы можете связаться с нами по электронной почте: privacy@example.com
                            </p>
                        </section>

                        <p className="text-sm text-slate-500 mt-8">
                            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                        </p>
                    </div>
                </div>
            </main>
            <SiteFooter/>
        </div>
    );
}