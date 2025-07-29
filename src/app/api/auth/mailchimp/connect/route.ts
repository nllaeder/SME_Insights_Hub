import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { getSecret } from '@/lib/secrets';

export async function GET(req: NextRequest) {
  try {
    const clientId = await getSecret('MAILCHIMP_CLIENT_ID');
    
    // Dynamically determine the app URL from the request headers
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const appUrl = `${protocol}://${host}`;

    const redirectUri = `${appUrl}/api/auth/mailchimp/callback`;

    const authUrl = new URL('https://login.mailchimp.com/oauth2/authorize');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);

    redirect(authUrl.toString());
  } catch (error) {
    console.error("Error initiating Mailchimp connection:", error);
    // Redirect to an error page or show a message
    redirect('/dashboard/connect?error=mailchimp_config');
  }
}
