import {DocumentNode, gql} from '@apollo/client';

export const projectListQuery = (): DocumentNode => {
  return gql`
    query {
      projects {
        id
        product_name
        primary_background_logo
        created_at
        primary_font_color
        landing_sub_heading
        primary_color
        primary_logo
      }
    }
  `;
};

export const projectByIdQuery = gql`
  query projects($project_id: ID) {
    projects(project_id: $project_id) {
      id
      product_id
      product_name
      project_template
      app_id
      app_certificate
      primary_color
      frontend_endpoint
      backend_endpoint
      pstn
      precall
      primary_logo
      primary_square_logo
      primary_background_logo
      chat
      cloud_recording
      screen_sharing
      encryption_enabled
      landing_sub_heading
      primary_font_color
      secondary_font_color
      sentry_dsn
      enable_google_oauth
      enable_apple_oauth
      enable_slack_oauth
      enable_microsoft_oauth
      google_client_id
      google_client_secret
      microsoft_client_id
      microsoft_client_secret
      slack_client_id
      slack_client_secret
      apple_client_id
      apple_private_key
      apple_key_id
      apple_team_id
      customer_id
      customer_certificate
      bucket_name
      recording_region
      bucket_access_key
      bucket_access_secret
      pstn_email
      pstn_password
      pstn_account
      video_profile
      frontend_deploy_status
      backend_deploy_status
      frontend_endpoint
      backend_endpoint
    }
  }
`;

export const getUserEmailQuery = (): DocumentNode => {
  return gql`
    query user {
      user {
        email
      }
    }
  `;
};

export const getHerokuDeployStatus = gql`
  query heroku($project_id: ID!) {
    heroku(project_id: $project_id) {
      status
      url
    }
  }
`;
export const getVercelDeployStatus = gql`
  query vercel($project_id: ID!) {
    vercel(project_id: $project_id) {
      status
      url
    }
  }
`;