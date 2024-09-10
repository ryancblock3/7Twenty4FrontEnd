import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  onConfirm: () => void = () => {};

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.onConfirm();
    this.activeModal.close();
  }
}