import React, {createContext, useContext, Dispatch} from 'react';
import {
  IProductInfoDefaultObj,
  productInfoDefaultObj,
} from '../../constants/productInfoDefaults';
import {tempErrorObject} from '../../Utils/errorUtils';
import {LogoStateType} from '../Appcontrols/AppBuilderVerticalTabContent';

interface ProductInfoContext {
  status: 'pending' | 'inProgress' | 'complete' | 'rejected';
  errors: any;
  storedProductInfo: IProductInfoDefaultObj; // used to keep track of the backend state of product info
  productInfo: IProductInfoDefaultObj; // used to keep track of the frontend product info updates
  dispatch: Dispatch<any>;
}

export const ProductInfoContext = createContext(
  null as unknown as ProductInfoContext,
);

ProductInfoContext.displayName = 'ProductInfoContext';
type ProductInfoAction =
  | {type: 'start update'; updates: {[key: string]: {}}}
  | {type: 'finish update'; updates: {[key: string]: {}}}
  | {type: 'fail update'; error: {[key: string]: {}}}
  | {type: 'inprogress update'}
  | {type: 'validate info'; errors: {[key: string]: {}}}
  | {type: 'reset'};

function userReducer(state: ProductInfoContext, action: ProductInfoAction) {
  switch (action.type) {
    case 'start update': {
      return {
        ...state,
        productInfo: {...state.productInfo, ...action.updates},
        status: 'pending',
      };
    }
    case 'finish update': {
      return {
        ...state,
        productInfo: action.updates,
        status: 'complete',
        storedProductInfo: action.updates,
      };
    }
    case 'fail update': {
      return {
        ...state,
        status: 'rejected',
        errors: action.error,
        productInfo: state.storedProductInfo,
      };
    }
    case 'inprogress update': {
      return {
        ...state,
        status: 'inProgress',
      };
    }
    case 'validate info': {
      return {
        ...state,
        status: 'rejected',
        errors: action.errors,
      };
    }
    case 'reset': {
      return {
        ...state,
        status: 'complete',
        errors: tempErrorObject,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

export function ProductInfoProvider({children}: React.PropsWithChildren<{}>) {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(userReducer, {
    status: 'complete',
    errors: tempErrorObject,
    storedProductInfo: productInfoDefaultObj,
    productInfo: productInfoDefaultObj,
  });
  // const [productInfo, setProductInfo] = React.useState<IProductInfoDefaultObj>(productInfoDefaultObj);
  const {status, errors, storedProductInfo, productInfo} = state;

  return (
    <ProductInfoContext.Provider
      value={{
        status,
        errors,
        storedProductInfo,
        productInfo,
        dispatch,
      }}>
      {children}
    </ProductInfoContext.Provider>
  );
}

export function useProductInfo() {
  const context = useContext(ProductInfoContext);
  if (context === undefined) {
    throw new Error(`useProductInfo must be used within a ProductInfoProvider`);
  }
  return context;
}

export async function updateProductInfo(
  dispatch: {
    (value: any): void;
    (value: any): void;
    (value: any): void;
    (value: any): void;
    (value: any): void;
    (value: any): void;
    (arg0: {type: string; updates: any}): void;
  },
  updates: {
    [x: string]: string | boolean | LogoStateType;
    [x: number]: any;
    primary_color?: any;
    primary_font_color?: any;
    secondary_font_color?: any;
    primary_background_logo?: any;
  },
) {
  dispatch({type: 'start update', updates});
  // try {
  //     // const updatedUser = await userClient.updateUser(user, updates)
  //     const updatedUser = {}
  //     dispatch({type: 'finish update', updatedUser})
  //   return updatedUser
  // } catch (error) {
  //   dispatch({type: 'fail update', error})
  //   return Promise.reject(error)
  // }
}
export async function productInfoUpdateComplete(
  dispatch: {
    (value: any): void;
    (value: any): void;
    (arg0: {type: string; updates: any}): void;
  },
  updates: IProductInfoDefaultObj,
) {
  dispatch({type: 'finish update', updates});
}
export async function productInfoUpdateInProgress(dispatch: {
  (value: any): void;
  (value: any): void;
  (arg0: {type: string}): void;
}) {
  dispatch({type: 'inprogress update'});
}
export async function validateProductInfo(
  dispatch: {
    (value: any): void;
    (value: any): void;
    (value: any): void;
    (value: any): void;
    (arg0: {type: string; errors: any}): void;
  },
  errors: {
    isErrorInConferencingScreen: boolean;
    conferencingCred: {pstn: {}; cloud: {}};
    isErrorInAuthCred: boolean;
    authCred: {apple: {}; google: {}; slack: {}; microsoft: {}};
    isProductInfoError: boolean;
    productInfo: {};
  },
) {
  dispatch({type: 'validate info', errors});
}
