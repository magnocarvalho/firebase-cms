import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFabricanteComponent } from './admin-fabricante.component';

describe('AdminFabricanteComponent', () => {
  let component: AdminFabricanteComponent;
  let fixture: ComponentFixture<AdminFabricanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFabricanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
