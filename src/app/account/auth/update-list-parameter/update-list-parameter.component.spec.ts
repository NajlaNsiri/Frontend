import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListParameterComponent } from './update-list-parameter.component';

describe('UpdateListParameterComponent', () => {
  let component: UpdateListParameterComponent;
  let fixture: ComponentFixture<UpdateListParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateListParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateListParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
