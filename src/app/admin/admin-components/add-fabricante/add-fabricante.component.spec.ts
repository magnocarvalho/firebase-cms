import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFabricanteComponent } from './add-fabricante.component';

describe('AddFabricanteComponent', () => {
  let component: AddFabricanteComponent;
  let fixture: ComponentFixture<AddFabricanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFabricanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
