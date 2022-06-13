import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionReportComponent } from './correction-report.component';

describe('CorrectionReportComponent', () => {
  let component: CorrectionReportComponent;
  let fixture: ComponentFixture<CorrectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
