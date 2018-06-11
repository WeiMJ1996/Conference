import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(
    public httpclient: HttpClient,
    public http: Http
    // public http: Http
  ) {
    // console.log('Hello RestProvider Provider');
  }

  apiUrl = 'http://172.20.10.18:9090/api/';
  /**
   * 登录
   * @param {any} mobile 
   * @param {any} password 
   * @returns {Observable<Object>} 
   * @memberof RestProvider
   */
  login(mobile, password): Observable<Object> {
    let url = this.apiUrl + 'user/login?usermobile=' + mobile + '&password=' + password;
    return this.getAPIReturn(url);
  }
  /**
   * 根据id获取用户
   * @param id 
   */
  getUserInfo(id: any){
    let url = this.apiUrl + 'user/userinfo?id=' + id;
    return this.getAPIReturn(url);
  }

  /**
   * 获取企业列表
   * @returns 
   * @memberof RestProvider
   */
  getEnterpriseList() {
    let url = this.apiUrl + 'enterprise/list';
    return this.getAPIReturn(url);
  }

  /**
   * 用户注册
   * @param {any} username 
   * @param {any} userpwd 
   * @param {any} usermobile 
   * @param {any} usertype 
   * @param {any} enterpriseId 
   * @returns 
   * @memberof RestProvider
   */
  register(username, userpwd, usermobile, usertype, enterpriseId) {
    let url = this.apiUrl + 'user/addUser?username=' + username + '&userpwd=' + userpwd +
      '&usermobile=' + usermobile + '&usertype=' + usertype + '&enterpriseId=' + enterpriseId;
    return this.getAPIReturn(url);
  }

  /**
   * 获取用户企业信息 
   * @param {*} id 
   * @returns 
   * @memberof RestProvider
   */
  getEnterprise(id: any) {
    let url = this.apiUrl + 'enterprise/enterpriseinfo?id=' + id;
    return this.getAPIReturn(url);
  }

  /**
   * 修改密码
   * @param {*} id 
   * @param {*} password 
   * @returns 
   * @memberof RestProvider
   */
  changeUserPassword(id: any, password: any) {
    let url = this.apiUrl + 'user/changePwd?id=' + id + '&password=' + password;
    return this.getAPIReturn(url);
  }

  /**
   * 根据用户企业获取会议室列表
   * @param {*} enid 
   * @returns 
   * @memberof RestProvider
   */
  getRoomsByEnterprise(enid: any) {
    let url = this.apiUrl + 'room/list?enid=' + enid;
    return this.getAPIReturn(url);
  }

  getRoomByUserId(uid: any){
    let url = this.apiUrl + 'room/listByUser?uid=' + uid;
    return this.getAPIReturn(url);
  }

  /**
   * 发布会议室信息
   * @returns 
   * @memberof RestProvider
   */
  // publishNews(title: any, tag: any, roomid: any, uid: any, price: any) {
  // let url = this.apiUrl + 'publish/addPublish/' + title + '/' + price + '/' + tag + '/' + roomid + '/' + uid;
  // return this.getAPIReturn(url);
  // }
  publishNews(params: any) {
    let url = this.apiUrl + 'publish/addPublish';
    return this.postAPIReturn(url, params);
  }
  changeRoom(params: any){
    let url = this.apiUrl + 'room/change';
    return this.postAPIReturn(url,params);
  }
  /**
   * 获取用户列表
   * @param {*} enterpriseId 
   * @returns 
   * @memberof RestProvider
   */
  getUsers(userid: any) {
    let url = this.apiUrl + 'user/userlist/' + userid;
    return this.getAPIReturn(url);
  }
  /**
   * 根据用户id修改用户状态（管理员权限）
   * @param {*} userid 
   * @returns 
   * @memberof RestProvider
   */
  changeUserStatus(userid: any) {
    let url = this.apiUrl + 'user/changeUserStatus/' + userid;
    return this.getAPIReturn(url);
  }
  /**
   * 删除用户
   * @param {*} userid 
   * @returns 
   * @memberof RestProvider
   */
  deleteUser(userid: any) {
    let url = this.apiUrl + 'user/deleteuser/' + userid;
    return this.getAPIReturn(url);
  }

  /**
   * 反馈
   * @param {*} param 
   * @returns 
   * @memberof RestProvider
   */
  addFeedback(param: any) {
    let url = this.apiUrl + 'feedback/add/';
    return this.postAPIReturn(url, param);
  }

  /**
   * 根据企业id获取发布的会议室消息
   * @param {number} enid 
   * @returns 
   * @memberof RestProvider
   */
  getPublishes(enid: number) {
    let url = this.apiUrl + 'publish/list/' + enid;
    return this.getAPIReturn(url);
  }

  /**
   * 根据id获取会议室
   * @param id 
   */
  getRoomById(id: any) {
    let url = this.apiUrl + 'room/roominfo/' + id;
    return this.getAPIReturn(url);
  }
  /**
   * 
   * @param pbulishid 生成订单
   * @param roomid 
   * @param userid 
   * @param ismedia 
   * @param hourPrice 
   */
  generateOrder(pbulishid: any, roomid: any, userid: any, ismedia: any, hourPrice: any) {
    let url = this.apiUrl + 'rorder/genereterorder/' + pbulishid + '/' + roomid + '/' + userid + '/' + ismedia + '/' + hourPrice;
    return this.getAPIReturn(url);
  }
  /**
   * 获取订单
   * @param userId 
   * @param userType 
   */
  getOrders(userId:any,userType: any){
    let url = this.apiUrl + 'rorder/getOrders/' + userId + '/' + userType;
    return this.getAPIReturn(url);
  }
  /**
   * 订单流程
   * @param orderid 
   * @param flag 
   */
  orderProcess(orderid: any,flag: any){
    let url = this.apiUrl + 'rorder/orderProcess/' + orderid + '/' + flag;
    return this.getAPIReturn(url);
  }
  
  /**
   * 获取消息列表
   */
  getNotices(uid: any){
    let url = this.apiUrl + 'notice/list?uid=' + uid;
    return this.getAPIReturn(url);
  }
  handleNotice(id: any,type: any){
    let url = this.apiUrl + 'notice/read?id=' + id + '&type=' + type;
    return this.getAPIReturn(url);
  }
  
  testhttppost() {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let data = "name=admin&password=123456";
    this.http.post('http://localhost:9090/api/user/test', data, options)
      .map(res => res.json())
      .subscribe(
        res => {
          console.log(res['msg']);
          console.log('----分隔符----');
        }
      )
  }
  testhttpclientpost() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    // let data2 = "name=魏明健&password=123456";

    let params = {
      name: 'wmj',
      age: 22,
      id: 14434226
    }
    let param = JSON.stringify(params);
    let data = "param=" + param;
    this.httpclient.post('http://localhost:9090/api/user/test', data, httpOptions)
      .subscribe(
        res => {
          console.log(res);
          console.log(res['msg']);
        }
      )
  }
  /**
   * 全局获取 HTTP GET请求的方法
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getAPIReturn(url: string): Observable<object> {
    return this.httpclient.get(url)
      .catch(this.handleError);
  }
  /**
   * 全局获取HTTP POST请求方法
   * @private
   * @param {string} url 
   * @param {*} data 
   * @returns 
   * @memberof RestProvider
   */
  private postAPIReturn(url: string, param: any) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    let data = "param=" + JSON.stringify(param);
    return this.httpclient.post(url, data, httpOptions)
      .catch(this.handleError);
  }
  /**
   * 全局获取 HTTP POST请求的方法
   * @private
   * @param {string} url 
   * @param {*} data 
   * @returns {Observable<object>} 
   * @memberof RestProvider
   */

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理并在 console 中显示 error
   * 
   * @private
   * @param {(Response | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}  
