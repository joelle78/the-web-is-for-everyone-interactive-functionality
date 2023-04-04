/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DIALOG
var myButton = document.getElementById('saveButton');
myButton.addEventListener('click', showDialog);

function showDialog() {
    // create the dialog screen element
    var dialogScreen = document.createElement('div');
    dialogScreen.setAttribute('class', 'dialog-screen');

    // add content to the dialog screen
    var dialogContent = document.createElement('div');
    dialogContent.setAttribute('class', 'dialog-content');
    dialogContent.innerHTML = 'Stekje succesvol geupload, je keert nu terug naar de homepage.';

    // add the content to the dialog screen
    dialogScreen.appendChild(dialogContent);

    // add the dialog screen to the body
    document.body.appendChild(dialogScreen);
}
