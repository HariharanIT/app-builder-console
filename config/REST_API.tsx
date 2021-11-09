import {getToken} from '../graphql/apollo';
import {IProductInfoDefaultObj} from '../constants/productInfoDefaults';

const url = 'https://staging1.rteappbuilder.com/';

export const uploadFile = async ({
  productInfo,
}: {
  productInfo: IProductInfoDefaultObj;
}) => {
  console.log({productInfo});
  const formData = new FormData();
  for (let key in productInfo) {
    // @ts-ignore
    formData.append(key, productInfo[key]);
  }
  // if (file) {
  // formData.append('ownerId', String(userId));
  // formData.append('file', file);

  const requestOptions: any = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
    headers: new Headers({
      Authorization: getToken(),
    }),
  };

  const response = await fetch(
    `${url}update?project=${productInfo.id}`,
    requestOptions,
  );

  return response;
};
