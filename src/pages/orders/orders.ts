import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { EnterprisePage } from '../enterprise/enterprise';
import { OrderInfoPage } from '../order-info/order-info';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  userid: any;
  usertype: any;
  orders: any;
  allclass: any = 'tabclass';
  inclass: any;
  outclass: any;
  flag1: any = 1;
  flag2: any = 2;
  flag3: any = 3;
  flag4: any = 4;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }
  ionViewDidEnter() {
    this.getOrders();
  }
  getOrders() {
    this.storage.get('User').then(User => {
      this.userid = User['UserId'];
      this.usertype = User['UserType'];
      this.rest.getOrders(this.userid, this.usertype).subscribe(res => {
        if(res['status'] == '000'){
          this.orders = res['orders'];
        }else{
          this.orders = null;
          this.showAlert();
        }
      });
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      cssClass:'projectList',
      title: '出错啦',
      message: '获取数据失败',
      buttons: [
        {
          text: '好吧',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  getEnterprise(){
    let modal = this.modalCtrl.create(EnterprisePage);
    modal.present();
  }
  getall(){
    this.allclass = 'tabclass';
    this.inclass = '';
    this.outclass = '';
    this.flag1 = 1;
    this.flag2 = 2;
    this.flag3 = 3;
    this.flag4 = 4;
  }
  getin(){
    this.allclass = '';
    this.inclass = 'tabclass';
    this.outclass = '';
    this.flag1 = 1;
    this.flag2 = 2;
    this.flag3 = 3;
    this.flag4 = null;
  }
  getout(){
    this.allclass = '';
    this.inclass = '';
    this.outclass = 'tabclass';
    this.flag1 = null;
    this.flag2 = null;
    this.flag3 = null;
    this.flag4 = 4;
  }
  goOrder(item){
    this.navCtrl.push(OrderInfoPage,item);
  }
  doRefresh(refresher){
    this.getOrders();
    setTimeout(() => { 
      refresher.complete();
  }, 2000);
}
}
