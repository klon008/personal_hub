'use client';  // в начале файла

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <Image
                src="/imgs/581863_2.png"
                alt="klon008"
                width={400}
                height={400}
                className="rounded-full shadow-lg"
                data-ai-hint="woman portrait"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-semibold tracking-tight text-navy-900 mb-4">
                Обо мне
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Талантливый веб-мастер с десятилетним опытом работы корректно и быстро сделает сайт любой сложности.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Создаю сайты с нуля под ключ и совершенствую уже готовые.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Для создания сайтов использую HTML5, JavaScript/CoffeeScript, PHP - Laravel, платформу NodeJS
                (connect/express/VUE) Webpack.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Чтобы выполнить работу максимально быстро использую препроцессоры CSS3, LESS, SASS (SCSS), Stylus.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Большой опыт работы с WordPress, jQury, Bootstrap. Работаю со сборщиками Gulp, yeoman.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Также, занимаюсь парсингом сайтов.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Работаю на себя, так что нет никаких наценок на фирму, менеджеров и прочих посредников. Вы платите
                только за работу без переплат.
              </p>

            </div>
          </div>
        </div>
      </main>
      <SiteFooter/>
    </div>
  );
}
