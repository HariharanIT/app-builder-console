import React, {useContext, useEffect, useState} from 'react';
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
  isFormValidationError,
} from '../contexts/ProductInfoContext';
import {validateBeforeSaving} from '../../Utils/errorUtils';
import {uploadFile} from '../../config/REST_API';
import {IProjectBuilderControls} from './AppBuilderControls';
import Download from '../Download';
import ErrorToast from '../common/ErrorToast';
import SaveConfirmation from '../common/SaveConfirmation';
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
function beforeUnloadListener(event: any) {
  event.preventDefault();
  return (event.returnValue = "Are you sure you want to close?'");
}
const AppBuilderDesktopControls = ({
  openDeployModal,
}: // setSaveBeforeExitPrompt,
IProjectBuilderControls) => {
  const classes = useStyles();
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirmBox] = useState(false);
  const {
    status,
    errors: productInfoError,
    productInfo,
    dispatch: productInfoDispatch,
  } = useProductInfo();
  const {setLoading, setAPIError} = useContext(ApiStatusContext);
  useEffect(() => {
    // add confirm before saving modal, for unsaved changes
    if (status !== 'complete') {
      window.addEventListener('beforeunload', beforeUnloadListener, {
        capture: true,
      });
    }
    // remove confirm before saving modal, if on pending unsaved changes
    if (status === 'complete') {
      window.removeEventListener('beforeunload', beforeUnloadListener, {
        capture: true,
      });
    }
  }, [status]);
  const handleSaveProject = async () => {
    let errors = validateBeforeSaving({
      dataToValidate: productInfo,
    });
    // validate updates
    validateProductInfo(productInfoDispatch, errors);
    if (isFormValidationError(errors)) {
      setShowError(true);
      throw new Error(
        `Save Error: Frontend validation checks failed ${errors}`,
      );
    }
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
      throw new Error(`Save Error: API Failure ${updatedResponse}`);
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
            if (status !== 'complete') {
              setShowConfirmBox(true);
            } else {
              router.push('/create');
            }
          }}>
          <Box mx={18}>Close</Box>
        </Button>
      </Box>
      <Box mx={6}>
        <Button
          variant="outlined"
          color="primary"
          style={{borderRadius: '50px'}}
          onClick={async () => {
            try {
              await handleSaveProject();
            } catch (error) {
              console.log(`Error occured during project save. Error: ${error}`);
            }
          }}
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
          saveStatus={status}
          configData={productInfo}
          saveBtnFn={async () => {
            try {
              await handleSaveProject();
            } catch (error) {
              console.log(`Error occured during project save. Error: ${error}`);
            }
          }}
        />
      </Box>
      <ErrorToast isOpen={showError} setShowError={setShowError} />
      <SaveConfirmation
        isOpen={showConfirm}
        setShowConfirmBox={setShowConfirmBox}
        handleSaveProject={handleSaveProject}
      />
    </Box>
  );
};

export default AppBuilderDesktopControls;
