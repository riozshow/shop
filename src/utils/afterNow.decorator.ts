import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
export class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(date: Date | null) {
    return Date.now() < new Date(date).getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be after now`;
  }
}

export function IsAfterNow(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsAfterNowConstraint,
    });
  };
}
