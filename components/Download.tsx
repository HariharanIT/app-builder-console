import React from 'react';
import Button from '@material-ui/core/Button';
import JSZip from 'jszip';
import type {FormState} from '../pages/builder';
import {saveAs} from 'file-saver';
import {DownloadStyles} from '../styles/DownloadStyles';
import {dataURLtoFile, getFileNameFromUrl} from '../Utils/util';
import generateConfigObj from '../Utils/generateConfigObj';
import {packageJson, themeJson} from '../constants/downloadConstants';
interface DownloadProps {
  configData: FormState;
  saveStatus: String;
  saveBtnFn: Function;
}

// const getBase64FromUrl = async (url: string) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const base64 = await new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
//   return base64;
// };
export default function Download(props: DownloadProps) {
  const [disableDownload, setDisableDownload] = React.useState(false);
  const classes = DownloadStyles();
  const download = async () => {
    const zip = new JSZip();
    const appBuilderZipped = zip.folder('agora-app-builder');
    // const base64Temp = await getBase64FromUrl(props.configData.primary_logo);
    // background image
    let bgFileName: string | undefined = getFileNameFromUrl({
      fileUrl: props.configData.primary_background_logo,
      fileName: 'bg',
    });
    // app icon
    let squarFileName: string | undefined = getFileNameFromUrl({
      fileUrl: props.configData.primary_square_logo,
      fileName: 'logoSquare',
    });
    // primary logo
    let reactFileName: string | undefined = getFileNameFromUrl({
      fileUrl: props.configData.primary_logo,
      fileName: 'logoRect',
    });
    if (appBuilderZipped) {
      // AAB.file('config.json', JSON.stringify(props.configData, null, 2));
      appBuilderZipped.file(
        'config.json',
        JSON.stringify(
          {
            ...generateConfigObj(props.configData),
            LOGO: props.configData.primary_logo ? reactFileName : '',
            ICON: props.configData.primary_square_logo ? squarFileName : '',
            BG: props.configData.primary_background_logo ? bgFileName : '',
          },
          null,
          2,
        ),
      );
      appBuilderZipped.file(
        'package.json',
        JSON.stringify(packageJson, null, 2),
      );
      appBuilderZipped.file('theme.json', JSON.stringify(themeJson, null, 2));

      if (props.configData.primary_logo && squarFileName) {
        if (typeof props.configData.primary_logo === 'string') {
          appBuilderZipped.file(
            squarFileName,
            await dataURLtoFile(props.configData.primary_logo, squarFileName),
            {
              binary: true,
            },
          );
        } else {
          appBuilderZipped.file(squarFileName, props.configData.primary_logo, {
            binary: true,
          });
        }
      }
      if (props.configData.primary_square_logo !== '' && reactFileName) {
        if (typeof props.configData.primary_square_logo === 'string') {
          appBuilderZipped.file(
            reactFileName,
            await dataURLtoFile(
              props.configData.primary_square_logo,
              reactFileName,
            ),
            {
              binary: true,
            },
          );
        } else {
          appBuilderZipped.file(
            reactFileName,
            props.configData.primary_square_logo,
            {
              binary: true,
            },
          );
        }
      }
      if (props.configData.primary_background_logo !== '' && bgFileName) {
        if (typeof props.configData.primary_background_logo === 'string') {
          appBuilderZipped.file(
            bgFileName,
            await dataURLtoFile(
              props.configData.primary_background_logo,
              bgFileName,
            ),
            {
              binary: true,
            },
          );
        } else {
          appBuilderZipped.file(
            bgFileName,
            props.configData.primary_background_logo,
          );
        }
      }
      zip.generateAsync({type: 'blob'}).then(function (content) {
        // see FileSaver.js
        saveAs(content, `${props.configData.product_name}.zip`);
      });
    }
  };
  return (
    <Button
      style={{
        height: '100%',
      }}
      className={classes.primarybutton}
      variant="contained"
      color="primary"
      disabled={disableDownload}
      onClick={async () => {
        setDisableDownload(true);
        // if the app is in saved state, call download code function
        // else save try to save the  project first, if successfully saved then download
        if (props.saveStatus === 'complete') {
          await download();
        } else {
          // if successfully saved, then download.
          try {
            await props.saveBtnFn();
            await download();
          } catch (error) {
            console.log(
              `Failure occured while saving and download, Error: ${error}`,
            );
          }
        }
        setDisableDownload(false);
      }}
      disableElevation>
      Download source code
    </Button>
  );
}
