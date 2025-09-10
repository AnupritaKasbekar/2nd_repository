'use server';

/**
 * @fileOverview AI flow to generate a personalized greeting based on user input.
 *
 * - generatePersonalizedGreeting - Function to generate a personalized greeting.
 * - GeneratePersonalizedGreetingInput - Input type for the function, including the user's name.
 * - GeneratePersonalizedGreetingOutput - Output type, containing the personalized greeting.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedGreetingInputSchema = z.object({
  name: z.string().describe("The user's name."),
});
export type GeneratePersonalizedGreetingInput = z.infer<typeof GeneratePersonalizedGreetingInputSchema>;

const GeneratePersonalizedGreetingOutputSchema = z.object({
  greeting: z.string().describe('A personalized greeting incorporating the user name.'),
});
export type GeneratePersonalizedGreetingOutput = z.infer<typeof GeneratePersonalizedGreetingOutputSchema>;

export async function generatePersonalizedGreeting(
  input: GeneratePersonalizedGreetingInput
): Promise<GeneratePersonalizedGreetingOutput> {
  return generatePersonalizedGreetingFlow(input);
}

const personalizedGreetingPrompt = ai.definePrompt({
  name: 'personalizedGreetingPrompt',
  input: {schema: GeneratePersonalizedGreetingInputSchema},
  output: {schema: GeneratePersonalizedGreetingOutputSchema},
  prompt: `Generate a personalized greeting for the user with the name: {{{name}}}.  Make it sound welcoming and engaging.`,
});

const generatePersonalizedGreetingFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedGreetingFlow',
    inputSchema: GeneratePersonalizedGreetingInputSchema,
    outputSchema: GeneratePersonalizedGreetingOutputSchema,
  },
  async input => {
    const {output} = await personalizedGreetingPrompt(input);
    return output!;
  }
);
