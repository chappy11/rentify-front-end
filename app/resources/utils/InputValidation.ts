
export function validateMobileNumber(mobileNumber:string) {
    // Remove hyphens and spaces
    mobileNumber = mobileNumber.replace(/[-\s]/g, '');
  
    // Check if it's 11 digits
    if (mobileNumber.length !== 11) {
      return false;
    }
  
    // Check if it starts with a valid prefix
  
    var characterReg = /(^0|[89]\d{2}-\d{3}\-?\d{4}$)|(^0|[89]\d{2}\d{3}\d{4}$)|(^63[89]\d{2}-\d{3}-\d{4}$)|(^63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}-\d{3}-\d{4}$)/;
    if (!characterReg.test(mobileNumber)) {
    
      return false;
    }

    return true;
  }

export function validateEmail(email:string) {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
}  
  
export function validatePersonName(name:string){
    if (typeof name !== "string") {
        return false;
      }
    
      // Use a regular expression to check if the string contains only letters
      const regex = /^[A-Za-z]+$/;
      return regex.test(name);
}