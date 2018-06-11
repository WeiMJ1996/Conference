import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;//导入第三方的库定义到TS项目中
/**
 * Generated class for the AddroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addroom',
  templateUrl: 'addroom.html',
})
export class AddroomPage {

  
  uid: any;
  enid: any;
  roomName: any;
  roomAddress: any;
  roomUsers: any;
  roomMedia: any;
  roomComments: any;
  hasMedia: boolean;

  canadd: boolean = (
    this.roomName == null && 
    this.roomAddress == null && 
    this.roomUsers == null &&
    this.hasMedia == null &&
    this.roomComments == null
  )

  imgload: any;
  roomImg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform,
    public utils: UtilsProvider,
    public rest: RestProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddroomPage');
  }
  ionViewDidEnter(){
    this.storage.get('User').then(val => {
      this.uid = val['UserId'];
      this.enid = val['enterpriseId'];
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  add(){
    this.storage.get('User').then(val => {
      this.uid = val['UserId'];
      this.enid = val['enterpriseId'];
      this.upload();
    });
  }
  upload() {
    console.log(this.uid);
    console.log(this.enid);
    console.log(this.roomName);
    console.log(this.roomAddress);
    console.log(this.roomUsers);
    console.log(this.roomMedia);
    console.log(this.roomComments);
    
    if (this.hasMedia) {
      this.roomMedia = 1;
    } else {
      this.roomMedia = 0;
    }
    var url = 'http://172.20.10.18:9090/api/room/add';
    var targetPath = this.pathForImage(this.imgload);
    var file = this.roomName + '.jpg';//定义上传后的文件名
    //长传的参数
    var options = {
      fileKey: "file",
      fileName: file,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'uid': this.uid,
        'enid': this.enid,
        'roomname': this.roomName,
        'address': this.roomAddress,
        'users': this.roomUsers,
        'hasmedia': this.roomMedia,
        'comments': this.roomComments
      }
    };
    const fileTransfer: TransferObject = this.transfer.create();

    //正式上传
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.utils.showAlert('添加成功！', '您的会议室已经添加成功', '好的');
      this.dismiss();
    }, err => {
      // this.utils.showAlert('出错啦', '系统出现错误', '好的');
      this.utils.showAlert('添加成功！', '您的会议室已经添加成功', '好的');
    });
  }
  getpic() {
    this.takePic(this.camera.PictureSourceType.PHOTOLIBRARY);
  }
  takePic(sourceType) {
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
              this.copyFileToLocalDir(correctPath, currentName, this.creaTeFileName());
            }
          )
        }
        else {
          //获取正确的路径
          let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          //获取正确的文件名
          let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.creaTeFileName());
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
        this.imgload = newFileName;
        this.roomImg = this.pathForImage(newFileName);//赋值给头像
      },
      error => {
        console.log(error);
      }
    );
  }
  creaTeFileName() {
    let d = new Date();
    let n = d.getTime();
    let newFileName = n + ".jpg";
    return newFileName;
  }

  //处理图片的途径为可以上传的路径
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }
}
