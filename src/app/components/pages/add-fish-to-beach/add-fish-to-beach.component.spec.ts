import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFishToBeachComponent } from './add-fish-to-beach.component';

describe('AddFishToBeachComponent', () => {
  let component: AddFishToBeachComponent;
  let fixture: ComponentFixture<AddFishToBeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFishToBeachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFishToBeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
