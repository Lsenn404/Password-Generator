// Assignment code here
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//Alphabet, Numbers, and Special Characters
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowercase = uppercase.map(letter => letter.toLowerCase());
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", "|", ";", ":", "'", ",", ".", "<", ">", "/", "?", "~", "`"];
var allChar = [lowercase, uppercase, numbers, special];



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var passCriteria = ["lowercase letters", "uppercase letters", "numbers", "special characters"];
  var userCriteria = [];
  var passLength = 0;
  var needsToContain = []; //will keep track of which array of characters the final password will need to contain

  while (passLength < 8 || passLength > 128 || isNaN(passLength)) { //will keep looping until passLength is a number between 8 and 128
    passLength = window.prompt('How long would you like your password to be? can be between 8 - 128 characters'); // prompts the user to enter the lenght, and assigns passLength to the input
    if (isNaN(passLength) || passLength < 8 || passLength > 128) { //if the input is not a number, less than 8, or greater than 128, 
      window.alert('You need to enter a number between 8 and 128'); //will alert the user on what they need to enter before restarting the loop
    }
  }
  function determineCritera(){
    for (i = 0; i < passCriteria.length; i++) {
      //gives the user a confirm window asking if they want to include each item in passCritera in their password, then stores a boolean based on their asnwers in userCritera
      userCriteria.push(window.confirm('Would you like your password to include ' + passCriteria[i]));
    }
  }

  determineCritera()

  while (userCriteria.every(element => element === false)) { //determines if every element in userCriteria is false, if all elements are false (meaning the user has not selected any criteria), the code will return true, repeating the loop and running determineCritera again
    window.alert('You need to select at least one option!') //tells the user they need to select 1 option minimum
    userCriteria = [] //resets the userCritera array
    determineCritera()
  }
  

  console.log('logging userCriteria')
  console.log(userCriteria)
  var potentialChar = []
  for (i = 0; i < userCriteria.length; i++) { //loops through all 4 selections (stored as booleans) from the user (on what character types they want in the password)
    if (userCriteria[i]) { //if the use selected that they want a character type in the password
      console.log('user Criteria is True, i is ' + i + ', allChar[i] is ' + allChar[i]) //debugging test log
      potentialChar = potentialChar.concat(allChar[i]); //concat the elements of the array at allChar[i] into the potentialChar array
      needsToContain.push(allChar[i]); 
    }
  }

  var password = ''
  var containsAllChar = true;
  var tracker = 0;
  var checker = needsToContain.length;
  var placeHolder = needsToContain;
  console.log('Starting NeedsToContain is:')
  console.log(needsToContain[0])
  console.log(needsToContain[1])
  console.log(needsToContain[2])
  console.log(needsToContain[3])
  while (containsAllChar) { // will continue to generate a random password until it contains at least one character from each type selected
    for (i = 0; i < passLength; i++) {
      password = password + potentialChar[Math.floor(Math.random()*potentialChar.length)];
    }
  
    console.log(password);
    
    
    for (var y = 0; y < password.length; y++) { //for each letter in the password
      console.log('starting the outer loop for the ' + y + ' time');
      console.log('tracker count is currently ' + tracker)
      inner: for (var x = 0; x < needsToContain.length; x++) { //checks each array element
        console.log('starting the inner loop for the ' + x + 'time')
        if (needsToContain[x].includes(password[y])) { //checks if the password character is included in any of the array elements
          tracker++; //if it is included, the tracker will increase
          needsToContain.splice(x, 1) //removes that element from needs to contain
          console.log('new needsToContain is:')
          console.log(needsToContain)
          console.log('tracker count: ' + tracker);
          console.log('breaking inner loop for the ' + y + ' time');
          break inner; //break the inner loop
        }
      }
    }
    if (tracker === checker) {//if the password has at least one element from each array of characters the user has selected
      console.log('password met critera, ending the loop'); 
      containsAllChar = false; //set to false, breaking the while loop
  }

    else {
      console.log('password did not meet criteria, restarting the loop');
      console.log('tracker count reached ' + tracker)
      password = ''
      tracker = 0; //resets the tracker to 0 for the next iteration 
      needsToContain = placeHolder;
    }
    return password;
}


}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
