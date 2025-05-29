import { Component, EventEmitter, Output } from '@angular/core';

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
  selector: 'app-create-user-modal',
  standalone: false,
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.css'
})


export class CreateUserModalComponent {
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
    companyId: localStorage.getItem('selectedCompanyId') || ''
  };
  confirmPassword: string = '';

  onSubmit() {
    if (this.userData.credentials.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    this.save.emit(this.userData);
  }

  onClose() {
    this.close.emit();
  }
}
