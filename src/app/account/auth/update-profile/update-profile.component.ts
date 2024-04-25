import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName: '',
      lastName: '',
      phone: '',
      email: '' // Initialize with your form controls and default values
    });
  }

  onSubmit() {
    // Handle form submission
    console.log(this.profileForm.value);
  }

}
