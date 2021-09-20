import React, {useContext} from 'react';
import {
  Menu,
  Box,
  Button,
  Tooltip,
  MenuItem,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import {useRouter} from 'next/router';
import ApiStatusContext from './APIContext';
import {
  useProductInfo,
  productInfoUpdateComplete,
  productInfoUpdateInProgress,
  validateProductInfo,
} from './ProductInfoContext';
import {validateBeforeSaving} from '../Utils/errorUtils';
import {uploadFile} from '../config/REST_API';

interface IProjectBuilderControls {
  openDeployModal: () => void;
}
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

const AppBuilderDesktopControls = ({
  openDeployModal,
}: IProjectBuilderControls) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    status,
    errors: productInfoError,
    productInfo,
    dispatch: productInfoDispatch,
  } = useProductInfo();
  const {setLoading, setAPIError} = useContext(ApiStatusContext);
  const isFormValidationError = (errors: {
    isErrorInConferencingScreen: boolean;
    conferencingCred?: {pstn: {}; cloud: {}};
    isErrorInAuthCred: boolean;
    authCred?: {apple: {}; google: {}; slack: {}; microsoft: {}};
    isProductInfoError: boolean;
    productInfo?: {};
  }) => {
    return (
      errors.isProductInfoError ||
      errors.isErrorInAuthCred ||
      errors.isErrorInConferencingScreen
    );
  };
  const handleSaveProject = async () => {
    let errors = validateBeforeSaving({
      dataToValidate: productInfo,
    });
    // validate updates
    validateProductInfo(productInfoDispatch, errors);
    if (isFormValidationError(errors)) return;
    // updates in progress
    productInfoUpdateInProgress(productInfoDispatch);
    setLoading(true);
    const updatedResponse = await uploadFile({productInfo});
    setLoading(false);
    if (updatedResponse.status === 200) {
      const result = await updatedResponse.json();
      // update completed
      productInfoUpdateComplete(productInfoDispatch, result);
    } else {
      setAPIError(updatedResponse.statusText);
    }
  };

  const handleAppDeploy = () => {
    let errors = validateBeforeSaving({
      dataToValidate: productInfo,
    });
    validateProductInfo(productInfoDispatch, errors);
    if (isFormValidationError(errors)) return;

    // if no error occured on the FE and no error Occured on the backend while saving
    // open the deploy dialog
    openDeployModal();
  };

  return (
    <Box mx={7} className={classes.sectionDesktop}>
      <Box mx={6}>
        <Button
          variant="outlined"
          style={{borderRadius: '50px'}}
          disableRipple={true}
          onClick={() => {
            router.push('/create');
            // if (status === 'pending') {
            //   // setSaveBeforeExitPrompt(true);
            // } else {
            // }
          }}>
          <Box mx={18}>Close</Box>
        </Button>
      </Box>
      <Box mx={6}>
        <Button
          variant="outlined"
          color="primary"
          style={{borderRadius: '50px'}}
          onClick={handleSaveProject}
          disableRipple={true}>
          <Box mx={18} display="flex">
            <Box>
              {
                {
                  pending: 'Save',
                  inProgress: 'Saving',
                  complete: 'Saved',
                  rejected: 'Save',
                }[status]
              }
            </Box>
            {isFormValidationError(productInfoError) && (
              <Tooltip title="Required fields are not filled. Please check">
                <InfoIcon style={{color: '#FF8989', marginLeft: '10px'}} />
              </Tooltip>
            )}
          </Box>
        </Button>
      </Box>
      <Box mx={6}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          disabled={isFormValidationError(productInfoError)}
          className={classes.primarybutton}
          onClick={handleAppDeploy}>
          <Box mx={9}>Deploy your App</Box>
        </Button>
      </Box>
      <Box mx={6}>
        {/* <Download
            saveBtnState={saveBtnText}
            configData={configData}
            saveBtnFn={handleProjectSave}
          /> */}
      </Box>
    </Box>
  );
};
const AppBuilderMobileControls = ({
  openDeployModal,
}: IProjectBuilderControls) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    status,
    errors: productInfoError,
    productInfo,
    dispatch: productInfoDispatch,
  } = useProductInfo();
  const {setLoading, setAPIError} = useContext(ApiStatusContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isFormValidationError = (errors: {
    isErrorInConferencingScreen: boolean;
    conferencingCred?: {pstn: {}; cloud: {}};
    isErrorInAuthCred: boolean;
    authCred?: {apple: {}; google: {}; slack: {}; microsoft: {}};
    isProductInfoError: boolean;
    productInfo?: {};
  }) => {
    return (
      errors.isProductInfoError ||
      errors.isErrorInAuthCred ||
      errors.isErrorInConferencingScreen
    );
  };
  const handleSaveProject = async () => {
    let errors = validateBeforeSaving({
      dataToValidate: productInfo,
    });
    // validate updates
    validateProductInfo(productInfoDispatch, errors);
    if (isFormValidationError(errors)) return;
    // updates in progress
    productInfoUpdateInProgress(productInfoDispatch);
    setLoading(true);
    const updatedResponse = await uploadFile({productInfo});
    setLoading(false);
    if (updatedResponse.status === 200) {
      const result = await updatedResponse.json();
      // update completed
      productInfoUpdateComplete(productInfoDispatch, result);
    } else {
      setAPIError(updatedResponse.statusText);
    }
  };

  const handleAppDeploy = () => {
    let errors = validateBeforeSaving({
      dataToValidate: productInfo,
    });
    validateProductInfo(productInfoDispatch, errors);
    if (isFormValidationError(errors)) return;

    // if no error occured on the FE and no error Occured on the backend while saving
    // open the deploy dialog
    openDeployModal();
  };

  return (
    <Box mx={7} className={classes.sectionMobile}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        classes={{
          paper: classes.popupMenu,
        }}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '25ch',
          },
        }}>
        <MenuItem>
          <Button
            variant="outlined"
            style={{borderRadius: '50px', width: '100%'}}
            disableRipple={true}
            onClick={() => {
              if (status === 'pending') {
                // setSaveBeforeExitPrompt(true);
              } else {
                router.push('/create');
              }
            }}>
            <Box>Close</Box>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            disableRipple={true}
            style={{borderRadius: '50px', width: '100%'}}
            variant="outlined"
            color="primary"
            onClick={handleSaveProject}>
            <Box mx={18} display="flex">
              <Box mr={5}>
                {
                  {
                    pending: 'Save',
                    inProgress: 'Saving',
                    complete: 'Saved',
                    rejected: 'Save',
                  }[status]
                }
              </Box>
              {status !== 'complete' && (
                <Tooltip
                  title={
                    {
                      pending: 'Save',
                      inProgress: 'Saving',
                      complete: 'Saved',
                      rejected: 'Save',
                    }[status]
                  }>
                  <InfoIcon
                    style={
                      {
                        pending: {color: '#FF8989', marginLeft: '10px'},
                        inProgress: {color: '#FFC107', marginLeft: '10px'},
                        complete: {color: '#099CFC', marginLeft: '10px'},
                        rejected: {color: '#FF8989', marginLeft: '10px'},
                      }[status]
                    }
                  />
                </Tooltip>
              )}
              {isFormValidationError(productInfoError) && (
                <Tooltip title="Required fields are not filled. Please check">
                  <InfoIcon style={{color: '#FF8989', marginLeft: '10px'}} />
                </Tooltip>
              )}
            </Box>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.primarybutton}
            style={{width: '100%'}}
            disabled={isFormValidationError(productInfoError)}
            onClick={handleAppDeploy}>
            <Box>Deploy your App</Box>
          </Button>
        </MenuItem>
        <MenuItem>
          {/* <Download
              saveBtnState={saveBtnText}
              configData={configData}
              saveBtnFn={handleProjectSave}
            /> */}
        </MenuItem>
      </Menu>
    </Box>
  );
};
const AppBuilderControls = (props: IProjectBuilderControls) => {
  return (
    <>
      <AppBuilderDesktopControls {...props} />
      <AppBuilderMobileControls {...props} />
    </>
  );
};

export default AppBuilderControls;
