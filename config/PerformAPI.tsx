import client from '../config/apollo';
import {
  projectList,
  projectById,
  projectByIdPooling,
  projectByProductId,
  getUserEmail,
  listAgoraProjects,
} from '../config/query';
import {
  projectCreateInput,
  updateProject,
  deleteProject,
  createAgoraProject,
} from './dataOpration';
import {uploadFile, deployToHeroku, deployToVercel} from './REST_API';
import {dataURLtoFile} from '../helper/utils'
const themeJson = {
  layoutProps: {topPinned: false},
  primaryButton: {
    width: '100%',
    backgroundColor: '#00AEFC',
    borderRadius: 100,
    maxWidth: 450,
    minWidth: 200,
    minHeight: 45,
  },
  primaryButtonText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
  secondaryBtn: {
    width: '100%',
    borderColor: '#00AEFC',
    borderWidth: 1,
    borderRadius: 100,
    maxWidth: 450,
    minWidth: 200,
    minHeight: 45,
  },
  secondaryButtonText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    textAlignVertical: 'center',
    color: '#000',
  },
  textInput: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#00AEFC',
    borderRadius: 100,
    borderWidth: 1,
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    maxWidth: 450,
    minHeight: 45,
  },
  videoView: {
    flex: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  navHolder: {
    width: '100%',
    height: '6%',
    minHeight: 20,
    backgroundColor: '#f1f4f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  controlsHolder: {
    minHeight: 50,
    maxHeight: '8%',
    backgroundColor: '#f1f4f9',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    margin: 0,
    bottom: 0,
  },
  localButton: {
    backgroundColor: '#fff',
    borderRadius: 23,
    width: 46,
    height: 46,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: '70%',
    height: '70%',
    tintColor: '#00AEFC',
  },
};
interface ConfigInterface {
  project_template: string;
  app_backend_deploy_status: string;
  id: String;
  checked?: boolean;
  name?: string;
  projectName: string;
  displayName: string;
  primary_logo: string;
  primary_bg_logo: string;
  primary_square_logo: string;
  bg: string;
  agora_app_id: string;
  primary_color: string;
  primaryFontColor: string;
  secondaryFontColor: string;
  frontEndURL: string;
  backEndURL: string;
  pstn_dial_in: false;
  precall_screen: false;
  chat: false;
  cloud_recording: false;
  screen_share: false;
  agora_app_certificate: string;
  agora_customer_id: string;
  agora_customer_certificate: string;
  s3_bucket_name: string;
  s3_bucket_access_key: string;
  s3_bucket_access_secret: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  REDIRECT_URL: string;
  pstn_turbo_bridge_name: string;
  pstn_turbo_bridge_password: string;
  title: string;
  description: string;
  video_encryption: false;
  ENABLE_GOOGLE_OAUTH: false;
  ENABLE_MICROSOFT_OAUTH: false;
  ENABLE_SLACK_OAUTH: false;
  ENABLE_APPLE_OAUTH: false;
  s3_bucket_region: string;
  code: String;
}

export const getprojectsList = async (skipData: number) => {
  let output: boolean = false;
  const response = await client.query({query: projectList(skipData)});
  if (response.data) {
    output = response.data;
  }
  return output;
};

interface AgoraProject {
  app_id: string;
  app_secret: string;
  project_name: string;
  vendor_id: number;
}
export const getAgoraProjectsList = async () => {
  let output: AgoraProject[] = [];
  const response = await client.query({query: listAgoraProjects()});
  if (response.data) {
    output = response.data.listAgoraProjects;
  }
  return output;
};

export const getprojectById = async (id: string) => {
  let output: boolean = false;
  if (id !== null) {
    const response = await client.query({query: projectById(id.toString())});
    if (response.data) {
      let projectInfo = response.data;
       if(response.data?.projectById) {
        projectInfo = {projectById: {...response.data?.projectById}};
        // special case for frontend url. If it doesn't contains the https protocol then add it
       const app_frontend_url  = projectInfo?.projectById?.app_frontend_url;
       if(app_frontend_url && app_frontend_url.indexOf('https://') !== 0) {
        projectInfo.projectById.app_frontend_url = `https://${app_frontend_url}`
       }
       } 
     
      output = projectInfo;

     
    }
  }
  return output;
};
export const getLoggedInUser = async () => {
  let output: {email: string; id: number} = {email: '', id: 0};
  // if (id !== null) {
  const response = await client.query({query: getUserEmail()});
  if (response.data) {
    output = response.data.getUserEmail;
  }
  // }
  return output;
};

export const getprojectByIdPooling = async (id: string) => {
  let output: boolean = false;
  if (id !== null) {
    const response = await client.query({
      query: projectByIdPooling(id.toString()),
    });
    if (response.data) {
      output = response.data;
    }
  }
  return output;
};
export const checkProductId = async (id: string) => {
  let output: boolean = false;
  if (id !== null) {
    const response = await client.query({
      query: projectByProductId(id.toString()),
    });
    if (response.data) {
      console.log(response);
      output = response.data.projectByProductId
        ? response.data.projectByProductId.productId
        : false;
    }
  }
  return output;
};
export const createProjectData = async (data: ConfigInter, title: String) => {
  let output: boolean = false;
  if (data) {
    const newData: ConfigInter = await convertToqueryVariable(data, title);
    const response = await client.mutate({
      mutation: projectCreateInput,
      variables: {data: newData},
    });
    if (response.data) {
      output = response.data;
    }
  }
  return output;
};

export const createAgoraProjectData = async (name: AgoraProjectInterface) => {
  let output: boolean = false;
  if (name) {
    console.log({name});
    const response = await client.mutate({
      mutation: createAgoraProject,
      variables: {name: name.name},
    });
    if (response.data) {
      output = response.data;
    }
  }
  return output;
};

export const deleteProjectData = async (id: String) => {
  let output: boolean = false;
  if (id) {
    const response = await client.mutate({
      mutation: deleteProject,
      variables: {id: id},
    });
    if (response.data) {
      output = response.data;
    }
  }
  return output;
};
export const updateProjectData = async (data: ConfigInter) => {
  let output: boolean = false;
  if (data) {
    try {
      const newData: ConfigInter = await convertToqueryVariable(data, '');
      const response = await client.mutate({
        mutation: updateProject,
        variables: {data: newData},
      });
      if (response.data) {
        output = response.data;
      }
    } catch (err) {
      alert(err);
    }
  }
  return output;
};

export const deployHeroku = async (code: string, data: ConfigInter) => {
  try {
    let output: boolean = false;
    if (code && code !== '' && data) {
      const newData = convertToHeroku(code, data);
      const response = await deployToHeroku(newData);
      output = response;
    }
    return output;
  } catch (err) {
    throw err;
  }
};

export const deployVercel = async (code: string, data: ConfigInter) => {
  try {
    let output: boolean = false;
    if (code && code !== '' && data) {
      const newData = convertToVercel(code, data);
      const response = await deployToVercel(newData);
      output = response;
    }
    return output;
  } catch (err) {
    throw err;
  }
};

interface ConfigInter {
  app_backend_deploy_status: String;
  Product_id: string;
  id: string;
  checked?: boolean;
  name?: string;
  projectName: string;
  displayName: string;
  logoRect: string;
  logoSquare: string;
  bg: string;
  AppID: string;
  primaryColor: string;
  primaryFontColor: string;
  secondaryFontColor: string;
  frontEndURL: string;
  backEndURL: string;
  pstn: false;
  precall: false;
  chat: false;
  cloudRecording: false;
  screenSharing: false;
  APP_CERTIFICATE: string;
  CUSTOMER_ID: string;
  CUSTOMER_CERTIFICATE: string;
  BUCKET_NAME: string;
  BUCKET_ACCESS_KEY: string;
  BUCKET_ACCESS_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  MICROSOFT_CLIENT_ID: string;
  MICROSOFT_CLIENT_SECRET: string;
  SLACK_CLIENT_ID: string;
  SLACK_CLIENT_SECRET: string;
  APPLE_CLIENT_ID: string;
  APPLE_KEY_ID: string;
  APPLE_PRIVATE_KEY: string;
  APPLE_TEAM_ID: string;
  REDIRECT_URL: string;
  PSTN_EMAIL: string;
  PSTN_ACCOUNT: string;
  PSTN_PASSWORD: string;
  HEADING: string;
  SUBHEADING: string;
  encryption: false;
  ENABLE_GOOGLE_OAUTH: false;
  ENABLE_MICROSOFT_OAUTH: false;
  ENABLE_SLACK_OAUTH: false;
  ENABLE_APPLE_OAUTH: false;
  RECORDING_REGION: string;
  project_template: string;
  sentry_dsn: string;
}

interface AgoraProjectInterface {
  name: string;
}
const convertToqueryVariable = async (
  projectState: ConfigInter,
  title: String,
) => {
  const newData: ConfigInterface | any = {};
  if (projectState.id) {
    newData.id = projectState.id.toString();
  }
  newData.productId = projectState.Product_id;
  newData.project_template = projectState.project_template;
  newData.agora_app_certificate = projectState.APP_CERTIFICATE;
  newData.agora_app_id = projectState.AppID;
  newData.agora_customer_certificate = projectState.CUSTOMER_CERTIFICATE;
  newData.agora_customer_id = projectState.CUSTOMER_ID;
  newData.chat = projectState.chat;
  newData.cloud_recording = projectState.cloudRecording;
  newData.description = projectState.SUBHEADING;
  newData.precall_screen = projectState.precall;
  newData.google_client_id = projectState.GOOGLE_CLIENT_ID;
  newData.google_client_secret = projectState.GOOGLE_CLIENT_SECRET;
  newData.enable_google_oauth = projectState.ENABLE_GOOGLE_OAUTH;
  newData.enable_microsoft_oauth = projectState.ENABLE_MICROSOFT_OAUTH;
  newData.enable_slack_oauth = projectState.ENABLE_SLACK_OAUTH;
  newData.enable_apple_oauth = projectState.ENABLE_APPLE_OAUTH;
  newData.microsoft_client_id = projectState.MICROSOFT_CLIENT_ID;
  newData.microsoft_client_secret = projectState.MICROSOFT_CLIENT_SECRET;
  newData.slack_client_id = projectState.SLACK_CLIENT_ID;
  newData.slack_client_secret = projectState.SLACK_CLIENT_SECRET;
  newData.apple_client_id = projectState.APPLE_CLIENT_ID;
  newData.apple_private_key = projectState.APPLE_KEY_ID;
  newData.apple_key_id = projectState.APPLE_PRIVATE_KEY;
  newData.apple_team_id = projectState.APPLE_TEAM_ID;
  newData.sentry_dsn = projectState.sentry_dsn;

  if (
    !projectState.bg ||
    (projectState.bg && typeof projectState.bg === 'string' && projectState.bg.includes('http'))
  ) {
    newData.primary_bg_logo = projectState.bg;
  } else if(typeof projectState.bg === 'string'){
    newData.primary_bg_logo = await uploadFile(
      1,
      await dataURLtoFile(projectState.bg, 'bg'),
    );
  }
  else{
    newData.primary_bg_logo = await uploadFile(
      1,
      projectState.bg
    );
  }
  
  if (
    !projectState.logoRect||
    (projectState.logoRect && typeof projectState.logoRect === 'string' && projectState.logoRect.includes('http'))
  ) {
    newData.primary_logo = projectState.logoRect;
  }else if(typeof projectState.logoRect === 'string') {
    newData.primary_logo = await uploadFile(
      1,
      await dataURLtoFile(projectState.logoRect, 'logoRect'),
    );
  }else {
    newData.primary_logo = await uploadFile(
      1,
      projectState.logoRect
    );
  }
  if (
    !projectState.logoSquare ||
    (projectState.logoSquare && typeof projectState.logoSquare === 'string' && projectState.logoSquare.includes('http'))
  ) {
    newData.primary_square_logo = projectState.logoSquare;
  } else if(typeof projectState.logoSquare === 'string') {
    newData.primary_square_logo = await uploadFile(
      1,
      await dataURLtoFile(projectState.logoSquare, 'logoRect'),
    );
  } else {
    newData.primary_square_logo = await uploadFile(
      1,
      projectState.logoSquare
    );
  }
  newData.primary_color = projectState.primaryColor;
  newData.primary_font_color = projectState.primaryFontColor;
  newData.secondary_font_color = projectState.secondaryFontColor;
  newData.pstn_dial_in = projectState.pstn;
  newData.pstn_turbo_bridge_email = projectState.PSTN_EMAIL;
  newData.pstn_turbo_bridge_account = projectState.PSTN_ACCOUNT;
  newData.pstn_turbo_bridge_password = projectState.PSTN_PASSWORD;
  newData.s3_bucket_access_key = projectState.BUCKET_ACCESS_KEY;
  newData.s3_bucket_access_secret = projectState.BUCKET_ACCESS_SECRET;
  newData.s3_bucket_name = projectState.BUCKET_NAME;
  newData.s3_bucket_region = projectState.RECORDING_REGION;
  newData.screen_share = projectState.screenSharing;
  newData.title = title !== '' ? title : projectState.HEADING;
  newData.video_encryption = projectState.encryption;
  return newData;
};

const convertToHeroku = (code: String, herokuState: ConfigInter) => {
  const newData: ConfigInterface | any = {
    code: code,
    project_id: herokuState.id,
    env: {
      ENCRYPTION_ENABLED: herokuState.encryption ? '1' : '0',
      SCHEME: herokuState.Product_id.toLowerCase(),
      APP_ID: herokuState.AppID,
      APP_CERTIFICATE: herokuState.APP_CERTIFICATE,
      CUSTOMER_ID: herokuState.CUSTOMER_ID,
      CUSTOMER_CERTIFICATE: herokuState.CUSTOMER_CERTIFICATE,
      BUCKET_NAME: herokuState.BUCKET_NAME,
      BUCKET_ACCESS_KEY: herokuState.BUCKET_ACCESS_KEY,
      BUCKET_ACCESS_SECRET: herokuState.BUCKET_ACCESS_SECRET,
      GOOGLE_CLIENT_ID: herokuState.ENABLE_GOOGLE_OAUTH
        ? herokuState.GOOGLE_CLIENT_ID
        : '',
      GOOGLE_CLIENT_SECRET: herokuState.ENABLE_GOOGLE_OAUTH
        ? herokuState.GOOGLE_CLIENT_SECRET
        : '',
      MICROSOFT_CLIENT_ID: herokuState.ENABLE_MICROSOFT_OAUTH
        ? herokuState.MICROSOFT_CLIENT_ID
        : '',
      MICROSOFT_CLIENT_SECRET: herokuState.ENABLE_MICROSOFT_OAUTH
        ? herokuState.MICROSOFT_CLIENT_SECRET
        : '',
      SLACK_CLIENT_ID: herokuState.ENABLE_SLACK_OAUTH
        ? herokuState.SLACK_CLIENT_ID
        : '',
      SLACK_CLIENT_SECRET: herokuState.ENABLE_SLACK_OAUTH
        ? herokuState.SLACK_CLIENT_SECRET
        : '',
      APPLE_CLIENT_ID: herokuState.ENABLE_APPLE_OAUTH
        ? herokuState.APPLE_CLIENT_ID
        : '',
      APPLE_PRIVATE_KEY: herokuState.ENABLE_APPLE_OAUTH
        ? herokuState.APPLE_PRIVATE_KEY
        : '',
      APPLE_KEY_ID: herokuState.ENABLE_APPLE_OAUTH
        ? herokuState.APPLE_KEY_ID
        : '',
      APPLE_TEAM_ID: herokuState.ENABLE_APPLE_OAUTH
        ? herokuState.APPLE_TEAM_ID
        : '',
      PSTN_EMAIL: herokuState.PSTN_EMAIL,
      PSTN_ACCOUNT: herokuState.PSTN_ACCOUNT,
      PSTN_PASSWORD: herokuState.PSTN_PASSWORD,
      ENABLE_GOOGLE_OAUTH: herokuState.ENABLE_GOOGLE_OAUTH ? '1' : '0',
      ENABLE_SLACK_OAUTH: herokuState.ENABLE_SLACK_OAUTH ? '1' : '0',
      ENABLE_MICROSOFT_OAUTH: herokuState.ENABLE_MICROSOFT_OAUTH ? '1' : '0',
      ENABLE_APPLE_OAUTH: herokuState.ENABLE_APPLE_OAUTH ? '1' : '0',
      RECORDING_REGION: String(herokuState.RECORDING_REGION),
    },
  };
  return JSON.stringify(newData);
};

const convertToVercel = (code: String, varcelState: any) => {
  const newData: ConfigInterface | any = {
    code: code,
    project_id: varcelState.id,
    configJson: {
      PRODUCT_ID: varcelState.Product_id,
      APP_NAME: varcelState.HEADING,
      LOGO: varcelState.logoRect || "",
      ICON: varcelState.logoSquare ||"",
      APP_ID: varcelState.AppID,
      PRIMARY_COLOR: varcelState.primaryColor,
      FRONTEND_ENDPOINT: '',
      BACKEND_ENDPOINT: varcelState.app_backend_url || '',
      PSTN: varcelState.pstn,
      PRECALL: varcelState.precall,
      CHAT: varcelState.chat,
      CLOUD_RECORDING: varcelState.cloudRecording,
      SCREEN_SHARING: varcelState.screenSharing,
      GOOGLE_CLIENT_ID: varcelState.GOOGLE_CLIENT_ID || '',
      MICROSOFT_CLIENT_ID: varcelState.MICROSOFT_CLIENT_ID || '',
      SLACK_CLIENT_ID: varcelState.SLACK_CLIENT_ID || '',
      APPLE_CLIENT_ID: varcelState.APPLE_CLIENT_ID || '',
      LANDING_SUB_HEADING: varcelState.SUBHEADING,
      BG: varcelState.bg || '',
      ENCRYPTION_ENABLED: varcelState.encryption,
      PROFILE: '480p_8',
      PRIMARY_FONT_COLOR: varcelState.primaryFontColor,
      SECONDARY_FONT_COLOR: varcelState.secondaryFontColor,
      SENTRY_DSN: varcelState.sentry_dsn,
      ENABLE_GOOGLE_OAUTH: varcelState.ENABLE_GOOGLE_OAUTH,
      ENABLE_MICROSOFT_OAUTH: varcelState.ENABLE_MICROSOFT_OAUTH,
      ENABLE_SLACK_OAUTH: varcelState.ENABLE_SLACK_OAUTH,
      ENABLE_APPLE_OAUTH: varcelState.ENABLE_APPLE_OAUTH,
    },
    packageJson: {
      name: 'agora-app-builder',
      version: '1.0.0',
      scripts: {
        start: 'agora-app-builder-cli',
        'start:info': `agora-app-builder-cli install --info && agora-app-builder-cli build web --prod --vercel --info && cd ${varcelState.Product_id} && mv ./vercel.json ./dist/`,
      },
      keywords: [],
      license: 'MIT',
      dependencies: {
        'agora-app-builder-cli': '1.1.0',
      },
    },
    themeJson: themeJson,
  };
  return JSON.stringify(newData);
};
