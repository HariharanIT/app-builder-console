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
  Theme,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {useRouter} from 'next/router';

interface IExitConfirmation {
  showConfirmBox: boolean;
  setShowConfirmBox: (isShow: boolean) => void;
  handleProjectSave: () => any;
}
const useSideNavStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerGrid: {
      backgroundColor: '#F9F9F9',
      overflowX: 'hidden',
      maxWidth: '280px',
      flexBasis: 'unset',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        maxWidth: '210px',
      },
      ['@media (max-width:550px)']: {
        maxWidth: '100%',
      },
    },
    tabs: {
      borderRight: `0px solid ${theme.palette.divider}`,
      // paddingRight: '30px',
    },
    NavLink: {
      padding: '0px',
      marginBottom: '5px',
      fontSize: '19px',
      ['@media (max-width:910px)']: {
        fontSize: '12px',
      },
      ['@media (max-width:550px)']: {
        fontSize: '20px',
      },
    },
    subContent: {
      height: 'calc(100vh - 70px)',
      overflowY: 'auto',
      width: '280px',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        zoom: 0.65,
      },
      ['@media (max-width:550px)']: {
        width: '100vw',
      },
    },
    agoraMenu0: {
      marginLeft: '-280px',
      width: '280px',
      height: 'calc(100vh - 70px)',
      overflowY: 'auto',
      transition: '400ms',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        marginLeft: '-210px',
        width: '210px',
      },
      ['@media (max-width:550px)']: {
        marginLeft: '-100vw',
        width: '100vw',
      },
    },
    active: {
      display: 'grid',
      width: '280px',
      transition: '400ms',
      height: 'calc(100vh - 70px)',
      overflowY: 'auto',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        width: '210px',
      },
      ['@media (max-width:550px)']: {
        width: '100vw',
      },
    },
    wrapper: {
      alignItems: 'start',
      paddingLeft: '0px',
      // paddingRight: '30px',
      textTransform: 'capitalize',
    },
    selected: {
      borderBottomRightRadius: '50px',
      borderTopRightRadius: '50px',
      color: '#616161',
      width: 'calc(100% - 30px)',
    },
    unselected: {
      width: 'calc(100% - 30px)',
      transition: '0.3s',
      opacity: 0.7,
      '&:hover': {
        backgroundColor: '#d1e0f4',
        borderBottomRightRadius: '50px',
        borderTopRightRadius: '50px',
      },
    },
    muTabRoot: {
      minHeight: 'auto',
      minWidth: 'auto',
      maxWidth: '100%',
      textAlign: 'start',
      opacity: 1,
    },
    muTabRootPreview: {
      minHeight: 'auto',
      minWidth: 'auto',
    },
    closeDialog: {
      borderRadius: '12px',
    },
  }),
);

const ExitConfirmationModal = ({
  showConfirmBox,
  setShowConfirmBox,
  handleProjectSave,
}: IExitConfirmation) => {
  const SideBarClasses = useSideNavStyles();
  const router = useRouter();
  return (
    <Dialog
      open={showConfirmBox}
      classes={{
        paper: SideBarClasses.closeDialog,
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
              const saveResponse = await handleProjectSave();
              if (saveResponse) {
                setShowConfirmBox(false);
                router.push(`/create`);
              } else {
                setShowConfirmBox(false);
              }
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
