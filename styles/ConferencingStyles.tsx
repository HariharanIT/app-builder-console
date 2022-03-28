import {createStyles, makeStyles} from '@material-ui/core';

export const ProdcuctInfoStyles = makeStyles(() =>
  createStyles({
    backBtn: {
      display: 'flex',
      marginBottom: '15px',
      cursor: 'pointer',
      width: 'fit-content',
    },
    backArrow: {
      color: '#0B9DFC',
      marginRight: '10px',
    },
    headingContainer: {
      backgroundColor: '#a7cdfc',
      borderBottomRightRadius: '50px',
      borderTopRightRadius: '50px',
    },
    mainHading: {
      fontWeight: 500,
      fontSize: '19px',
      color: '#616161',
      marginBottom: '15px',
    },
    SwitchText: {
      fontFamily: 'acumin-pro, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      color: '#394A64',
      marginRight: '12px',
    },
    SwitchContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: '27px',
    },
    Setting: {
      marginRight: 'auto',
    },
    pstnText: {
      fontFamily: 'acumin-pro, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      color: '#8D959D',
    },
    pstnLink: {
      fontFamily: 'acumin-pro, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      color: '#29A9F9',
      marginLeft: '9px',
    },
    TurboUser: {
      fontFamily: 'acumin-pro, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      color: '#394A64',
      marginBottom: '15px',
    },
    textField: {
      background: '#F1F1F1',
      borderRadius: '4px',
      display: 'flex',
      borderColor: '#099DFD80',
      marginTop: '14px',
      marginBottom: '17px',
    },
    validation: {
      color: '#CF4040',
      fontSize: '12px',
      fontWeight: 400,
      marginBottom: '20px',
    },
    raiseHandIntent: {
      paddingLeft: '15px',
    },
  }),
);
