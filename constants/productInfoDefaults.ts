enum ProjectPreset {
  MEETING = 'MEETING',
  EVENTS = 'EVENTS',
}
export enum DeployStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILURE = 'FAILURE',
  NONE = 'NONE',
}
export interface IProductInfoDefaultObj {
  id: string;
  product_id: string;
  product_name: string;
  app_id: string;
  app_certificate: string;
  primary_color: string;
  frontend_endpoint: string;
  backend_endpoint: string;
  pstn: Boolean;
  precall: Boolean;
  primary_logo: string;
  primary_square_logo: string;
  primary_background_logo: string;
  chat: Boolean;
  project_template: ProjectPreset;
  cloud_recording: Boolean;
  screen_sharing: Boolean;
  encryption_enabled: Boolean;
  landing_sub_heading: string;
  primary_font_color: string;
  secondary_font_color: string;
  sentry_dsn: string;
  enable_google_oauth: Boolean;
  enable_apple_oauth: Boolean;
  enable_slack_oauth: Boolean;
  enable_microsoft_oauth: Boolean;
  google_client_id: string;
  google_client_secret: string;
  microsoft_client_id: string;
  microsoft_client_secret: string;
  slack_client_id: string;
  slack_client_secret: string;
  apple_client_id: string;
  apple_private_key: string;
  apple_key_id: string;
  apple_team_id: string;
  customer_id: string;
  customer_certificate: string;
  bucket_name: string;
  recording_region: string;
  bucket_access_key: string;
  bucket_access_secret: string;
  pstn_email: string;
  pstn_password: string;
  pstn_account: string;
  scheme: string;
  video_profile: string;
  heading: string;
  backend_deploy_status: DeployStatus;
  frontend_deploy_status: DeployStatus;
}

export const productInfoDefaultObj: IProductInfoDefaultObj = {
  id: '',
  product_id: '',
  product_name: '',
  app_id: '',
  app_certificate: '',
  primary_color: '#099DFD',
  frontend_endpoint: '',
  backend_endpoint: '',
  pstn: false,
  precall: true,
  primary_logo: '',
  primary_square_logo: '',
  primary_background_logo: '',
  chat: true,
  project_template: ProjectPreset.MEETING,
  cloud_recording: false,
  screen_sharing: true,
  encryption_enabled: false,
  landing_sub_heading: 'Where business happens online, on time, each time.',
  primary_font_color: '#363636',
  secondary_font_color: '#FFFFFF',
  sentry_dsn: '',
  enable_google_oauth: false,
  enable_apple_oauth: false,
  enable_slack_oauth: false,
  enable_microsoft_oauth: false,
  google_client_id: '',
  google_client_secret: '',
  microsoft_client_id: '',
  microsoft_client_secret: '',
  slack_client_id: '',
  slack_client_secret: '',
  apple_client_id: '',
  apple_private_key: '',
  apple_key_id: '',
  apple_team_id: '',
  customer_id: '',
  customer_certificate: '',
  bucket_name: '',
  recording_region: '',
  bucket_access_key: '',
  bucket_access_secret: '',
  pstn_email: '',
  pstn_password: '',
  pstn_account: '',
  scheme: '',
  video_profile: '',
  backend_deploy_status: DeployStatus.NONE,
  frontend_deploy_status: DeployStatus.NONE,
  // missing properies
  heading: 'Acme',
};

export const productInfoDefaultErrorObj = {
  ProductInformation: {
    ProductName: '',
    ProductId: '',
    ProductDesc: '',
  },
  JoinScreen: {
    Oauth: false,
    ClientID: '',
    ClientSecret: '',
  },
  ConferencingScreen: {
    PSTN: {
      TEmail: '',
      TPassword: '',
    },
    Cloud: {
      CustomerID: '',
      CustomerCertificate: '',
      BucketName: '',
      BucketAccessKey: '',
      BucketAccessSecret: '',
    },
  },
};
