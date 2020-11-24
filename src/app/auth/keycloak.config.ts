export const KEYCLOAK_CONFIG = {
  "auth-server-url": process.env.SSO_URL,
  "realm": process.env.SSO_REALM || 'nordmart',
  "realm-public-key": process.env.SSO_PUBLIC_KEY,
  "resource": process.env.SSO_CLIENT_ID || 'stakater-nordmart-web',
  "ssl-required": 'external',
  "public-client": true,
  "enable-cors": true,
  "confidential-port": 0
};
