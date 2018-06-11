import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, LoadingController, ToastController, Toast, AlertController, Platform, normalizeURL } from "ionic-angular";



import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;//导入第三方的库定义到TS项目中
/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform
  ) {

  }
  showLoading(message: string): Loading {
    let loader = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
    loader.present();
    return loader;
  }

  showToast(message: string, duration: number, position: string): Toast {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
    return toast;
  }

  showAlert(titile: string, subTitle: string, buttonstitle: any){
    let alert = this.alertCtrl.create({
      cssClass:'projectList',
      title: titile,
      subTitle: subTitle,
      buttons: [buttonstitle]
    });
    alert.present();
  }

  takePic(sourceType,img: any) {
    //定义相机的一些参数
    var options: CameraOptions = {
      quality: 100,//图片质量
      sourceType: sourceType,
      saveToPhotoAlbum: false,//是否保存到相册
      correctOrientation: true//是否纠正拍摄的方向
    };

    //获取图片的方法
    this.camera.getPicture(options).then(
      (imagePath) => {
        //特别处理Android平台的文件路径问题
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath).then(
            filePath => {
              //获取正确的路径
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              //获取正确的文件名
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              img = this.copyFileToLocalDir(correctPath, currentName, this.creaTeFileName());
              return img;
            }
          )
        }
        else {
          //获取正确的路径
          let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          //获取正确的文件名
          let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          img = this.copyFileToLocalDir(correctPath, currentName, this.creaTeFileName());
          return img;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //将获取到的图片或者相机拍摄的图片另存为，用于上传
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(
      success => {
        return newFileName;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  //处理图片的途径为可以上传的路径
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }
  /**
   * 自定义文件名
   */
  creaTeFileName() {
    let d = new Date();
    let n = d.getTime();
    let newFileName = n + ".jpg";
    return newFileName;
  }
}
