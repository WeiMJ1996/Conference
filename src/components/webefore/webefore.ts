import { Component } from '@angular/core';

/**
 * Generated class for the WebeforeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'webefore',
  templateUrl: 'webefore.html'
})
export class WebeforeComponent {

  text: string;

  constructor() {
    console.log('Hello WebeforeComponent Component');
    this.text = 'Hello World';
  }

}
