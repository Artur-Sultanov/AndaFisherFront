import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonyHavenComponent } from './harmony-haven.component';

describe('HarmonyHavenComponent', () => {
  let component: HarmonyHavenComponent;
  let fixture: ComponentFixture<HarmonyHavenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarmonyHavenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarmonyHavenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
