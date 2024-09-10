import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Success</h4>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close()">OK</button>
    </div>
  `
})
export class SuccessModal {
    @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}