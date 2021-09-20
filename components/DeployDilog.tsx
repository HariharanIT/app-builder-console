import React, {useEffect} from 'react';
import {
  Dialog,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  LinearProgress,
  Link,
} from '@material-ui/core';
import {useMutation, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import {DeployStyles} from '../styles/DeployDilogStyles';
import {useDeploy, DeployStatus} from '../components/DeployContext';
import {publishToHerokuMutation} from '../graphql/mutations';
import {getHerokuDeployStatus} from '../graphql/queries';

interface Deploy {
  handleDialogClose: () => void;
  openDialog: boolean;
  allowedDeploy: boolean;
  herokuUploadStatus: String;
  vercelUploadState: String;
  saveBtn: String;
  value: any;
}
function csrfToken() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line
    return v.toString(16);
  });
}
const Deploy = (props: Deploy) => {
  const classes = DeployStyles();
  const {query} = useRouter();
  // NOTE: CHECK-LATER unable to access product id the react way, therrefore using plain javascript
  // const urlParams = new URLSearchParams(window.location.search);
  // const id = urlParams.get('id');

  console.log({query});
  const {herokuStatus, vercelStatus, setHerokuStatus, setVercelStatus} =
    useDeploy();

  console.log({herokuStatus}, 'before');
  const [publishToHeroku, {data: herokuPublishData, loading, error}] =
    useMutation(publishToHerokuMutation);
  const {
    // loading: herokuPollingLoading,
    // error: herokuPollingError,
    data: herokuPollingData,
    startPolling: startHerokuDeployStatusPolling,
    stopPolling: stopHerokuDeployStatusPolling,
  } = useQuery(getHerokuDeployStatus, {
    notifyOnNetworkStatusChange: true,
    variables: {
      project_id: query.id,
    },
    skip: true,
    // onCompleted: () => console.log('If this worked no useEffect needed.'),
  });

  const onClickOpenVercel = (app_frontend_url: String) => {
    if (app_frontend_url) {
      let str1 = app_frontend_url.split(`${props.value.id}-`)[1];
      let userNameIdstr = str1.split(`.`)[0];
      let userName = userNameIdstr.substring(userNameIdstr.indexOf('-') + 1);
      window.open(
        `https://vercel.com/${userName}/${props.value.id}/deployments`,
      );
    }
  };
  const onClickOpenHeroku = () => {
    window.open(`https://dashboard.heroku.com/apps/`);
  };

  React.useEffect(() => {
    window.onmessage = function (e) {
      const {data} = e;
      // this post message {herokuOAuth: true} quarantees that heroku is authenticated
      if (data && data.herokuOAuth) {
        console.log('heroku authenticated', {query});
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
  }, []);
  useEffect(() => {
    if (herokuPublishData) {
      console.log('*Published to heroku*');
      const {publishToHeroku} = herokuPublishData;
      if (publishToHeroku.status === DeployStatus.PENDING) {
        console.log('*start polling for heroku publish status*');
        setHerokuStatus(publishToHeroku.status);
        startHerokuDeployStatusPolling(500);
      }
    }
    return () => stopHerokuDeployStatusPolling();
  }, [herokuPublishData]);
  useEffect(() => {
    if (herokuPollingData) {
      const {heroku} = herokuPollingData;
      if (
        heroku.status === DeployStatus.SUCCESS ||
        heroku.status === DeployStatus.FAILURE
      ) {
        stopHerokuDeployStatusPolling();
      }
      setHerokuStatus(heroku.status);
    }
  }, [herokuPollingData]);
  const getFrontendUrl = () => {
    let url = props.value.app_frontend_url;
    // check if it doesn't contains the https protocol
    if (url.indexOf('https://') !== 0) {
      url = `https://${url}`;
    }
    return url;
  };
  return (
    <>
      <Dialog
        onClose={props.handleDialogClose}
        open={props.openDialog}
        maxWidth="lg">
        <Box
          className={classes.Close}
          onClick={() => {
            props.handleDialogClose();
          }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.49512 19.5045L19.5045 4.49512"
              stroke="#5E6871"
              strokeWidth="1.5"
            />
            <path
              d="M4.49512 4.49512L19.5045 19.5045"
              stroke="#5E6871"
              strokeWidth="1.5"
            />
          </svg>
        </Box>

        <Typography
          gutterBottom
          variant="h5"
          component="p"
          className={classes.Hading}>
          Deploy Your App
        </Typography>

        <Box className={classes.Container}>
          <Card
            className={classes.CardContainer}
            style={{
              border: `2px solid ${
                props.herokuUploadStatus === 'succeeded'
                  ? '#1EB76E'
                  : props.herokuUploadStatus === 'failed'
                  ? 'red'
                  : 'transparent'
              }`,
            }}>
            {herokuStatus === DeployStatus.SUCCESS && (
              <Box
                className={classes.sucesss}
                style={{backgroundColor: '#1EB76E'}}>
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
                        'https://id.heroku.com/oauth/authorize?scope=global&response_type=code&state=token%3Dc5434rliofasd3ur3ie0&redirect_uri=https://staging1.rteappbuilder.com/auth/heroku&client_id=9a6d5978-6915-483c-8b6f-2ab1e1961754',
                        'myWindow',
                        'width=1015,height=580',
                      );

                      // if (props.allowedDeploy) {
                      //   const token: String = csrfToken();
                      //   localStorage.setItem('deployType', 'backend');
                      //   window.open(
                      //     'https://id.heroku.com/oauth/authorize?scope=global&response_type=code&state=token%3Dc5434rliofasd3ur3ie0&redirect_uri=https://staging1.rteappbuilder.com/auth/heroku&client_id=9a6d5978-6915-483c-8b6f-2ab1e1961754',
                      //     'myWindow',
                      //     'width=1015,height=580',
                      //   );
                      // } else {
                      //   alert('please save your data first');
                      // }
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
                          'https://id.heroku.com/oauth/authorize?scope=global&response_type=code&state=token%3Dc5434rliofasd3ur3ie0&redirect_uri=https://staging1.rteappbuilder.com/auth/heroku&client_id=9a6d5978-6915-483c-8b6f-2ab1e1961754',
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
                          'https://id.heroku.com/oauth/authorize?scope=global&response_type=code&state=token%3Dc5434rliofasd3ur3ie0&redirect_uri=https://staging1.rteappbuilder.com/auth/heroku&client_id=9a6d5978-6915-483c-8b6f-2ab1e1961754',
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
              <Typography
                // gutterBottom
                // variant="h5"
                component="p"
                className={classes.Typography3}>
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
          <Card
            className={classes.CardContainer}
            style={{
              border: `2px solid ${
                props.vercelUploadState === 'succeeded'
                  ? '#1EB76E'
                  : props.vercelUploadState === 'failed'
                  ? 'red'
                  : 'transparent'
              }`,
            }}>
            {props.vercelUploadState === 'succeeded' ? (
              <Box
                className={classes.sucesss}
                style={{backgroundColor: '#1EB76E'}}>
                <img src="./check-circle.svg" alt="check" />
                <Typography
                  gutterBottom
                  variant="h5"
                  component="p"
                  className={classes.sucesssText}>
                  Completed
                </Typography>
              </Box>
            ) : (
              ''
            )}
            {props.vercelUploadState === 'failed' ? (
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
            ) : (
              ''
            )}
            <CardMedia
              style={{backgroundColor: 'black'}}
              component="img"
              alt="Deploy to Vercel"
              height="160"
              image="./vercel.png"
            />
            {props.vercelUploadState === 'pending' && <LinearProgress />}
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
              {props.value.app_backend_url ? (
                <React.Fragment>
                  {!props.vercelUploadState && (
                    <Button
                      variant="contained"
                      style={{backgroundColor: '#099DFD'}}
                      disableElevation
                      className={classes.primaryButton}
                      onClick={() => {
                        const token: string = csrfToken();
                        localStorage.setItem('deployType', 'frontend');
                        window.open(
                          `https://vercel.com/integrations/agoraappbuilder/new?state=${token}`,
                          'myWindow',
                          'width=1015,height=580',
                        );
                      }}>
                      <Box>Deploy Frontend</Box>
                    </Button>
                  )}
                  {props.vercelUploadState === 'pending' && (
                    <Button
                      disabled={true}
                      variant="contained"
                      style={{backgroundColor: '#FFC107', color: 'black'}}
                      disableElevation
                      className={classes.primaryButton}>
                      <Box>pending</Box>
                    </Button>
                  )}
                  {props.vercelUploadState === 'succeeded' && (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        style={{backgroundColor: '#099DFD'}}
                        disableElevation
                        className={classes.primaryButton}
                        onClick={() =>
                          onClickOpenVercel(props.value.app_frontend_url)
                        }>
                        <Box>Open Vercel</Box>
                      </Button>
                      <Button
                        variant="contained"
                        style={{backgroundColor: '#099DFD'}}
                        disableElevation
                        className={classes.primaryButton}
                        onClick={() => {
                          const token: string = csrfToken();
                          localStorage.setItem('deployType', 'frontend');
                          window.open(
                            `https://vercel.com/integrations/agoraappbuilder/new?state=${token}`,
                            'myWindow',
                            'width=1015,height=580',
                          );
                        }}>
                        <Box>Re-Deploy Frontend</Box>
                      </Button>
                    </React.Fragment>
                  )}
                  {props.vercelUploadState === 'failed' && (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        style={{backgroundColor: 'red'}}
                        disableElevation
                        className={classes.primaryButton}
                        onClick={() => {
                          const token: string = csrfToken();
                          localStorage.setItem('deployType', 'frontend');
                          window.open(
                            `https://vercel.com/integrations/agoraappbuilder/new?state=${token}`,
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
                          onClickOpenVercel(props.value.app_frontend_url)
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
                disabled={props.value.app_frontend_url ? false : true}
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
        </Box>
      </Dialog>
    </>
  );
};
export default Deploy;
