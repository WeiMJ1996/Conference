import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OrderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-info',
  templateUrl: 'order-info.html',
})
export class OrderInfoPage {
  order: any;
  userType: any = 3;
  constructor(
    public navCtrl: NavController,
    public rest: RestProvider,
    public utils: UtilsProvider,
    public alertCtrl: AlertController,
    public storage: Storage,
    public navParams: NavParams
  ) {
    this.storage.get('User').then(User=>{
      this.userType = User['UserType'];
    });
    this.order = navParams.data;
    console.log(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderInfoPage');
  }

  gostart() {
    let alert = this.alertCtrl.create({
      title: '确认开始？',
      message: '点击开始确认用户开始使用',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '开始',
          handler: () => {
            this.rest.orderProcess(this.order['id'], 2).subscribe(res => {
              if(res['status'] == '000'){
                this.utils.showToast('会议室开始使用',1000,'top');
                this.order['flag'] = 2;
              }else{
                this.utils.showToast('操作失败',1000,'top');
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  goend() {
    let alert = this.alertCtrl.create({
      cssClass:'projectList',
      title: '确认结束？',
      message: '点击结束确认用户结束使用，并向用户收取费用',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '结束',
          handler: () => {
            this.rest.orderProcess(this.order['id'], 3).subscribe(res => {
              if(res['status'] == '000'){
                this.utils.showToast('会议室使用结束',1000,'top');
                this.order['flag'] = 3;
              }else{
                this.utils.showToast('操作失败',1000,'top');
              }
            });
          }
        }
      ]
    });
    alert.present();

  }

  gocompile() {
    let alert = this.alertCtrl.create({
      title: '确认完成？',
      message: '确认用户付款并交还多媒体设备后，点击完成',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '完成',
          handler: () => {
            this.rest.orderProcess(this.order['id'], 4).subscribe(res => {
              if(res['status'] == '000'){
                this.utils.showToast('订单完成',1000,'top');
                this.order['flag'] = 4;
              }else{
                this.utils.showToast('操作失败',1000,'top');
              }
            });
          }
        }
      ]
    });
    alert.present();

  }
}
