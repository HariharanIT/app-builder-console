import React from 'react';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Button} from '@material-ui/core';

export const useProjectNavStyles = makeStyles(() =>
  createStyles({
    navContainer: {
      display: 'flex',
      ['@media (max-width:600px)']: {
        display: 'block',
      },
    },
    navigationBtn: {
      display: 'flex',
      marginLeft: 'auto',
      width: 'fit-content',
      paddingRight: '80px',
      paddingLeft: '80px',
      ['@media (max-width:500px)']: {
        zoom: '0.9',
      },
    },
    nextBtn: {
      width: '80px',
      height: '100%',
      placeItems: 'center',
      padding: '10px',
      marginLeft: '5px',
      fontFamily: 'acumin-pro, sans-serif',
      borderBottomRightRadius: '50px',
      borderTopRightRadius: '50px',
      '&:hover': {
        backgroundColor: '#349dfb',
        color: '#fff',
        cursor: 'pointer',
      },
    },
    prevBtn: {
      width: '80px',
      height: '100%',
      placeItems: 'center',
      padding: '10px',
      fontFamily: 'acumin-pro, sans-serif',
      marginRight: '5px',
      borderBottomLeftRadius: '50px',
      borderTopLeftRadius: '50px',
      '&:hover': {
        backgroundColor: '#349dfb',
        color: '#fff',
        cursor: 'pointer',
      },
    },
  }),
);

export interface IProjectNav {
  skipData: number;
  setSkipData: (skipData: number) => void;
  loadMore: boolean;
}

const ProjectNavigation = ({skipData, setSkipData, loadMore}: IProjectNav) => {
  const ProjectNavClasses = useProjectNavStyles();

  return (
    <Box className={ProjectNavClasses.navContainer}>
      <Box px={40} lineHeight={3} fontSize="16px" whiteSpace="nowrap">
        <b>Your Projects</b>
      </Box>
      {/* project navigation */}
      <Box className={ProjectNavClasses.navigationBtn} mt={5}>
        {skipData > 0 && (
          <Button
            disableRipple
            disableElevation
            className={ProjectNavClasses.prevBtn}
            onClick={() => {
              setSkipData(skipData - 3);
            }}>
            <ArrowBackIosIcon />
            &nbsp;Back
          </Button>
        )}
        {loadMore && (
          <Button
            disableRipple
            disableElevation
            className={ProjectNavClasses.nextBtn}
            onClick={() => {
              setSkipData(skipData + 3);
            }}>
            Next&nbsp;
            <ArrowForwardIosIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProjectNavigation;
