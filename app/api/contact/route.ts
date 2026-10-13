import { NextRequest, NextResponse } from 'next/server';
import { handleFormRequest, processContact } from '../../../lib/site/leadForms';
import { sendWithResend } from '../../../lib/site/resendSender';

export async function POST(req: NextRequest) {
  const { status, body } = await handleFormRequest(req, processContact, sendWithResend, "Erreur lors de l'envoi du message.");
  return NextResponse.json(body, { status });
}
