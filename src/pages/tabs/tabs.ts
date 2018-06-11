import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { MessagePage } from '../message/message';
import { OrdersPage } from '../orders/orders';
import { ConferencesPage } from '../conferences/conferences';
import { MessagesPage } from '../messages/messages';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabAbout = AboutPage;
  tabOrder = OrdersPage;
  tabMessage = MessagesPage;

  constructor() {

  }
}
