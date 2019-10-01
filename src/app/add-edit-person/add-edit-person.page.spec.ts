import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPersonPage } from './add-edit-person.page';

describe('AddEditPersonPage', () => {
  let component: AddEditPersonPage;
  let fixture: ComponentFixture<AddEditPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPersonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
