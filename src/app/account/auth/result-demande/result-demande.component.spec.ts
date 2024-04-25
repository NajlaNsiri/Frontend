import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDemandeComponent } from './result-demande.component';

describe('ResultDemandeComponent', () => {
  let component: ResultDemandeComponent;
  let fixture: ComponentFixture<ResultDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
