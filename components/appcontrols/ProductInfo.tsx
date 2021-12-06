import React from 'react';
import {Box, TextField, TextareaAutosize, Typography} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextTip from '../textTip';
import type {FormState} from '../../pages/builder';
import {ProductInfoStyles} from '../../styles/ProductInfoStyles';
interface ProductInfoProps {
  onClickBack: VoidFunction;
  handleValueChange:
    | ((
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => void)
    | undefined
    | any;
  value: FormState;
  errors: {product_name: ''; product_id: ''; landing_sub_heading: ''};
}

export default function ProductInfo(props: ProductInfoProps) {
  const classes = ProductInfoStyles();
  const {onClickBack, handleValueChange, errors} = props;
  console.log('errosrs on product info', {errors});
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
        General
      </Box>
      <Box pl={15} mr={15} className={classes.headingContainer}>
        <Typography
          variant="caption"
          className={classes.mainHading}
          component="h1">
          Product Information
        </Typography>
      </Box>
      <Box px={15}>
        <TextTip
          name="Product Name"
          tip="Product Name of your application. (Can contains spaces etc.)"
        />
        <TextField
          error={errors.product_name !== ''}
          className={classes.textField}
          label="E.g. Acme Conferencing"
          name="product_name"
          variant="outlined"
          value={props.value.product_name}
          onChange={(event: any) => {
            handleValueChange(event);
          }}
          helperText={errors.product_name}
        />
        <Box component="div" className={classes.textToTip}>
          File Name: acme_conferencing
        </Box>
        <TextTip
          name="Product Description "
          tip="Your project description will be used on the home screen and as the description in social media shares."
        />
        <TextareaAutosize
          style={
            errors.landing_sub_heading
              ? {border: '1px solid #ff1744', outline: 'none'}
              : {border: '1px solid #DEE5EF', outline: 'none'}
          }
          rowsMin={5}
          name="landing_sub_heading"
          placeholder="E.g. The Real-Time Engagement Platform for meanningful human connections"
          className={classes.textarea}
          value={props.value.landing_sub_heading}
          onChange={handleValueChange}
        />
        {errors.landing_sub_heading && (
          <Box fontSize="12px" lineHeight="0.8" ml={6} color="red">
            {errors.landing_sub_heading}
          </Box>
        )}
      </Box>
    </>
  );
}
