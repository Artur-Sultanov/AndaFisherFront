import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFishToBeachListComponent } from './add-fish-to-beach-list.component';

describe('AddFishToBeachListComponent', () => {
  let component: AddFishToBeachListComponent;
  let fixture: ComponentFixture<AddFishToBeachListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFishToBeachListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFishToBeachListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
