import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exhumation } from './exhumation';

describe('Exhumation', () => {
  let component: Exhumation;
  let fixture: ComponentFixture<Exhumation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exhumation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exhumation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
