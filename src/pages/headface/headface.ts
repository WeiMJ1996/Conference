import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UtilsProvider } from '../../providers/utils/utils';

import { RestProvider } from '../../providers/rest/rest';


declare var cordova: any;//导入第三方的库定义到TS项目中
/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage {

  userId: any;
  headface: any;
  newImage: any;
  User: { [index: string]: any } = {};
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
    console.log('ionViewDidLoad HeadfacePage');
  }
  /**
   * 页面进来时进行处理
   * @memberof AboutPage
   */
  ionViewDidEnter() {
    this.getHeadface();
  }

  getHeadface() {
    this.storage.get('User').then(
      val => {
        this.userId = val['UserId'];
        this.headface = val['UserPic'];
        console.log(this.userId);
        console.log(this.headface);
      }
    )
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  changeHeadface() {
    this.presentActionSheet();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      cssClass: 'headSheet',
      buttons: [
        {
          text: '拍照',
          icon: 'ios-camera-outline',
          handler: () => {
            console.log('Destructive clicked');
            this.takePic(this.camera.PictureSourceType.CAMERA);
            this.utils.showToast(this.headface, 1000, 'top');
          }
        },
        {
          text: '从手机相册选择',
          icon: 'ios-images-outline',
          handler: () => {
            console.log('Archive clicked');
            this.takePic(this.camera.PictureSourceType.PHOTOLIBRARY);
            this.utils.showToast(this.headface, 1000, 'top');
          }
        },
        {
          text: '保存图片到本地',
          icon: 'ios-image-outline',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
        this.newImage = newFileName;
        this.uploadImage();//上传
        this.headface = this.pathForImage(this.newImage);//赋值给头像
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


  uploadImage() {
    var url = 'http://172.20.10.18:9090/api/user/headface';
    var targetPath = this.pathForImage(this.newImage);
    var file = this.userId + '.jpg';//定义上传后的文件名
    //长传的参数
    var options = {
      fileKey: "file",
      fileName: file,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'userid': this.userId
      }
    };
    const fileTransfer: TransferObject = this.transfer.create();

    let loading = this.utils.showLoading('上传中');
    //正式上传
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.rest.getUserInfo(this.userId).subscribe(res => {
        this.User['UserId'] = res['userId'];
        this.User['UserName'] = res['userName'];
        this.User['UserMobile'] = res['userMobile'];
        this.User['UserPic'] = res['pic_path'];

        this.User['UserType'] = res['userType'];
        this.User['enterpriseId'] = res['enterpriseId'];
        this.User['UserEnterprise'] = res['userEnterprise'];
        this.storage.remove('User');
        this.storage.set("User", this.User);
      });
      loading.dismiss();
    }, err => {
      this.utils.showToast('失败了', 1000, 'top');
      loading.dismiss();
    });
  }
}
