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
        validate(object: object) {
          const newObject =
            typeof object === 'string' ? JSON.parse(object) : object;
          for (const languageKey of LANGUAGES_CODE) {
            if (
              typeof newObject[languageKey] !== 'string' ||
              newObject[languageKey] === ''
            )
              return false;
          }
          return true;
        },
      },
    });
  };
}
