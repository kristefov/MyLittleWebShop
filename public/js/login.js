const loginFormHandler = async event => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    // post to /login

    // Send the e-mail and password to the server
    // post to /login qithout fetch

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector(".loginForm")
  .addEventListener("submit", loginFormHandler);
