import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchantillonFormComponent } from './echantillon-form.component';

describe('EchantillonFormComponent', () => {
  let component: EchantillonFormComponent;
  let fixture: ComponentFixture<EchantillonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EchantillonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EchantillonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
