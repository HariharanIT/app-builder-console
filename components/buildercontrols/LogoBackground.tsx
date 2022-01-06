import React from 'react';
import Upload from './Upload';
import {Box, Typography} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextTip from '../textTip';
import type {FormState} from '../../pages/builder';
import {LogoBackgroundStyles} from '../../styles/LogoBackgroundStyles';
export type LogoType = 'logoRect' | 'logoSquare' | 'illustration' | 'bg';
export type LogoStateType = File | null;
interface LogoBackgroundProps {
  onClickBack: VoidFunction;
  handleUpload: (file: LogoStateType, name: LogoType) => void | any;
  value: FormState;
}
export default function LogoBackground(props: LogoBackgroundProps) {
  const {onClickBack, handleUpload, value} = props;
  const classes = LogoBackgroundStyles();
  console.log({value});
  return (
    <>
      <Box
        px={15}
        component="div"
        className={classes.backBtn}
        onClick={onClickBack}>
        <ArrowBackIcon className={classes.backArrow} />
        <Box component="span">Back</Box>
      </Box>
      <Box fontWeight={500} fontSize={22} mb={6} pl={15}>
        Branding
      </Box>
      <Box pl={15} mr={15} className={classes.headingContainer}>
        <Typography
          variant="caption"
          className={classes.mainHading}
          component="h1">
          Logos
        </Typography>
      </Box>
      <Box px={15}>
        <Box component="div" className={classes.Text}>
          Logo{' '}
        </Box>
        <TextTip
          name="Primary Logo"
          tip="Upload an image to be used as the Primary Logo (recommended size 1200 x 412)"
        />
        <Box className={classes.uploadBox}>
          <Upload
            key={0}
            handler={handleUpload}
            name="primary_logo"
            value={value['primary_logo']}
          />
        </Box>
        <TextTip
          name="App Icon"
          tip="Upload an image to be used as the App Icon (recommended size 1000x1000)"
        />
        <Box className={classes.uploadBox} style={{marginBottom: '40px'}}>
          <Upload
            key={1}
            handler={handleUpload}
            name="primary_square_logo" // app icon
            value={value['primary_square_logo']}
          />
        </Box>
      </Box>
    </>
  );
}
