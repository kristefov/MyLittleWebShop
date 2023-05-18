const cartDeleteHandler = async function(event) {
    event.preventDefault();

    const productID = parseInt(this.dataset.product);
console.log(productID);
  if (productID) {
    // Send the e-mail and password to the server
    // post to /login

    // Send the e-mail and password to the server
    // post to /login qithout fetch

    const response = await fetch("/api/cart/products", {
      method: "DELETE",
      body: JSON.stringify([productID]),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      console.log("Added to cart");

      document.location.replace("/cart");
    } else {
      alert("Failed to delete from cart");
    }
  }
};

document.querySelectorAll(".clearCartBtn").forEach( (button) => {
    console.log(button);
  button.addEventListener("click", cartDeleteHandler);
  })