import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const clientId = process.env.MAILCHIMP_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/mailchimp/callback`;

  if (!clientId || !redirectUri) {
    throw new Error('Mailchimp client ID or redirect URI is not configured.');
  }

  const authUrl = new URL('https://login.mailchimp.com/oauth2/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);

  redirect(authUrl.toString());
}
