import { NextRequest, NextResponse } from 'next/server';
import { handleFormRequest, processTrial } from '../../../lib/site/leadForms';
import { sendWithResend } from '../../../lib/site/resendSender';
import { verifyWithCloudflare } from '../../../lib/site/turnstile';

export async function POST(req: NextRequest) {
  const { status, body } = await handleFormRequest(req, processTrial, sendWithResend, verifyWithCloudflare, "Erreur lors de l'envoi.");
  return NextResponse.json(body, { status });
}
