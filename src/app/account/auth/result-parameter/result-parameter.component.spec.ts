import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultParameterComponent } from './result-parameter.component';

describe('ResultParameterComponent', () => {
  let component: ResultParameterComponent;
  let fixture: ComponentFixture<ResultParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
