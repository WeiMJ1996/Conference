import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController,ModalController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { BaseUI } from '../../commons/baseUI';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { Md5 } from 'ts-md5/dist/md5'


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: string;
  loginpwd: string;

  status: any;
  User: {[index:string]: any} = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  /**
   * 用户登录
   * 
   * @memberof LoginPage
   */
  Login(){
    //如果输入的手机号码不符合规范
    if(!(/^1[3,5,8]\d{9}$/.test(this.mobile))||this.mobile==""||this.mobile==null) {
      super.showToast(this.toastCtrl,'登录账号输入错误',2000,'top');
    }else{
      if (this.loginpwd==""||this.loginpwd==null) {
        super.showToast(this.toastCtrl,'登录密码输入错误',2000,'top');
      }else{
        var loading = super.showLoading(this.loadingCtrl,'登陆中...');
        this.loginpwd = Md5.hashStr(this.loginpwd).toString();
        this.rest.login(this.mobile,this.loginpwd).subscribe(
          res=>{
            // console.log(res);
            this.status = res['status'];
            if(this.status == '000'){
              this.User['UserId'] = res['userId'];
              this.User['UserName'] = res['userName'];
              this.User['UserMobile'] = res['userMobile'];
              this.User['UserPic'] = res['pic_path'];
              
              this.User['UserType'] = res['userType'];
              this.User['enterpriseId'] = res['enterpriseId'];
              this.User['UserEnterprise'] = res['userEnterprise'];
              this.storage.set("User",this.User);
              // console.log(this.User);
              loading.dismiss();
              super.showToast(this.toastCtrl,'登陆成功',2000,'top');
              this.navCtrl.pop();//nav的返回
            }else{
              loading.dismiss();
              super.showToast(this.toastCtrl,res['msg'],2000,'top');
            }
          }
        )
        
      }
    }
  }
  goRegister(){
    // this.navCtrl.push(RegisterPage);
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }
}
