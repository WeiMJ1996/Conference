import { Loading, LoadingController, ToastController, Toast } from "ionic-angular";


export abstract class BaseUI {
    constructor() { }
    protected showLoading(loadingCtrl: LoadingController, message: string): Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        loader.present();
        return loader;
    }

    protected showToast(toastCtrl: ToastController,message:string,duration:number,position:string):Toast{
        let toast = toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.present();
        return toast;
    }
}