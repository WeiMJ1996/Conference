import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { RoominfoPage } from '../roominfo/roominfo';
import { AddroomPage } from '../addroom/addroom';

/**
 * Generated class for the RoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {
  userId: any;
  roomlist: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public modalCtrl: ModalController,
    public rest: RestProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPage');
  }
  ionViewDidEnter() {
    this.getRooms();
  }
  getRooms() {
    this.storage.get('User').then(val => {
      this.userId = val['UserId'];
      this.rest.getRoomByUserId(this.userId).subscribe(res => {
        this.roomlist = res;
        console.log(this.roomlist);
      });
    });
  }
  add() {
    let modal = this.modalCtrl.create(AddroomPage);
    modal.present();
  }
  RoomInfo(item) {
    if (item['flag'] != 0) {
      this.navCtrl.push(RoominfoPage, item);
    }
  }
}

