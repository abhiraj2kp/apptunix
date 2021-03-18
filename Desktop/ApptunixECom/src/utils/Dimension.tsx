import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
// It is based on the screen width of your design layouts e.g Height 600 x Width 375
const scale = SCREEN_WIDTH / 375;

export function normalize(size: number) {
  return PixelRatio.roundToNearestPixel(size * scale);
}
