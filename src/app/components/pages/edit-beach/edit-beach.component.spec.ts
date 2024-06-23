import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeachComponent } from './edit-beach.component';

describe('EditBeachComponent', () => {
  let component: EditBeachComponent;
  let fixture: ComponentFixture<EditBeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBeachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
