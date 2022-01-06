import React from 'react';
import {Button, Box, Snackbar} from '@material-ui/core';
import type {LogoType} from '../../pages/builder';
import {UploadStyles} from '../../styles/UploadStyles';
import MuiAlert from '@material-ui/lab/Alert';
interface UploadProps {
  name: LogoType;
  handler: Function;
  value: string | File;
}
function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Upload(props: UploadProps) {
  const classes = UploadStyles();
  const [uploadErr, setUploadErr] = React.useState<string>('');
  const hiddenInputElement = React.useRef<any>(null);

  // given the file as input, get the file name
  const getFileNameFromFile = (file: string | File) => {
    if (typeof file === 'string') {
      // for file with http link
      if (file.includes('http')) {
        return `${props.name}.${file.split('.')[file.split('.').length - 1]}`;
      }
      // for base64 encoded file, helpful for background images with different themes
      let arr: string[] | Array<any> = file.split(',');
      let mime = arr && arr[0].match(/:(.*?);/)[1];
      return `${props.name}.${mime.split('/')[1]}`;
    }
    // for file object, selected using file input
    return file.name;
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handle file upload');
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : '';
    if (file && file.size / (1024 * 1024) < 2) {
      props.handler(file, props.name);
    } else {
      setUploadErr(() => 'Please upload a image less than 2 MB. ');
      hiddenInputElement.current.value = '';
    }
  };

  const extensions: string[] = [
    'jpeg',
    'jpg',
    'png',
    'webp',
    'tiff',
    'tif',
    'gif',
    'svg',
  ];

  return (
    <>
      <input
        ref={hiddenInputElement}
        type="file"
        onChange={handleFileUpload}
        style={{display: 'none'}}
        accept={extensions.reduce(
          (acc, curr, idx) => `${idx === 1 ? '.' : ''}${acc},.${curr}`,
        )}
        id="file"
      />
      <Button
        variant="outlined"
        color="primary"
        component="label"
        className={classes.uploadBox}
        disabled={Boolean(props.value !== '' && props.value)}
        onClick={() => {
          hiddenInputElement.current.click();
        }}>
        <div
          color="primary"
          style={{
            textAlign: 'center',
            margin: '8px auto 12px auto',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            height: '20px',
            width: '120px',
          }}>
          {props.value !== '' && props.value
            ? getFileNameFromFile(props.value)
            : 'Select a file'}
        </div>
      </Button>
      {props.value !== '' && (
        <Box
          fontSize="12px"
          lineHeight={2}
          style={{cursor: 'pointer'}}
          ml={6}
          color="red"
          onClick={(event) => {
            event.stopPropagation();
            hiddenInputElement.current.value = '';
            props.handler('', props.name);
          }}>
          Remove Image.
        </Box>
      )}
      <Snackbar
        open={uploadErr !== ''}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={() => {
          setUploadErr('');
        }}>
        <Alert
          onClose={() => {
            setUploadErr('');
          }}
          severity="error">
          {uploadErr}
        </Alert>
      </Snackbar>
    </>
  );
}
