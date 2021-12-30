import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {useSideNavStyles} from './AppBuilderCustomizeTabs';
import ProductInfo from './ProductInfo';
import ColorFont from './ColorFont';
import JoinScreen from './JoinScreen';
import LogoBackground from './LogoBackground';
import Conferencing from './Conferencing';
import {
  useProductInfo,
  updateProductInfo,
} from '../contexts/ProductInfoContext';
export type LogoStateType = File | null;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  padding?: number;
}

export function TabPanel(props: TabPanelProps) {
  let {children, value, index, padding, ...other} = props;
  padding === undefined ? (padding = 2) : {};
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={padding}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AppBuilderVerticalTabContent = ({
  selectedTabValue,
  onClickBack,
}: {
  selectedTabValue: number;
  onClickBack: () => void;
}) => {
  const SideBarClasses = useSideNavStyles();
  const {errors, productInfo, dispatch: productInfoDispatch} = useProductInfo();

  const handleValueChange = (event: any) => {
    updateProductInfo(productInfoDispatch, {
      [event.target.name]: event.target.value,
    });
  };
  const handleThemeChange = (theme: any) => {
    updateProductInfo(productInfoDispatch, {
      primary_color: theme.primaryColor,
      primary_font_color: theme.primaryFontColor,
      secondary_font_color: theme.secondaryFontColor,
      primary_background_logo: theme.bg,
    });
  };
  const handleColorChange = (color: string, name: string) => {
    updateProductInfo(productInfoDispatch, {[name]: color});
  };
  const handleUpload = (file: LogoStateType, name: string) => {
    console.log({file}, {name});
    updateProductInfo(productInfoDispatch, {[name]: file});
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    updateProductInfo(productInfoDispatch, {[name]: checked});
  };
  return (
    <Box py={20} className={SideBarClasses.subContent}>
      <TabPanel padding={0} value={selectedTabValue} index={1}>
        <ProductInfo
          onClickBack={onClickBack}
          handleValueChange={handleValueChange}
          value={productInfo}
          errors={errors.productInfo}
        />
      </TabPanel>
      <TabPanel padding={0} value={selectedTabValue} index={3}>
        <ColorFont
          onClickBack={onClickBack}
          handleColorChange={handleColorChange}
          handleThemeChange={handleThemeChange}
          handleValueChange={handleValueChange}
          handleUpload={handleUpload}
          value={productInfo}
        />
      </TabPanel>
      <TabPanel padding={0} value={selectedTabValue} index={4}>
        <LogoBackground
          value={productInfo}
          onClickBack={onClickBack}
          handleUpload={handleUpload}
        />
      </TabPanel>
      <TabPanel padding={0} value={selectedTabValue} index={6}>
        <JoinScreen
          value={productInfo}
          onClickBack={onClickBack}
          handleCheckChange={handleCheckChange}
          handleValueChange={handleValueChange}
          errors={errors.authCred}
        />
      </TabPanel>
      <TabPanel padding={0} value={selectedTabValue} index={7}>
        <Conferencing
          onClickBack={onClickBack}
          handleValueChange={handleValueChange}
          value={productInfo}
          handleCheckChange={handleCheckChange}
          errors={errors.conferencingCred}
        />
      </TabPanel>
    </Box>
  );
};

export default AppBuilderVerticalTabContent;
