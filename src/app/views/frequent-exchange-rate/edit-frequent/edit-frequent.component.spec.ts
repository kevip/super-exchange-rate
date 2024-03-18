import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFrequentComponent } from './edit-frequent.component';

describe('EditFrequentComponent', () => {
  let component: EditFrequentComponent;
  let fixture: ComponentFixture<EditFrequentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFrequentComponent]
    });
    fixture = TestBed.createComponent(EditFrequentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
