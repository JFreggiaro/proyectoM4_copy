import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
    //?? Validar si las contraseñas coinciden
    validate(password: string, args: ValidationArguments) {
        if(password !== (args.object as any) [args.constraints[0]]) {
            return false
        }
        return true
    }

    //?? Mensaje de error si la validacion falla
    defaultMessage(args?: ValidationArguments): string {
        return 'Las contraseñas no coinciden'
    }
}