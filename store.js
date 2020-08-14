var storeCart = (function() {

    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('storeCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('storeCart'));
    }
    if (sessionStorage.getItem("storeCart") != null) {
        loadCart();
    }


    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                alert("Current Cart Total: R" + this.totalCart())
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);

        alert("Current Cart Total: R" + this.totalCart())
        saveCart();
    }

    // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };

    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        alert("Current Cart Total: R" + this.totalCart())
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        alert("Current Cart Total: R" + this.totalCart())
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        this.setGlobalTotal(0);
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        this.setGlobalTotal(Number(totalCart.toFixed(2)));
        return Number(totalCart.toFixed(2));
    }

    // Pass in an argument to set the total
    obj.setGlobalTotal = function(total) {
        sessionStorage.setItem('cart-total', JSON.stringify(total));
    }

    // Get the total from session storage
    obj.getGlobalTotal = function () {
        return Number(sessionStorage.getItem('cart-total'))
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    return obj;
})();



$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = $(this).attr('data-price')

    let parsedPrice = parseFloat(price);

    storeCart.addItemToCart(name, parsedPrice, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function() {
    storeCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = storeCart.listCart();
    var output = "";

    console.log(cartArray)

    for (var i in cartArray) {

        output += `
                <tr>
                    <td>${cartArray[i].name}</td>
                    <td>R ${cartArray[i].price}</td>

                    <td>
                        <div class="input-group">
                            <button class="minus-item btn btn-primary" data-name="${cartArray[i].name}"> - </button>
                            
                            <p data-name="${cartArray[i].name}" style="padding:0px 10px" >${cartArray[i].count}</p>
                            
                            <button class="plus-item btn btn-primary" data-name="${cartArray[i].name}"> + </button>
                        </div>
                    </td>

                    <td>
                        <button class="delete-item btn btn-danger" data-name="${cartArray[i].name}";" > X </button>
                    </td>

                    
                </tr>
            `
    }


    $('.show-cart').html(output);
    $('.total-cart').html(storeCart.getGlobalTotal());
    $('.total-count').html(storeCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    storeCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    storeCart.removeItemFromCart(name);
    displayCart();
})

// +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    storeCart.addItemToCart(name);
    displayCart();
})

$('.delete-item').on('click', function() {
    var name = $(this).data('name')
    storeCart.removeItemFromCartAll(name);
    displayCart();
})

// coupon code creator
let valid = {
    CODE_1: "VALID_CODE",
}

/* Coupon Code */
function generateCouponCode() {
    let userInput = document.getElementById('ccode').value;

    // console.log(userInput)
    if (userInput === valid.CODE_1) {
        alert("You entered a valid code, you got a R500 off!")

        var finalTotal = storeCart.totalCart() - 500;
        alert(`New total: ${finalTotal}`)
        
    } else {
        alert('Invalid code! Try again')
    }
}

/* Forms for delivery*/
function updateTotalForDelivery(method) {
    if (method === "delivery") {
        let updatedTotal = storeCart.totalCart() + 200;
        
        storeCart.setGlobalTotal(updatedTotal);
        alert(`Your total is now: R${updatedTotal}`)
        $('.total-cart').html(storeCart.getGlobalTotal())
    } else {
        
    }
}

function order() {

    randomNum = Math.floor((Math.random() * 5000) + 1)
    alert(`Your final total is R ${storeCart.totalCart()} and your recite number is ${randomNum} `)
}

// current cart price on click
function ccartAlert(){
    alert(`Current Cart: ${storeCart.totalCart()}`)
}

displayCart();