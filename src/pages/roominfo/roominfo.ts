import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the RoominfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roominfo',
  templateUrl: 'roominfo.html',
})
export class RoominfoPage {

  room: any;
  id: any;
  roomName: any;
  roomAddress: any;
  roomUsers: any;
  roomMedia: any;
  roomComments: any;
  hasMedia: boolean = (this.roomMedia == 1);
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public utils: UtilsProvider,
    public navParams: NavParams
  ) {
    this.room = navParams.data;
    this.id = this.room['id'];
    this.roomName = this.room['roomname'];
    this.roomAddress = this.room['address'];
    this.roomUsers = this.room['users'];
    this.roomMedia = this.room['hasmedia'];
    this.roomComments = this.room['comments'];
    this.hasMedia = (this.roomMedia == 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoominfoPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  change() {
    if (this.hasMedia) {
      this.roomMedia = 1
    } else {
      this.roomMedia = 0;
    }
    let data = {
      id: this.id,
      roomname: this.roomName,
      address: this.roomAddress,
      users: this.roomUsers,
      hasmedia: this.roomMedia,
      comments: this.roomComments
    };
    this.rest.changeRoom(data).subscribe(res => {
      console.log(res);
      if (res['status'] == '000') {
        // this.navCtrl.pop();
        this.utils.showAlert('修改成功', '会议室修改成功', '好的');
      } else {
        this.utils.showAlert('修改失败', res['msg'], '好的');
      }
    });
  }
}
