import React from 'react';
import Box from '@material-ui/core/Box';
import {
  Button,
  DialogTitle,
  Dialog,
  IconButton,
  DialogContent,
  DialogActions,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {useRouter} from 'next/router';

interface IExitConfirmation {
  showConfirmBox: boolean;
  setShowConfirmBox: (isShow: boolean) => void;
}
const useConfirmationDialogStyles = makeStyles(() =>
  createStyles({
    closeDialog: {
      borderRadius: '12px',
    },
  }),
);

const ExitConfirmationModal = ({
  showConfirmBox,
  setShowConfirmBox,
}: IExitConfirmation) => {
  const ConfirmationClasses = useConfirmationDialogStyles();
  const router = useRouter();
  return (
    <Dialog
      open={showConfirmBox}
      classes={{
        paper: ConfirmationClasses.closeDialog,
      }}
      onClose={() => {
        setShowConfirmBox(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <Box p={12}>
        <DialogTitle
          id="alert-dialog-title"
          style={{padding: '5px 0px 0px 0px'}}>
          <Box display="grid" justifyContent="center">
            <IconButton
              style={{color: '#349dfb', padding: '0px'}}
              aria-label="close"
              onClick={() => {
                setShowConfirmBox(false);
              }}>
              <InfoOutlinedIcon style={{fontSize: '40px'}} />
            </IconButton>
            <Box fontSize="26px" style={{color: '#349dfb'}}>
              Save your project
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box fontSize="18px">Do you want to save your changes?</Box>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center', marginBottom: '10px'}}>
          <Button
            variant="outlined"
            onClick={() => {
              setShowConfirmBox(false);
              router.push(`/create`);
            }}
            style={{borderRadius: '50px', width: '40%'}}
            color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              color: '#fff',
              borderRadius: '50px',
              width: '40%',
              marginLeft: '30px',
            }}
            onClick={async () => {
              // const saveResponse = await handleProjectSave();
              // if (saveResponse) {
              //   setShowConfirmBox(false);
              //   router.push(`/create`);
              // } else {
              //   setShowConfirmBox(false);
              // }
            }}
            color="primary"
            autoFocus>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ExitConfirmationModal;
