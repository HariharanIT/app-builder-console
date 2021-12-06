import React from 'react';
import {Button, Box, Snackbar} from '@material-ui/core';
import type {LogoStateType, LogoType} from '../../pages/builder';
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
  const [SelectedImg, setSelectedImg] = React.useState<LogoStateType | any>(
    null,
  );
  const [selectedImgName, setSelectedImgName] = React.useState<string>('');
  const [uploadErr, setUploadErr] = React.useState<string>('');
  const hiddenInputElement = React.useRef<any>(null);
  const hiddenUploadBtnElement = React.useRef<any>(null);
  React.useEffect(() => {
    let filename: string = '';
    if (props.value) {
      if (typeof props.value === 'string' && props.value.includes('http')) {
        filename = `${props.name}.${
          props.value.split('.')[props.value.split('.').length - 1]
        }`;
      } else if (typeof props.value === 'string') {
        var arr: string[] | Array<any> = props.value.split(','),
          mime = arr && arr[0].match(/:(.*?);/)[1];
        filename = `${props.name}.${mime.split('/')[1]}`;
      } else {
        filename = `${props.name}.${props.value.type.split('/')[1]}`;
      }
    }
    setSelectedImg(() => props.value);
    setSelectedImgName(() => filename);
  }, [props.value, props.name]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : SelectedImg;
    if (file && file.size / (1024 * 1024) < 2) {
      setSelectedImg(() => file);
      onSubmitClick(file);
    } else {
      setUploadErr(() => 'Please upload a image less than 2 MB. ');
      hiddenInputElement.current.value = '';
    }
  };

  const onSubmitClick = (selectedFile: any) => {
    if (selectedFile && selectedFile !== null) {
      props.handler(selectedFile, props.name);
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
        disabled={SelectedImg}
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
          {SelectedImg || props.value ? selectedImgName : 'Select a file'}
        </div>
        {/* {SelectedImg && <img src="./Delete.svg" alt="..." onClick={(event) => {
          event.stopPropagation();
          setSelectedImg(null);
          hiddenInputElement.current.value = "";
          localStorage.removeItem(props.name);
          props.handler(null, props.name);
        }} />} */}
      </Button>
      {SelectedImg && (
        <Box
          fontSize="12px"
          lineHeight={2}
          style={{cursor: 'pointer'}}
          ml={6}
          color="red"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedImg(null);
            hiddenInputElement.current.value = '';
            window.localStorage.removeItem(props.name);
            props.handler(null, props.name);
          }}>
          Remove Image.
        </Box>
      )}
      <Button
        ref={hiddenUploadBtnElement}
        variant="outlined"
        color="primary"
        component="label"
        className={classes.uploadBtn}
        onClick={() => {
          onSubmitClick(SelectedImg);
        }}>
        Upload
      </Button>
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
