import React from 'react';
import {
  Tabs,
  Box,
  Tab,
  makeStyles,
  createStyles,
  Typography,
  Grid,
} from '@material-ui/core';
import LivePreviewContent from './LivePreviewContent';
import {useProductInfo} from '../contexts/ProductInfoContext';
import {
  LivePreviewProvider,
  useLivePreview,
} from '../contexts/LivePreviewContext';
import {ProjectTemplate} from '../../constants/productInfoDefaults';

const DesktopIcon = ({color}: {color: string}) => (
  <svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.67445 0H22.1357C23.1149 0.000334501 24.0539 0.389462 24.7463 1.08185C25.4387 1.77424 25.8278 2.71322 25.8281 3.6924V14.7691C25.8278 15.7483 25.4387 16.6873 24.7463 17.3797C24.0539 18.0721 23.1149 18.4612 22.1357 18.4615H3.67445C2.69527 18.4612 1.75628 18.0721 1.0639 17.3797C0.37151 16.6873 -0.0176163 15.7483 -0.0179501 14.7691V3.6924C-0.0176163 2.71322 0.37151 1.77424 1.0639 1.08185C1.75628 0.389462 2.69527 0.000334507 3.67445 0V0ZM1.82838 14.7691C1.82831 15.0116 1.87602 15.2516 1.96877 15.4757C2.06152 15.6997 2.1975 15.9032 2.36893 16.0746C2.54037 16.2461 2.74391 16.3821 2.96791 16.4748C3.19192 16.5676 3.432 16.6153 3.67445 16.6152H22.1357C22.3782 16.6153 22.6183 16.5676 22.8423 16.4748C23.0663 16.3821 23.2698 16.2461 23.4412 16.0746C23.6127 15.9032 23.7487 15.6997 23.8414 15.4757C23.9342 15.2516 23.9819 15.0116 23.9818 14.7691V3.6924C23.982 3.44992 23.9344 3.20977 23.8417 2.98571C23.749 2.76164 23.613 2.55805 23.4415 2.38659C23.2701 2.21512 23.0665 2.07915 22.8424 1.98645C22.6184 1.89374 22.3782 1.84613 22.1357 1.84633H3.67445C3.43197 1.84613 3.19182 1.89374 2.96775 1.98645C2.74369 2.07915 2.5401 2.21512 2.36864 2.38659C2.19717 2.55805 2.0612 2.76164 1.96849 2.98571C1.87579 3.20977 1.82818 3.44992 1.82838 3.6924V14.7691ZM6.44357 22.1537H19.3666C19.6114 22.1537 19.8463 22.2509 20.0194 22.4241C20.1925 22.5972 20.2898 22.832 20.2898 23.0768C20.2898 23.3217 20.1925 23.5565 20.0194 23.7296C19.8463 23.9027 19.6114 24 19.3666 24H6.44357C6.19879 24 5.96405 23.9027 5.79098 23.7296C5.6179 23.5565 5.52068 23.3217 5.52068 23.077C5.52068 22.8322 5.6179 22.5974 5.79098 22.4243C5.96405 22.2512 6.19879 22.154 6.44357 22.1539V22.1537Z"
      fill={`${color}`}
    />
  </svg>
);

const MobileIcon = ({color}: {color: string}) => (
  <svg
    width="26"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20.4 26.4">
    <defs>
      <style dangerouslySetInnerHTML={{__html: `.cls-1{fill:${color};}`}} />
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          className="cls-1"
          d="M20.2,1.54a3,3,0,0,0-.56-.81A2.72,2.72,0,0,0,17.82,0H2.58A2.72,2.72,0,0,0,.76.73a2.51,2.51,0,0,0-.56.81,2.66,2.66,0,0,0-.2,1V23.91a2.38,2.38,0,0,0,.2.95,2.4,2.4,0,0,0,.56.81,2.62,2.62,0,0,0,1.82.73H17.82a2.62,2.62,0,0,0,1.82-.73,2.51,2.51,0,0,0,.56-.81,2.38,2.38,0,0,0,.2-.95V2.5A2.43,2.43,0,0,0,20.2,1.54Zm-1.83,1V23.91a.56.56,0,0,1-.17.4.67.67,0,0,1-.42.16H2.58a.59.59,0,0,1-.42-.17A.48.48,0,0,1,2,23.91V2.5a.74.74,0,0,1,0-.21.33.33,0,0,1,.11-.15A.59.59,0,0,1,2.34,2a1,1,0,0,1,.24,0H17.82a1,1,0,0,1,.24,0,.46.46,0,0,1,.18.13.7.7,0,0,1,.13.17A.89.89,0,0,1,18.37,2.53Z"
        />
        <path
          className="cls-1"
          d="M13.21,20.18a1.08,1.08,0,0,1-1.08,1.09H8.27a1.09,1.09,0,0,1,0-2.18h3.86A1.08,1.08,0,0,1,13.21,20.18Z"
        />
      </g>
    </g>
  </svg>
);

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useContentStyles = makeStyles(() =>
  createStyles({
    NavContainer: {
      height: 'calc(100vh - 70px)',
      overflow: 'hidden',
      // '&::-webkit-scrollbar': {
      //   width: '0em'
      // },
      maxWidth: 'calc(100% - 280px)',
      flexBasis: 'calc(100% - 280px)',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        maxWidth: 'calc(100% - 210px)',
        flexBasis: 'calc(100% - 210px)',
      },
      ['@media (max-width:550px)']: {
        display: 'none',
      },
    },
    topNav: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '40px',
      paddingLeft: '60px',
      paddingRight: '60px',
      flexWrap: 'wrap',
      ['@media screen and (max-width: 900px) and (min-width: 550px)']: {
        zoom: '0.8',
      },
    },

    mainHading: {
      fontWeight: 'bold',
      fontSize: '26px',
      color: '#000000',
    },
    lable: {
      background: 'rgba(10, 157, 252, 0.1)',
      borderRadius: '50px',
      marginLeft: '10px',
      marginRight: 'auto',
    },
    lableText: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#099CFC',
      margin: '3px 11px',
    },
    muTabRootPreview: {
      minHeight: 'auto',
      minWidth: 'auto',
    },
  }),
);

const getProjectTemplateName = (value: keyof typeof ProjectTemplate) => {
  try {
    return ProjectTemplate[value] ? ProjectTemplate[value] : '';
  } catch (e) {
    console.error('Could not find the project template name');
  }
};

const LivePreviewHeaderTitle = () => {
  const ContentClasses = useContentStyles();
  const {productInfo} = useProductInfo();

  return (
    <>
      <Typography
        variant="caption"
        className={ContentClasses.mainHading}
        component="h1">
        {productInfo.heading !== '' ? productInfo.heading : 'Acme Conferencing'}
      </Typography>
      <Box className={ContentClasses.lable}>
        <Typography
          variant="caption"
          className={ContentClasses.lableText}
          component="p">
          {getProjectTemplateName(
            productInfo.project_template as keyof typeof ProjectTemplate,
          )}
        </Typography>
      </Box>
    </>
  );
};
const LivePeviewScreenTypeToggle = () => {
  const ContentClasses = useContentStyles();
  const {livePreviewDisplayType, setLivePreviewDisplayType} = useLivePreview();
  const [iconColor, setIconColor] = React.useState({
    desktop: '#0A9DFC',
    mobile: '#8D959D',
  });
  const handlePrevieTypeChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number,
  ) => {
    setLivePreviewDisplayType(newValue);
  };
  return (
    <Tabs
      value={livePreviewDisplayType}
      onChange={handlePrevieTypeChange}
      aria-label="nav tabs example"
      TabIndicatorProps={{style: {display: 'none'}}}>
      <Tab
        icon={<DesktopIcon color={iconColor.desktop} />}
        {...a11yProps(0)}
        classes={{root: ContentClasses.muTabRootPreview}}
        onClick={() => {
          setIconColor({
            desktop: '#0A9DFC',
            mobile: '#8D959D',
          });
        }}
      />
      <Tab
        icon={<MobileIcon color={iconColor.mobile} />}
        {...a11yProps(1)}
        classes={{root: ContentClasses.muTabRootPreview}}
        onClick={() => {
          setIconColor({
            desktop: '#8D959D',
            mobile: '#0A9DFC',
          });
        }}
      />
    </Tabs>
  );
};
const LivePreviewHeader = () => {
  const ContentClasses = useContentStyles();
  return (
    <Box className={ContentClasses.topNav}>
      <LivePreviewHeaderTitle />
      <LivePeviewScreenTypeToggle />
    </Box>
  );
};
const LivePreview = () => {
  const ContentClasses = useContentStyles();
  return (
    <Grid item xs={12} sm={8} md={9} className={ContentClasses.NavContainer}>
      <LivePreviewProvider>
        <LivePreviewHeader />
        <LivePreviewContent />
      </LivePreviewProvider>
    </Grid>
  );
};

export default LivePreview;
