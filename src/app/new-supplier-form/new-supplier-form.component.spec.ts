import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplierFormComponent } from './new-supplier-form.component';

describe('NewSupplierFormComponent', () => {
  let component: NewSupplierFormComponent;
  let fixture: ComponentFixture<NewSupplierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSupplierFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
