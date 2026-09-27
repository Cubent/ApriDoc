import { Resend } from 'resend';

let client: Resend | undefined;

/**
 * Lazily creates the Resend client. The SDK throws immediately if constructed
 * with no API key, so building it eagerly at module load would crash every
 * route that imports this package whenever RESEND_TOKEN isn't set (e.g. local
 * dev). Callers should check for RESEND_TOKEN themselves before calling this,
 * so they can show a clean error instead of an unhandled exception.
 */
export const getResendClient = () => {
  if (!process.env.RESEND_TOKEN) {
    throw new Error('RESEND_TOKEN is not set');
  }
  client ??= new Resend(process.env.RESEND_TOKEN);
  return client;
};

// Export templates
export * from './templates';
