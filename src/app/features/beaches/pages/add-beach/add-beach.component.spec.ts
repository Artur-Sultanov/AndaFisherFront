import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeachComponent } from './add-beach.component';

describe('AddBeachComponent', () => {
  let component: AddBeachComponent;
  let fixture: ComponentFixture<AddBeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBeachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
