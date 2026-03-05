document.addEventListener('DOMContentLoaded',()=>{
    const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
    { id: 4, name: "Product 4", price: 9.99 }]

    
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    const cart=JSON.parse(localStorage.getItem('cart')) || []
    renderCart()
    products.forEach(product=>{
        const productDiv=document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML=`
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `
        productList.appendChild(productDiv)
    })
    /*
        After the forEach loop runs, the HTML that gets dynamically created
        inside the #product-list div will look like this:
        <div id="product-list">
        <div class="product">
            <span>Product 1 - $29.99</span>
            <button data-id="1">Add to cart</button>
        </div>
        </div>
        Each product object from the products array generates one "product" div.
        The data-id on the button is used later to identify which product was clicked.
    */

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            addToCart(product);
    }
    });
    
    function addToCart(product){
        cart.push(product)
        saveCart()
        renderCart()
    }

    function renderCart(){
        cartItems.innerText=""
        let totalPrice=0
        if (cart.length>0){
            emptyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove('hidden')

            cart.forEach((item,index) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-btn" data-index="${index}">Remove</button>`
                cartItems.appendChild(cartItem);
            })

            totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        }
        else{
            emptyCartMessage.classList.remove('hidden')
            cartTotalMessage.classList.add('hidden')
        }
    }

    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const index = Number(e.target.dataset.index);//also can write this way: e.target.getAttribute("data-index");
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }

    });


    function saveCart(){
        localStorage.setItem('cart',JSON.stringify(cart))
    }

    checkOutBtn.addEventListener("click", () => {
        cart.length = 0;
        saveCart()
        alert("Checkout successfully");
        renderCart();
    });
})