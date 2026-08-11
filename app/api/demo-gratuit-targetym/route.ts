import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml } from '../../../lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, whatsapp, email, jobTitle, company } = body;

    if (!firstName || !lastName || !whatsapp || !email) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: 'Targetym AI <noreply@targetym.ai>',
      to: 'sales@agiltym.com',
      replyTo: email,
      subject: `[Événement Odoo] ${firstName} ${lastName}${company ? ' — ' + company : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:700px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#066C6C,#0AAE8E);padding:24px 32px;border-radius:12px 12px 0 0;">
            <h2 style="color:#fff;margin:0;font-size:22px;">🎪 Nouveau contact — Événement Odoo</h2>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;">Targetym AI — Demande de démo gratuite</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Prénom</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(firstName)}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Nom</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(lastName)}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">WhatsApp</td><td style="padding:10px 12px;color:#111827;"><a href="tel:${escapeHtml(whatsapp)}" style="color:#066C6C;">${escapeHtml(whatsapp)}</a></td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Email</td><td style="padding:10px 12px;color:#111827;"><a href="mailto:${escapeHtml(email)}" style="color:#066C6C;">${escapeHtml(email)}</a></td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Profession</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(jobTitle || '—')}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Entreprise</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(company || '—')}</td></tr>
            </table>

            <div style="margin-top:24px;padding:16px;background:#e6f5f5;border-radius:8px;border-left:4px solid #066C6C;">
              <p style="margin:0;color:#066C6C;font-weight:600;">✅ Action recommandée</p>
              <p style="margin:6px 0 0;color:#374151;">Recontacter ${escapeHtml(firstName)} rapidement suite à sa demande lors de l'événement Odoo.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[demo-gratuit-targetym route] Resend error:', JSON.stringify(error));
      return NextResponse.json({ error: 'Erreur lors de l\'envoi.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[demo-gratuit-targetym route]', err);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi.' }, { status: 500 });
  }
}
