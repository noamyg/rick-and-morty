import { AbstractControl, FormControl } from '@angular/forms';
import { uniq } from 'lodash';

export interface CustomValidationError {
  key: string;
  error: string;
}

export abstract class ValidationErrorMessage {
  static readonly UNKNOWN = 'Invalid input';
  static readonly Defaults: CustomValidationError[] = [
    { key: 'required', error: 'This field is required' }
  ];
}

export class FormUtil {
  static Pattern = {
  };

  static isControlRequired(control: FormControl): boolean {
    if (control?.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator?.['required']) {
        return true;
      }
    }
    return false;
  }

  static isControlDisabled(control: FormControl): boolean {
    return control?.disabled;
  }

  static getControlErrors(control: FormControl, customValidationErrors: CustomValidationError[]): string | undefined {
    let errorMessage = '';
    if (control.errors) {
      if (customValidationErrors) {
        errorMessage = customValidationErrors.filter(errObj => control['errors']?.[errObj.key]).map(errObj => errObj.error).join(', ');
      }
      if (!errorMessage.length) {
        errorMessage =
          uniq(
            Object.keys(control.errors)
              .map(errorKey => ValidationErrorMessage.Defaults
                .find(vdem => vdem.key === errorKey)?.error || ValidationErrorMessage.UNKNOWN)
          ).join(', ');
      }
    }
    return errorMessage;
  }
}
