import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { GOOGLE_APPS_SCRIPT_URL } from 'astro:env/server';

export const server = {
  subscribe: defineAction({
    input: z.object({
      email: z.string().email(),
      name: z.string().optional()
    }),
    handler: async ({ email, name }) => {
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email })
        });
        const result = await response.json();
        if (result.success) return;
        throw new ActionError({
          code: 'SERVICE_UNAVAILABLE',
          message: 'Failed to subscribe. Please try again later.'
        });
      } catch (error) {
        console.error('Apps Script request failed:', error);
        throw new ActionError({
          code: 'SERVICE_UNAVAILABLE',
          message: 'Failed to subscribe. Please try again later.'
        });
      }
    }
  })
};
