import { Resend } from 'resend';
import { LEAD_RECIPIENTS } from '../lead-recipients';
import type { SendLead } from './leadForms';

/* Seul point du site qui appelle Resend pour les formulaires publics. */
export const sendWithResend: SendLead = async ({ replyTo, subject, html }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: 'Targetym AI <noreply@targetym.ai>',
    to: LEAD_RECIPIENTS,
    replyTo,
    subject,
    html,
  });
};
