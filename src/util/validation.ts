
namespace App {
  // VALIDATION

  // alternative can use "type" or use a class. Then we instanticate it later
  export interface Validatable {
    value: string | number;
    required?: boolean;   // the same:  required: boolean | undefined 
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };

  export function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
      // if (typeof validatableInput.value === 'string') 
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    // "!= null" meaning null or undefined. Else, we will have a problem if the value is zero
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
  };

}