import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'date';
  required?: boolean;
  validators?: any[];
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface FormConfig {
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
}

@Component({
  selector: 'app-shared-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './shared-form.html',
  styleUrl: './shared-form.css',
})
export class SharedFormComponent implements OnInit {
  @Input() config!: FormConfig;
  @Input() initialValues: any = {};
  @Input() loading = false;
  @Input() title?: string;
  @Input() subtitle?: string;

  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const group: any = {};

    this.config.fields.forEach((field) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.validators) {
        validators.push(...field.validators);
      }

      group[field.name] = [
        this.initialValues[field.name] || '',
        validators,
      ];
    });

    this.form = this.fb.group(group);
  }

  getField(name: string): FormField | undefined {
    return this.config.fields.find((f) => f.name === name);
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  hasError(fieldName: string, errorType: string): boolean {
    const control = this.getControl(fieldName);
    return !!(control && control.hasError(errorType) && control.touched);
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
