import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInwardSheetComponent } from './preview-inward-sheet.component';

describe('PreviewInwardSheetComponent', () => {
  let component: PreviewInwardSheetComponent;
  let fixture: ComponentFixture<PreviewInwardSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewInwardSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInwardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
