import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBeachComponent } from './delete-beach.component';

describe('DeleteBeachComponent', () => {
  let component: DeleteBeachComponent;
  let fixture: ComponentFixture<DeleteBeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBeachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
