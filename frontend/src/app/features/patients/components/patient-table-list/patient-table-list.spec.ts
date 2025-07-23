import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTableList } from './patient-table-list';

describe('PatientTableList', () => {
  let component: PatientTableList;
  let fixture: ComponentFixture<PatientTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTableList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
