import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import currencies from './../international/currencies.json';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currencies: any[] = currencies;
  constructor(public storage: Storage) {
    console.log(this.currencies)
  }


  ngOnInit() {
  }

  changeCurrency(code) {
    console.log(code);
    this.storage.set("Currency", code);


  }
}
