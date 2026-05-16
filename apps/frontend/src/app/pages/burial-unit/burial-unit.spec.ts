import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialUnit } from './burial-unit';

describe('BurialUnit', () => {
  let component: BurialUnit;
  let fixture: ComponentFixture<BurialUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurialUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurialUnit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
