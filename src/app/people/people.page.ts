import { Component, OnInit } from '@angular/core';
import { Statics } from '../statics';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  people: Person[] = [];
  items: Item[] = [];
  constructor(public actionSheetController: ActionSheetController, private storage: Storage, public router: Router) {
    this.storage.get("Items").then(items => this.items = items);
    this.storage.get("People").then(people => {
      this.people = people;
      this.costCalculation();
      console.log(this.people);
    });


  }

  ngOnInit() {

  }

  async presentActionSheet(person) {
    const actionSheet = await this.actionSheetController.create({
      header: person.Name,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.delete(person);
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          let navigationExtras: NavigationExtras = {
            state: {
              person: person
            }
          };
          this.router.navigate(['add-edit-person'], navigationExtras);
          console.log('Edit clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  costCalculation() {
    this.people.forEach(person => {
      console.log(person);
      this.items.forEach(item => {
        item.People.forEach(itemPerson => {
          console.log(itemPerson.Name);
          if (itemPerson.Name == person.Name) {
            person.Total += item.costPerPerson;
            console.log(item.costPerPerson);
            console.log(person.Total);
          }
        });
      });
    });
  }

  delete(target) {
    const index: number = this.people.indexOf(target);
    this.people.splice(index, 1);
    this.storage.set("People", this.people);
  }


  deleteAll() {
    this.people = [];
    this.storage.set("People", this.people);
  }


}
