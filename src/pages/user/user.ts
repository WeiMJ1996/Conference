import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController ,ViewController ,ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../commons/baseUI';
import { LoginPage } from '../login/login';
import { EnterprisePage } from '../enterprise/enterprise';
import { PasswordPage } from "../password/password";
import { HeadfacePage } from '../headface/headface'
import { Device } from '@ionic-native/device';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  UserName: string = "加载中...";
  UserEnterprise: string = '加载中...';
  headface: string;
  deviceName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private device: Device
  ) {
    super();
  }

  ionViewDidLoad() {
    
  }
  /**
   * 在页面即将加载时操作
   * 
   * @memberof UserPage
   */
  ionViewWillEnter(){
    // this.loadUserInfoPage();
  }
  /**
   * 页面加载后操作
   * 
   * @memberof UserPage
   */
  ionViewDidEnter() {
    this.loadUserInfoPage();
    this.deviceName = this.device.model;
    if(this.deviceName==null||this.deviceName==''){
      this.deviceName = '获取设备信息失败';
    }
    // console.log('Device Model is: ' + this.device.model);
    // console.log('Device platform is: ' + this.device.platform);
    // console.log('Device cordova is: ' + this.device.cordova);
    // console.log('Device uuid is: ' + this.device.uuid);
    // console.log('Device version is: ' + this.device.version);
    // console.log('Device manufacturer is: ' + this.device.manufacturer);
    // console.log('Device isVirtual is: ' + this.device.isVirtual);
    // console.log('Device serial is: ' + this.device.serial);
    // this.rest.testhttppost();
  }
  loadUserInfoPage() {
    this.storage.get('User').then((val) => {
      if (val != null) {
        this.UserName = val['UserName'];
        this.UserEnterprise = val['UserEnterprise'];
        this.headface = val['UserPic'];
        console.log(val);
      }
    });
  }

  goChangeHeadface(){
    this.navCtrl.push(HeadfacePage);
  }

  enterpriseInfo(){
    let modal = this.modalCtrl.create(EnterprisePage);
    modal.present();
  }
  goChangePwd(){
    let modal = this.modalCtrl.create(PasswordPage);
    modal.present();
  }
  loginout(){
    this.storage.remove('User');
    this.viewCtrl.dismiss();
    this.navCtrl.push(LoginPage);
  }
}
