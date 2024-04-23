import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEtudComponent } from './activity-etud.component';

describe('ActivityEtudComponent', () => {
  let component: ActivityEtudComponent;
  let fixture: ComponentFixture<ActivityEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
