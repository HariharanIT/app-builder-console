export const defaultLogo: string =
  'https://dbudicf5k4as1.cloudfront.net/2/5TWpUqsdC0BH6lPJ.jpeg';
export const theme: theme = {
  'pallete-0': {bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-0.png'},
  'pallete-1': {bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-1.png'},
  'pallete-2': {bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-2.png'},
  'pallete-3': {bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-3.png'},
  'pallete-4': {bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-4.png'},
  'pallete-5': {bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-5.png'},
  'pallete-6': {bg: 'https://d3ln6bkqokskof.cloudfront.net/palette-6.png'},
};

interface theme {
  [key: string]: {
    [key: string]: string;
  };
}
