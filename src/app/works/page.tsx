"use client";

import * as React from "react";
import {
  ArrowDownUp,
  Filter,
  Plus
} from "lucide-react";

import type { Project } from "@/lib/types";
import { initialProjects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PortfolioCard } from "@/components/portfolio-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function WorksSection() {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [activeCategory, setActiveCategory] = React.useState<string>("Все");
  const [sortOption, setSortOption] = React.useState<string>("date-desc");

  const categories = React.useMemo(() => {
      const allCategories = new Set(initialProjects.flatMap((p) => p.category));
    return ["Все", ...Array.from(allCategories)];
  }, []);

  const filteredAndSortedProjects = React.useMemo(() => {
    let result = [...projects];

    if (activeCategory !== "Все") {
        result = result.filter((p) => p.category.includes(activeCategory));
    }

    const [sortBy, order] = sortOption.split("-");

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "name") {
        comparison = a.title.localeCompare(b.title);
      }

      return order === "asc" ? -comparison : comparison;
    });

    return result;
  }, [projects, activeCategory, sortOption]);

  return (
    <section id="works" className="py-20 sm:py-32 bg-slate-50">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
            <h2 className="text-4xl font-semibold tracking-tight bg-[linear-gradient(135deg,_#2563eb_0%,_#3b82f6_50%,_#60a5fa_100%)] bg-clip-text text-transparent">Избранные проекты</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-slate-500 md:text-lg">
             Подборка работ, демонстрирующих мои навыки в веб‑разработке, мобильных приложениях, дизайне и бэкенде.
            </p>
        </div>
        
        <Card className="mb-8 bg-transparent shadow-none border-0">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-0">
                 <div className="flex flex-wrap items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full"
                    >
                        {category}
                    </Button>
                    ))}
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                        <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Сортировать по" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date-desc">Дата: Новые</SelectItem>
                            <SelectItem value="date-asc">Дата: Старые</SelectItem>
                            <SelectItem value="name-asc">Название: А-Я</SelectItem>
                            <SelectItem value="name-desc">Название: Я-А</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAndSortedProjects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index}/>
          ))}
        </div>

        {filteredAndSortedProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-20 text-center">
                <h3 className="text-xl font-semibold text-navy-900">No projects found</h3>
                <p className="text-slate-500">Try adjusting your filters or add a new project.</p>
                <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
            </div>
        )}
        </div>
    </section>
  );
}


export default function WorksPage() {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <WorksSection />
        </main>
        <SiteFooter />
      </div>
    );
  }
