import { NextRequest, NextResponse } from 'next/server';
import { handleFormRequest, processDemo } from '../../../lib/site/leadForms';
import { sendWithResend } from '../../../lib/site/resendSender';
import { verifyWithCloudflare } from '../../../lib/site/turnstile';

export async function POST(req: NextRequest) {
  const { status, body } = await handleFormRequest(req, processDemo, sendWithResend, verifyWithCloudflare, "Erreur lors de l'envoi.");
  return NextResponse.json(body, { status });
}
