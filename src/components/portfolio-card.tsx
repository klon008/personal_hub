"use client";

import { MoveRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PortfolioCardProps {
  project: Project;
  index: number;
}

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group block">
      <div
        className="animate-in fade-in flex h-full flex-col rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
        style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
      >
          <div className="mb-4">
            <Image 
              src={project.icon} 
              alt={`${project.title} icon`} 
              width={56} 
              height={56} 
              className="h-14 w-14 rounded-sm object-contain"
            />
          </div>

          <h3 className="font-semibold text-lg text-navy-900">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-4">
            {project.description}
          </p>
          <div className="mt-4">
             <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                Посмотреть проект
                <MoveRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
      </div>
    </a>
  );
}
