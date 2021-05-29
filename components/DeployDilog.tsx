import React from 'react';
import {
  Dialog,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';
import {DeployStyles} from '../styles/DeployDilogStyles';

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
  const onClickOpenVercel = (app_frontend_url: String) => {
    let str1 = app_frontend_url.split(`${props.value.id}-`)[1];
    let userNameIdstr = str1.split(`.`)[0];
    let userName = userNameIdstr.substring(userNameIdstr.indexOf('-') + 1);
    window.open(`https://vercel.com/${userName}/${props.value.id}/deployments`);
  };
  const onClickOpenHeroku = (app_backend_url: String) => {
    console.log(app_backend_url);
    let appName = app_backend_url.substring(
      app_backend_url.indexOf('//') + 2,
      app_backend_url.indexOf('.'),
    );
    window.open(`https://dashboard.heroku.com/apps/${appName}`);
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
            {props.herokuUploadStatus === 'succeeded' ? (
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
            {props.herokuUploadStatus === 'failed' ? (
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
            ) : (
              ''
            )}

            <CardMedia
              component="img"
              alt="Deploy to HEREKU"
              height="160"
              image="./HEREKU.svg"
              title="Contemplative Reptile"
            />
            {props.herokuUploadStatus === 'pending' && <LinearProgress />}
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
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                className={classes.Typography3}>
                One line description
              </Typography>
              <React.Fragment>
                {!props.herokuUploadStatus && (
                  <Button
                    variant="contained"
                    style={{backgroundColor: '#099DFD'}}
                    disableElevation
                    className={classes.primaryButton}
                    onClick={() => {
                      if (props.allowedDeploy) {
                        const token: String = csrfToken();
                        localStorage.setItem('deployType', 'backend');
                        window.open(
                          `https://id.heroku.com/oauth/authorize?client_id=52b53adb-6e48-4fdd-8c73-36c8ad8197d3&response_type=code&scope=global&state=${token}`,
                          'myWindow',
                          'width=1015,height=580',
                        );
                      } else {
                        alert('please save your data first');
                      }
                    }}>
                    <Box>Deploy Backend</Box>
                  </Button>
                )}
                {props.herokuUploadStatus === 'pending' && (
                  <Button
                    disabled={true}
                    variant="contained"
                    style={{backgroundColor: '#FFC107', color: 'black'}}
                    disableElevation
                    className={classes.primaryButton}>
                    <Box>pending</Box>
                  </Button>
                )}
                {props.herokuUploadStatus === 'succeeded' && (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      style={{backgroundColor: '#099DFD'}}
                      disableElevation
                      className={classes.primaryButton}
                      onClick={() =>
                        onClickOpenHeroku(props.value.app_backend_url)
                      }>
                      <Box>Open Heroku</Box>
                    </Button>
                    <Button
                      variant="contained"
                      style={{backgroundColor: '#099DFD'}}
                      disableElevation
                      className={classes.primaryButton}
                      onClick={() => {
                        if (props.allowedDeploy) {
                          const token: String = csrfToken();
                          localStorage.setItem('deployType', 'backend');
                          window.open(
                            `https://id.heroku.com/oauth/authorize?client_id=52b53adb-6e48-4fdd-8c73-36c8ad8197d3&response_type=code&scope=global&state=${token}`,
                            'myWindow',
                            'width=1015,height=580',
                          );
                        } else {
                          alert('please save your data first');
                        }
                      }}>
                      <Box>Re-Deploy Backend</Box>
                    </Button>
                  </React.Fragment>
                )}
                {props.herokuUploadStatus === 'failed' && (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      style={{backgroundColor: 'red'}}
                      disableElevation
                      className={classes.primaryButton}>
                      <Box> Deploy Backend </Box>
                    </Button>
                    <Button
                      variant="contained"
                      style={{backgroundColor: '#099DFD'}}
                      disableElevation
                      className={classes.primaryButton}
                      onClick={() => {
                        if (props.allowedDeploy) {
                          const token: String = csrfToken();
                          localStorage.setItem('deployType', 'backend');
                          window.open(
                            `https://id.heroku.com/oauth/authorize?client_id=52b53adb-6e48-4fdd-8c73-36c8ad8197d3&response_type=code&scope=global&state=${token}`,
                            'myWindow',
                            'width=1015,height=580',
                          );
                        } else {
                          alert('please save your data first');
                        }
                      }}>
                      <Box>Re-Deploy Backend</Box>
                    </Button>
                  </React.Fragment>
                )}
              </React.Fragment>
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
              title="Contemplative Reptile"
            />
            {props.vercelUploadState === 'pending' && <LinearProgress />}
            <CardContent>
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
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                className={classes.Typography3}>
                One line description
              </Typography>
              {props.value.app_backend_url ? (
                //#region  Start
                // <Button
                //   disabled={props.vercelUploadState === 'pending'?true:false}
                //   // disabled={true}
                //   variant="contained"
                //   style={
                //     !onHoverVercel?props.vercelUploadState
                //       ? props.vercelUploadState === 'succeeded'
                //         ? {backgroundColor: '#1EB76E'}
                //         : props.vercelUploadState === 'failed'
                //         ? {backgroundColor: 'red'}
                //         : {backgroundColor: '#FFC107', color: 'black'}
                //       : {backgroundColor: '#099DFD'} : props.vercelUploadState === 'pending'? {backgroundColor: '#FFC107', color: 'black'}:{backgroundColor: '#099DFD'}
                //   }
                //   disableElevation
                //   className={classes.primaryButton}
                //   onMouseOver={()=>{setOnHoverVercel(true)}}
                //   onMouseOut={()=>{setOnHoverVercel(false)}}
                //   onClick={() => {
                //     const token: string = csrfToken();
                //     localStorage.setItem('deployType','frontend');
                //     window.open(`https://vercel.com/integrations/app-builder/new?state=${token}`);
                //   }}>
                //   {props.vercelUploadState && !onHoverVercel?props.vercelUploadState === 'pending' ? (
                //     <Box>pending</Box>
                //   ) : props.vercelUploadState === 'succeeded' ? (
                //     <Box>
                //       <img
                //         src="./check-circle.svg"
                //         alt="check"
                //         style={{marginRight: '10px'}}
                //       />
                //       Deploy Frontend
                //     </Box>
                //   ) : (
                //     <Box>Deploy Frontend</Box>
                //   ):props.vercelUploadState === 'pending' ? (
                //     <Box>pending</Box>
                //   ) : props.vercelUploadState === 'succeeded' ? (
                //     <Box>
                //       Re-Deploy Frontend
                //     </Box>
                //   ) :props.vercelUploadState === 'failed'?(
                //     <Box> Re-Deploy Frontend</Box>
                //   ):(<Box> Deploy Frontend</Box>)}
                // </Button>
                //#endregion
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
                          `https://vercel.com/integrations/app-builder/new?state=${token}`,
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
                            `https://vercel.com/integrations/app-builder/new?state=${token}`,
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
                        className={classes.primaryButton}>
                        <Box> Deploy Frontend </Box>
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
                            `https://vercel.com/integrations/app-builder/new?state=${token}`,
                          );
                        }}>
                        <Box>Re-Deploy Frontend</Box>
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
            </CardContent>
          </Card>
          <Card className={classes.CardContainer}>
            <CardMedia
              component="img"
              alt="Deploy to HEREKU"
              height="160"
              image="./publish.svg"
              title="Contemplative Reptile"
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
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                className={classes.Typography3}>
                One line description
              </Typography>
              <Button
                disabled={props.value.app_frontend_url ? false : true}
                variant="contained"
                color="primary"
                disableElevation
                className={classes.primaryButton}
                onClick={() => {
                  window.open(`https://${props.value.app_frontend_url}`);
                }}>
                <Box>View Published App</Box>
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
};
export default Deploy;
