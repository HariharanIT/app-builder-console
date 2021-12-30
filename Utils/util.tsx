export const dataURLtoFile = (dataUrl: string, name: string) => {
  const mime = `image/${name.split('.')[name.split('.').length - 1]}`;
  console.log({dataUrl, name});
  return fetch(dataUrl)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], name, {type: mime});
    });
};

// check if image file ext exist or not of image cloud front url
export const checkFileExt = (fileUrl: string) => {
  const splitFileUrl = fileUrl.split('/');
  if (splitFileUrl[splitFileUrl.length - 1].lastIndexOf('.') < 0) return false;
  return true;
};

export const getFileNameFromUrl = ({
  fileUrl,
  fileName,
}: {
  fileUrl: string | File;
  fileName: string;
}) => {
  if (fileUrl) {
    // if http url
    if (typeof fileUrl === 'string') {
      if (fileUrl.includes('http')) {
        // Patch for old projects whoes cloudfront url doesn't have any extension
        if (checkFileExt(fileUrl)) {
          return `${fileName}.${
            fileUrl.split('.')[fileUrl.split('.').length - 1]
          }`;
        }
        return `${fileName}.jpeg`;
      }
      // for base64 encoded file, helpful for background images with different themes
      let arr: string[] | Array<any> = fileUrl.split(',');
      let mime = arr && arr[0].match(/:(.*?);/)[1];
      return `${fileName}.${mime.split('/')[1]}`;
    }
    // for file object, selected using file input
    return fileUrl.name;
  }
};
