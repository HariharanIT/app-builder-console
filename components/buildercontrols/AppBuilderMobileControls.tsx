import React from 'react';
import {
  Menu,
  Box,
  Button,
  Tooltip,
  MenuItem,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import {useRouter} from 'next/router';
import {
  useProductInfo,
  isFormValidationError,
} from '../contexts/ProductInfoContext';
import {IBuilderControls} from './AppBuilderDesktopControls';
import Download from '../Download';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primarybutton: {
      borderRadius: '50px',
      color: '#fff',
      ['@media (max-width:1028px)']: {
        fontSize: '12px',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    popupMenu: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const AppBuilderMobileControls = ({
  handleSaveProject,
  handleAppDeploy,
  setShowConfirmBox,
}: IBuilderControls) => {
  const classes = useStyles();
  const router = useRouter();
  const {status, errors: productInfoError, productInfo} = useProductInfo();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box mx={7} className={classes.sectionMobile}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        classes={{
          paper: classes.popupMenu,
        }}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '25ch',
          },
        }}>
        <MenuItem>
          <Button
            variant="outlined"
            style={{borderRadius: '50px', width: '100%'}}
            disableRipple={true}
            onClick={() => {
              if (status !== 'complete') {
                setShowConfirmBox(true);
              } else {
                router.push('/create');
              }
            }}>
            <Box>Close</Box>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            disabled={status === 'complete'}
            disableRipple={true}
            style={{borderRadius: '50px', width: '100%'}}
            variant="outlined"
            color="primary"
            onClick={async () => {
              try {
                await handleSaveProject();
              } catch (error) {
                console.log(
                  `Error occured during project save. Error: ${error}`,
                );
              }
            }}>
            <Box mx={18} display="flex">
              <Box mr={5}>
                {
                  {
                    pending: 'Save',
                    inProgress: 'Saving',
                    complete: 'Saved',
                    rejected: 'Save',
                  }[status]
                }
              </Box>
              {status !== 'complete' && (
                <Tooltip
                  title={
                    {
                      pending: 'Save',
                      inProgress: 'Saving',
                      complete: 'Saved',
                      rejected: 'Save',
                    }[status]
                  }>
                  <InfoIcon
                    style={
                      {
                        pending: {color: '#099CFC', marginLeft: '10px'},
                        inProgress: {color: '#FFC107', marginLeft: '10px'},
                        complete: {color: '#099CFC', marginLeft: '10px'},
                        rejected: {color: '#FF8989', marginLeft: '10px'},
                      }[status]
                    }
                  />
                </Tooltip>
              )}
              {isFormValidationError(productInfoError) && (
                <Tooltip title="Required fields are not filled. Please check">
                  <InfoIcon style={{color: '#FF8989', marginLeft: '10px'}} />
                </Tooltip>
              )}
            </Box>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.primarybutton}
            style={{width: '100%'}}
            disabled={isFormValidationError(productInfoError)}
            onClick={async () => {
              try {
                await handleAppDeploy();
              } catch (error) {
                console.log(
                  `Failure occured while saving and opening deploy modal, Error: ${error}`,
                );
              }
            }}>
            <Box>Deploy your App</Box>
          </Button>
        </MenuItem>
        <MenuItem>
          <Download
            saveStatus={status}
            configData={productInfo}
            saveBtnFn={async () => {
              try {
                await handleSaveProject();
              } catch (error) {
                console.log(
                  `Error occured during project save. Error: ${error}`,
                );
              }
            }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AppBuilderMobileControls;
