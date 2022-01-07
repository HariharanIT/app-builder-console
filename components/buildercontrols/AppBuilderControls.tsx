import React, {useState, useEffect, useContext} from 'react';
import AppBuilderDesktopControls from './AppBuilderDesktopControls';
import AppBuilderMobileControls from './AppBuilderMobileControls';
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
import ErrorToast from '../common/ErrorToast';
import SaveConfirmation from '../common/SaveConfirmation';
export interface IProjectBuilderControls {
  openDeployModal: () => void;
}
function beforeUnloadListener(event: any) {
  event.preventDefault();
  return (event.returnValue = "Are you sure you want to close?'");
}

const AppBuilderControls = ({openDeployModal}: IProjectBuilderControls) => {
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirmBox] = useState(false);
  const {status, productInfo, dispatch: productInfoDispatch} = useProductInfo();
  const {setLoading, setAPIError} = useContext(ApiStatusContext);
  // const {setAPIError} = useContext(ApiStatusContext);
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
    // if (status === 'inProgress') {
    //   setLoading(true);
    // }
    // if (status === 'complete' || status === 'rejected') {
    //   setLoading(false);
    // }
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
    setLoading(true, 'Saving your changes..');
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
  const handleAppDeploy = async () => {
    // if the app is in saved state, open deploy modal
    if (status === 'complete') {
      openDeployModal();
    } else {
      // else try to save the  project first, if successfully saved then open deploy
      // if successfully saved, then deploy.
      try {
        // if no error occured on the FE and no error occured on the backend while saving
        // open the deploy dialog
        await handleSaveProject();
        openDeployModal();
      } catch (error) {
        console.log(`Failure occured while saving, Error: ${error}`);
      }
    }
  };

  return (
    <>
      <AppBuilderDesktopControls
        handleAppDeploy={handleAppDeploy}
        handleSaveProject={handleSaveProject}
        setShowConfirmBox={setShowConfirmBox}
      />
      <AppBuilderMobileControls
        handleAppDeploy={handleAppDeploy}
        handleSaveProject={handleSaveProject}
        setShowConfirmBox={setShowConfirmBox}
      />
      <ErrorToast isOpen={showError} setShowError={setShowError} />
      <SaveConfirmation
        isOpen={showConfirm}
        setShowConfirmBox={setShowConfirmBox}
        handleSaveProject={handleSaveProject}
      />
    </>
  );
};

export default AppBuilderControls;
