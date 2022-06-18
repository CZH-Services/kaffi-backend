import { ValidationOptions, registerDecorator } from 'class-validator';

import { LANGUAGES_CODE } from 'src/constants';

export function IsMultiLingual(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsMultiLingual',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(object: Object) {
          for (const languageKey of LANGUAGES_CODE) {
            if (typeof object[languageKey] !== 'string') return false;
          }
          return true;
        },
      },
    });
  };
}
