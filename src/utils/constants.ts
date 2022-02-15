export const AuthConstants = {
  config: {
    issuer: "https://dev-68266919.okta.com/oauth2/default",
    clientId: "0oa2z05sdjFOm4LI05d7",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
  },
  roles: {
    USER_ROLE: "local",
    ADMIN_ROLE: "admin",
  },
  postAuthRedirectURI: "/profile",
};
