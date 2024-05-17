import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';  // Update this path as necessary
import { User } from 'src/app/core/models/User'; // Update this path if your model is located elsewhere
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  userId: number = Number(localStorage.getItem('userId')); // This should be dynamically set, perhaps passed through a route or some other method
  constructor(private fb: FormBuilder, private userService: UserService,  private toastr: ToastrService, private router: Router ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.updateForm(user);
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
        this.router.navigate(['/account/login']);
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
        this.toastr.success('information successfully modified', '', {
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
      this.toastr.error('Please fill all required fields.', 'Error', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
      return; // If form is invalid, do not proceed
    }
  
    const { password, newPassword } = this.passwordForm.value;
    this.userService.changePassword(this.profileForm.value.email, password, newPassword).subscribe({
      next: (response) => {
        // Assuming response is always coming as expected even on successful password change
        if (response.message === "Password updated successfully.") {
          this.toastr.success(response.message, 'Success', {
            positionClass: 'toast-top-right',
            timeOut: 3000,
            closeButton: true
          });
          this.passwordForm.reset(); // Reset form if needed
        } else {
          // Handle any other message as an error even if it comes as a success from API
          this.toastr.error(response.message || 'Unknown error occurred', 'Error', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
            closeButton: true
          });
        }
      },
      error: (error) => {
        // Handling HTTP error response
        console.error('Failed to update password:', error);
        let errorMessage = (error.error && error.error.message) || 'Failed to update password.';
        this.toastr.error(errorMessage, 'Error', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    });
  }
  
}
