import React, {useContext} from 'react';
import {
  Box,
  Grid,
  makeStyles,
  createStyles,
  Link,
  Toolbar,
} from '@material-ui/core';
// import MuiAlert from '@material-ui/lab/Alert';
import Deploy from '../components/deploycomponents/DeployDilog';
import AppBuilderControls from '../components/buildercontrols/AppBuilderControls';
import LivePreview from '../components/editpreview/LivePreview';
import {IProductInfoDefaultObj} from '../constants/productInfoDefaults';
import {ProductInfoProvider} from '../components/contexts/ProductInfoContext';
import AppBuilderCustomizeTabs from '../components/buildercontrols/AppBuilderCustomizeTabs';
import {VerticalTabProvider} from '../components/contexts/VerticalTabContext';
import ApiStatusContext from '../components/contexts/APIContext';
import {DeployContextProvider} from '../components/contexts/DeployContext';
// import ExitConfirmationModal from '../components/ExitConfirmationModal';
export type FormState = IProductInfoDefaultObj;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh',
      width: '100vw',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      textDecoration: 'none',
    },
    AppBar: {
      paddingLeft: '30px',
      paddingRight: '30px',
      maxHeight: '64px',
    },
    navbarContainer: {
      boxShadow: '0px 2px 10px rgba(144, 158, 169, 0.15)',
      Height: '70px',
    },
  }),
);

export type LogoType = string;
export type LogoStateType = File | null;
export interface LogoHandleInterface {}

// function Alert(props: any) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
// function beforeUnloadListener(event: any) {
//   event.preventDefault();
//   return (event.returnValue = "Are you sure you want to close?'");
// }
export default function Index() {
  const {apiLoading: loading} = useContext(ApiStatusContext);
  // const [showConfirmBox, setShowConfirmBox] = React.useState<boolean>(false);
  const classes = useStyles();
  const [isDeployModal, setDeployModal] = React.useState<boolean>(false);
  const [allowedDeploy] = React.useState<boolean>(false);
  // const handleChangesSaveStatusPending = () => {
  //   setSaveBtn('save');
  //   addEventListener('beforeunload', beforeUnloadListener, {capture: true});
  //   setFirstRenderSave(false);
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
              <AppBuilderControls
                // setSaveBeforeExitPrompt={setShowConfirmBox}
                openDeployModal={openDeployModal}
              />
            </Toolbar>
          </Box>
          <DeployContextProvider>
            <Deploy
              handleDialogClose={closeDeployModal}
              openDialog={isDeployModal}
              allowedDeploy={allowedDeploy}
            />
          </DeployContextProvider>
          {/* <ExitConfirmationModal
            showConfirmBox={showConfirmBox}
            setShowConfirmBox={setShowConfirmBox}
          /> */}
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
