import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-edit-job-modal',
  templateUrl: './edit-job-modal.component.html'
})
export class EditJobModalComponent implements OnInit {
  @Input() job!: Job;
  editJobForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.editJobForm = this.formBuilder.group({
      jobName: [this.job.jobName, Validators.required],
      jobNumber: [this.job.jobNumber, Validators.required],
    });
  }

  onSubmit() {
    if (this.editJobForm.valid) {
      const updatedJob: Job = {
        ...this.job,
        ...this.editJobForm.value
      };
      this.jobService.updateJob(updatedJob).subscribe(
        () => {
          this.activeModal.close('success');
        },
        (error) => {
          console.error('Error updating job:', error);
        }
      );
    }
  }
}