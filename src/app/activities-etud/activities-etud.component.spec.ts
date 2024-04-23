import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesEtudComponent } from './activities-etud.component';

describe('ActivitiesEtudComponent', () => {
  let component: ActivitiesEtudComponent;
  let fixture: ComponentFixture<ActivitiesEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
