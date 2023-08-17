const productsTable = document.getElementById('card');

productsTable.addEventListener('click', async (e) => {
  e.preventDefault();
  const element = e.target;
  if (element.className === 'add-to-cart') {
    const cartId = productsTable.getAttribute('data-cart-id');
    const productId = element.getAttribute('data-id');

    try {
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('El producto se sumo al carrito');
      } else {
        alert('Error al agregar producto al carrito');
      }
    } catch (error) {
      console.error(error);
    }
  }
});