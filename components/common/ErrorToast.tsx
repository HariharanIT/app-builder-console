import React from 'react';
import {Snackbar, makeStyles} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {useProductInfo} from '../contexts/ProductInfoContext';

let vertical: any = 'top';
let horizontal: any = 'center';

const useBackDropStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#099DFD',
  },
  filledErrorCustom: {
    backgroundColor: '#FF8989',
    opacity: '93% !important',
  },
  closeIconError: {
    display: 'block',
  },
}));
function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ErrorToast = ({
  isOpen,
  setShowError,
}: {
  isOpen: boolean;
  setShowError: (input: boolean) => void;
}) => {
  const {errors: productInfoError} = useProductInfo();
  const BackDropStyle = useBackDropStyles();
  console.log(productInfoError);
  const {authCred, conferencingCred, productInfo} = productInfoError;
  const {apple, google, microsoft, slack} = authCred;
  const {cloud, pstn} = conferencingCred;
  const {landing_sub_heading, product_name} = productInfo;
  const {pstn_email, pstn_password, pstn_account} = pstn;
  const {
    customer_id,
    customer_certificate,
    bucket_name,
    bucket_access_key,
    bucket_access_secret,
  } = cloud;
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{vertical, horizontal}}
      autoHideDuration={10000}
      onClose={() => {
        console.log('snackbar');
        setShowError(false);
      }}>
      <Alert
        classes={{
          filledError: BackDropStyle.filledErrorCustom,
          action: BackDropStyle.closeIconError,
        }}
        onClose={() => {
          console.log('alert');
          setShowError(false);
        }}
        severity="error">
        Error occured in following fields : <br />
        {/* Product general info errors */}
        {product_name && <div>{product_name} ,</div>}
        {landing_sub_heading && <div>{landing_sub_heading} ,</div>}
        {/* conferencing screen errors */}
        {/* PSTN */}
        {pstn_email && <div>{pstn_email}</div>}
        {pstn_password && <div>{pstn_password}</div>}
        {pstn_account && <div>{pstn_account}</div>}
        {/* Cloud */}
        {customer_id && <div>{customer_id}</div>}
        {customer_certificate && <div>{customer_certificate}</div>}
        {bucket_name && <div>{bucket_name}</div>}
        {bucket_access_key && <div>{bucket_access_key}</div>}
        {bucket_access_secret && <div>{bucket_access_secret}</div>}
        {/* Authentication Screen errors */}
        {/* Google */}
        {google.google_client_id && <div>{google.google_client_id}</div>}
        {google.google_client_secret && (
          <div>{google.google_client_secret}</div>
        )}
        {/* Microsoft */}
        {microsoft.microsoft_client_id && (
          <div>{microsoft.microsoft_client_id}</div>
        )}
        {microsoft.microsoft_client_secret && (
          <div>{microsoft.microsoft_client_secret}</div>
        )}
        {/* Slack */}
        {slack.slack_client_id && <div>{slack.slack_client_id}</div>}
        {slack.slack_client_secret && <div>{slack.slack_client_secret}</div>}
        {/* Apple */}
        {apple.apple_client_id && <div>{apple.apple_client_id}</div>}
        {apple.apple_key_id && <div>{apple.apple_key_id}</div>}
        {apple.apple_private_key && <div>{apple.apple_private_key}</div>}
        {apple.apple_team_id && <div>{apple.apple_team_id}</div>}
      </Alert>
    </Snackbar>
  );
};

export default ErrorToast;
