import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deceased } from './deceased';

describe('Deceased', () => {
  let component: Deceased;
  let fixture: ComponentFixture<Deceased>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deceased]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deceased);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
