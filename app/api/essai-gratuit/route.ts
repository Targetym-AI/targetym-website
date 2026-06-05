import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone, jobTitle, company,
      sector, companySize, country, city,
      currentTools, mainChallenges, mainObjectives, howDidYouHear, message
    } = body;

    if (!firstName || !lastName || !email || !phone || !company || !jobTitle) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Targetym Website" <${process.env.SMTP_USER}>`,
      to: 'sales@agiltym.com, h.cakpo@hcexecutive.net',
      replyTo: email,
      subject: `[Essai Gratuit] ${firstName} ${lastName} — ${company}`,
      html: `
        <div style="font-family:sans-serif;max-width:700px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#066C6C,#0AAE8E);padding:24px 32px;border-radius:12px 12px 0 0;">
            <h2 style="color:#fff;margin:0;font-size:22px;">🚀 Nouvelle demande d'essai gratuit</h2>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;">Targetym AI — Formulaire de qualification</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px 32px;">

            <h3 style="color:#066C6C;font-size:16px;margin:0 0 16px;">👤 Informations personnelles</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Prénom</td><td style="padding:10px 12px;color:#111827;">${firstName}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Nom</td><td style="padding:10px 12px;color:#111827;">${lastName}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Email professionnel</td><td style="padding:10px 12px;color:#111827;"><a href="mailto:${email}" style="color:#066C6C;">${email}</a></td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Téléphone</td><td style="padding:10px 12px;color:#111827;"><a href="tel:${phone}" style="color:#066C6C;">${phone}</a></td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Poste / Fonction</td><td style="padding:10px 12px;color:#111827;">${jobTitle}</td></tr>
            </table>

            <h3 style="color:#066C6C;font-size:16px;margin:0 0 16px;">🏢 Informations entreprise</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Entreprise</td><td style="padding:10px 12px;color:#111827;">${company}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Secteur d'activité</td><td style="padding:10px 12px;color:#111827;">${sector || '—'}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Taille de l'entreprise</td><td style="padding:10px 12px;color:#111827;">${companySize || '—'}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Pays</td><td style="padding:10px 12px;color:#111827;">${country || '—'}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Ville</td><td style="padding:10px 12px;color:#111827;">${city || '—'}</td></tr>
            </table>

            <h3 style="color:#066C6C;font-size:16px;margin:0 0 16px;">🎯 Qualification commerciale</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Outils RH actuels</td><td style="padding:10px 12px;color:#111827;">${currentTools || '—'}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Principaux défis RH</td><td style="padding:10px 12px;color:#111827;">${mainChallenges || '—'}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Objectifs principaux</td><td style="padding:10px 12px;color:#111827;">${mainObjectives || '—'}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Source / Comment nous a-t-il connu ?</td><td style="padding:10px 12px;color:#111827;">${howDidYouHear || '—'}</td></tr>
            </table>

            ${message ? `
            <h3 style="color:#066C6C;font-size:16px;margin:0 0 12px;">💬 Message complémentaire</h3>
            <div style="background:#f9fafb;border-radius:8px;padding:16px;color:#111827;white-space:pre-wrap;">${message}</div>
            ` : ''}

            <div style="margin-top:24px;padding:16px;background:#e6f5f5;border-radius:8px;border-left:4px solid #066C6C;">
              <p style="margin:0;color:#066C6C;font-weight:600;">✅ Action recommandée</p>
              <p style="margin:6px 0 0;color:#374151;">Contacter ${firstName} dans les 24h pour planifier la présentation (1h–1h30).</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[essai-gratuit route]', err);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi.' }, { status: 500 });
  }
}
