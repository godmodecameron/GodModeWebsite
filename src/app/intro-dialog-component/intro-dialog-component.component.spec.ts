import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDialogComponentComponent } from './intro-dialog-component.component';

describe('IntroDialogComponentComponent', () => {
  let component: IntroDialogComponentComponent;
  let fixture: ComponentFixture<IntroDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
