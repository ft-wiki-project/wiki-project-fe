import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user-service.service';

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

  constructor(private userService: UserService) {}

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

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }
}