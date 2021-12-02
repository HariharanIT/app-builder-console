import React, {useEffect, useRef} from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  LinearProgress,
  Link,
} from '@material-ui/core';
import {useMutation, useLazyQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import {DeployStyles} from '../styles/DeployDilogStyles';
import {useDeploy} from '../components/DeployContext';
import {DeployStatus} from '../constants/productInfoDefaults';
import {publishToVercelMutation} from '../graphql/mutations';
import {getVercelDeployStatus} from '../graphql/queries';
import {getTokenWithourBearer} from '../graphql/apollo';
import {useProductInfo} from './ProductInfoContext';

const VercelDeploy = () => {
  const classes = DeployStyles();
  let timerVercel = useRef();
  const {query} = useRouter();
  const {productInfo} = useProductInfo();
  const {vercelStatus, setVercelStatus} = useDeploy();

  const [publishToVercel, {data: vercelPublishData}] = useMutation(
    publishToVercelMutation,
  );
  const [vercelStatusPolling, {data: vercelPollingData}] = useLazyQuery(
    getVercelDeployStatus,
    {
      variables: {
        project_id: query.id,
      },
      fetchPolicy: 'no-cache',
    },
  );

  const onClickOpenVercel = (app_frontend_url: String) => {
    if (app_frontend_url) {
      let str1 = app_frontend_url.split(`${productInfo.id}-`)[1];
      let userNameIdstr = str1.split(`.`)[0];
      let userName = userNameIdstr.substring(userNameIdstr.indexOf('-') + 1);
      window.open(
        `https://vercel.com/${userName}/${productInfo.id}/deployments`,
      );
    }
  };

  React.useEffect(() => {
    window.onmessage = function (e: any) {
      const {data} = e;
      if (data && data.vercelOAuth) {
        console.log('*vercel authenticated*');
        // once authenticated, call the publish to heroku mutation

        // NOTE: CHECK-LATER unable to access product id the react way, therrefore using plain javascript
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        publishToVercel({
          variables: {
            // unable to access product id the react way,
            project_id: id,
          },
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (vercelPublishData) {
      // Published to heroku
      const {publishToVercel} = vercelPublishData;
      // setSkip(false);
      if (publishToVercel.status === DeployStatus.PENDING) {
        setVercelStatus(publishToVercel.status);
        //*start polling for heroku publish status*
        // @ts-ignore
        timerVercel.current = setInterval(() => {
          vercelStatusPolling();
        }, 1000);
      }
      return () => clearInterval(timerVercel.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vercelPublishData]);
  useEffect(() => {
    if (vercelPollingData) {
      const {vercel} = vercelPollingData;
      if (
        vercel.status === DeployStatus.SUCCESS ||
        vercel.status === DeployStatus.FAILURE
      ) {
        // on succes or failure response, clear the polling
        clearInterval(timerVercel.current);
      }
      setVercelStatus(vercel.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vercelPollingData]);

  return (
    <Card
      className={classes.CardContainer}
      style={{
        border: `2px solid ${
          vercelStatus === DeployStatus.SUCCESS
            ? '#1EB76E'
            : vercelStatus === DeployStatus.FAILURE
            ? 'red'
            : 'transparent'
        }`,
      }}>
      {vercelStatus === DeployStatus.SUCCESS && (
        <Box className={classes.sucesss} style={{backgroundColor: '#1EB76E'}}>
          <img src="./check-circle.svg" alt="check" />
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className={classes.sucesssText}>
            Completed
          </Typography>
        </Box>
      )}
      {vercelStatus === DeployStatus.FAILURE && (
        <Box className={classes.sucesss} style={{backgroundColor: 'red'}}>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className={classes.sucesssText}
            style={{marginLeft: '0px'}}>
            Deploy Frontend Failed
          </Typography>
        </Box>
      )}
      <CardMedia
        style={{backgroundColor: 'black'}}
        component="img"
        alt="Deploy to Vercel"
        height="160"
        image="./vercel.png"
      />
      {vercelStatus === DeployStatus.PENDING && <LinearProgress />}
      <CardContent style={{paddingBottom: 0, marginBottom: 0}}>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Typography}>
          Step 2:
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Typography2}>
          Deploy Frontend to Vercel
        </Typography>
        {!productInfo.backend_endpoint ? (
          <React.Fragment>
            {vercelStatus === DeployStatus.NONE && (
              <Button
                variant="contained"
                style={{backgroundColor: '#099DFD'}}
                disableElevation
                className={classes.primaryButton}
                onClick={() => {
                  // const token: string = csrfToken();
                  window.localStorage.setItem('deployType', 'frontend');
                  window.open(
                    `https://vercel.com/integrations/app-builder-staging/new?state=token=${getTokenWithourBearer()}`,
                    'myWindow',
                    'width=1015,height=580',
                  );
                }}>
                <Box>Deploy Frontend</Box>
              </Button>
            )}
            {vercelStatus === DeployStatus.PENDING && (
              <Button
                disabled={true}
                variant="contained"
                style={{backgroundColor: '#FFC107', color: 'black'}}
                disableElevation
                className={classes.primaryButton}>
                <Box>pending</Box>
              </Button>
            )}
            {vercelStatus === DeployStatus.SUCCESS && (
              <React.Fragment>
                <Button
                  variant="contained"
                  style={{backgroundColor: '#099DFD'}}
                  disableElevation
                  className={classes.primaryButton}
                  onClick={() =>
                    onClickOpenVercel(productInfo.frontend_endpoint)
                  }>
                  <Box>Open Vercel</Box>
                </Button>
                <Button
                  variant="contained"
                  style={{backgroundColor: '#099DFD'}}
                  disableElevation
                  className={classes.primaryButton}
                  onClick={() => {
                    // const token: string = csrfToken();
                    window.localStorage.setItem('deployType', 'frontend');
                    window.open(
                      `https://vercel.com/integrations/app-builder-staging/new?state=token=${getTokenWithourBearer()}`,
                      'myWindow',
                      'width=1015,height=580',
                    );
                  }}>
                  <Box>Re-Deploy Frontend</Box>
                </Button>
              </React.Fragment>
            )}
            {vercelStatus === DeployStatus.FAILURE && (
              <React.Fragment>
                <Button
                  variant="contained"
                  style={{backgroundColor: 'red'}}
                  disableElevation
                  className={classes.primaryButton}
                  onClick={() => {
                    // const token: string = csrfToken();
                    window.localStorage.setItem('deployType', 'frontend');
                    window.open(
                      `https://vercel.com/integrations/app-builder-staging/new?state=token=${getTokenWithourBearer()}`,
                      'myWindow',
                      'width=1015,height=580',
                    );
                  }}>
                  <Box> Re-Deploy Frontend </Box>
                </Button>
                <Button
                  variant="contained"
                  style={{backgroundColor: '#099DFD'}}
                  disableElevation
                  className={classes.primaryButton}
                  onClick={() =>
                    onClickOpenVercel(productInfo.frontend_endpoint)
                  }>
                  <Box>Open Vercel</Box>
                </Button>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <Button
            disabled={true}
            variant="contained"
            color="primary"
            disableElevation
            className={classes.primaryButton}>
            {' '}
            Deploy Frontend{' '}
          </Button>
        )}
        <Typography
          // gutterBottom
          // variant="h5"
          component="p"
          className={classes.Typography3}>
          Deploy the website to{' '}
          <Link href="/docs/Frontend/Web-guide" target="_blank">
            other CDNs (like Netlify) or self-host
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VercelDeploy;
