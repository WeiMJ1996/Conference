import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddPublishPage } from '../add-publish/add-publish';
import { PublishPage } from '../publish/publish';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Userid: any;
  UserType: any;
  Enid: number;
  publishes: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public rest: RestProvider,
    public utils: UtilsProvider
  ) {

  }

  /**
   * 进入页面，判断是否登录 获取发布的消息
   * @memberof HomePage
   */
  ionViewDidEnter() {
    this.getPublishes();
  }
  getPublishes() {
    this.storage.get('User').then(User => {
      if (User != null) {
        this.Userid = User['UserId'];
        this.UserType = User['UserType'];
        this.Enid = User['enterpriseId'];
        this.Publishes(this.Enid);
      } else {
        this.Enid = 0;
        this.Publishes(this.Enid);
      }
    });
  }
  Publishes(enid: number) {
    this.rest.getPublishes(enid).subscribe(res => {
      console.log(res);
      this.publishes = res['data'];
      console.log(this.publishes);
    });
  }

  /**
   * 进入发布页面
   * @memberof HomePage
   */
  goAddPublish() {
    if (this.UserType == 1) {
      let modal = this.modalCtrl.create(AddPublishPage);
      modal.present();
    } else {
      this.utils.showAlert('提示', '请登录管理员身份', '确认');
    }
  }
  toPublish(item) {
    // let publish = [item];
    this.navCtrl.push(PublishPage, item);
  }
  doRefresh(refresher){
    this.getPublishes();
    setTimeout(() => { 
      refresher.complete();
  }, 2000);
}
}
