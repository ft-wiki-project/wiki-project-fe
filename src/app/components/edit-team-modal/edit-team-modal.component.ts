import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

interface User {
  id: number;
  profile: {
    first: string;
    last: string;
  };
}

interface Team {
  id: number;
  name: string;
  description: string;
  users: User[];
}

@Component({
  selector: 'app-edit-team-modal',
  standalone: false,
  templateUrl: './edit-team-modal.component.html',
  styleUrl: './edit-team-modal.component.css'
})

export class EditTeamModalComponent implements OnInit {
  @Input() team!: Team;
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

  ngOnInit() {
    this.teamData.name = this.team.name;
    this.teamData.description = this.team.description;
    this.teamData.companyId = this.companyId;
    this.selectedUsers = [...this.team.users];
    this.teamData.userIds = this.team.users.map(user => user.id);
  }

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
    this.save.emit(this.teamData);
  }

  onClose() {
    this.close.emit();
  }
}
