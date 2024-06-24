import { toast, type ToastOptions } from "vue3-toastify";
import '@assets/styles/_notyf.scss'


export function successAlert(message: string){ 
    toast(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        theme: toast.THEME.DARK,
        type: toast.TYPE.SUCCESS,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        transition: toast.TRANSITIONS.SLIDE
    } as ToastOptions);
}
export function warningAlert(message: string){ 
    toast(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        theme: toast.THEME.DARK,
        type: toast.TYPE.WARNING,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        transition: toast.TRANSITIONS.SLIDE
    } as ToastOptions);
}
export function errorAlert(message: string){ 
    toast(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        theme: toast.THEME.DARK,
        type: toast.TYPE.ERROR,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        transition: toast.TRANSITIONS.SLIDE
    } as ToastOptions);
}