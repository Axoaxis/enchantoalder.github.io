const PlayerData = [];
var Questions = [];
var firstnum = 0;
var secondnum = 0;
var numQuestion = 0;
var registeredUsers = 0;

function Register () {
    //enabling everything from the end button
    document.getElementById("playgamebutton").disabled = false;
    document.getElementById("acceptbutton").disabled = false;
    document.getElementById("nextbutton").disabled = false;
    document.getElementById("endbutton").disabled = false;

    //gets data from the form and puts them into variables


    var FirstName = document.getElementById("fname").value;
    var LastName = document.getElementById("lname").value;
    var Dateofbirth = document.getElementById("dob").value;
    var date_age = new Date(Dateofbirth);
    var date = new Date();
    var age = parseInt( date.getFullYear() - date_age.getFullYear() );
    var Gender;
    var email = document.getElementById("email").value;

    if(document.getElementById("gender_male").checked)
    {
        Gender = document.getElementById("gender_male").value;
    }else if(document.getElementById("gender_female").checked)
    {
        Gender = document.getElementById("gender_female").value;
    }
    console.log(Gender);


    //validate form values
    if (FirstName ==="" || FirstName === null)
    {
        document.getElementById("registermessage").innerHTML = "Enter a name!";
        return false;
    }
    

    /*
    First Name, Last Name, Age, list of questions and answers, status of the answer, along with the
    percentage score, separated by commas in a new line.
    */
    //appends the data from the form into the array
    numQuestion = 0;
    registeredUsers++
    Questions = [];
    var append = {
        FName: FirstName , 
        LName: LastName, 
        DOB: Dateofbirth, 
        Age: age, 
        Gender: Gender, 
        Email: email, 
        NumberOfQuestions: numQuestion, 
        Results: [],
        Percentage : 0
    }
    PlayerData[registeredUsers-1] = (append);
    // PlayersData.push(FirstName);
    // PlayersData.push(LastName);
    // PlayersData.push(Dateofbirth);
    // PlayersData.push(age);
    // PlayersData.push(Gender);
    // PlayersData.push(email);

    // document.write(PlayersData);
}

function checkAnswer() {
    var playerAnswer = parseInt(document.getElementById("answer").value);
    var answer = firstnum * secondnum;
    Questions[numQuestion] = ("Question" + (numQuestion+1) + ": " + firstnum + " * " + secondnum + " = " + playerAnswer + "\n");
    var results;
    numQuestion++

    if(answer === playerAnswer)
    {
        document.getElementById("isCorrect").innerHTML = "Correct!" + " the answer is " + answer;
        results = "Correct";
    }
    else
    {
        document.getElementById("isCorrect").innerHTML = "Incorrect!" + " the answer is: " + answer;
        results = "Incorrect";
    }
    document.getElementById("answer").value = "";

    PlayerData[registeredUsers-1].NumberOfQuestions++;
    PlayerData[registeredUsers-1].Results.push("Question" + (numQuestion) + ": " + results + "\n");

    showAll();
}

function playGame() {
    document.getElementById("answer").disabled = false;

    firstNumber = document.getElementById('firstNumber');
    secondNumber = document.getElementById('secondNumber');

    let min_first = 1, max_first = 9;
    firstnum = Math.floor(Math.random() * (max_first - min_first + 1)) + min_first;
    firstNumber.value = firstnum;

    let min_second = 1, max_second = 5;
    secondnum = Math.floor(Math.random() * (max_second - min_second + 1)) + min_second;
    secondNumber.value = secondnum;

    document.getElementById("isCorrect").innerHTML = "";
}

function findPercentageScore() {
    document.getElementById("showpercentage").value = "";
    //
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("gender_male").checked = false;
    document.getElementById("gender_female").checked = false;
    document.getElementById("email").value = "";
    document.getElementById("firstNumber").value = "";
    document.getElementById("secondNumber").value = "";
    document.getElementById("answer").value = "";
    
    /*
    ask 1 and enabled inputs, all buttons must be
    disabled except the Register button. Play and Results area are disabled.
    */

    //disabling buttons
    document.getElementById("playgamebutton").setAttribute("disabled",true);
    document.getElementById("acceptbutton").setAttribute("disabled",true);
    document.getElementById("nextbutton").setAttribute("disabled",true);
    document.getElementById("endbutton").setAttribute("disabled",true);
    //disbling play and results area
    document.getElementById("firstNumber").setAttribute("disabled",true);
    document.getElementById("secondNumber").setAttribute("disabled",true);
    document.getElementById("answer").setAttribute("disabled",true);


    /*
    that will calculate and display total number
    of questions, the number of correct answers, the percentage score, and the player’s name, current date,
    in the ‘showpercentage’ textarea. You must always clear “showpercentage’” textarea before
    displaying all data in it.
    */

    var correct = 0;
    var data = PlayerData[registeredUsers-1].Results;
    for (var i=0; i<data.length; i++)
    {
         if (PlayerData[registeredUsers-1].Results[i].includes("Correct"))
         {
            correct++
         }
    }
    
    document.getElementById("showpercentage").value = "Name: " + PlayerData[registeredUsers-1].FName + "\n" + "Date: " + new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear() + "\n" + "Total Number Of Questions: " + PlayerData[registeredUsers-1].NumberOfQuestions + "\n" + "Number of Correct Answers: " + correct + "\n" + "Percentage Score: " + (correct / PlayerData[registeredUsers-1].NumberOfQuestions) * 100 + "%";

}

function showAll() {
    document.getElementById("showallplayers").value = "";

    /*
    First Name, Last Name, Age, list of questions and answers, status of the answer, along with the
    percentage score, separated by commas in a new line. Show all must always clear “showallplayers”
    textarea before displaying all data in it.
    */
    
    var correct = 0;
    var data = PlayerData[registeredUsers-1].Results;
    for (var i=0; i<data.length; i++)
    {
         if (PlayerData[registeredUsers-1].Results[i].includes("Correct"))
         {
            correct++
         }
    }
    PlayerData[registeredUsers-1].Percentage = (correct / PlayerData[registeredUsers-1].NumberOfQuestions) * 100;

    var eachques = "";
    var eachstatus = "";
    console.log("Questions" + Questions.length);

    var message = "";
    console.log("player " + PlayerData.length);
    for(var i = 0; i < PlayerData.length ; i++)
    {
        console.log(i);
        var firstname = PlayerData[i].FName;
        var lastname = PlayerData[i].LName;
        var age = PlayerData[i].Age;
        eachques = Questions;
        eachstatus = PlayerData[i].Results;
        //message.concat("First Name: " + firstname + "\nLast Name: " + lastname + "\nAge: " + age + eachques + "\n" + eachstatus + "\nPercentage Score: " + percentage);

        document.getElementById("showallplayers").value += "\nFirst Name: " + firstname + "\nLast Name: " + lastname + "\nAge: " + age + "\n" + eachques + "\n" + eachstatus + "\nPercentage Score: " + PlayerData[i].Percentage + "%" + "\n";
    }


}

const interval = setInterval(function showfreq() {
    //females to males
    var female = 0;
    var percentage;
    for(i in PlayerData)
    {
        if (PlayerData[i].Gender === "Female")
        {
            female++
        }
    }
    percentage = (female / PlayerData.length) * 100;

    document.getElementById("barpic").setAttribute("width",percentage);
    console.log("Called" + percentage);

    // (<50, 50 to 59, 60 to 69, 70 to 79, 80 to 89, 90 to 99, and 100
    var lessfifty = 0;
    var fiftynine = 0;
    var sixtynine = 0;
    var seventynine = 0;
    var eightynine = 0;
    var ninetynine = 0;
    var hundred = 0;
    var percentage;
    document.getElementById("lessfifty").setAttribute("width" , 0);
    document.getElementById("fiftynine").setAttribute("width" , 0);
    document.getElementById("sixtynine").setAttribute("width" , 0);
    document.getElementById("seventynine").setAttribute("width" , 0);
    document.getElementById("eightytynine").setAttribute("width" , 0);
    document.getElementById("ningtynine").setAttribute("width" , 0);
    document.getElementById("hundred").setAttribute("width" , 0);
    for(i in PlayerData)
    {
        if (PlayerData[i].Percentage < 50)
        {
            lessfifty++
            percentage = (lessfifty / PlayerData.length) * 100;
            document.getElementById("lessfifty").setAttribute("width" , percentage);
        }
        else if(PlayerData[i].Percentage <= 59)
        {
            fiftynine++
            percentage = (fiftynine / PlayerData.length) * 100;
            document.getElementById("fiftynine").setAttribute("width" , percentage);
        }
        else if(PlayerData[i].Percentage <= 69)
        {
            sixtynine++
            percentage = (sixtynine / PlayerData.length) * 100;
            document.getElementById("sixtynine").setAttribute("width" , percentage);
        }
        else if(PlayerData[i].Percentage <= 79)
        {
            seventynine++
            percentage = (seventynine / PlayerData.length) * 100;
            document.getElementById("seventynine").setAttribute("width" , percentage);
        }
        else if(PlayerData[i].Percentage <= 89)
        {
            eightynine++
            percentage = (eightynine / PlayerData.length) * 100;
            document.getElementById("eightytynine").setAttribute("width" , percentage);
        }
        else if(PlayerData[i].Percentage <= 99)
        {
            ninetynine++
            percentage = (ninetynine / PlayerData.length) * 100;
            document.getElementById("ningtynine").setAttribute("width" , percentage);
        }
        else if(PlayerData[i].Percentage === 100)
        {
            hundred++
            percentage = (hundred / PlayerData.length) * 100;
            document.getElementById("hundred").setAttribute("width" , percentage);
        }

    }

}, 5);