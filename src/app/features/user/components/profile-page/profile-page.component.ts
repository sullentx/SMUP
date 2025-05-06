import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { BackButtonComponent } from '../../../medications/components/buttons/back-button/back-button.component';
import { DialogService } from '../../../../shared/services/dialog.service';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackButtonComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
  showPasswordForm = false;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.passwordForm = this.createPasswordForm();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  createPasswordForm(): FormGroup {
    return this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  togglePasswordForm(): void {
    this.showPasswordForm = !this.showPasswordForm;
    if (this.showPasswordForm) {
      this.passwordForm.reset();
    }
  }

  saveNewPassword(): void {
    if (this.passwordForm.valid) {
      console.log('Cambio de contraseña solicitado:', this.passwordForm.value);
      
      setTimeout(() => {
        this.dialogService.success(
          'Tu contraseña ha sido actualizada correctamente.',
          '¡Contraseña actualizada!',
          '/palomita.png' 
        );
        
        this.togglePasswordForm();
      }, 1000);
    }
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    
    const isValid = hasUpperCase && hasLowerCase && hasNumeric;
    
    return isValid ? null : { passwordStrength: true };
  }
  
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    
    if (newPassword?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    
    return null;
  }

  changePassword(): void {
    this.togglePasswordForm();
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}