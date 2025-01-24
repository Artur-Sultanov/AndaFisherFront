import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishDetailComponent } from './fish-detail.component';

describe('FishDetailComponent', () => {
  let component: FishDetailComponent;
  let fixture: ComponentFixture<FishDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
