import React from 'react';
import Button from '@material-ui/core/Button';
import JSZip from 'jszip';
import type {FormState} from '../pages/console';
import {saveAs} from 'file-saver';

interface DownloadProps {
  configData: FormState;
  logoSquare?: File | null;
  logoRect?: File | null;
}
const packageJson = {
  name: 'agora-app-builder',
  version: '1.0.0',
  scripts: {
    start: 'app-builder-init',
  },
  keywords: [],
  license: 'MIT',
  dependencies: {
    'agora-app-builder-cli': '^0.0.1',
  },
};

export default function Download(props: DownloadProps) {
  const download = () => {
    const zip = new JSZip();
    const AAB = zip.folder('agora-app-builder');
    if (AAB) {
      AAB.file('config.json', JSON.stringify(props.configData, null, 2));
      AAB.file('package.json', JSON.stringify(packageJson, null, 2));
      if (props.configData.logoSquare && props.logoSquare) {
        AAB.file(props.configData.logoSquare, props.logoSquare, {binary: true});
      }
      if (props.configData.logoRect && props.logoRect) {
        AAB.file(props.configData.logoRect, props.logoRect, {binary: true});
      }
      zip.generateAsync({type: 'blob'}).then(function (content) {
        // see FileSaver.js
        saveAs(content, `${props.configData.projectName}.zip`);
      });
    }
  };
  return (
    <Button
      style={{color: '#fff'}}
      variant="contained"
      color="primary"
      onClick={download}
      disableElevation>
      Download
    </Button>
  );
}
