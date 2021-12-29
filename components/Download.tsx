import React from 'react';
import Button from '@material-ui/core/Button';
import JSZip from 'jszip';
import type {FormState} from '../pages/builder';
import {saveAs} from 'file-saver';
import {DownloadStyles} from '../styles/DownloadStyles';
import {getToken} from '../graphql/apollo';
import {checkFileExt, dataURLtoFile} from '../Utils/util';
interface DownloadProps {
  configData: FormState;
  saveStatus: String;
  saveBtnFn: Function;
}
const packageJson = {
  name: 'agora-app-builder',
  version: '1.0.0',
  scripts: {
    start: 'agora-app-builder-cli',
    'start:info': 'agora-app-builder-cli --info',
  },
  keywords: [],
  license: 'MIT',
  dependencies: {
    'agora-app-builder-cli': '1.0.5',
  },
};
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
    minHeight: 40,
    backgroundColor: '#f1f4f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  controlsHolder: {
    minHeight: 80,
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
    width: 40,
    height: 40,
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

export default function Download(props: DownloadProps) {
  const [disableDownload, setDisableDownload] = React.useState(false);
  const getBase64FromUrl = async (url: any) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', getToken());
    const requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
    };
    const data = await fetch(
      `https://agoraappbuilder.com/api/file/imageDataUrl?project_id=${props.configData.id}&url=${url}`,
      requestOptions,
    );
    let base64;
    if (data.status === 200) {
      let response = await data.json();
      base64 = `data:application/octet-stream;base64,${response.base64Url}`;
    }
    return base64;
  };
  const classes = DownloadStyles();
  const download = async () => {
    const zip = new JSZip();
    const AAB = zip.folder('agora-app-builder');
    let bgFileName: string = '';
    let squarFileName: string = '';
    let reactFileName: string = '';
    if (props.configData.primary_square_logo) {
      if (
        typeof props.configData.primary_square_logo === 'string' &&
        props.configData.primary_square_logo.includes('http')
      ) {
        squarFileName = `logoSquare.${
          props.configData.primary_square_logo.split('.')[
            props.configData.primary_square_logo.split('.').length - 1
          ]
        }`;
      } else if (typeof props.configData.primary_square_logo === 'string') {
        var arr: string[] | Array<any> =
            props.configData.primary_square_logo.split(','),
          mime = arr && arr[0].match(/:(.*?);/)[1];
        squarFileName = `logoSquare.${mime.split('/')[1]}`;
      } else {
        // squarFileName = `logoSquare.${
        //   props.configData.primary_square_logo.split('/')[1]
        // }`;
      }
    }
    if (props.configData.primary_logo) {
      if (
        typeof props.configData.primary_logo === 'string' &&
        props.configData.primary_logo.includes('http')
      ) {
        // Patch for old projects whoes cloudfront url doesn't have any extension
        if (checkFileExt(props.configData.primary_logo)) {
          reactFileName = `logoRect.${
            props.configData.primary_logo.split('.')[
              props.configData.primary_logo.split('.').length - 1
            ]
          }`;
        } else {
          reactFileName = 'logoRect.jpeg'; // this is default image we upload to cloud front
        }
      } else if (typeof props.configData.primary_logo === 'string') {
        var arr: string[] | Array<any> =
            props.configData.primary_logo.split(','),
          mime = arr && arr[0].match(/:(.*?);/)[1];
        reactFileName = `logoRect.${mime.split('/')[1]}`;
      } else {
        // reactFileName = `logoRect.${
        //   props.configData.primary_logo.type.split('/')[1]
        // }`;
      }
    }
    if (props.configData.primary_background_logo) {
      if (
        typeof props.configData.primary_background_logo === 'string' &&
        props.configData.primary_background_logo.includes('http')
      ) {
        // Patch for old projects whoes cloudfront url doesn't have any extension
        if (checkFileExt(props.configData.primary_background_logo)) {
          bgFileName = `bg.${
            props.configData.primary_background_logo.split('.')[
              props.configData.primary_background_logo.split('.').length - 1
            ]
          }`;
        } else {
          bgFileName = 'bg.png'; // this is default image we upload to cloud front
        }
      } else if (typeof props.configData.primary_background_logo === 'string') {
        var arr: string[] | Array<any> =
            props.configData.primary_background_logo.split(','),
          mime = arr && arr[0].match(/:(.*?);/)[1];
        bgFileName = `bg.${mime.split('/')[1]}`;
      } else {
        // bgFileName = `bg.${
        //   props.configData.primary_background_logo.type.split('/')[1]
        // }`;
      }
    }
    if (AAB) {
      // AAB.file('config.json', JSON.stringify(props.configData, null, 2));
      AAB.file(
        'config.json',
        JSON.stringify(
          {
            PRODUCT_ID: props.configData.product_id,
            APP_NAME: props.configData.product_name || '',
            LOGO: props.configData.primary_logo ? reactFileName : '',
            ICON: props.configData.primary_square_logo ? squarFileName : '',
            APP_ID: props.configData.app_id || '',
            PRIMARY_COLOR: props.configData.primary_color || '',
            FRONTEND_ENDPOINT: props.configData.frontend_endpoint || '',
            BACKEND_ENDPOINT: props.configData.backend_endpoint || '',
            PSTN: props.configData.pstn,
            PRECALL: props.configData.precall,
            CHAT: props.configData.chat,
            CLOUD_RECORDING: props.configData.cloud_recording,
            SCREEN_SHARING: props.configData.screen_sharing,
            LANDING_SUB_HEADING: props.configData.landing_sub_heading || '',
            BG: props.configData.primary_background_logo ? bgFileName : '',
            ENCRYPTION_ENABLED: props.configData.encryption_enabled,
            PRIMARY_FONT_COLOR: props.configData.primary_font_color || '',
            SECONDARY_FONT_COLOR: props.configData.secondary_font_color || '',
            SENTRY_DSN: props.configData.sentry_dsn,
            ENABLE_GOOGLE_OAUTH: props.configData.enable_google_oauth,
            ENABLE_SLACK_OAUTH: props.configData.enable_slack_oauth,
            ENABLE_MICROSOFT_OAUTH: props.configData.enable_microsoft_oauth,
            ENABLE_APPLE_OAUTH: props.configData.enable_apple_oauth,
            APP_CERTIFICATE: props.configData.app_certificate || '',
            GOOGLE_CLIENT_ID: props.configData.google_client_id || '',
            GOOGLE_CLIENT_SECRET: props.configData.google_client_secret || '',
            MICROSOFT_CLIENT_ID: props.configData.microsoft_client_id || '',
            MICROSOFT_CLIENT_SECRET:
              props.configData.microsoft_client_secret || '',
            SLACK_CLIENT_ID: props.configData.slack_client_id || '',
            SLACK_CLIENT_SECRET: props.configData.slack_client_secret || '',
            APPLE_CLIENT_ID: props.configData.apple_client_id || '',
            APPLE_KEY_ID: props.configData.apple_key_id || '',
            APPLE_PRIVATE_KEY: props.configData.apple_private_key || '',
            APPLE_TEAM_ID: props.configData.apple_team_id || '',
            CUSTOMER_ID: props.configData.customer_id || '',
            CUSTOMER_CERTIFICATE: props.configData.customer_certificate || '',
            BUCKET_NAME: props.configData.bucket_name || '',
            RECORDING_REGION: props.configData.recording_region || '',
            BUCKET_ACCESS_KEY: props.configData.bucket_access_key || '',
            BUCKET_ACCESS_SECRET: props.configData.bucket_access_secret || '',
            PSTN_EMAIL: props.configData.pstn_email || '',
            PSTN_PASSWORD: props.configData.pstn_password || '',
            PSTN_ACCOUNT: props.configData.pstn_account || '',
            PROFILE: '480p_8',
          },
          null,
          2,
        ),
      );
      AAB.file('package.json', JSON.stringify(packageJson, null, 2));
      AAB.file('theme.json', JSON.stringify(themeJson, null, 2));
      if (props.configData.primary_logo && squarFileName) {
        let dataURL: any;
        let fileName: string = squarFileName;
        if (
          typeof props.configData.primary_logo === 'string' &&
          props.configData.primary_logo.includes('http')
        ) {
          dataURL = await getBase64FromUrl(props.configData.primary_logo);
        } else if (typeof props.configData.primary_logo === 'string') {
          dataURL = props.configData.primary_logo;
        }
        if (dataURL) {
          AAB.file(fileName, await dataURLtoFile(dataURL, 'logoSquare'), {
            binary: true,
          });
        } else {
          AAB.file(fileName, props.configData.primary_logo, {
            binary: true,
          });
        }
      }
      if (props.configData.primary_square_logo !== '' && reactFileName) {
        let dataURL: any;
        let fileName: string = reactFileName;
        if (
          typeof props.configData.primary_square_logo === 'string' &&
          props.configData.primary_square_logo.includes('http')
        ) {
          dataURL = await getBase64FromUrl(
            props.configData.primary_square_logo,
          );
        } else if (typeof props.configData.primary_square_logo === 'string') {
          dataURL = props.configData.primary_square_logo;
        }
        if (dataURL) {
          AAB.file(fileName, await dataURLtoFile(dataURL, 'logoRect'), {
            binary: true,
          });
        } else {
          AAB.file(fileName, props.configData.primary_square_logo, {
            binary: true,
          });
        }
      }
      if (props.configData.primary_background_logo !== '' && bgFileName) {
        let dataURL: any;
        let fileName: string = bgFileName;
        if (
          typeof props.configData.primary_background_logo === 'string' &&
          props.configData.primary_background_logo.includes('http')
        ) {
          dataURL = await getBase64FromUrl(
            props.configData.primary_background_logo,
          );
        } else if (
          typeof props.configData.primary_background_logo === 'string'
        ) {
          dataURL = props.configData.primary_background_logo;
        }
        if (dataURL) {
          AAB.file(fileName, await dataURLtoFile(dataURL, 'bg'), {
            binary: true,
          });
        } else {
          AAB.file(fileName, props.configData.primary_background_logo);
        }
      }
      zip.generateAsync({type: 'blob'}).then(function (content) {
        // see FileSaver.js
        console.log(props.configData);
        saveAs(content, `${props.configData.product_name}.zip`);
      });
    }
  };
  return (
    <Button
      style={{
        height: '100%',
      }}
      className={classes.primarybutton}
      variant="contained"
      color="primary"
      disabled={disableDownload}
      onClick={async () => {
        setDisableDownload(() => true);
        // if the app is in saved state, call download code function
        // else save try to save the  project first, if successfully saved then download
        if (props.saveStatus === 'complete') {
          await download();
        } else {
          // if successfully saved,
          // then download.
          try {
            await props.saveBtnFn();
            await download();
          } catch (errors) {
            console.log('Failure occured while saving');
          }
        }
        setDisableDownload(() => false);
      }}
      disableElevation>
      Download source code
    </Button>
  );
}
