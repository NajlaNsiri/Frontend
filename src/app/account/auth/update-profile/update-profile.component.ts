import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';  // Update this path as necessary
import { User } from 'src/app/core/models/User'; // Update this path if your model is located elsewhere

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  userId: number = Number(localStorage.getItem('userId')); // This should be dynamically set, perhaps passed through a route or some other method

  constructor(private fb: FormBuilder, private userService: UserService) {
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
    this.passwordForm= this.fb.group({
      password:'',
      newPassword:'',
      confirmPassword:''
    })
  }

  updateForm(user: User) {
    this.profileForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber ,
      email: user.email,
    });
  }
  
  updateUserData() {
    const updatedUser = this.profileForm.value as User;
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Failed to update user:', error);
        // Handle update errors here, possibly with user feedback
      }
    });
  }
  onSubmit() {
    console.log(this.profileForm.value);
    this.updateUserData();
  }
  updatePassword(){

  }
}
