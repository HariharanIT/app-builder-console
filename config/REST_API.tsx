import {getToken} from '../graphql/apollo';
import {IProductInfoDefaultObj} from '../constants/productInfoDefaults';
import {BACKEND_URL} from '../constants/config';

export const uploadFile = async ({
  productInfo,
}: {
  productInfo: IProductInfoDefaultObj;
}) => {
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
    credentials: 'include',
  };

  const response = await fetch(
    `${BACKEND_URL}/update?project=${productInfo.id}`,
    requestOptions,
  );

  return response;
};
