import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelView2Component } from './tabel-view2.component';

describe('TabelView2Component', () => {
  let component: TabelView2Component;
  let fixture: ComponentFixture<TabelView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
