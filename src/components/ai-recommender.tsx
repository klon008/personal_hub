"use client";

import * as React from "react";
import { BrainCircuit, Loader2, Sparkles } from "lucide-react";
import type { PortfolioProject } from "@/ai/flows/recommend-alternative-groupings";
import { getAiRecommendations } from "@/app/actions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AiRecommenderProps {
  projects: {
    title: string;
    description: string;
    category: string;
  }[];
}

export function AiRecommender({ projects }: AiRecommenderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [recommendations, setRecommendations] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    const portfolioProjects: PortfolioProject[] = projects.map((p) => ({
      title: p.title,
      description: p.description,
      category: p.category,
    }));

    try {
      const result = await getAiRecommendations({ projects: portfolioProjects });
      if (result.recommendations) {
        setRecommendations(result.recommendations);
      } else {
        setError("Failed to get recommendations. The result was empty.");
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BrainCircuit className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">AI Recommendations</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline">
            <BrainCircuit className="h-6 w-6 text-primary" />
            AI-Powered Groupings
          </DialogTitle>
          <DialogDescription>
            Let AI analyze your projects and suggest new, creative ways to
            group them.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing projects...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : recommendations.length > 0 ? (
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Here are some alternative category suggestions:</p>
              <ul className="list-disc space-y-2 pl-5">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-foreground">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
             <div className="text-center text-sm text-muted-foreground">
                Click the button below to get started.
            </div>
          )}
        </div>

        <Button
          onClick={handleGetRecommendations}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {recommendations.length > 0 ? "Regenerate" : "Generate Ideas"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
