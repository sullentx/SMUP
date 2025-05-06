import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyRespondentsComponent } from './notify-respondents.component';

describe('NotifyRespondentsComponent', () => {
  let component: NotifyRespondentsComponent;
  let fixture: ComponentFixture<NotifyRespondentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyRespondentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifyRespondentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
