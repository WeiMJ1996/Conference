import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { EnterprisePage } from '../enterprise/enterprise';
import { UtilsProvider } from '../../providers/utils/utils';
import { moveEmbeddedView } from '@angular/core/src/view';

/**
 * Generated class for the UserManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-manager',
  templateUrl: 'user-manager.html',
})
export class UserManagerPage {

  userId: any;
  EnterpriseId: any;
  UserEnterprise: any;
  EnterPic: any;
  users: any;
  enuserid: any;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public rest: RestProvider,
    public modalCtrl: ModalController,
    private utils: UtilsProvider,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
  }
  /**
   * 页面进来时进行处理
   * @memberof AboutPage
   */
  ionViewDidEnter() {
    this.getUsers();
  }

  getUsers() {
    this.storage.get("User").then((val) => {
      if (val != null) {
        console.log(val);
        this.userId = val['UserId'];//获取当前用户id
        this.UserEnterprise = val['UserEnterprise'];//获取企业名称
        this.EnterpriseId = val['enterpriseId'];//获取企业id
        this.rest.getEnterprise(this.EnterpriseId).subscribe(
          res => {
            console.log(res);
            let enterprise = res['enterprise'];
            this.EnterPic = enterprise['picPath'];
          }
        )
        this.rest.getUsers(this.userId).subscribe(
          res => {
            this.users = res;
            console.log(this.users);
          }
        );
      }
    });
  }
  enterpriseInfo() {
    let modal = this.modalCtrl.create(EnterprisePage);
    modal.present();
  }
  pass(enuserid) {
    this.rest.changeUserStatus(enuserid).subscribe(
      res => {
        console.log(res);
      }
    );
    this.getUsers();
  }
  delete(enuserid) {
    this.rest.deleteUser(enuserid).subscribe(
      res => {
        console.log(res);
      }
    );
    this.getUsers();
  }
  getUserInfo(name,usermobile,type){
    if(type == 1){
      this.utils.showAlert(name,usermobile + '[管理员]','确定');
    }
    if(type == 2){
      this.utils.showAlert(name,usermobile + '[企业用户]','确定');
    }
    if(type == 3){
      this.utils.showAlert(name,usermobile + '[普通用户]','确定');
    }
  }
}
