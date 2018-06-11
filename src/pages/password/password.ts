import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../commons/baseUI';
import { Md5 } from 'ts-md5/dist/md5'
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage extends BaseUI {

  userId: any;
  userName: any;
  password: any;
  confirmPwd: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
  /**
   * 页面进来时的处理
   * @memberof AboutPage
   */
  ionViewDidEnter() {
    this.getUserInfo();
  }

  changePassword(){
    if(this.password==null||this.confirmPwd==null){
      super.showToast(this.toastCtrl,'请输入需要修改的密码',2000,'top');
    }else{
      if(this.password==this.confirmPwd){
        var loading = super.showLoading(this.loadingCtrl,'正在修改密码...');
        this.password = Md5.hashStr(this.password).toString();
        this.confirmPwd = this.password;
        this.rest.changeUserPassword(this.userId,this.password).subscribe(
          res => {
            console.log(res);
            if(res['status']=='000'){
              loading.dismiss();
              super.showToast(this.toastCtrl,'密码修改成功',2000,'top');
              this.loginout();
            }else{
              loading.dismiss();
              super.showToast(this.toastCtrl,'密码修改失败--'+res['msg'],2000,'top');
            }
          }
        )
      }else{
        super.showToast(this.toastCtrl,'请确认修改的密码',2000,'top');
      }
    }
  }
  getUserInfo(){
    this.storage.get('User').then(
    User => {
      console.log(User);
      this.userId = User['UserId'];
      this.userName = User['UserName'];
      console.log(this.userId+this.userName);
    }
  )
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  public rootPage: any = TabsPage;
  loginout(){
    this.storage.remove('User');
    this.viewCtrl.dismiss();
    this.navCtrl.push(TabsPage);
  }
}
