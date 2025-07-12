// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a summary of key insights from connected data sources.
 *
 * - generateDataSummary - A function that triggers the data summary generation flow.
 * - GenerateDataSummaryInput - The input type for the generateDataSummary function.
 * - GenerateDataSummaryOutput - The return type for the generateDataSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDataSummaryInputSchema = z.object({
  connectedDataSources: z
    .array(z.string())
    .describe('A list of connected data source names.'),
  data: z.record(z.any()).describe('The combined data from all connected sources.'),
});
export type GenerateDataSummaryInput = z.infer<typeof GenerateDataSummaryInputSchema>;

const GenerateDataSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of key insights, trends, and anomalies.'),
});
export type GenerateDataSummaryOutput = z.infer<typeof GenerateDataSummaryOutputSchema>;

export async function generateDataSummary(input: GenerateDataSummaryInput): Promise<GenerateDataSummaryOutput> {
  return generateDataSummaryFlow(input);
}

const generateDataSummaryPrompt = ai.definePrompt({
  name: 'generateDataSummaryPrompt',
  input: {
    schema: GenerateDataSummaryInputSchema,
  },
  output: {
    schema: GenerateDataSummaryOutputSchema,
  },
  prompt: `You are an AI assistant tasked with summarizing key insights from various data sources.

You are connected to the following data sources: {{connectedDataSources}}

Here is the combined data from these sources:
{{data}}

Your goal is to identify trends, anomalies, and other important information that would be valuable to a business owner.
Provide a concise summary of these insights.
Focus on high-level takeaways and avoid unnecessary details. Make judgements about what to include, and what to ignore.
`, // Added instruction to tool make judgements about what to include, and what to ignore.
});

const generateDataSummaryFlow = ai.defineFlow(
  {
    name: 'generateDataSummaryFlow',
    inputSchema: GenerateDataSummaryInputSchema,
    outputSchema: GenerateDataSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateDataSummaryPrompt(input);
    return output!;
  }
);
