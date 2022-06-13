import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInwardSheetComponent } from './update-inward-sheet.component';

describe('UpdateInwardSheetComponent', () => {
  let component: UpdateInwardSheetComponent;
  let fixture: ComponentFixture<UpdateInwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
