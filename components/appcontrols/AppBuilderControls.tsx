import React from 'react';
import AppBuilderDesktopControls from './AppBuilderDesktopControls';
import AppBuilderMobileControls from './AppBuilderMobileControls';

export interface IProjectBuilderControls {
  openDeployModal: () => void;
}
const AppBuilderControls = (props: IProjectBuilderControls) => {
  return (
    <>
      <AppBuilderDesktopControls {...props} />
      <AppBuilderMobileControls {...props} />
    </>
  );
};

export default AppBuilderControls;
