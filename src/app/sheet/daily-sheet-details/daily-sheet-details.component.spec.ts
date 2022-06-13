import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAILYSHEETDETAILSComponent } from './daily-sheet-details.component';

describe('DAILYSHEETDETAILSComponent', () => {
  let component: DAILYSHEETDETAILSComponent;
  let fixture: ComponentFixture<DAILYSHEETDETAILSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAILYSHEETDETAILSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAILYSHEETDETAILSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
