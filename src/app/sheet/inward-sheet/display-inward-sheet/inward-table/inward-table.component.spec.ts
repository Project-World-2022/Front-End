import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardTableComponent } from './inward-table.component';

describe('InwardTableComponent', () => {
  let component: InwardTableComponent;
  let fixture: ComponentFixture<InwardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
