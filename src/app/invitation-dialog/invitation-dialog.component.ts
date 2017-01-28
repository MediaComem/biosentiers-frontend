import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { BioApiService } from '../api/api.service';

@Component({
  selector: 'bio-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.styl']
})
export class InvitationDialogComponent implements OnInit {

  private invitationForm: FormGroup;
  @ViewChild('email') private email: ElementRef;
  @ViewChild('modal') private modal: ModalDirective;

  constructor(private api: BioApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.invitationForm = this.formBuilder.group({
      email: [
        '',
        Validators.required
      ]
    });
  }

  onModalShown() {
    this.email.nativeElement.focus();
  }

  open() {
    this.modal.show();
  }

  invite(event) {
    event.preventDefault();

    if (!this.invitationForm.valid) {
      return;
    }

    return this.sendInvitation()
      .map((res) => res.json())
      .subscribe((invitation) => {
        this.close();
      });
  }

  close() {
    this.modal.hide();
  }

  private sendInvitation() {

    var value = this.invitationForm.value;
    value.role = 'user'; // TODO: allow to select

    return this.api
      .request('POST', '/auth/invitation')
      .json(value)
      .execute();
  }

}