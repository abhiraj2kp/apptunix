import {Colors} from '../constants';
import Snackbar from 'react-native-snackbar';

/**
 * @function showToast creating a function to show toast
 * @param msg
 */
const showToast = (msg: string) => {
  Snackbar.show({
    text: msg,
    textColor: Colors.white,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Colors.black_9,
  });
};

/**
 * @exports @all functions
 */
export default {showToast};
