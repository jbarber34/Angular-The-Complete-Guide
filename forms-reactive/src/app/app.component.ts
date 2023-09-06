import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  assignmentForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    this.assignmentForm = new FormGroup({
      assignmentData: new FormGroup({
        projectName: new FormControl(
          null,
          [Validators.required, this.forbiddenProjectNames.bind(this)],
          this.asyncForbiddenProjectNames
        ),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      projectStatus: new FormControl(this.statuses[1]),
    });

    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    // this.signupForm.statusChanges.subscribe((value) => console.log(value));
    this.signupForm.setValue({
      userData: {
        username: 'James',
        email: 'jpbarber34@gmail.com',
      },
      gender: 'male',
      hobbies: [],
    });
    this.signupForm.patchValue({
      userData: {
        username: 'Kylie',
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAssignmentSubmit() {
    console.log(this.assignmentForm.value);
  }

  // Two methods of getting controls
  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.includes(control.value)) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  forbiddenProjectNames(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { projectNameIsForbidden: true };
    }
    return null;
  }

  asyncForbiddenProjectNames(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'TestProject') {
          resolve({ projectNameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
