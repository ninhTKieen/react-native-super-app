import { Platform, StyleSheet } from 'react-native';

const colors = {
  primary: '#9CC76F',

  blue0: '#EAFAFF',
  blue1: '#339FD9',
  blue2: '#4196B7',
  blue3: '#213368',
  blue4: '#D2EFFF',
  blue6: '#515151',
  blue7: '#F2F6FA',
  blue8: '#B7D4FF26',
  blue9: '#37B8FE',
  blueDark: '#1A3C4A',
  blueDark1: '#89B05F',

  yellow1: '#F9B946',
  yellow2: '#FFCE86',
  yellow3: '#FFF1DB',
  yellow4: '#FFF8EE',

  orange1: '#E55C28',

  green0: '#4CE668',
  green1: '#27ae60',

  red: '#CD1C1C',
  red1: '#FF0000',
  red2: '#FFCACA',
  red3: '#FFDADA',
  red4: '#FFEBEB',
  red5: '#FF686B',

  grey: '#f8f8f8',
  grey0: '#EFEFEF',
  grey1: '#D9D9D9',
  grey2: '#353535',
  grey3: '#A0A0A0',
  grey4: '#808080',
  grey5: '#ced4da',
  grey6: '#878A9C',
  grey7: '#f1f2f8',
  grey8: '#c4c8d9',
  grey9: '#707386',

  white: '#ffffff',
  black: '#000000',

  transparent: 'transparent',

  greenOfficial: '#44A093',
  darkGrey: '#696969',
};

const globalStyles = StyleSheet.create({
  largeTitleRegular: {
    fontWeight: '400',
    fontSize: 34,
  },
  largeTitleMedium: {
    fontWeight: '500',
    fontSize: 34,
  },
  largeTitleBold: {
    fontWeight: '600',
    fontSize: 34,
  },
  title1Regular: {
    fontWeight: '400',
    fontSize: 28,
  },
  title1Medium: {
    fontWeight: '500',
    fontSize: 28,
  },
  title1Bold: {
    fontWeight: '600',
    fontSize: 28,
  },
  title2Regular: {
    fontWeight: '400',
    fontSize: 22,
  },
  title2Medium: {
    fontWeight: '500',
    fontSize: 22,
  },
  title2Bold: {
    fontWeight: '600',
    fontSize: 22,
  },
  title3Regular: {
    fontWeight: '400',
    fontSize: 20,
  },
  title3Medium: {
    fontWeight: '500',
    fontSize: 20,
  },
  title3Bold: {
    fontWeight: '600',
    fontSize: 20,
  },
  bodyRegular: {
    fontWeight: '400',
    fontSize: 17,
  },
  bodyMedium: {
    fontWeight: '500',
    fontSize: 17,
  },
  bodyBold: {
    fontWeight: '600',
    fontSize: 17,
  },
  contentRegular: {
    fontSize: 15,
    fontWeight: '400',
  },
  contentMedium: {
    fontSize: 15,
    fontWeight: '500',
  },
  contentBold: {
    fontSize: 15,
    fontWeight: '600',
  },
  caption1Regular: {
    fontSize: 12,
    fontWeight: '400',
  },
  caption1Medium: {
    fontSize: 12,
    fontWeight: '500',
  },
  caption1Bold: {
    fontSize: 12,
    fontWeight: '600',
  },
  errorMessage: {
    fontWeight: '500',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  commonShadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: '#0000001A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0.8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export { colors };
export default globalStyles;
