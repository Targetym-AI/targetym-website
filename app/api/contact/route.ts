import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml } from '../../../lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const subjectLabels: Record<string, string> = {
      demo: 'Demande de démonstration',
      pricing: 'Question sur les tarifs',
      support: 'Support technique',
      partnership: 'Partenariat',
      other: 'Autre',
    };

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: 'Targetym AI <noreply@targetym.ai>',
      to: 'sales@agiltym.com',
      replyTo: email,
      subject: `[Contact Targetym] ${subjectLabels[subject] ?? subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#4f46e5;">Nouveau message depuis le site Targetym</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:140px;">Nom</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Entreprise</td><td style="padding:8px;">${escapeHtml(company || '—')}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Téléphone</td><td style="padding:8px;">${escapeHtml(phone || '—')}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Sujet</td><td style="padding:8px;">${escapeHtml(subjectLabels[subject] ?? subject)}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;">
            <p style="font-weight:bold;margin-bottom:8px;">Message :</p>
            <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[contact route] Resend error:', JSON.stringify(error));
      return NextResponse.json({ error: 'Erreur lors de l\'envoi du message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact route]', err);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message.' }, { status: 500 });
  }
}
