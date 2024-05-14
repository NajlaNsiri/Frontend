import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';  // Update this path as necessary
import { User } from 'src/app/core/models/User'; // Update this path if your model is located elsewhere
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  userId: number = Number(localStorage.getItem('userId')); // This should be dynamically set, perhaps passed through a route or some other method
  constructor(private fb: FormBuilder, private userService: UserService,  private toastr: ToastrService ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.updateForm(user);
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
        // Handle errors here, possibly with user feedback
      }
    });
  }
  createForm() {
    this.profileForm = this.fb.group({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  updateForm(user: User) {
    this.profileForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  }

  updateUserData() {
    const updatedUser = this.profileForm.value as User;
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.ngOnInit(); 
        this.toastr.success('informations modifiées avec succès', '', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true,
          progressBar: true
        });   // Refresh user data
      },
      error: (error) => {
        console.error('Failed to update user:', error);
        this.toastr.error(error, '', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.updateUserData();
  }

  updatePassword() {
    if (this.passwordForm.invalid) {
      console.log('error');
      return; // If form is invalid, do not proceed
    }
    const { password, newPassword } = this.passwordForm.value;
    this.userService.changePassword(this.profileForm.value.email, password, newPassword).subscribe({
      next: (response) => {
        console.log('Password updated successfully:', response);
        // Optionally reset the form or provide additional user feedback
      },
      error: (error) => {
        console.error('Failed to update password:', error);
        this.toastr.error(error.message, '', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    });
  }
}
