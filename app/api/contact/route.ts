import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subjectLabels: Record<string, string> = {
      demo: 'Demande de démonstration',
      pricing: 'Question sur les tarifs',
      support: 'Support technique',
      partnership: 'Partenariat',
      other: 'Autre',
    };

    await resend.emails.send({
      from: 'Targetym AI <onboarding@resend.dev>',
      to: ['sales@agiltym.com', 'h.cakpo@hcexecutive.net'],
      reply_to: email,
      subject: `[Contact Targetym] ${subjectLabels[subject] ?? subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#4f46e5;">Nouveau message depuis le site Targetym</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:140px;">Nom</td><td style="padding:8px;">${name}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Entreprise</td><td style="padding:8px;">${company || '—'}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Téléphone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Sujet</td><td style="padding:8px;">${subjectLabels[subject] ?? subject}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;">
            <p style="font-weight:bold;margin-bottom:8px;">Message :</p>
            <p style="white-space:pre-wrap;margin:0;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact route]', err);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message.' }, { status: 500 });
  }
}
