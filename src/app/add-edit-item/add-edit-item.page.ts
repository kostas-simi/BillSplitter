import { Component, OnInit } from '@angular/core';
import { Statics } from '../statics';
import { NavController } from '@ionic/angular';
import { PeoplePage } from '../people/people.page';
import { ItemsPage } from '../items/items.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.page.html',
  styleUrls: ['./add-edit-item.page.scss'],
})
export class AddEditItemPage {
  item: Item;
  Items: Item[] = [];
  addedPeople: Person[] = [];
  allPeople: Person[];
  rawItemPeople: Person[] = [];

  constructor(public navCtrl: NavController, private storage: Storage, public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.item = this.router.getCurrentNavigation().extras.state.item;
    }
    if (!this.item) {
      this.item = { Id: -1, Name: "abc", Price: 0.5, People: [{ Id: 0, Name: 'hghj' }, { Id: 1, Name: 'ghjghj' }] };
    }
    this.allPeople = Statics.globalPeople;
    this.rawItemPeople = this.item.People;
    this.storage.get("Items").then((items) => {
      this.Items = items;
    });
    console.log(this.Items);
  }


  addOnItem() {

    this.item.People = this.addedPeople.concat(this.rawItemPeople);
  }

  deletePerson(person) {
    this.item.People.forEach((p, index) => {
      if (p === person) this.item.People.splice(index, 1);
    });
    // IS EVERY FOREACH NEEDED?
    this.addedPeople.forEach((p, index) => {
      if (p === person) this.addedPeople.splice(index, 1);
    });
    this.rawItemPeople.forEach((p, index) => {
      if (p === person) this.rawItemPeople.splice(index, 1);
    });
  }


  saveItem() {
    // Statics.globalItems.forEach((i, index) => {
    //   if (i === this.item) Statics.globalItems.splice(index, 1);
    // });


    console.log("----------");
    this.Items.push(this.item);
    this.storage.set("Items", this.Items);
    this.storage.get("Items").then((items) => {
      this.Items = items;
    });
    console.log(this.Items);

    this.navCtrl.back();
  }
}

