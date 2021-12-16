import {IProductInfoDefaultObj} from '../constants/productInfoDefaults';
export interface IErrorObj {
  isErrorInConferencingScreen: boolean;
  conferencingCred?: {pstn: {}; cloud: {}};
  isErrorInAuthCred: boolean;
  authCred?: {apple: {}; google: {}; slack: {}; microsoft: {}};
  isProductInfoError: boolean;
  productInfo?: {};
}
export const strValidation = (regex: RegExp, value: string) => {
  return regex.test(value);
};
const generalInfoValidation = ({
  dataToValidate,
}: {
  dataToValidate: IProductInfoDefaultObj;
}) => {
  let isProductInfoError = false;
  let errors = {
    product_name: '',
    product_id: '',
    landing_sub_heading: '',
  };
  if (
    !(
      dataToValidate.product_name &&
      strValidation(/^[A-Za-z0-9 ]+$/, dataToValidate.product_name)
    )
  ) {
    isProductInfoError = true;
    errors = {
      ...errors,
      product_name: 'Product Name should alphabetical or numerical value.',
    };
  }

  if (!dataToValidate.landing_sub_heading) {
    isProductInfoError = true;
    errors = {
      ...errors,
      landing_sub_heading: 'Product Description is a required field',
    };
  }

  return {
    isProductInfoError,
    productInfo: errors,
  };
};

const joinScreenValidation = ({
  dataToValidate,
}: {
  dataToValidate: IProductInfoDefaultObj;
}) => {
  let isErrorInAuthCred = false;
  let errors = {apple: {}, google: {}, slack: {}, microsoft: {}};

  // microsoft auth cred validation
  if (dataToValidate.enable_microsoft_oauth) {
    if (!dataToValidate.microsoft_client_id) {
      errors = {
        ...errors,
        microsoft: {
          ...errors.microsoft,
          microsoft_client_id: 'Microsoft OAuth Client ID is a required field',
        },
      };
      isErrorInAuthCred = true;
    }
    if (!dataToValidate.microsoft_client_secret) {
      errors = {
        ...errors,
        microsoft: {
          ...errors.microsoft,
          microsoft_client_secret:
            'Microsoft OAuth Client secret is a required field',
        },
      };

      isErrorInAuthCred = true;
    }
  }

  // slack auth cred validation
  if (dataToValidate.enable_slack_oauth) {
    if (!dataToValidate.slack_client_id) {
      errors = {
        ...errors,
        slack: {
          ...errors.slack,
          slack_client_id: 'Slack OAuth Client ID is a required field',
        },
      };

      isErrorInAuthCred = true;
    }
    if (!dataToValidate.slack_client_secret) {
      errors = {
        ...errors,
        slack: {
          ...errors.slack,
          slack_client_secret: 'Slack OAuth Client ID is a required field',
        },
      };

      isErrorInAuthCred = true;
    }
  }

  // google auth cred validation
  if (dataToValidate.enable_google_oauth) {
    if (!dataToValidate.google_client_id) {
      errors = {
        ...errors,
        google: {
          ...errors.google,
          google_client_id: 'Google OAuth Client ID is a required field',
        },
      };

      isErrorInAuthCred = true;
    }
    if (!dataToValidate.google_client_secret) {
      errors = {
        ...errors,
        google: {
          ...errors.google,
          google_client_secret:
            'Google OAuth Client secret is a required field',
        },
      };

      isErrorInAuthCred = true;
    }
  }
  // Apple auth cred validation
  if (dataToValidate.enable_apple_oauth) {
    if (!dataToValidate.apple_client_id) {
      errors = {
        ...errors,
        apple: {
          ...errors.apple,
          apple_client_id: 'Apple OAuth Client ID is a required field',
        },
      };

      isErrorInAuthCred = true;
    }
    if (!dataToValidate.apple_private_key) {
      errors = {
        ...errors,
        apple: {
          ...errors.apple,
          apple_private_key: 'Apple OAuth private key is a required field',
        },
      };

      isErrorInAuthCred = true;
    }
    if (!dataToValidate.apple_key_id) {
      errors = {
        ...errors,
        apple: {
          ...errors.apple,
          apple_key_id: 'Apple OAuth key ID is a required field',
        },
      };

      isErrorInAuthCred = true;
    }

    if (!dataToValidate.apple_team_id) {
      errors = {
        ...errors,
        apple: {
          ...errors.apple,
          apple_team_id: 'Apple OAuth team ID is a required field',
        },
      };
      isErrorInAuthCred = true;
    }
  }
  return {
    isErrorInAuthCred,
    authCred: errors,
  };
};

const conferencingScreenValidation = ({
  dataToValidate,
}: {
  dataToValidate: IProductInfoDefaultObj;
}) => {
  let isErrorInConferencingScreen = false;
  let errors = {
    pstn: {
      pstn_email: '',
      pstn_password: '',
      pstn_account: '',
    },
    cloud: {
      customer_id: '',
      customer_certificate: '',
      bucket_name: '',
      bucket_access_key: '',
      bucket_access_secret: '',
    },
  };

  if (dataToValidate.pstn) {
    if (!dataToValidate.pstn_email) {
      errors = {
        ...errors,
        pstn: {
          ...errors.pstn,
          pstn_email: 'Turbobridge Email is a required field',
        },
      };
      isErrorInConferencingScreen = true;
    }
    if (!dataToValidate.pstn_password) {
      errors = {
        ...errors,
        pstn: {
          ...errors.pstn,
          pstn_password: 'Turbobridge Password is a required field',
        },
      };

      isErrorInConferencingScreen = true;
    }
    if (!dataToValidate.pstn_account) {
      errors = {
        ...errors,
        pstn: {
          ...errors.pstn,
          pstn_account: 'Turbobridge Account is a required field',
        },
      };

      isErrorInConferencingScreen = true;
    }
  }
  if (dataToValidate.cloud_recording) {
    if (!dataToValidate.customer_id) {
      errors = {
        ...errors,
        cloud: {
          ...errors.cloud,
          customer_id: 'Agora Customer ID is a required field',
        },
      };

      isErrorInConferencingScreen = true;
    }
    if (!dataToValidate.customer_certificate) {
      errors = {
        ...errors,
        cloud: {
          ...errors.cloud,
          customer_certificate:
            'Agora Customer Certificate is a required field',
        },
      };

      isErrorInConferencingScreen = true;
    }
    if (
      !dataToValidate.bucket_name &&
      /^$|^[A-Za-z0-9]+$/.test(dataToValidate.bucket_name)
    ) {
      errors = {
        ...errors,
        cloud: {
          ...errors.cloud,
          bucket_name:
            '​AWS S3 Bucket Name is a required field and can contain only alpha-numerical characters',
        },
      };

      isErrorInConferencingScreen = true;
    }
    if (!dataToValidate.bucket_access_key) {
      errors = {
        ...errors,
        cloud: {
          ...errors.cloud,
          bucket_access_key: '​AWS S3 Bucket Access Key is a required field',
        },
      };

      isErrorInConferencingScreen = true;
    }
    if (!dataToValidate.bucket_access_secret) {
      errors = {
        ...errors,
        cloud: {
          ...errors.cloud,
          bucket_access_secret:
            '​AWS S3 Bucket Access Secret is a required field',
        },
      };
      isErrorInConferencingScreen = true;
    }
  }

  return {
    isErrorInConferencingScreen,
    conferencingCred: errors,
  };
};

export const tempErrorObject = {
  // general
  productInfo: {
    product_name: '',
    product_id: '',
    landing_sub_heading: '',
  },
  authCred: {
    apple: {},
    google: {},
    microsoft: {},
    slack: {},
  },
  conferencingCred: {
    pstn: {
      pstn_email: '',
      pstn_password: '',
      pstn_account: '',
    },
    cloud: {
      customer_id: '',
      customer_certificate: '',
      bucket_name: '',
      bucket_access_key: '',
      bucket_access_secret: '',
    },
  },
  isProductInfoError: false,
  isErrorInConferencingScreen: false,
  isErrorInAuthCred: false,
};
export const validateBeforeSaving = ({
  dataToValidate,
}: {
  dataToValidate: IProductInfoDefaultObj;
}) => {
  // Product's general info validation, name, desc etc...
  return {
    ...generalInfoValidation({dataToValidate}),
    ...joinScreenValidation({dataToValidate}),
    ...conferencingScreenValidation({dataToValidate}),
  };
};
