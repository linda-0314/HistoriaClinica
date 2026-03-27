import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOdontologo } from './panel-odontologo';

describe('PanelOdontologo', () => {
  let component: PanelOdontologo;
  let fixture: ComponentFixture<PanelOdontologo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelOdontologo],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelOdontologo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
