// @ts-nocheck
import React, {useContext} from 'react';
import {useRouter} from 'next/router';
import {
  Box,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Link,
  Toolbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Deploy from '../components/DeployDilog';
import AppBuilderControls from '../components/AppBuilderControls';
import LivePreview from '../components/LivePreview';
import {
  productInfoDefaultErrorObj,
  IProductInfoDefaultObj,
} from '../constants/productInfoDefaults';
import {ProductInfoProvider} from '../components/ProductInfoContext';
import AppBuilderCustomizeTabs from '../components/AppBuilderCustomizeTabs';
import {VerticalTabProvider} from '../components/VerticalTabContext';
import ApiStatusContext from '../components/APIContext';
import {DeployContextProvider} from '../components/DeployContext';

let vertical: any = 'top';
let horizontal: any = 'center';

export type FormState = IProductInfoDefaultObj;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      marginLeft: theme.spacing(1.5),
      marginBottom: '5px',
    },
    root: {
      flexGrow: 1,
      height: '100vh',
      width: '100vw',
    },
    paper: {
      minHeight: '60vh',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderColor: '#099DFD10',
      boxShadow: '-1px 4px 19px 0px rgba(26, 134, 192, 0.16)',
    },

    logo: {
      width: 120,
      height: 41,
      marginRight: 16,
      marginTop: 8,
      marginLeft: 32,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      textDecoration: 'none',
    },
    checkbox: {
      flex: 1,
      display: 'flex',
      margin: theme.spacing(1),
    },
    textField: {
      flex: 1,
      display: 'flex',
      margin: theme.spacing(1.5),
      borderColor: '#099DFD80',
    },

    alignCenter: {
      marginTop: 10,
      marginBottom: 4,
      alignSelf: 'center',
      justifySelf: 'center',
      textAlign: 'center',
    },
    Logo: {
      height: '25px',
      marginRight: 'auto',
    },
    AppBar: {
      paddingLeft: '30px',
      paddingRight: '30px',
      maxHeight: '64px',
    },
    Avatar: {
      width: '30px',
      height: '30px',
      background: '#DEE5EF',
    },
    primarybutton: {
      borderRadius: '50px',
      color: '#fff',
      ['@media (max-width:1028px)']: {
        fontSize: '12px',
      },
    },
    navbarContainer: {
      boxShadow: '0px 2px 10px rgba(144, 158, 169, 0.15)',
      Height: '70px',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    popupMenu: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const useContentStyles = makeStyles(() =>
  createStyles({
    NavContainer: {
      height: 'calc(100vh - 70px)',
      overflow: 'hidden',
      // '&::-webkit-scrollbar': {
      //   width: '0em'
      // },
      maxWidth: 'calc(100% - 280px)',
      flexBasis: 'calc(100% - 280px)',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        maxWidth: 'calc(100% - 210px)',
        flexBasis: 'calc(100% - 210px)',
      },
      ['@media (max-width:550px)']: {
        display: 'none',
      },
    },
    topNav: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '40px',
      paddingLeft: '60px',
      paddingRight: '60px',
      flexWrap: 'wrap',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        zoom: '0.8',
      },
    },

    mainHading: {
      fontWeight: 'bold',
      fontSize: '26px',
      color: '#000000',
    },
    lable: {
      background: 'rgba(10, 157, 252, 0.1)',
      borderRadius: '50px',
      marginLeft: '10px',
      marginRight: 'auto',
    },
    lableText: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#099CFC',
      margin: '3px 11px',
    },
  }),
);
export type LogoType = string;
export type LogoStateType = File | null;
export interface LogoHandleInterface {}
function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function beforeUnloadListener(event: any) {
  event.preventDefault();
  return (event.returnValue = "Are you sure you want to close?'");
}
export default function Index() {
  const router = useRouter();
  const {id = ''} = router.query;
  const {
    apiLoading: loading,
    setLoading,
    setAPIError,
  } = useContext(ApiStatusContext);

  const classes = useStyles();
  const [isDeployModal, setDeployModal] = React.useState<boolean>(false);
  const ContentClasses = useContentStyles();
  const [firstRanderSave, setFirstRenderSave] = React.useState<boolean>(true);
  const [allowedDeploy, setAllowedDeploy] = React.useState<boolean>(false);
  const [showConfirmBox, setShowConfirmBox] = React.useState<boolean>(false);
  const [saveBtn, setSaveBtn] = React.useState<String>('save');
  const [validationError, setValidationError] = React.useState<boolean>(false);
  const [productInfoErr, setProductInfoErr] = React.useState<boolean>(false);
  const [joinScrErr, setJoinScrErr] = React.useState<boolean>(false);
  const [conferenceErr, setConferenceErr] = React.useState<boolean>(false);
  const [disableDeploy, setDisableDeploy] = React.useState<boolean>(false);
  const [herokuUploadStatus, setHerokuUploadStatus] =
    React.useState<String>('');
  const [vercelUploadState, setVercelUploadState] = React.useState<String>('');
  const [onSaveValidation, setOnSaveValidation] =
    React.useState<boolean | string>(false);
  const [errorHandler, setErrorHandler] = React.useState<any>(
    productInfoDefaultErrorObj,
  );
  let timer: any = '';
  const handleChangesSaveStatusPending = () => {
    setSaveBtn('save');
    addEventListener('beforeunload', beforeUnloadListener, {capture: true});
    setFirstRenderSave(false);
  };
  // const getProjectDataByID = async (id: string) => {
  //   const data: any = await getprojectById(id);
  //   if (!data.projectById) {
  //     router.push('/create');
  //   }
  //   const newData: any = data.projectById;
  //   const tempStateData: any = {...productInfoDefaultObj};
  //   if (newData) {
  //     tempStateData.id = newData.id;
  //     tempStateData.ownerId = newData.ownerId;
  //     tempStateData.Product_id = newData.productId;
  //     tempStateData.CUSTOMER_CERTIFICATE = newData.agora_customer_certificate;
  //     tempStateData.CUSTOMER_ID = newData.agora_customer_id;
  //     tempStateData.chat = newData.chat;
  //     tempStateData.cloudRecording = newData.cloud_recording;
  //     tempStateData.SUBHEADING = newData.description;
  //     tempStateData.precall = newData.precall_screen;
  //     tempStateData.bg = newData.primary_bg_logo;
  //     tempStateData.primaryColor = newData.primary_color;
  //     tempStateData.primaryFontColor = newData.primary_font_color;
  //     tempStateData.secondaryFontColor = newData.secondary_font_color;
  //     tempStateData.logoRect = newData.primary_logo;
  //     tempStateData.logoSquare = newData.primary_square_logo;
  //     tempStateData.pstn = newData.pstn_dial_in;
  //     tempStateData.PSTN_EMAIL = newData.pstn_turbo_bridge_email;
  //     tempStateData.PSTN_PASSWORD = newData.pstn_turbo_bridge_password;
  //     tempStateData.PSTN_ACCOUNT = newData.pstn_turbo_bridge_account;
  //     tempStateData.BUCKET_ACCESS_KEY = newData.s3_bucket_access_key;
  //     tempStateData.BUCKET_ACCESS_SECRET = newData.s3_bucket_access_secret;
  //     tempStateData.BUCKET_NAME = newData.s3_bucket_name;
  //     tempStateData.RECORDING_REGION = newData.s3_bucket_region;
  //     tempStateData.screenSharing = newData.screen_share;
  //     tempStateData.HEADING = newData.title;
  //     tempStateData.encryption = newData.video_encryption;
  //     tempStateData.app_backend_deploy_status =
  //       newData.app_backend_deploy_status;
  //     tempStateData.app_frontend_deploy_status =
  //       newData.app_frontend_deploy_status;
  //     tempStateData.GOOGLE_CLIENT_ID = newData.google_client_id;
  //     tempStateData.GOOGLE_CLIENT_SECRET = newData.google_client_secret;
  //     tempStateData.MICROSOFT_CLIENT_ID = newData.microsoft_client_id;
  //     tempStateData.MICROSOFT_CLIENT_SECRET = newData.microsoft_client_secret;
  //     tempStateData.SLACK_CLIENT_ID = newData.slack_client_id;
  //     tempStateData.SLACK_CLIENT_SECRET = newData.slack_client_secret;
  //     tempStateData.APPLE_CLIENT_ID = newData.apple_client_id;
  //     tempStateData.APPLE_KEY_ID = newData.apple_key_id;
  //     tempStateData.APPLE_PRIVATE_KEY = newData.apple_private_key;
  //     tempStateData.APPLE_TEAM_ID = newData.apple_team_id;
  //     tempStateData.ENABLE_GOOGLE_OAUTH = newData.enable_google_oauth;
  //     tempStateData.ENABLE_MICROSOFT_OAUTH = newData.enable_microsoft_oauth;
  //     tempStateData.ENABLE_SLACK_OAUTH = newData.enable_slack_oauth;
  //     tempStateData.ENABLE_APPLE_OAUTH = newData.enable_apple_oauth;
  //     tempStateData.app_backend_url = newData.app_backend_url;
  //     tempStateData.app_frontend_url = newData.app_frontend_url;
  //     tempStateData.app_backend_deploy_msg = newData.app_backend_deploy_msg;
  //     tempStateData.sentry_dsn = newData.sentry_dsn;
  //     tempStateData.APP_CERTIFICATE = newData.agora_app_certificate;
  //     tempStateData.AppID = newData.agora_app_id;
  //   }
  //   return tempStateData;
  // };
  // const getProjectDataByIDPooling = async (id: string) => {
  //   const data: any = await getprojectByIdPooling(id);
  //   const newData: any = data.projectById;
  //   const tempStateData: any = {
  //     id: '',
  //     app_backend_deploy_status: '',
  //     app_backend_url: '',
  //     app_frontend_url: '',
  //     app_frontend_deploy_status: '',
  //     app_backend_deploy_msg: '',
  //   };
  //   if (newData) {
  //     tempStateData.id = newData.id;
  //     tempStateData.app_backend_deploy_status =
  //       newData.app_backend_deploy_status;
  //     tempStateData.app_backend_url = newData.app_backend_url;
  //     tempStateData.app_frontend_url = newData.app_frontend_url;
  //     tempStateData.app_frontend_deploy_status =
  //       newData.app_frontend_deploy_status;
  //     tempStateData.app_backend_deploy_msg = newData.app_backend_deploy_msg;
  //   }
  //   return tempStateData;
  // };

  // React.useEffect(() => {
  //   if (id) {
  //     getProjectDataByID(id).then((response) => {
  //       setProductInfo(response);
  //       setHerokuUploadStatus(() => response.app_backend_deploy_status);
  //       setVercelUploadState(() => response.app_frontend_deploy_status);
  //       if (
  //         response.app_backend_deploy_status === 'pending' ||
  //         response.app_frontend_deploy_status === 'pending'
  //       ) {
  //         timer = setInterval(async () => {
  //           const data: any = await getProjectDataByIDPooling(
  //             dataURL.get('id').toString(),
  //           );
  //           setHerokuUploadStatus(() => data.app_backend_deploy_status);
  //           setVercelUploadState(() => data.app_frontend_deploy_status);
  //           if (
  //             data.app_backend_deploy_status !== 'pending' &&
  //             response.app_frontend_deploy_status !== 'pending'
  //           ) {
  //             setProductInfo({...response, app_backend_url: data.app_backend_url});
  //             setProductInfo({...response, app_frontend_url: data.app_frontend_url});
  //             clearInterval(timer);
  //           }
  //         }, 30000);
  //       }
  //       localStorage.setItem('ProjectDetails', JSON.stringify(response));
  //       setLoading(() => false);
  //     });
  //   } else {
  //     window.location.href = window.location.origin;
  //     setLoading(() => false);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   router.prefetch('/create');
  //   const messageFromPopup = async (evt: any) => {
  //     if (evt.data.name === 'test' && apiCalling) {
  //       setApiCalling(() => false);
  //       const code: any = getURLValue(evt.data.url).get('code');

  //       if (code && code !== '') {
  //         dataURL = getURLValue(window.location.href);
  //         const ProductData: any = await getProjectDataByID(
  //           dataURL.get('id').toString(),
  //         );
  //         if (
  //           ProductData !== null &&
  //           localStorage.getItem('deployType') === 'backend'
  //         ) {
  //           setHerokuUploadStatus(() => 'pending');
  //           deployHeroku(code, ProductData)
  //             .then((res) => {
  //               if (res) {
  //                 let counter = 0;
  //                 timer = setInterval(async () => {
  //                   counter = counter + 1;
  //                   const data: any = await getProjectDataByIDPooling(
  //                     dataURL.get('id').toString(),
  //                   );
  //                   setHerokuUploadStatus(() => data.app_backend_deploy_status);
  //                   if (data.app_backend_deploy_status !== 'pending') {
  //                     setProductInfo(() => {
  //                       return {
  //                         ...ProductData,
  //                         app_backend_url: data.app_backend_url,
  //                       };
  //                     });
  //                     clearInterval(timer);
  //                   } else if (counter > 10) {
  //                     setHerokuUploadStatus(() => 'failed');
  //                     setProductInfo(() => {
  //                       return {
  //                         ...ProductData,
  //                         app_backend_url: '',
  //                       };
  //                     });
  //                     clearInterval(timer);
  //                   }
  //                 }, 30000);
  //               }
  //             })
  //             .catch((err) => {
  //               setHerokuUploadStatus(() => 'failed');
  //               handleDialogClose();
  //               setAPIError(() => err);
  //             });
  //         } else if (
  //           ProductData !== null &&
  //           localStorage.getItem('deployType') === 'frontend'
  //         ) {
  //           setVercelUploadState(() => 'pending');
  //           deployVercel(code, ProductData)
  //             .then((res) => {
  //               let counter = 0;
  //               if (res) {
  //                 timer = setInterval(async () => {
  //                   counter = counter + 1;
  //                   const data: any = await getProjectDataByIDPooling(
  //                     dataURL.get('id').toString(),
  //                   );
  //                   setVercelUploadState(() => data.app_frontend_deploy_status);
  //                   if (data.app_frontend_deploy_status !== 'pending') {
  //                     setProductInfo(() => {
  //                       return {
  //                         ...ProductData,
  //                         app_frontend_url: data.app_frontend_url,
  //                       };
  //                     });
  //                     clearInterval(timer);
  //                   } else if (counter > 10) {
  //                     setVercelUploadState(() => 'failed');
  //                     setProductInfo(() => {
  //                       return {
  //                         ...ProductData,
  //                         app_frontend_url: '',
  //                       };
  //                     });
  //                     clearInterval(timer);
  //                   }
  //                 }, 30000);
  //               }
  //             })
  //             .catch((err) => {
  //               setVercelUploadState(() => 'failed');
  //               handleDialogClose();
  //               setAPIError(() => err);
  //             });
  //           console.log(
  //             'Deploy to vercel',
  //             ProductData,
  //             localStorage.getItem('deployType'),
  //           );
  //         }
  //       }
  //     }
  //     return;
  //   };
  //   window.addEventListener('message', messageFromPopup);
  //   return () => window.removeEventListener('message', messageFromPopup);
  // }, []);

  // const handleDialogClose = () => {
  //   setOpenDialog(false);
  // };
  const openDeployModal = () => {
    setDeployModal(true);
  };
  const closeDeployModal = () => {
    setDeployModal(false);
  };
  return (
    <ProductInfoProvider>
      <div style={{fontFamily: 'acumin-pro, sans-serif', fontStyle: 'normal'}}>
        <div className={classes.root}>
          <Box
            position="static"
            color="white"
            className={classes.navbarContainer}>
            <Toolbar className={classes.AppBar}>
              <Link
                style={{marginRight: 'auto'}}
                href="/create"
                className={classes.row}>
                <img
                  width="130px"
                  height="100%"
                  alt="logo Image"
                  src="./logo.png"
                />
              </Link>
              <AppBuilderControls openDeployModal={openDeployModal} />
            </Toolbar>
          </Box>
          <DeployContextProvider>
            <Deploy
              handleDialogClose={closeDeployModal}
              openDialog={isDeployModal}
              allowedDeploy={allowedDeploy}
              herokuUploadStatus={herokuUploadStatus}
              vercelUploadState={vercelUploadState}
              value={{}}
              saveBtn={saveBtn}
            />
          </DeployContextProvider>
          {/* <ExitConfirmationModal 
          showConfirmBox={showConfirmBox}
          setShowConfirmBox={setShowConfirmBox}
          handleProjectSave={saveData}
        />  */}
          <Grid container item>
            <VerticalTabProvider>
              <AppBuilderCustomizeTabs />
              {!loading && <LivePreview />}
            </VerticalTabProvider>
          </Grid>
        </div>
        {/* error component */}
      </div>
    </ProductInfoProvider>
  );
}
