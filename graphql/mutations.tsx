import {gql} from '@apollo/client';

// type Project {
//     id: ID!
//     product_id: String!
//     product_name: String!
//     app_id: String!
//     app_certificate: String!
//     primary_color: String!
//     frontend_endpoint: String!
//     backend_endpoint: String!
//     pstn: Boolean!
//     precall: Boolean!
//     primary_logo: String!
//     primary_square_logo: String!
//     primary_background_logo: String!
//     chat: Boolean!
//     project_template: ProjectPreset!
//     cloud_recording: Boolean!
//     screen_sharing: Boolean!
//     encryption_enabled: Boolean!
//     landing_sub_heading: String!
//     primary_font_color: String!
//     secondary_font_color: String!
//     sentry_dsn: String!
//     enable_google_oauth: Boolean!
//     enable_apple_oauth: Boolean!
//     enable_slack_oauth: Boolean!
//     enable_microsoft_oauth: Boolean!
//     google_client_id: String!
//     google_client_secret: String!
//     microsoft_client_id: String!
//     microsoft_client_secret: String!
//     slack_client_id: String!
//     slack_client_secret: String!
//     apple_client_id: String!
//     apple_private_key: String!
//     apple_key_id: String!
//     apple_team_id: String!
//     customer_id: String!
//     customer_certificate: String!
//     bucket_name: String!
//     recording_region: Int!
//     bucket_access_key: String!
//     bucket_access_secret: String!
//     pstn_email: String!
//     pstn_password: String!
//     pstn_account: String!
//     video_profile: String!
//     frontend_deploy_status: DeployStatus!
//     backend_deploy_status: DeployStatus!
//     created_at: Time!
//     updated_at: Time!
// }

export const userCreateInput = gql`
  mutation ($data: UserCreateInput!) {
    signupUser(data: $data) {
      id
      name
      username
      projects {
        id
        createdAt
        updatedAt
        title
        ownerId
      }
    }
  }
`;

export const createNewProjectMutation = gql`
  mutation createProject($product_name: String!, $preset: ProjectPreset!) {
    createProject(product_name: $product_name, preset: $preset) {
      id
      product_id
      product_name
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
      raise_hand
      event_mode
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
    }
  }
`;

export const publishToHerokuMutation = gql`
  mutation publishToHeroku($project_id: ID!) {
    publishToHeroku(project_id: $project_id) {
      status
      url
    }
  }
`;
export const publishToVercelMutation = gql`
  mutation publishToVercel($project_id: ID!) {
    publishToVercel(project_id: $project_id) {
      status
      url
    }
  }
`;
