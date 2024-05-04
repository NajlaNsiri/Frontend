import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEchanttillonComponent } from './update-echanttillon.component';

describe('UpdateEchanttillonComponent', () => {
  let component: UpdateEchanttillonComponent;
  let fixture: ComponentFixture<UpdateEchanttillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEchanttillonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEchanttillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
