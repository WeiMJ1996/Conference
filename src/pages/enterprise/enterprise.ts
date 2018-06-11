import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EnterprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enterprise',
  templateUrl: 'enterprise.html',
})
export class EnterprisePage {

  EnterPic: any;
  EnterpriseId: any;
  EntrepriseName: any;
  EnterpriseMobile: any;
  EnterpriseDesc: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterprisePage');
  }
  ionViewDidEnter() {
    this.getEnterpriseInfo();
  }
  getEnterpriseInfo(){
    this.storage.get("User").then(
      val => {
        // console.log(val);
        this.EnterpriseId = val['enterpriseId'];
        // console.log(this.EnterpriseId);
      this.rest.getEnterprise(this.EnterpriseId).subscribe(
        res => {
          console.log(res);
          let enterprise = res['enterprise'];
          this.EntrepriseName = enterprise['enterprisename'];
          this.EnterpriseMobile = enterprise['enterprisetel'];
          this.EnterpriseDesc = enterprise['desc'];
          this.EnterPic = enterprise['picPath'];
          // console.log(this.EntrepriseName);
          // console.log(this.EnterpriseMobile);
          // console.log(this.EnterpriseDesc);
        }
      )
    })
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
