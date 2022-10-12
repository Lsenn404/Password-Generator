// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}


var lowerCaseLetters = [];
var upperCaseLetters = [];
var numericInputs = [];
var specialCharacters = [];
var passCriteria = ["lowercase letters", "uppercase letters", "numbers", "special characters"];
var userCriteria = [];
var passLength = 0;


var confirmPassCriteria = function() {
  while (passLength < 8 || passLength > 128 || isNaN(passLength)) { //will keep looping until passLength is a number between 8 and 128
    passLength = window.prompt('How long would you like your password to be? can be between 8 - 128 characters'); // prompts the user to enter the lenght, and assigns passLength to the input
    if (isNaN(passLength) || passLength < 8 || passLength > 128) { //if the input is not a number, less than 8, or greater than 128, 
      window.alert('You need to enter a number between 8 and 128'); //will alert the user on what they need to enter before restarting the loop
    }
  }
  
  for (i = 0; i < passCriteria.length; i++) {
    //gives the user a confirm window asking if they want to include each item in passCritera in their password, then stores a boolean based on their asnwers in userCritera
    userCriteria.push(window.confirm('Would you like your password to include ' + passCriteria[i]));
  }
}





// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page
