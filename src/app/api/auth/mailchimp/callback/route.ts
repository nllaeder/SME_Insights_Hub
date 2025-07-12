import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

// This is a placeholder for secure token storage.
// In a real application, this would use a secure database or a secret manager.
async function storeToken(userId: string, service: string, token: any) {
  console.log(`Storing token for user ${userId}, service ${service}:`, token);
  // In a real app, you would securely store the token for the user.
  // For this prototype, we'll just log it.
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    // Handle the error case where the user denied access or an error occurred
    return new Response('Authorization failed or was denied.', { status: 400 });
  }

  const clientId = process.env.MAILCHIMP_CLIENT_ID;
  const clientSecret = process.env.MAILCHIMP_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/mailchimp/callback`;
  
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
  await storeToken('user-123', 'mailchimp', {
      accessToken: accessToken,
      apiEndpoint: apiEndpoint,
      dc: metadata.dc,
  });

  // Redirect user to the dashboard connect page
  redirect('/dashboard/connect?status=success&source=mailchimp');
}
