const updateEmailHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const password = document.querySelector("#updatePassword").value.trim();

  const response = await fetch("/api/users/", {
    method: "PUT",
    body: JSON.stringify({ password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Password Updated");
    document.location.replace("/");
  } else {
    alert("Failed to update");
  }
};

document
  .querySelector(".updatePassword")
  .addEventListener("submit", updateEmailHandler);
