import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

interface UserData {
  credentials: {
    username: string;
    password: string;
  };
  profile: {
    first: string;
    last: string;
    email: string;
    phone: string;
  };
  admin: string;
  status: string;
  companyId: string;
}

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})

export class EditUserModalComponent implements OnInit {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<UserData>();

  userData: UserData = {
    credentials: {
      username: '',
      password: ''
    },
    profile: {
      first: '',
      last: '',
      email: '',
      phone: ''
    },
    admin: 'false',
    status: 'PENDING',
    companyId: ''
  };

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  ngOnInit() {
    this.userData = {
      credentials: {
        username: this.user.username,
        password: ''
      },
      profile: {
        first: this.user.profile.first,
        last: this.user.profile.last,
        email: this.user.profile.email,
        phone: this.user.profile.phone || ''
      },
      admin: this.user.admin,
      status: this.user.status,
      companyId: localStorage.getItem('selectedCompanyId') || ''
    };
  }

  onSubmit() {
    if (this.newPassword) {
      if (this.newPassword !== this.confirmPassword) {
        alert('New passwords do not match!');
        return;
      }
      this.userData.credentials.password = this.newPassword;
    }
    this.save.emit(this.userData);
  }

  onClose() {
    this.close.emit();
  }
}
