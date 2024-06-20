import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachDetailComponent } from './beach-detail.component';

describe('BeachDetailComponent', () => {
  let component: BeachDetailComponent;
  let fixture: ComponentFixture<BeachDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeachDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeachDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
