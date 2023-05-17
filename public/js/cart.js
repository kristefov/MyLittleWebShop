const CartHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const productID = jQuery(".addtocart").attr(data - product);

  if (productID) {
    // Send the e-mail and password to the server
    // post to /login

    // Send the e-mail and password to the server
    // post to /login qithout fetch

    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productID }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      console.log("Added to cart");

      document.location.replace("/cart");
    } else {
      alert("Failed to add to cart");
    }
  }
};

document.querySelector(".addtocart").addEventListener("submit", CartHandler);
