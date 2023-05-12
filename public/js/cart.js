const CartHandler = async event => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const userrID = '';
    const productID =  jQuery('button.addtocart').attr(data-product)
  
    if (email && password) {
      // Send the e-mail and password to the server
      // post to /login
  
      // Send the e-mail and password to the server
      // post to /login qithout fetch
  
      const response = await fetch("/cart", {
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
    .querySelector(".addtocart")
    .addEventListener("submit", CartHandler);
  