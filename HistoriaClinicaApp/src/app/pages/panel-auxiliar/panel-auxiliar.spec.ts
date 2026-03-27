import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAuxiliar } from './panel-auxiliar';

describe('PanelAuxiliar', () => {
  let component: PanelAuxiliar;
  let fixture: ComponentFixture<PanelAuxiliar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAuxiliar],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAuxiliar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
