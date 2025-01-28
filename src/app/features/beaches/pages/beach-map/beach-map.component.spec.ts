import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachMapComponent } from './beach-map.component';

describe('BeachMapComponent', () => {
  let component: BeachMapComponent;
  let fixture: ComponentFixture<BeachMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeachMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeachMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
