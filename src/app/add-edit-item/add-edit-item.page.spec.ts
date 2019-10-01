import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItemPage } from './add-edit-item.page';

describe('AddEditItemPage', () => {
  let component: AddEditItemPage;
  let fixture: ComponentFixture<AddEditItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
