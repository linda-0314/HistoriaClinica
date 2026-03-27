import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRoles } from './ver-roles';

describe('VerRoles', () => {
  let component: VerRoles;
  let fixture: ComponentFixture<VerRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerRoles],
    }).compileComponents();

    fixture = TestBed.createComponent(VerRoles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
