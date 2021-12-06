import React, {useContext} from 'react';
import {
  Box,
  Button,
  Tooltip,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
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
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
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
        <Download
          saveBtnState={status}
          configData={productInfo}
          saveBtnFn={handleSaveProject}
        />
      </Box>
    </Box>
  );
};

export default AppBuilderDesktopControls;
