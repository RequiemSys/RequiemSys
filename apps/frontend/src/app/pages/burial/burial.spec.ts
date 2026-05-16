import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Burial } from './burial';

describe('Burial', () => {
  let component: Burial;
  let fixture: ComponentFixture<Burial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Burial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Burial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
