export const config = { runtime: 'edge' };

const ORIGIN = 'http://77.42.120.127';
const WS_PATH = '/vless';

export default async function handler(request) {
  const url = new URL(request.url);
  const upgrade = request.headers.get('upgrade');

  if (upgrade && upgrade.toLowerCase() === 'websocket' && url.pathname === WS_PATH) {
    const target = ORIGIN + WS_PATH;
    const newHeaders = new Headers(request.headers);
    newHeaders.set('Host', '77.42.120.127');

    return fetch(target, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
    });
  }

  return new Response('OK', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
