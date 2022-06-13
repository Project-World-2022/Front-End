import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutwardSheetComponent } from './add-outward-sheet.component';

describe('AddOutwardSheetComponent', () => {
  let component: AddOutwardSheetComponent;
  let fixture: ComponentFixture<AddOutwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOutwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
