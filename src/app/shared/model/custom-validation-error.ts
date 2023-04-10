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
