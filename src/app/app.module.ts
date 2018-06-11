import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http'

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MessagePage } from '../pages/message/message';
import { OrdersPage } from '../pages/orders/orders';
import { ConferencesPage } from '../pages/conferences/conferences';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { EnterprisePage } from '../pages/enterprise/enterprise';
import { PasswordPage } from '../pages/password/password';
import { AddPublishPage } from '../pages/add-publish/add-publish';
import { HeadfacePage } from '../pages/headface/headface';
import { UserManagerPage } from '../pages/user-manager/user-manager';
import { FeedbackPage } from '../pages/feedback/feedback';
import { PublishPage} from '../pages/publish/publish';
import { OrderInfoPage } from '../pages/order-info/order-info';
import { RoomsPage } from '../pages/rooms/rooms';
import { RoominfoPage } from '../pages/roominfo/roominfo';
import { AddroomPage } from '../pages/addroom/addroom';
import { MessagesPage } from '../pages/messages/messages';
import { ScanPage } from '../pages/scan/scan';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { UtilsProvider } from '../providers/utils/utils';


import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    MessagePage,
    OrdersPage,
    ConferencesPage,
    RegisterPage,
    LoginPage,
    UserPage,
    EnterprisePage,
    PasswordPage,
    AddPublishPage,
    HeadfacePage,
    UserManagerPage,
    FeedbackPage,
    PublishPage,
    OrderInfoPage,
    RoomsPage,
    RoominfoPage,
    AddroomPage,
    MessagesPage,
    ScanPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',         //隐藏全部子页面tabs
      backButtonText: '返回',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    MessagePage,
    OrdersPage,
    ConferencesPage,
    RegisterPage,
    LoginPage,
    UserPage,
    EnterprisePage,
    PasswordPage,
    AddPublishPage,
    HeadfacePage,
    UserManagerPage,
    FeedbackPage,
    PublishPage,
    OrderInfoPage,
    RoomsPage,
    RoominfoPage,
    AddroomPage,
    MessagesPage,
    ScanPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    UtilsProvider,
    File,
    Transfer,
    FilePath,
    Camera,
    Device,
    QRScanner
  ]
})
export class AppModule {}
