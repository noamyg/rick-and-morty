import { AbstractControl, FormControl } from '@angular/forms';
import { CustomValidationError, ValidationErrorMessage } from '../model/custom-validation-error';
import { uniq } from 'lodash';

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
