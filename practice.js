let cart = [];

async function fetchProducts(){
    try{
        const response = await fetch('https://fakestoreapi.com/products?limit=10');
        const products = await response.json();
        renderProducts(products);
    }catch(error){
        console.error('error fetching data', error)
    };
};

function renderProducts(products){
    const productsList = document.getElementById('product-list');
    products.forEach(product =>{
        const productDiv = document.createElement('div');
        productDiv.className = `p-4 border border-blue-500 rounded-xl hover:shadow transition duration-200`;
        productDiv.innerHTML = `
        <h1 class = "text-lg font-medium">${product.title}</h1>
        <p class = "mt-3 text-gray-600">$${product.price.toFixed(2)}</p>
        
        <button class ="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition duration-200 text-white"
        onclick = "addToCart(${product.id}, '${escapeQuotes(product.title)}', ${product.price})">
            Add to cart
        </button>`;

        productsList.appendChild(productDiv);

    });
};

function escapeQuotes(str){
    return str.replace(/'/g,"\\'");
};


function addToCart(id, title, price){
    const existingItem = cart.find(item=> item.id === id);
    if(existingItem){
        existingItem.quantity +=1;
    }else{
        cart.push({id, title, price, quantity : 1})
    }

    updateCartUI()
};


function removeFromCart(id){
    cart = cart.filter(item=> item.id !==id);
    updateCartUI();
};


function updateCartUI(){
    const cartItemList = document.getElementById('cart-items');
    cartItemList.innerHTML = ``
    cart.forEach(item =>{
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = `p-4 border border-gray-200 rounded flex justify-between items-center`;
        cartItemDiv.innerHTML = ` <div>
            <span class="font-medium">${item.title}</span>
            <span class="text-sm text-gray-500">(x${item.quantity})</span>
            <div class="text-gray-700 mt-1">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
          <button class = "text-white bg-green-500 hover:bg-green-600 transition duration-150 px-4 py-2 mt-2 rounded-xl"
          onclick = "removeFromCart(${item.id})">
          Remove
          </button>`;

          cartItemList.appendChild(cartItemDiv);



    });

    updateTotal()
};


function updateTotal(){
    const total = cart.reduce((sum, item)=> sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
    
};

fetchProducts();