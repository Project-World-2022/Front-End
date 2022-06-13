import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOutwardSheetComponent } from './preview-outward-sheet.component';

describe('PreviewOutwardSheetComponent', () => {
  let component: PreviewOutwardSheetComponent;
  let fixture: ComponentFixture<PreviewOutwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewOutwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewOutwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
