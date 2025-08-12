import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-20 sm:py-32">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-navy-900 mb-4">Свяжитесь со мной</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 mb-12">
                Есть интересный проект или просто хотите поздороваться? Напишите мне!
            </p>
            <form className="max-w-xl mx-auto text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Имя</label>
                        <Input type="text" id="name" placeholder="Ваше имя" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <Input type="email" id="email" placeholder="Ваш email" />
                    </div>
                </div>
                <div className="mb-6">
                     <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Сообщение</label>
                     <Textarea id="message" placeholder="Ваше сообщение" rows={5}></Textarea>
                </div>
                <div className="text-center">
                    <Button type="submit">Отправить</Button>
                </div>
            </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
