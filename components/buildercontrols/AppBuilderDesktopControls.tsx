import React from 'react';
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
import {
  useProductInfo,
  isFormValidationError,
} from '../contexts/ProductInfoContext';
import Download from '../Download';

export interface IBuilderControls {
  handleSaveProject: () => void;
  handleAppDeploy: () => void;
  setShowConfirmBox: (isShow: boolean) => void;
}
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
  handleSaveProject,
  handleAppDeploy,
  setShowConfirmBox,
}: // setSaveBeforeExitPrompt,
IBuilderControls) => {
  const classes = useStyles();
  const router = useRouter();
  const {status, errors: productInfoError, productInfo} = useProductInfo();

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
          disabled={status === 'complete'}
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
          onClick={async () => {
            try {
              await handleAppDeploy();
            } catch (error) {
              console.log(
                `Failure occured while saving and opening deploy modal, Error: ${error}`,
              );
            }
          }}>
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
    </Box>
  );
};

export default AppBuilderDesktopControls;
