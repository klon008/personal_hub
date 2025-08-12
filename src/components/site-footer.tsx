import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { Button } from "./ui/button";

export function SiteFooter() {
  const navLinks = [
    { href: "/#works", label: "Проекты" },
    { href: "/about", label: "Обо мне" },
    { href: "/contact", label: "Контакты" },
  ];

  return (
    <footer id="contact" className="bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 py-8">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-sm">
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a href="mailto:sara.chen@example.com" className="text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
              <a href="https://telegram.me/sarachen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                <Send className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </a>
                <Button asChild variant="outline" size="sm" className="rounded-lg border-border/50 hover:bg-accent/10 hover:border-accent/30 hover:text-foreground transition-all duration-200 shadow-xs">
                    <a href="https://kwork.ru/user/klon_008" target="blank">Фриланс</a>
                </Button>
            </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} klon_008. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
