import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DomSanitizer } from "@angular/platform-browser";
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {
  publish: any;
  room: any;
  userid:any;
  userType: any = 1;
  ispublish: any = false;

  constructor(
    private sanitizer: DomSanitizer, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public alertCtrl: AlertController,
    public storage: Storage,
    private utils: UtilsProvider
  ) {
    this.storage.get('User').then(User=>{
      this.userType = User['UserType'];
    });
    this.publish = navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.publish);
  }
  ionViewDidEnter() {
    this.getRoom();
  }

  getRoom() {
    this.rest.getRoomById(this.publish['rid']).subscribe(res => {
      this.room = res['room'];
      this.room['desc'] = this.room['desc'].replace(/\r\n/ig,"<br/>"); 
      this.room['comments'] = this.room['comments'].replace(/\r\n/ig,"<br/>"); 
      console.log(this.room);
    });
    this.storage.get('User').then(User => {
      this.userid = User['UserId'];
    });
  }
  assembleHTML(strHTML:any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  apply(){
    let alert = this.alertCtrl.create({
      cssClass:'projectList',
      title: '确认申请？',
      message: '点击申请即将完成会议室申请，点击取消返回',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '申请',
          handler: () => {
            this.rest.generateOrder(this.publish['pid'],this.publish['rid'],this.userid,this.publish['media'],
            this.publish['price']).subscribe(res =>{
              console.log(res);
              this.ispublish = true;
            })
          }
        }
      ]
    });
    alert.present();
  }
}
