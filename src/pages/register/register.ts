import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController, ViewController,ToastController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../commons/baseUI';
import { RestProvider } from '../../providers/rest/rest';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {


  listData: any;
  userName: any;//用户名
  userPwd: any;//密码
  confirmPwd: any;//二次密码
  Md5Password: string;//加密后密码
  userMobile: any;//用户手机号码
  isEnterprise: boolean = false;//是否是企业用户
  userType: any;//用户类型
  enterpriseId: any = 0;//企业ID
  public Enterprises: {}[];//企业列表
  errorMessage: any;//错误信息

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public http: HttpClient
  ) {
    super();
    this.Enterprises =  [];
  }

  /**
   * 页面加载时的处理
   */
  ionViewDidLoad() {
    console.log('进入注册页面');
  }

  /**
   * 页面进来时的处理
   * @memberof AboutPage
   */
  ionViewDidEnter() {
    this.getEnterprises();
  }
  /**
   * 关闭当前页面
   * 
   * @memberof LoginPage
   */
  dismiss(){
    this.viewCtrl.dismiss();
  }

  Register(){
    console.log(this.userName);
    console.log(this.userPwd);
    console.log(this.confirmPwd);
    console.log(this.userMobile);
    console.log(this.enterpriseId);
    if(this.enterpriseId==0){
      this.enterpriseId = 0;
      this.userType = 3;
    }else{
      this.userType = 2;
    }
    if(this.userName==null||this.userPwd==null||this.userMobile==null){
      super.showToast(this.toastCtrl,'请填写必要信息！',2000,'top');
    }else{
      if(this.userPwd!=this.confirmPwd){
        super.showToast(this.toastCtrl,'两次输入密码不一致！',2000,'top')
      }else{
        var loading = super.showLoading(this.loadingCtrl,'注册中...');
        this.Md5Password = Md5.hashStr(this.userPwd).toString();
        this.rest.register(this.userName,this.Md5Password,this.userMobile,this.userType,this.enterpriseId)
        .subscribe(
          res => {
            console.log(res);
            if(res['status'] == '000'){
              super.showToast(this.toastCtrl,'注册成功，去登录吧！',2000,'top');
              loading.dismiss();
              this.navCtrl.pop();//nav的返回
            }else{
              super.showToast(this.toastCtrl,'注册失败--'+res['msg'],2000,'top');
              loading.dismiss();
            }
          }
        )
      }
    }
  }

  getEnterprises(){
    this.rest.getEnterpriseList().subscribe(
      res => {
        this.listData = res;
        this.Enterprises = this.listData;
      },
      error=>this.errorMessage = <any>error
    )
  }
}
