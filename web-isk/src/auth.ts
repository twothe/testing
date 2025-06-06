export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
  obtainedAt: number
}

const ssoBase = 'https://login.eveonline.com/v2'

function base64UrlEncode(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function generateCodeVerifier(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return base64UrlEncode(array.buffer)
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return base64UrlEncode(digest)
}

export function buildAuthorizeUrl(verifier: string, challenge: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_EVE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_EVE_REDIRECT_URI,
    scope: 'esi-wallet.read_character_wallet.v1 esi-industry.read_character_jobs.v1 esi-industry.read_character_mining.v1',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state: verifier,
  })
  return `${ssoBase}/oauth/authorize?${params.toString()}`
}

export async function fetchToken(code: string, verifier: string): Promise<AuthToken> {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: import.meta.env.VITE_EVE_CLIENT_ID,
    code_verifier: verifier,
  })
  const res = await fetch(`${ssoBase}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })
  if (!res.ok) throw new Error('Token request failed')
  const data = await res.json()
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    obtainedAt: Date.now(),
  }
}
