import React from 'react';
import {Dialog, Box, Typography} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import {DeployStyles} from '../../styles/DeployDilogStyles';
import HerokuDeploy from './HerokuDeploy';
import VercelDeploy from './VercelDeploy';
import PublishedApp from './PublishedApp';

interface Deploy {
  handleDialogClose: () => void;
  openDialog: boolean;
}
const Deploy = ({handleDialogClose, openDialog}: Deploy) => {
  const classes = DeployStyles();
  return (
    <Dialog onClose={handleDialogClose} open={openDialog} maxWidth="lg">
      <Box
        className={classes.Close}
        onClick={() => {
          handleDialogClose();
        }}>
        <Close />
      </Box>
      <Typography
        gutterBottom
        variant="h5"
        component="p"
        className={classes.Hading}>
        Deploy Your App
      </Typography>

      <Box className={classes.Container}>
        <HerokuDeploy />
        <VercelDeploy />
        <PublishedApp />
      </Box>
    </Dialog>
  );
};
export default Deploy;
