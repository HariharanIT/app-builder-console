const BACKEND_URL = 'https://rteappbuilder.com';
const HEROKU_CLIENT_ID = '50a0133a-f861-42fd-8167-c2da533789dd';
const AGORA_SSO_CLIENT_ID = 'ece4e8acaa5e488ab5109d3fc66df72b';
const VERCEL_URL = 'https://vercel.com/integrations/app-builder-preprod/new';
const HEROKU_URL = 'https://id.heroku.com/oauth/authorize';
const REDIRECT_URL = 'https://rteappbuilder.com/auth';
const AGORA_SSO_SIGNUP = 'https://sso2.agora.io/en/signup';
const AGORA_SSO_LOGIN = 'https://sso2.agora.io/api/v0/oauth/authorize';

// SSO URL, use production and not staging. Meaning: https://sso2.agora.io/api/v0 over http://sso2.staging.agora.io/api/v0.

export {
  BACKEND_URL,
  HEROKU_CLIENT_ID,
  AGORA_SSO_CLIENT_ID,
  VERCEL_URL,
  REDIRECT_URL,
  AGORA_SSO_SIGNUP,
  AGORA_SSO_LOGIN,
  HEROKU_URL,
};

// const BACKEND_URL = 'https://rteappbuilder.com';
// const HEROKU_CLIENT_ID = '50a0133a-f861-42fd-8167-c2da533789dd';
// const AGORA_SSO_CLIENT_ID = 'ece4e8acaa5e488ab5109d3fc66df72b';
// const VERCEL_URL = 'https://vercel.com/integrations/app-builder-preprod';
// const REDIRECT_URL = 'https://rteappbuilder.com';
// const AGORA_SSO_URL = 'https://sso2.agora.io/api/v0';

// signup;
// ('https://sso2.agora.io/en/signup?response_type=code&client_id=ece4e8acaa5e488ab5109d3fc66df72b&redirect_uri=https://staging1.rteappbuilder.com/auth/agora&scope=basic_info');
// Login;
//     {`https://sso2.agora.io/api/v0/oauth/authorize?scope=basic_info&response_type=code&state=url=${window.location.origin}/redirect&redirect_uri=https://staging1.rteappbuilder.com/auth/agora&client_id=ece4e8acaa5e488ab5109d3fc66df72b`}>
