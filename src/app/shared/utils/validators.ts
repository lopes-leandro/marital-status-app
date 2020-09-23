import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static GreaterThanEighteenYears(controll: AbstractControl) {
    const dateOfBirth = new Date(controll.value); 
    const today = new Date();
    const timeToTest = 1000 * 60 * 60 * 24 * 365 * 18;
    if (today.getTime() - dateOfBirth.getTime() >= timeToTest) {
      return null;
    }
    return { underAge: true};
  }
}