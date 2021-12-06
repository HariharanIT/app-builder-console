import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import {DeployStyles} from '../../styles/DeployDilogStyles';
import {useProductInfo} from '../contexts/ProductInfoContext';

const PublishedApp = () => {
  const classes = DeployStyles();
  const {productInfo} = useProductInfo();
  const getFrontendUrl = () => {
    let url = productInfo.frontend_endpoint;
    // check if it doesn't contains the https protocol
    if (url.indexOf('https://') !== 0) {
      url = `https://${url}`;
    }
    return url;
  };

  return (
    <Card className={classes.CardContainer}>
      <CardMedia
        component="img"
        alt="Deploy to HEREKU"
        height="160"
        image="./publish.svg"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Typography}>
          Step 3:
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Typography2}>
          View Published App
        </Typography>
        <Button
          disabled={productInfo.frontend_endpoint ? false : true}
          variant="contained"
          color="primary"
          disableElevation
          className={classes.primaryButton}
          onClick={() => {
            window.open(getFrontendUrl());
          }}>
          <Box>View Published App</Box>
        </Button>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Typography3}>
          Deploy your app to{' '}
          <Link
            href="/docs#step-2-test-and-launch-native-apps-optional-"
            target="_blank">
            other platforms
          </Link>{' '}
          (Android, iOS, Mac, Windows or Linux)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PublishedApp;
