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
