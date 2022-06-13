import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOutwardSheetComponent } from './update-outward-sheet.component';

describe('UpdateOutwardSheetComponent', () => {
  let component: UpdateOutwardSheetComponent;
  let fixture: ComponentFixture<UpdateOutwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOutwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOutwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
