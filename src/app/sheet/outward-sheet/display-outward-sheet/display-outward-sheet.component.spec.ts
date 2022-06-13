import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutwardSheetComponent } from './display-outward-sheet.component';

describe('DisplayOutwardSheetComponent', () => {
  let component: DisplayOutwardSheetComponent;
  let fixture: ComponentFixture<DisplayOutwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOutwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
