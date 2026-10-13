import { NextRequest, NextResponse } from 'next/server';
import { handleFormRequest, processTrial } from '../../../lib/site/leadForms';
import { sendWithResend } from '../../../lib/site/resendSender';

export async function POST(req: NextRequest) {
  const { status, body } = await handleFormRequest(req, processTrial, sendWithResend, "Erreur lors de l'envoi.");
  return NextResponse.json(body, { status });
}
