import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const navLinks = [
    { href: "/#works", label: "Проекты" },
    { href: "/about", label: "Обо мне" },
    { href: "/contact", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-secondary/50 border-border/50 relative mx-auto flex max-w-full items-center justify-between border-b px-6 py-3 md:w-fit md:rounded-b-2xl lg:gap-4 backdrop-blur-sm">
        <Link href="/" className="font-semibold">
          klon_hub
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
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
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="rounded-lg border-border/50 hover:bg-accent/10 hover:border-accent/30 hover:text-foreground transition-all duration-200 shadow-xs">
                <a href="https://kwork.ru/user/klon_008" target="blank">Фриланс</a>
            </Button>
        </div>
      </div>
    </header>
  );
}
