import { Component, EventEmitter, Input, Output } from '@angular/core';

interface User {
  id: number;
  profile: {
    first: string;
    last: string;
  };
}

@Component({
  selector: 'app-create-team-modal',
  standalone: false,
  templateUrl: './create-team-modal.component.html',
  styleUrl: './create-team-modal.component.css'
})

export class CreateTeamModalComponent {
  @Input() companyUsers: User[] = [];
  @Input() companyId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  teamData = {
    name: '',
    description: '',
    userIds: [] as number[],
    companyId: ''
  };

  selectedUsers: User[] = [];
  selectedUserId: string = '';

  onUserSelect() {
    if (this.selectedUserId) {
      const user = this.companyUsers.find(u => u.id.toString() === this.selectedUserId);
      if (user && !this.selectedUsers.some(u => u.id === user.id)) {
        this.selectedUsers.push(user);
        this.teamData.userIds.push(user.id);
      }
      this.selectedUserId = '';
    }
  }

  removeUser(userId: number) {
    this.selectedUsers = this.selectedUsers.filter(u => u.id !== userId);
    this.teamData.userIds = this.teamData.userIds.filter(id => id !== userId);
  }

  onSubmit() {
    this.teamData.companyId = this.companyId;
    this.save.emit(this.teamData);
  }

  onClose() {
    this.close.emit();
  }
}
