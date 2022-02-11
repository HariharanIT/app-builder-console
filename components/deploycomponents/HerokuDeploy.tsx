import React, {useEffect, useRef, useContext} from 'react';
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
import {DeployStyles} from '../../styles/DeployDilogStyles';
import {DeployStatus} from '../../constants/productInfoDefaults';
import {publishToHerokuMutation} from '../../graphql/mutations';
import {getHerokuDeployStatus} from '../../graphql/queries';
import {getTokenWithourBearer} from '../../graphql/apollo';
import ApiStatusContext from '../contexts/APIContext';
import {
  useProductInfo,
  updateProductInfoComplete,
} from '../contexts/ProductInfoContext';
import {
  REDIRECT_URL,
  HEROKU_URL,
  HEROKU_CLIENT_ID,
} from '../../constants/config';

const HerokuDeploy = () => {
  const classes = DeployStyles();
  let timer = useRef();
  const {productInfo, dispatch: productInfoDispatch} = useProductInfo();

  const {query} = useRouter();
  // const {herokuStatus, setHerokuStatus} = useDeploy();
  const {backend_deploy_status: herokuStatus} = productInfo;
  const {setAPIError} = useContext(ApiStatusContext);
  const onClickOpenHeroku = () => {
    window.open(`https://dashboard.heroku.com/apps/`);
  };

  const [publishToHeroku, {data: herokuPublishData}] = useMutation(
    publishToHerokuMutation,
  );
  const [herokuStatusPolling, {data: herokuPollingData}] = useLazyQuery(
    getHerokuDeployStatus,
    {
      variables: {
        project_id: query.id,
      },
    },
  );
  React.useEffect(() => {
    const herokuOAuth = (e: any) => {
      console.log('window message received(heroku oAuth)');
      const {data} = e;
      console.log('got a window message');
      // this post message {herokuOAuth: true} guarantees that heroku is authenticated
      if (data && data.herokuOAuth) {
        console.log('*heroku authenticated*');
        // once authenticated, call the publish to heroku mutation

        // NOTE: CHECK-LATER unable to access product id the react way, therrefore using plain javascript
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        publishToHeroku({
          variables: {
            // unable to access product id the react way,
            project_id: id,
          },
        });
      }
    };
    window.addEventListener('message', herokuOAuth);
    return () => {
      window.removeEventListener('message', herokuOAuth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (herokuPublishData) {
      // Published to heroku
      const {publishToHeroku} = herokuPublishData;
      // setSkip(false);
      if (
        publishToHeroku.status === DeployStatus.PENDING ||
        publishToHeroku.status === DeployStatus.SUCCESS
      ) {
        // setHerokuStatus(publishToHeroku.status);
        updateProductInfoComplete(productInfoDispatch, {
          backend_deploy_status: publishToHeroku.status,
        });

        //*start polling for heroku publish status*
        // @ts-ignore
        timer.current = setInterval(() => {
          herokuStatusPolling();
        }, 1000);
      }
      if (publishToHeroku.status === DeployStatus.FAILURE) {
        setAPIError(publishToHeroku.message);
      }

      return () => clearInterval(timer.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [herokuPublishData]);
  useEffect(() => {
    if (herokuPollingData) {
      const {heroku} = herokuPollingData;
      if (
        heroku.status === DeployStatus.SUCCESS ||
        heroku.status === DeployStatus.FAILURE
      ) {
        // on succes or failure response, clear the polling
        clearInterval(timer.current);
      }
      // setHerokuStatus(heroku.status);
      updateProductInfoComplete(productInfoDispatch, {
        backend_deploy_status: heroku.status,
      });

      if (heroku.status === DeployStatus.FAILURE) {
        setAPIError(heroku.message);
      }
      if (heroku.status === DeployStatus.SUCCESS) {
        updateProductInfoComplete(productInfoDispatch, {
          backend_endpoint: heroku.url,
          backend_deploy_status: heroku.status,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [herokuPollingData]);
  return (
    <Card
      className={classes.CardContainer}
      style={{
        border: `2px solid ${
          herokuStatus === DeployStatus.SUCCESS
            ? '#1EB76E'
            : herokuStatus === DeployStatus.FAILURE
            ? 'red'
            : 'transparent'
        }`,
      }}>
      {herokuStatus === DeployStatus.SUCCESS && (
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
      {herokuStatus === DeployStatus.FAILURE && (
        <Box className={classes.sucesss} style={{backgroundColor: 'red'}}>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className={classes.sucesssText}
            style={{marginLeft: '0px'}}>
            Deploy Backend Failed
          </Typography>
        </Box>
      )}

      <CardMedia
        component="img"
        alt="Deploy to HEREKU"
        height="160"
        image="./HEREKU.svg"
      />
      {herokuStatus === DeployStatus.PENDING && <LinearProgress />}
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Typography}>
          Step 1:
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Typography2}>
          Deploy Backend to Heroku
        </Typography>
        <React.Fragment>
          {herokuStatus === DeployStatus.NONE && (
            <Button
              variant="contained"
              style={{backgroundColor: '#099DFD'}}
              disableElevation
              className={classes.primaryButton}
              onClick={() => {
                window.open(
                  `${HEROKU_URL}?scope=global&response_type=code&state=token=${getTokenWithourBearer()}&redirect_uri=${REDIRECT_URL}/heroku&client_id=${HEROKU_CLIENT_ID}`,
                  'myWindow',
                  'width=1015,height=580',
                );
              }}>
              <Box>Deploy Backend</Box>
            </Button>
          )}
          {herokuStatus === DeployStatus.PENDING && (
            <Button
              disabled={true}
              variant="contained"
              style={{backgroundColor: '#FFC107', color: 'black'}}
              disableElevation
              className={classes.primaryButton}>
              <Box>pending</Box>
            </Button>
          )}
          {herokuStatus === DeployStatus.SUCCESS && (
            <React.Fragment>
              <Button
                variant="contained"
                style={{backgroundColor: '#099DFD'}}
                disableElevation
                className={classes.primaryButton}
                onClick={() => onClickOpenHeroku()}>
                <Box>Open Heroku</Box>
              </Button>
              <Button
                variant="contained"
                style={{backgroundColor: '#099DFD'}}
                disableElevation
                className={classes.primaryButton}
                onClick={() => {
                  window.open(
                    `${HEROKU_URL}?scope=global&response_type=code&state=token=${getTokenWithourBearer()}&redirect_uri=${REDIRECT_URL}/heroku&client_id=${HEROKU_CLIENT_ID}`,
                    'myWindow',
                    'width=1015,height=580',
                  );
                }}>
                <Box>Re-Deploy Backend</Box>
              </Button>
            </React.Fragment>
          )}
          {herokuStatus === DeployStatus.FAILURE && (
            <React.Fragment>
              <Button
                variant="contained"
                style={{backgroundColor: 'red'}}
                disableElevation
                className={classes.primaryButton}
                onClick={() => {
                  window.open(
                    `${HEROKU_URL}?scope=global&response_type=code&state=token=${getTokenWithourBearer()}&redirect_uri=${REDIRECT_URL}/heroku&client_id=${HEROKU_CLIENT_ID}`,
                    'myWindow',
                    'width=1015,height=580',
                  );

                  // if (props.allowedDeploy) {
                  //   const token: String = csrfToken();
                  //   localStorage.setItem('deployType', 'backend');
                  //   window.open(
                  //     `https://id.heroku.com/oauth/authorize?client_id=28495dec-a108-4d52-9b32-6586f9351693&response_type=code&scope=global&state=${token}`,
                  //     'myWindow',
                  //     'width=1015,height=580',
                  //   );
                  // } else {
                  //   alert('please save your data first');
                  // }
                }}>
                <Box>Re-Deploy Backend</Box>
              </Button>
              <Button
                variant="contained"
                style={{backgroundColor: '#099DFD'}}
                disableElevation
                className={classes.primaryButton}
                onClick={() => onClickOpenHeroku()}>
                <Box>Open Heroku</Box>
              </Button>
            </React.Fragment>
          )}
        </React.Fragment>
        <Typography component="p" className={classes.Typography3}>
          Deploy the backend using{' '}
          <Link href="/docs/Backend/Deploy-Using-Docker" target="_blank">
            Docker
          </Link>{' '}
          build from{' '}
          <Link href="/docs/Backend/Deploy-from-Source" target="_blank">
            source
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HerokuDeploy;
