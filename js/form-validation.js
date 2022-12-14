const display = (error) => {
  error.style.display = "block";
};

const validation = () => {
  const userName = document.getElementById("username").value,
    email = document.getElementById("email").value,
    password = document.getElementById("password").value,
    rePassword = document.getElementById("re-password").value,
    emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    userNamePattern = /^[a-zA-Z](?!.*?[^\na-z0-9]).*?[a-zA-Z]$/,
    passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    userNameError = document.getElementById("username-error"),
    emailError = document.getElementById("email-error"),
    passwordError = document.getElementById("password-error"),
    rePasswordError = document.getElementById("re-password-error");

  let valid = true;

  const storedEmail = document.getElementById("stored-email");

  if (
    userName.length < 5 ||
    userName.length > 15 ||
    userNamePattern.test(userName) === false
  ) {
    display(userNameError);
    return (valid = false);
  } else if (emailPattern.test(email) === false) {
    display(emailError);
    return (valid = false);
  } else if (passwordPattern.test(password) === false) {
    display(passwordError);
    return (valid = false);
  } else if (rePassword !== password) {
    display(rePasswordError);
    return (valid = false);
  } else {
    localStorage.setItem("email", email);

    fetch(`https://goldblv.com/api/hiring/tasks/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        email: email,
        password: password,
        password_confirmation: rePassword,
      }),
    })
      .then(() => {
        return (valid = true);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        return (valid = false);
      });
  }
};

/*************************************************************************/
