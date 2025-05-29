import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-project-modal',
  standalone: false,
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent {
  @Input() project: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedProject: any = {};

  ngOnInit() {
    this.editedProject = { ...this.project };
  }

  onSave() {
    this.save.emit(this.editedProject);
  }

  onClose() {
    this.close.emit();
  }
}