import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { getSecret, storeSecret } from '@/lib/secrets';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    // Handle the error case where the user denied access or an error occurred
    return new Response('Authorization failed or was denied.', { status: 400 });
  }

  const clientId = await getSecret('MAILCHIMP_CLIENT_ID');
  const clientSecret = await getSecret('MAILCHIMP_CLIENT_SECRET');
  const redirectUri = `${await getSecret('NEXT_PUBLIC_APP_URL')}/api/auth/mailchimp/callback`;
  
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Mailchimp client ID, secret, or redirect URI is not configured.');
  }

  // Exchange authorization code for an access token
  const tokenResponse = await fetch('https://login.mailchimp.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    const errorBody = await tokenResponse.text();
    console.error('Failed to fetch access token:', errorBody);
    return new Response('Failed to exchange authorization code for token.', { status: 500 });
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Get API metadata to find the correct API endpoint
  const metadataResponse = await fetch('https://login.mailchimp.com/oauth2/metadata', {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
  });

  if (!metadataResponse.ok) {
    const errorBody = await metadataResponse.text();
    console.error('Failed to fetch metadata:', errorBody);
    return new Response('Failed to fetch Mailchimp metadata.', { status: 500 });
  }

  const metadata = await metadataResponse.json();
  const apiEndpoint = metadata.api_endpoint;
  
  // Store the token and metadata securely
  // Using a placeholder user ID "user-123" for this prototype
  const tokenStorageKey = 'user-123-mailchimp-token';
  const tokenDataToStore = JSON.stringify({
      accessToken: accessToken,
      apiEndpoint: apiEndpoint,
      dc: metadata.dc,
  });

  await storeSecret(tokenStorageKey, tokenDataToStore);

  // Redirect user to the dashboard connect page
  redirect('/dashboard/connect?status=success&source=mailchimp');
}