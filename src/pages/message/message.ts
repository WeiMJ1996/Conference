import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

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
    console.log('ionViewDidLoad MessagePage');
  }
  ionViewDidEnter(){
    this.storage.get('User').then( val => {
      this.UserId = val['UserId'];
      this.rest.getNotices(this.UserId).subscribe( res => {
        this.notices = res['notices']
      });
    });
  }
}
