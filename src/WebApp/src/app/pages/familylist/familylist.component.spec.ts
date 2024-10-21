import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyListComponent } from './familylist.component';

describe('FamilyListComponent', () => {
  let component: FamilyListComponent;
  let fixture: ComponentFixture<FamilyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
