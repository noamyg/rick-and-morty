export interface CustomValidationError {
  key: string;
  error: string;
}

export abstract class ValidationErrorMessage {
  static readonly UNKNOWN = 'validationErrors.invalidInput';
  /*
   * Would be improved as a function to display exact message
   * I.E. `minimum length of ${error.requiredLength}`
   */
  static readonly Defaults: CustomValidationError[] = [
    { key: 'required', error: 'validationErrors.thisFieldIsRequired' },
    { key: 'minlength', error: 'validationErrors.thisFieldHasMinimumLength' },
    { key: 'maxlength', error: 'validationErrors.thisFieldHasMaximumLength' }
  ];
}
