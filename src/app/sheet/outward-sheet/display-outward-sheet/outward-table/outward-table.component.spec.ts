import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardTableComponent } from './outward-table.component';

describe('OutwardTableComponent', () => {
  let component: OutwardTableComponent;
  let fixture: ComponentFixture<OutwardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutwardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
