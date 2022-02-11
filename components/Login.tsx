import React from 'react';
import {Box, createStyles, makeStyles} from '@material-ui/core';
import {
  AGORA_SSO_SIGNUP,
  AGORA_SSO_LOGIN,
  REDIRECT_URL,
  AGORA_SSO_CLIENT_ID,
} from '../constants/config';
// import styles from './auth.module.css';

const Login = () => {
  const useAuthstyle = makeStyles(() =>
    createStyles({
      xmain: {
        border: '0',
        display: 'block',
        fontFamily: 'Helvetica Neue, Arial, pingfang SC, Microsoft YaHei',
        lineHeight: '1.5',
        margin: '0',
        padding: '0',
        WebkitTapHighlightColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        outline: '0',
        color: '#4f4f4f',
        fontSize: '14px',
        height: '100vh',
        backgroundColor: '#fff',
      },
      xheader: {
        fontFamily: 'Helvetica Neue, Arial, pingfang SC, Microsoft YaHei',
        lineHeight: '1.5',
        WebkitTapHighlightColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        color: '#4f4f4f',
        fontSize: '14px',
        border: '0',
        margin: '0',
        padding: '0',
        height: '70px',
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
      },
      xlogo: {
        fontFamily: 'Helvetica Neue, Arial, pingfang SC, Microsoft YaHei',
        lineHeight: '1.5',
        WebkitTapHighlightColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        border: '0',
        fontSize: '100%',
        verticalAlign: 'baseline',
        padding: '0',
        float: 'left',
        width: '103px',
        height: '40px',
        margin: '20px 0 0 30px',
        background:
          'url(https://web-cdn.agora.io/sso/static/img/logo.png) no-repeat',
        textIndent: '-200px',
        overflow: 'hidden',
        backgroundSize: '100%',
      },
      xpagecontainer: {
        fontFamily: 'Helvetica Neue, Arial, pingfang SC, Microsoft YaHei',
        lineHeight: '1.5',
        WebkitTapHighlightColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        color: '#4f4f4f',
        fontSize: '14px',
        border: '0',
        margin: '0',
        padding: '0',
        width: '100%',
        left: '0',
        minHeight: '100%',
        display: 'flex',
        background: 'none !important',
      },
      xpageinner: {
        fontFamily: 'Helvetica Neue, Arial, pingfang SC, Microsoft YaHei',
        lineHeight: '1.5',
        WebkitTapHighlightColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        color: '#4f4f4f',
        fontSize: '14px',
        border: '0',
        padding: '0',
        width: '352px',
        margin: 'auto',
      },
      xhr: {margin: '40px 80px 25px 80px'},
      xtext: {
        fontFamily: '"Helvetica Neue", Arial, pingfang SC, Microsoft YaHei',
        lineHeight: '48px',
        border: '0',
        textAlign: 'center',
        margin: '10px',
        padding: '0',
        fontWeight: 400,
        fontSize: '20px',
        color: '#000',
      },
      xbtnouter: {
        fontFamily: 'Helvetica Neue, Arial, pingfang SC, Microsoft YaHei',
        lineHeight: '1.5',
        WebkitTapHighlightColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        color: '#4f4f4f',
        fontSize: '14px',
        border: '0',
        margin: '0',
        padding: '0',
        marginBottom: '10px',
        position: 'relative',
      },
      xbtn: {
        WebkitTapHighlightColor: 'transparent',
        WebkitFontSmoothing: 'antialiased',
        height: '40px',
        padding: '6px 20px',
        textAlign: 'center',
        borderRadius: '2px',
        fontSize: '18px',
        border: '0 none',
        cursor: 'pointer',
        backgroundColor: '#099dfd',
        color: '#fff',
        width: '100%',
      },
    }),
  );
  const styles = useAuthstyle();

  //   return <>This is sparts</>;
  return (
    <>
      <Box className={styles.xmain}>
        <Box className={styles.xheader}>
          <a
            href="https://www.agora.io/"
            target="_blank"
            className={styles.xlogo}>
            Agora.io
          </a>
        </Box>
        <Box className={styles.xpagecontainer}>
          <Box className={styles.xpageinner}>
            <Box className={styles.xtext}>New to Agora?</Box>
            <Box className={styles.xbtnouter}>
              <a
                href={`${AGORA_SSO_SIGNUP}?response_type=code&client_id=${AGORA_SSO_CLIENT_ID}&redirect_uri=${REDIRECT_URL}/agora&scope=basic_info`}
                target="_blank">
                <button type="button" className={styles.xbtn}>
                  Sign Up
                </button>
              </a>
            </Box>
            <hr className={styles.xhr} />
            <Box className={styles.xtext}>Already have an account?</Box>
            <Box className={styles.xbtnouter}>
              <a
                href={`${AGORA_SSO_LOGIN}?scope=basic_info&response_type=code&state=url=${window.location.origin}/redirect&redirect_uri=${REDIRECT_URL}/agora&client_id=${AGORA_SSO_CLIENT_ID}`}>
                <button type="button" className={styles.xbtn}>
                  Login
                </button>
              </a>

              {/* <a href="https://sso2.agora.io/api/v0/oauth/authorize?scope=basic_info&response_type=code&redirect_uri=https://agoraappbuilder.com/auth&client_id=ece4e8acaa5e488ab5109d3fc66df72b">
                  <button type="button" className={styles.xbtn}>
                    Login
                  </button>
                </a> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
