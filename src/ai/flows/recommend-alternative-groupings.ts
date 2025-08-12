'use server';

/**
 * @fileOverview An AI agent that analyzes portfolio projects and recommends alternative groupings.
 *
 * - recommendAlternativeGroupings - A function that takes a list of portfolio projects and returns recommended groupings.
 * - PortfolioProject - The input type for a single portfolio project.
 * - RecommendAlternativeGroupingsInput - The input type for the recommendAlternativeGroupings function.
 * - RecommendAlternativeGroupingsOutput - The return type for the recommendAlternativeGroupings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioProjectSchema = z.object({
  title: z.string().describe('The title of the portfolio project.'),
  description: z.string().describe('A brief description of the project.'),
  category: z.string().describe('The current category of the project.'),
});
export type PortfolioProject = z.infer<typeof PortfolioProjectSchema>;

const RecommendAlternativeGroupingsInputSchema = z.object({
  projects: z.array(PortfolioProjectSchema).describe('A list of portfolio projects to analyze.'),
});
export type RecommendAlternativeGroupingsInput = z.infer<typeof RecommendAlternativeGroupingsInputSchema>;

const RecommendAlternativeGroupingsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended alternative groupings for the projects.'),
});
export type RecommendAlternativeGroupingsOutput = z.infer<typeof RecommendAlternativeGroupingsOutputSchema>;

export async function recommendAlternativeGroupings(input: RecommendAlternativeGroupingsInput): Promise<RecommendAlternativeGroupingsOutput> {
  return recommendAlternativeGroupingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendAlternativeGroupingsPrompt',
  input: {schema: RecommendAlternativeGroupingsInputSchema},
  output: {schema: RecommendAlternativeGroupingsOutputSchema},
  prompt: `You are an expert portfolio curator. Analyze the following portfolio projects and recommend alternative groupings based on their content and descriptions. Provide a list of categories that would reorganize these projects in unexpected ways. Focus on grouping projects by themes that might not be immediately obvious. 

Projects:
{{#each projects}}
  - Title: {{this.title}}
    Description: {{this.description}}
    Current Category: {{this.category}}
{{/each}}`,
});

const recommendAlternativeGroupingsFlow = ai.defineFlow(
  {
    name: 'recommendAlternativeGroupingsFlow',
    inputSchema: RecommendAlternativeGroupingsInputSchema,
    outputSchema: RecommendAlternativeGroupingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
