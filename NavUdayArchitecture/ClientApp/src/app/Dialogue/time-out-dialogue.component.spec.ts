import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOutDialogueComponent } from './time-out-dialogue.component';

describe('TimeOutDialogueComponent', () => {
  let component: TimeOutDialogueComponent;
  let fixture: ComponentFixture<TimeOutDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOutDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOutDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
