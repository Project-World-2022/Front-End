import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInwardSheetComponent } from './add-inward-sheet.component';

describe('AddInwardSheetComponent', () => {
  let component: AddInwardSheetComponent;
  let fixture: ComponentFixture<AddInwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
