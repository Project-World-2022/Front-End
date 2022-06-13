import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInwardSheetComponent } from './display-inward-sheet.component';

describe('DisplayInwardSheetComponent', () => {
  let component: DisplayInwardSheetComponent;
  let fixture: ComponentFixture<DisplayInwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
