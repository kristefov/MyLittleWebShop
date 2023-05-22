const regHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const first_name = document.querySelector("#first_name").value.trim();
  const last_name = document.querySelector("#last_name").value.trim();
  if (email && password) {
    // Send the e-mail and password to the server
    // post to /login

    // Send the first name, last name, e-mail and password to the server
    // post to /register  fetch

    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};
if(window.location.pathname == '/signup') {
document.querySelector("#signupForm").addEventListener("submit", regHandler);
}