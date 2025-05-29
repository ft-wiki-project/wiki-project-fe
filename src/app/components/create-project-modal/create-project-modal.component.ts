import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-project-modal',
  standalone: false,
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent {
  @Input() project: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor() {}

  createdProject: any = {};

  ngOnInit() {
    this.createdProject = { ...this.project };
  }

  onSave() {
    this.save.emit(this.createdProject);
  }

  onClose() {
    this.close.emit();
  }

}
