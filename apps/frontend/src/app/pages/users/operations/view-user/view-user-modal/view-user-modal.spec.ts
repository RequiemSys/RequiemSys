import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserModal } from './view-user-modal';

describe('ViewUserModal', () => {
  let component: ViewUserModal;
  let fixture: ComponentFixture<ViewUserModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
