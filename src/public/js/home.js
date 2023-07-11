
// const addForm = document.getElementById("addForm");

// addForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const title = addForm.elements.title.value;
//   const description = addForm.elements.description.value;
//   const price = addForm.elements.price.value;
//   const code = addForm.elements.code.value;
//   const stock = addForm.elements.stock.value;
//   const category = addForm.elements.category.value;

//   socket.emit('newProduct', {
//     title,
//     description,
//     price,
//     code,
//     stock,
//     category
//   });
// });

// socket.on('updateProducts', (data) => {
//   const tbody = document.getElementById("productsNow");

//   const productsMap = data
//     .map((item) => {
//       return `<tr>
//       <th scope="row">${item._id}</th>
//       <td>${item.title}</td>
//       <td>${item.description}</td>
//       <td>${item.price}</td>
//       <td>${item.code}</td>
//       <td>${item.stock}</td>
//       <td>${item.category}</td>
//       <td>${item.status}</td>
//       </tr>`;
//     })
//     .join("");
//   tbody.innerHTML = productsMap;
// });

// const deleteForm = document.getElementById("deleteForm");

// deleteForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const _id = deleteForm.elements._id.value;

//   socket.emit('deleteProduct', _id);
// });

// Handlebars.registerHelper('mayor', function(value, options) {
//   if (value > 0) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// });

// Obtener todos los botones "Add to Cart"
const addToCartButtons = document.querySelectorAll('button[data-product-id]');
// Obtener el elemento que contiene el valor del cartId
const cartIdElement = document.getElementById('cartId');
// Obtener el valor de cartId
const cartId = cartIdElement.innerText;

// Agregar un controlador de eventos a cada botón
addToCartButtons.forEach(button => {
  button.addEventListener('click', async () => {
    // Obtener el ID del producto desde el atributo "data-product-id"
    const productId = button.getAttribute('data-product-id');

    try {
      // Enviar una solicitud POST al servidor para agregar el producto al carrito
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: 1
        })
      });

      // Manejar la respuesta del servidor
      const data = await response.json();
      if (response.ok) {
        // El producto se agregó exitosamente al carrito
        console.log('Product added to cart');
      } else {
        // Ocurrió un error al agregar el producto al carrito
        console.log('Error adding product to cart:', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
});

const buyButton = document.getElementById("buyButton");

buyButton.addEventListener('click', e =>{
    e.preventDefault();

    try {
      // Enviar una solicitud POST al servidor para finalizar la compra
      fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result=>{
        if(result.status == 200){
          window.location.replace(`/carts/${cartId}`);
        }
      });
    } catch (error) {
      console.log('Error:', error);
    }
});

const socket = io();
const userElement = document.getElementById('userEmail');
const userMail = userElement.innerText;

const chatbox = document.getElementById('chatbox');

socket.emit('authenticated', userMail);

chatbox.addEventListener('keyup', evt =>{
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit('message', {userMail:userMail, message:chatbox.value.trim()})
            chatbox.value = "";
        }
    }
})

socket.on('messageLogs', data =>{
    if(!userMail) return;

    let log = document.getElementById('messageLogs');
    let messages = "";

    data.forEach(message => {
        messages +=  `${ message.userMail } dice: ${ message.message } <br/>  `       
    });
    log.innerHTML = messages

})

socket.on('newUserConnected', data =>{
    if(!userMail) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    })
})


