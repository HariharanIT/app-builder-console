import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useDialogStyle = makeStyles(() => ({
  dialogHeader: {
    fontWeight: 'bold',
    fontSize: '25px',
  },
  dialogContent: {
    fontWeight: 'normal',
    fontSize: '20px',
    textAlign: 'center',
  },
}));

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      paddingTop: theme.spacing(15),
      paddingLeft: theme.spacing(15),
      paddingRight: theme.spacing(15),
      fontWeight: 'bold',
      fontSize: '40px',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(10),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {children, classes, onClose, ...other} = props;
  const DialogStyles = useDialogStyle();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h2" className={DialogStyles.dialogHeader}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
    paddingBottom: theme.spacing(15),
  },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme: Theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

const CustomizedDialogs = ({
  isUnderMaintenance: open,
  setUnderMaintenance: setOpen,
}: {
  isUnderMaintenance: boolean;
  setUnderMaintenance: (open: boolean) => void;
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const DialogStyles = useDialogStyle();
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Website Under Maintenance
        </DialogTitle>
        <DialogContent dividers className={DialogStyles.dialogContent}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <img width="130px" src="./splashAssets/logo.png" />
          </Box>
          <Typography
            gutterBottom
            className={DialogStyles.dialogContent}
            style={{marginTop: 15}}>
            Sorry, We're down for scheduled maintenance right now.
          </Typography>
          <Typography
            gutterBottom
            className={DialogStyles.dialogContent}
            style={{marginTop: 20}}>
            We'll be back soon.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomizedDialogs;
