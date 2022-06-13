import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelView1Component } from './tabel-view1.component';

describe('TabelView1Component', () => {
  let component: TabelView1Component;
  let fixture: ComponentFixture<TabelView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelView1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
