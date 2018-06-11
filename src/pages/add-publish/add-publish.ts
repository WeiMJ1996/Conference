import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddPublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-publish',
  templateUrl: 'add-publish.html',
})
export class AddPublishPage {


  ind: any;//索引
  private UserId: any;//用户ID
  private enterpriseId: any;//企业ID
  private roomlist: any;//会议室列表
  private title: any;//标题
  private price: any;
  private tag: string = '';//标签
  private roomid: any = 0;//会议室id
  private roomDesc: any;//会议室描述
  private roomComments: any;//会议室备注

  tagStyle1:any = 'preStyle';
  tagStyle2:any = 'preStyle';
  tagStyle3:any = 'preStyle';
  tagStyle4:any = 'preStyle';
  tagStyle5:any = 'preStyle';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public rest: RestProvider,
    public utils: UtilsProvider
  ) {
  }

  // 加载页面时，加载用户数据
  ionViewDidLoad() {
    this.loadUserInfo();
  }

  // 加载数据完成后，进入页面时读取会议室数据
  ionViewDidEnter() {
    this.getRoomsInfo();
  }

  loadUserInfo() {
    this.getStorage().then(
      User => {
        this.UserId = User['UserId'];
        this.enterpriseId = User['enterpriseId'];
      }
    )
  }
  getRoomsInfo() {
    this.rest.getRoomsByEnterprise(this.enterpriseId).subscribe(
      list => {
        this.roomlist = list;
        console.log(this.roomlist);
      }
    )
  }
  getStorage(): Promise<string> {
    return this.storage.get('User').then((value) => {
      return value;
    });
  }
  showinfo(){
    this.roomid = this.roomlist[this.ind]['id'];
    this.roomDesc = this.roomlist[this.ind]['desc'];
    console.log(this.roomDesc);
    this.roomComments = this.roomlist[this.ind]['comments'];
    console.log(this.roomComments);
  }
  publish(){
    var loading = this.utils.showLoading('发布中...');
    this.getTag();
    // this.rest.publishNews(this.title,this.tag,this.roomid,this.UserId,this.price).subscribe(
    //   res => {
    //     console.log(res);
    //     if(res['status']=='000'){
    //       loading.dismiss();
    //       this.navCtrl.pop();
    //     }else{
    //       loading.dismiss();
    //     }
    //   }
    // )
    let data = {
      title: this.title,
      tag: this.tag,
      roomid: this.roomid,
      UserId: this.UserId,
      price: this.price
    };
    this.rest.publishNews(data).subscribe(res => {
      console.log(res);
        if(res['status']=='000'){
          loading.dismiss();
          this.navCtrl.pop();
        }else{
          loading.dismiss();
        }
    });
  }

  /**
   * 设置标签点击样式
   */
  getTag(){
    this.tag = '';
    if(this.tagStyle1=='getStyle'){
      this.tag = this.tag + '环境优雅 | ';
    }
    if(this.tagStyle2=='getStyle'){
      this.tag = this.tag + '容纳人数多 | ';
    }
    if(this.tagStyle3=='getStyle'){
      this.tag = this.tag + '设施齐全 | ';
    }
    if(this.tagStyle4=='getStyle'){
      this.tag = this.tag + '服务周到 | ';
    }
    if(this.tagStyle5=='getStyle'){
      this.tag = this.tag + '在市中心 | ';
    }
    this.tag=this.tag.substring(0,this.tag.length-3);
  }
  getTag1(){
    if(this.tagStyle1=='preStyle'){
      this.tagStyle1 = 'getStyle';
    }
    else if(this.tagStyle1=='getStyle'){
      this.tagStyle1 = 'preStyle';
    }
  }
  getTag2(){
    if(this.tagStyle2=='preStyle'){
      this.tagStyle2 = 'getStyle';
    }
    else if(this.tagStyle2=='getStyle'){
      this.tagStyle2 = 'preStyle';
    }
  }
  getTag3(){
    if(this.tagStyle3=='preStyle'){
      this.tagStyle3 = 'getStyle';
    }
    else if(this.tagStyle3=='getStyle'){
      this.tagStyle3 = 'preStyle';
    }
  }
  getTag4(){
    if(this.tagStyle4=='preStyle'){
      this.tagStyle4 = 'getStyle';
    }
    else if(this.tagStyle4=='getStyle'){
      this.tagStyle4 = 'preStyle';
    }
  }
  getTag5(){
    if(this.tagStyle5=='preStyle'){
      this.tagStyle5 = 'getStyle';
    }
    else if(this.tagStyle5=='getStyle'){
      this.tagStyle5 = 'preStyle';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}


