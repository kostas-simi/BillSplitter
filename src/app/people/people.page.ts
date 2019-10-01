import { Component, OnInit } from '@angular/core';
import { Statics } from '../statics';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  people: Person[] = [];
  constructor(public actionSheetController: ActionSheetController) {
    this.people = Statics.globalPeople;

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
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
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



}
