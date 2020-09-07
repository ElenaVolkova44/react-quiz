import is from "is_js";

export function createControl(config, validation){
   return {
      ...config,
      validation,
      valid: !validation,
      touched: false,
      value: ''
   }
}

export function validate(value, validation = null) {
   if (!validation) {
      return true;
   }

   if(validation.required && !value.trim()) {
      return false;
   }

   if(validation.email && !is.email(value)) {
      return false;
   }

   return (!validation.minLength || (value.trim().length >= validation.minLength));
}

export function validateForm(formControls) {
   let isFormValid = true;
   Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
   });
   return isFormValid;
}
