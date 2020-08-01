$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login"); //get login form
  var emailInput = $("input#email-input"); // get email input
  var passwordInput = $("input#password-input"); // get password input

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = { //user data is the email input and password input
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // if not the userdatas email or password return nothing
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    // call login user function with users email and password
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  //function that takes in an email and password and posts to the route and if correct reddirects to /members
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
