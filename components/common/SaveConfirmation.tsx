import React from 'react';
import {useRouter} from 'next/router';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import {Close} from '@material-ui/icons';

const SaveConfirmation = ({
  isOpen,
  setShowConfirmBox,
  handleSaveProject,
}: {
  isOpen: boolean;
  setShowConfirmBox: (input: boolean) => void;
  handleSaveProject: () => void;
}) => {
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      style={{
        borderRadius: '12px',
      }}
      onClose={() => {
        setShowConfirmBox(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <Box
        style={{
          marginLeft: 'auto',
          marginTop: '24px',
          marginRight: '24px',
          cursor: 'pointer',
        }}
        onClick={() => {
          setShowConfirmBox(false);
        }}>
        <Close />
      </Box>

      <Box p={12}>
        <DialogTitle id="alert-dialog-title" style={{marginTop: '-20px'}}>
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
              try {
                await handleSaveProject();
                router.push(`/create`);
              } catch (error) {
                console.log(
                  `Error occured during project save. Error: ${error}`,
                );
              }
              setShowConfirmBox(false);
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

export default SaveConfirmation;
