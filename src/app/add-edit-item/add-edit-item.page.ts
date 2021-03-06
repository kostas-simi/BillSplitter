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
  editting: boolean = false;
  addedPeople: Person[] = [];
  allPeople: Person[];
  rawItemPeople: Person[] = [];
  currency: string;

  constructor(public navCtrl: NavController, private storage: Storage, public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.item = this.router.getCurrentNavigation().extras.state.item;
      this.editting = true;
    }
    if (!this.item) {
      this.item = { Id: -1, Name: "abc", Price: 0.5, People: [{ Id: 0, Name: 'hghj' }, { Id: 1, Name: 'ghjghj' }] };
    }
    this.storage.get("People").then(people => this.allPeople = people);
    this.rawItemPeople = this.item.People;
    this.storage.get("Items").then((items) => {
      if (items) {
        this.Items = items;
        this.storage.set("LastItemId", 0)
      } else {
        this.Items = [];
        this.storage.set("LastItemId", 0)
      }
    });
    this.storage.get("Currency").then(cur => { this.currency = cur; });
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
    if (this.rawItemPeople) this.rawItemPeople.forEach((p, index) => {
      if (p === person) this.rawItemPeople.splice(index, 1);
    });
  }

  LastItemId() {

  }
  costPerPerson() {
    let cost: number;
    console.log(this.item.People.length);
    cost = this.item.Price / this.item.People.length;
    cost = Math.round(cost * 100) / 100;
    console.log(cost);
    return cost;
  }
  saveItem() {
    if (this.item.People) {
      this.item.costPerPerson = this.costPerPerson();
    }
    console.log(this.item.Id);
    if (this.editting) {
      this.Items.forEach(i => {
        if (this.item.Id === i.Id) {
          i = this.item;
        }
      });
    } else {

      // this.item.Id = this.LastItemId();
      this.Items.push(this.item);
    }
    this.storage.set("Items", this.Items);

    // this.navCtrl.navigateForward("/items");
  }
}

