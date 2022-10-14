// Assignment code here
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//Alphabet, Numbers, and Special Characters
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowercase = uppercase.map(letter => letter.toLowerCase());
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", "|", ";", ":", "'", ",", ".", "<", ">", "/", "?", "~", "`"];
var allChar = [lowercase, uppercase, numbers, special];

var loopCount = 0;

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function areEqual(array1, array2) { //got this function from https://bobbyhadz.com/blog/javascript-check-if-two-arrays-have-same-elements#:~:text=To%20check%20if%20two%20arrays%20have%20the%20same%20elements%3A&text=Use%20the%20every()%20to,met%20for%20all%20array%20elements.
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }

      return false;
    });
  }

  return false;
}

function areEqualTwo(array1, array2) { //trying to make this one myself
  returnValue = true;
  for (i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      returnValue = false;
    }
  }

  return returnValue;
}

function generatePassword() {
  var passCriteria = ["lowercase letters", "uppercase letters", "numbers", "special characters"];
  var userCriteria = [];
  var passLength = 0;
  var needsToContain = [false, false, false, false]; //will keep track of which array of characters the final password will need to contain
  var categoryNum = 0;
  while (passLength < 8 || passLength > 128 || isNaN(passLength)) { //will keep looping until passLength is a number between 8 and 128
    passLength = window.prompt('How long would you like your password to be? can be between 8 - 128 characters'); // prompts the user to enter the lenght, and assigns passLength to the input
    if (isNaN(passLength) || passLength < 8 || passLength > 128) { //if the input is not a number, less than 8, or greater than 128, 
      window.alert('You need to enter a number between 8 and 128'); //will alert the user on what they need to enter before restarting the loop
    }
  }
  
  function determineCritera() {
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

  var potentialChar = []
  //var remainingChar = passLength; //sets remaining characters to the password length
  for (i = 0; i < userCriteria.length; i++) { //loops through all 4 selections (stored as booleans) from the user (on what character types they want in the password)
    if (userCriteria[i]) { //if the use selected that they want a character type in the password
      //categoryNum++; //keeps track of how many categories 
      potentialChar = potentialChar.concat(allChar[i]); //concat the elements of the array at allChar[i] into the potentialChar array
    }
  }
  
  // var categoryCounts = [];
  // var remainingPassLetters = passLength; //keeps track of how many characters we can add to the password
  // var remainingCategoryCount = categoryNum; //keeps track of how many categories are left to select from
  // var instanceCeiling = 0 //keeps track of maximum number of letters that can be added in each loop
  // for (i = 0; i < categoryNum; i++) { //goes through the number of categories selected, between 1 - 4 times
  //   if (remainingCategoryCount === 1) { //if we reach the final category, makes sure to use up the all remaining password letters
  //     categoryCounts.push(remainingPassLetters);
  //   }
  //   else {
  //   instanceCeiling = remainingPassLetters - remainingCategoryCount; //creates an instance ceiling, the maximum amount of letters from a category that can be selected each loop through
  //   categoryCounts.push(Math.floor(Math.random()* instanceCeiling));
  //   }

  //   //lets say i need 10 characters, i take 
  //   //i need a number between 1 and passwordLength - catPlaceholder
  //   //10 split between 4 categories
  //   //first would be between 1-7
  //   //if i took 7 characters, the next would be between 1 and 1
  //   //if i took 6, the next would be between 1 and 2, the rest would be between 1 and 1
  //   //
  // }



  var password = ''
  var containsAllChar = true;
  var whileLoopCount = 0;
  while (containsAllChar) { // will continue to generate a random password until it contains at least one character from each type selected
    console.log('While Loop Count: ' + whileLoopCount)
    for (i = 0; i < passLength; i++) {
      password = password + potentialChar[Math.floor(Math.random() * potentialChar.length)];
    }

    console.log(password);


    allChar[2] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (i = 0; i < password.length; i++) {
      if (allChar[0].includes(password[i])) {
        needsToContain[0] = true
        console.log(i + ': Password contains lowercase')
      } else if (allChar[1].includes(password[i])) {
        needsToContain[1] = true
        console.log(i + ': Password contains uppercase')
      } else if (allChar[2].includes(password[i])) {
        needsToContain[2] = true
        console.log(i + ': Password contains number')
      } else if (allChar[3].includes(password[i])) {
        needsToContain[3] = true
        console.log(i + ': Password contains special char')
      }
    }



    if (areEqual(needsToContain,userCriteria)) {//if the password has at least one element from each array of characters the user has selected
      console.log('password met critera, ending the loop');
      containsAllChar = false; //set to false, breaking the while loop
      console.log('Logging needsToContain')
      console.log(needsToContain)
      console.log('Logging userCritera:')
      console.log(userCriteria)
    }

    else {
      console.log('password did not meet criteria, restarting the loop');
      console.log('Logging needsToContain')
      console.log(needsToContain)
      console.log('Logging userCritera:')
      console.log(userCriteria)
      loopCount++;
      password = ''
      needsToContain = [false, false, false, false];
      if (loopCount >= 20) {
        console.log('Loop Count Reached 20, ending loop')
        containsAllChar = false;
      }
    }
    whileLoopCount++;

  }
  return password;
}

//Number of categories

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
