import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const useHadStyles = makeStyles(() =>
  createStyles({
    banerGrid: {
      height: '300px',
      ['@media (max-width:800px)']: {
        height: '250px',
      },
    },
    RightGrid: {
      height: '100%',
      display: 'flex',

      padding: '30px 0px 30px 40px',
      ['@media (max-width:600px)']: {
        display: 'none',
      },
      backgroundImage: "url('./bannerbg.png')",
    },
    LeftGrid: {
      paddingLeft: '70px',
      paddingRight: '30px',
      ['@media (max-width:900px)']: {
        fontSize: '24px',
      },
      ['@media (max-width:600px)']: {
        paddingLeft: '60px',
        paddingRight: '60px',
      },
    },
    LeftGridText: {
      color: 'white',
      fontSize: '32px',
      marginLeft: 'auto',
      maxWidth: '400px',
      lineHeight: '40px',
      ['@media (max-width:800px)']: {
        fontSize: '26px',
      },
    },
    backGround: {
      height: '100%',
      width: 'auto',
    },
  }),
);

const ProjectBanner = () => {
  const HadClasses = useHadStyles();
  return (
    <Grid
      container
      style={{
        backgroundImage: "url('./console-background.jpg')",
        backgroundSize: 'contain',
      }}
      className={HadClasses.banerGrid}>
      <Grid sm={6} xs={12} item={true} style={{height: '100%'}}>
        <Box
          className={HadClasses.LeftGrid}
          width="100%"
          height="100%"
          px={35}
          fontSize={32}
          display="grid"
          alignItems="center">
          <Typography variant="body1" className={HadClasses.LeftGridText}>
            {' '}
            The fastest way to personalize and publish real-time engagement apps
          </Typography>
        </Box>
      </Grid>
      <Grid sm={6} xs={12} className={HadClasses.RightGrid} item={true}>
        <img className={HadClasses.backGround} src="./herobanner.png" />
      </Grid>
    </Grid>
  );
};

export default ProjectBanner;
