export const defaultLogo: string =
  'https://dbudicf5k4as1.cloudfront.net/2/5TWpUqsdC0BH6lPJ.jpeg';
export const theme: theme = {
  'pallete-0': {
    bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-0.png',
    primaryColor: '#00AEFC',
    primaryFontColor: '#363636',
    secondaryFontColor: '#FFFFFF',
  },
  'pallete-1': {
    bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-1.png',
    primaryColor: '#00D5B4',
    primaryFontColor: '#363636',
    secondaryFontColor: '#FFFFFF',
  },
  'pallete-2': {
    bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-2.png',
    primaryColor: '#0097E6',
    primaryFontColor: '#FFFFFF',
    secondaryFontColor: '#0D1B37',
  },
  'pallete-3': {
    bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-3.png',
    primaryColor: '#393939',
    primaryFontColor: '#363636',
    secondaryFontColor: '#FFF7E0',
  },
  'pallete-4': {
    bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-4.png',
    primaryColor: '#B25023',
    primaryFontColor: '#FFFFFF',
    secondaryFontColor: '#211304',
  },
  'pallete-5': {
    bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-5.png',
    primaryColor: '#649EDD',
    primaryFontColor: '#FFFFFF',
    secondaryFontColor: '#363636',
  },
  'pallete-6': {
    bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-6.png',
    primaryColor: '#885AE0',
    primaryFontColor: '#FFFFFF',
    secondaryFontColor: '#21122E',
  },
};

interface theme {
  [key: string]: {
    [key: string]: string;
  };
}
