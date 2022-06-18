import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

import { LANGUAGES_CODE } from 'src/constants';

@ValidatorConstraint({ name: 'isMultiLingual' })
class IsMultiLingualRule implements ValidatorConstraintInterface {
  validate(object: Object) {
    for (const languageKey of LANGUAGES_CODE) {
      if (typeof object[languageKey] !== 'string') return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Missing language(s)`;
  }
}

export function IsMultiLingual(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsMultiLingual',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsMultiLingualRule,
    });
  };
}
