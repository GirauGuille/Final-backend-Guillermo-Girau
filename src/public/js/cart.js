const cartTable = document.getElementById('table');

cartTable?.addEventListener('click', async (e) => {
  e.preventDefault();
  const cartId = cartTable.getAttribute('data-cart-id');
  const element = e.target;
  const productId = element.getAttribute('data-product-id');
  if (element.className === 'delete') {
    try {
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {method: 'DELETE',
      });
      if (response.ok) {document.location.reload();
      } else {alert('Error al eliminar producto del carrito');}
    } catch (error) {
      console.error(error);
    }
  } else if (element.className === 'increase') {
    try {
      const quantity = parseInt(element.getAttribute('data-quantity'));
      const stock = parseInt(element.getAttribute('data-stock'));
      if (quantity + 1 > stock) {alert('No hay stock');
        return;
      }
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: quantity + 1 }),
      });
      if (response.ok) {document.location.reload();
      } else {
        alert('Error al incrementar la cantidad');
      }
    } catch (error) {console.error(error);
    }
  } else if (element.className === 'decrease') {
    try {
      const quantity = parseInt(element.getAttribute('data-quantity'));
      if (quantity - 1 <= 0) {
        return;
      }
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: quantity - 1 }),
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Error al disminuir la cantidad');
      }
    } catch (error) { console.error(error);
    }
  } else if (element.className === 'compra') {
    try {
      const response = await fetch(`/api/carts/${cartId}/compra`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('¡su compra se pudo completar');
        document.location.reload();
      } else {
        alert('Error al completar la compra');
      }
    } catch (error) {console.error(error);
    }
  }
});