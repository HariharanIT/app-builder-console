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
import ApiStatusContext from '../contexts/APIContext';
import {
  useProductInfo,
  productInfoUpdateComplete,
  productInfoUpdateInProgress,
  validateProductInfo,
} from '../contexts/ProductInfoContext';
import {validateBeforeSaving} from '../../Utils/errorUtils';
import {uploadFile} from '../../config/REST_API';
import {IProjectBuilderControls} from './AppBuilderControls';
import Download from '../Download';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primarybutton: {
      borderRadius: '50px',
      color: '#fff',
      ['@media (max-width:1028px)']: {
        fontSize: '12px',
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

const AppBuilderMobileControls = ({
  openDeployModal,
}: // setSaveBeforeExitPrompt,
IProjectBuilderControls) => {
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
          <Download
            saveStatus={status}
            configData={productInfo}
            saveBtnFn={handleSaveProject}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AppBuilderMobileControls;
