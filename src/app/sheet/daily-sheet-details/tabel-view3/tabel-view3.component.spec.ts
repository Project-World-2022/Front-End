import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelView3Component } from './tabel-view3.component';

describe('TabelView3Component', () => {
  let component: TabelView3Component;
  let fixture: ComponentFixture<TabelView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelView3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
