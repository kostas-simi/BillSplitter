import { Component, OnInit } from '@angular/core';
import { Statics } from '../statics';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items: Item[] = [];
  constructor(public actionSheetController: ActionSheetController, private storage: Storage, public navCtrl: NavController, public router: Router) {
    this.storage.get("Items").then(items => { this.items = (items); });

    console.log(this.items);
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: item.Name,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.delete(item);
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          let navigationExtras: NavigationExtras = {
            state: {
              item: item
            }
          };
          this.router.navigate(['add-edit-item'], navigationExtras);
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

  ngOnInit() {

  };

  delete(target) {
    const index: number = this.items.indexOf(target);
    this.items.splice(index, 1);
    this.storage.set("Items", this.items);
    console.log(this.items);
  }


  deleteAll() {
    this.items = [];
    this.storage.set("Items", this.items);
  }


}

