import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectFormComponent } from './edit-project-modal.component';

describe('EditProjectFormComponent', () => {
  let component: EditProjectFormComponent;
  let fixture: ComponentFixture<EditProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProjectFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
