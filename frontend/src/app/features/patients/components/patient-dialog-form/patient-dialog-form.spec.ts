import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDialogForm } from './patient-dialog-form';

describe('PatientDialogForm', () => {
  let component: PatientDialogForm;
  let fixture: ComponentFixture<PatientDialogForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDialogForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDialogForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
