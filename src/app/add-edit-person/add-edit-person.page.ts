import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-person',
  templateUrl: './add-edit-person.page.html',
  styleUrls: ['./add-edit-person.page.scss'],
})
export class AddEditPersonPage implements OnInit {
  person: Person;
  People: Person[] = [];
  editting: boolean = false;
  currency: string = "EUR";

  constructor(private storage: Storage, public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.person = this.router.getCurrentNavigation().extras.state.person;
      this.editting = true;
    }
    if (!this.person) {
      this.person = { Id: -1, Name: "Kostas", Total: 0.0, Items: [{ Id: -1, Name: "abc", Price: 0.5 }] };
    }
    this.storage.get("People").then((people) => {
      if (people) {
        this.People = people;
      } else {
        this.People = [];
      }
    });
    console.log(this.People);
  }

  ngOnInit() {
  }

  savePerson() {
    if (this.editting) {
      this.People.forEach(p => {
        if (this.person.Name === p.Name) {
          p = this.person;
        }
      });
    } else {
      this.People.push(this.person);
    }
    this.storage.set("People", this.People);
    this.storage.get("People").then((people) => {
      this.People = people;
    });
    console.log(this.People);
  }


}
