import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-delete-confirmation-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirm Deletion</h4>
    </div>
    <div class="modal-body">
      <p>
        Are you sure you want to delete the job "{{
          job?.jobName || 'Unknown'
        }}"?
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="confirm()">
        Delete
      </button>
      <button type="button" class="btn btn-secondary" (click)="dismiss()">
        Cancel
      </button>
    </div>
  `,
})
export class DeleteConfirmationModal {
  @Input() job: Job | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
