import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatPdfComponent } from './resultat-pdf.component';

describe('ResultatPdfComponent', () => {
  let component: ResultatPdfComponent;
  let fixture: ComponentFixture<ResultatPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
