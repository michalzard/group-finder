//Form related helper functions for react

/**
 * Function that handles element changes based on their name,value in form
 * @param {*} e event that's fired on change
 * @param {*} setState setter that changes state.
 */
export const handleFormChange = (e, setState) => {
  const name = e.target.name;
  const value = e.target.value;
  setState((prev) => ({ ...prev, [name]: value }));
};

/**
 * Helper class that handles form validation the simple way
 */
export class FormValidator {
  constructor(formState) {
    this.state = formState || {};
    this.errors = [];
  }
  isString(field) {
    const value = this.state[field];
    if (value === undefined || value.length === 0) return this;
    else if (typeof value !== "string") {
      this.errors.push({ [field]: `${value} is not string` });
    }
    return this;
  }
  
  isRequired(field) {
    const value = this.state[field];
    if (field) {
      if(typeof value === "string" && value.length === 0) this.errors.push({ [field]: `${field} is required` });
    }
    return this;
  }

  minmax(field, min, max, errorMessage) {
    const value = this.state[field];
    
    if (typeof value === "string" && value.length !==0 && value.length < min || value.length > max) {
      this.errors.push({ [field]: errorMessage ? `${field} ${errorMessage}` : `${field} must contain between ${min} and ${max} characters ` });
    }
    else if(typeof value === "number" && value > min || value < max){
      this.errors.push({ [field]: errorMessage ? `${field} ${errorMessage}` : `${field} must be atleast than ${min}` });
    }
    return this;
  }
  // max(field, max, errorMessage) {
  //   const value = this.state[field];
  //   if (typeof value === "string" && value.length > 0 && value.length < max) {
  //     this.errors.push({ [field]: errorMessage ? `${field} ${errorMessage}` : `${field} must contain maximum of ${max} chars` });
  //   }else if(typeof value === "number" && value < max){
  //     this.errors.push({ [field]: errorMessage ? `${field} ${errorMessage}` : `${field} must be more than ${max}` });
  //   }
  //   return this;
  // }
}
