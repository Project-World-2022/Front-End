import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionReportTableComponent } from './correction-report-table.component';

describe('CorrectionReportTableComponent', () => {
  let component: CorrectionReportTableComponent;
  let fixture: ComponentFixture<CorrectionReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionReportTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
