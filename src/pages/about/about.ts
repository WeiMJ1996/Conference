import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { BaseUI } from '../../commons/baseUI';
import { UserPage } from '../user/user';
import { UserManagerPage } from '../user-manager/user-manager';
import { FeedbackPage } from '../feedback/feedback';
import { RoomsPage } from '../rooms/rooms';
import { ScanPage } from '../scan/scan';
// import { DomSanitizer } from '@angular/platform-browser';  

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends BaseUI {

  public notLogin: boolean = true;//未登录
  public isLogin: boolean = false;//已登录
  public UserName: any;
  public UserType: any;
  public UserTypeAlias: any;
  headface: any = 'http://img1.2345.com/duoteimg/qqTxImg/2013/12/ns/29-020632_476.jpg?';

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loaddingCtrl: LoadingController
    // private sanitizer: DomSanitizer
  ) {
    super();
  }

  /**
   * 进入登录页
   * 
   * @memberof AboutPage
   */
  goLogin() {
    this.navCtrl.push(LoginPage);
  }


  /**
   * 页面即将加载时操作
   * 
   * @memberof AboutPage
   */
  ionViewWillEnter() {
    // this.loadUserPage();
  }
  /**
   * 页面进来时进行处理
   * @memberof AboutPage
   */
  ionViewDidEnter() {
    this.IsLogin();
  }

  /**
   * 判断用户是否登录，如果登录取到用户昵称和头像并显示
   * @memberof AboutPage
   */
  IsLogin() {
    this.storage.get('User').then(val => {
      if (val != null) {
        this.notLogin = false;
        this.isLogin = true;
        this.UserName = val['UserName'];
        this.UserType = val['UserType'];
        if (this.UserType == 1) {
          this.UserTypeAlias = '管理员';
        }
        else if (this.UserType == 2) {
          this.UserTypeAlias = '企业用户';
        }
        else if (this.UserType == 3) {
          this.UserTypeAlias = '普通用户';
        }
        this.headface = val['UserPic'] + '?';
      } else {
        this.notLogin = true;
        this.isLogin = false;
      }
    })
  }

  goUser() {
    this.navCtrl.push(UserPage);
  }
  goRooms() {
    this.navCtrl.push(RoomsPage);
  }
  goUserManager() {
    this.navCtrl.push(UserManagerPage);
  }
  gofeedback() {
    if (this.notLogin) {
      alert('请登录后再反馈！')
    }
    else {
      let modal = this.modalCtrl.create(FeedbackPage);
      modal.present();
    }
  }

  /**
   * 跳转到扫描二维码的页面，加上 animate = false 的参数是为了
   * 相机能够在整个屏幕中显示，如果不加，相机就出不来。
   * animate 的参数默认值为 true
   */
  qrcode(){
    this.navCtrl.push(ScanPage, null, { "animate": false });
  }
}
