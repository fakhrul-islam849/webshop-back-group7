import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as CONSTANT from '../utils/Constant/globalConstant';

const ToastifyAlert = (message, type) => {
    const defaultMessage = 'Sorry Something Wrong please try again';
    const messageText = message !== undefined ? message : defaultMessage;

    switch (type) {
        case CONSTANT.ALERT_TYPE_SUCCESS:
            return toast.success(messageText);
        case CONSTANT.ALERT_TYPE_ERROR:
            return toast.error(messageText);
        case CONSTANT.ALERT_TYPE_WARNING:
            return toast.warning(messageText);
        default:
            return toast.warning(defaultMessage);
    }
};
export default ToastifyAlert;
