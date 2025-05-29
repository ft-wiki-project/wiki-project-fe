import { Component, EventEmitter, Input, Output } from '@angular/core';

interface AnnouncementData {
  title: string;
  message: string;
  companyId: string;
  authorId: string;
}

@Component({
  selector: 'app-create-announcement-modal',
  standalone: false,
  templateUrl: './create-announcement-modal.component.html',
  styleUrl: './create-announcement-modal.component.css'
})

export class CreateAnnouncementModalComponent {
  @Input() companyId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AnnouncementData>();

  announcementData: AnnouncementData = {
    title: '',
    message: '',
    companyId: '',
    authorId: ''
  };

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.announcementData.authorId = user.id;
    this.announcementData.companyId = this.companyId;
  }

  onSubmit() {
    this.save.emit(this.announcementData);
  }

  onClose() {
    this.close.emit();
  }
}
