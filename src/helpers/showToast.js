import { toast } from 'react-toastify';
import { toastProps } from '../constants';

const showToast = (result) => {
  const { message, messageType } = result;

  if (messageType) {
    return toast.error(`${message}`, toastProps);
  }
  return toast.success(`${message}`, toastProps);
};

export default showToast;
