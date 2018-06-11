import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  notices: any;
  UserId: any;
  constructor(
    public navCtrl: NavController,  
    public rest: RestProvider,
    public storage: Storage,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
  ionViewDidEnter(){
    this.getNotices();
  }
  getNotices(){
    this.storage.get('User').then( val => {
      this.UserId = val['UserId'];
      this.rest.getNotices(this.UserId).subscribe( res => {
        this.notices = res['notices'];
        console.log(this.notices);
      });
    });
  }
  delete(id){
    this.rest.handleNotice(id,2).subscribe( res=> {
      this.getNotices();
    });
  }
}
