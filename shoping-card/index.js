class Product{
    constructor(name,price){
        this.name = name;
        this.price = price;
    }
}

class Package{
    constructor(product,quantity){
        this.product = product;
        this.quantity = quantity;
    }
    price(){
        return this.product.price * this.quantity;
    }

    increase(){
        this.quantity += number;
    }
    decrease(){
         this.quantity--;
    }

    updateQuantity(quantity){
        this.quantity =  quantity;
    }
}

class ShopingCart {
  constructor(packages) {
    this.packages = packages || [];
  }

  removeProduct(product){
    this.packages = this.packages.filter(({product:{name}}) => product.name != name);
  }

  findPackageOf(product){
    return this.packages.find(({product:{name}}) => product.name == name);
  }

  increaseProduct(product){
    const target = this.findPackageOf(product);
    if (target) {
      target.product.increase();
    }
  }

  decreaseProduct(product){
   const target = this.findPackageOf(product);
   if (target) {
     target.product.decrease();
   }
  }

  updatePackage(product, quantity){
    quantity = Number.parseInt(quantity) || 0;
    const target = this.findPackageOf(product);
    if(quantity <= 0){
        this.removeProduct(product);
    }else if(target){
        target.updateQuantity(quantity);
    }else{
        this.packages.push(new Package(product,quantity));
    }
  }

  quantities(){
    return this.packages.reduce((count, {quantity}) => count + quantity, 0);
  }

  subTotalPrice() {
    return this.packages.reduce((total, pack) => total + pack.price(), 0);
  }

  discount(discount) {
    if (discount) {
      discount = Number.parseFloat(discount) || 0;
      return (this.subTotalPrice() * discount) / 100;
    } else {
      return 0;
    }
  }

  vat(discount) {
    return ((this.subTotalPrice() - this.discount(discount)) * 9) / 100; //VAT 9%
  }

  totalPrice(discount) {
    return this.subTotalPrice() - this.discount(discount) + this.vat(discount);
  }

}

function updateCount(cartObj){
    $('.count').text(`${cartObj.quantities()} items in the bag`);
}

function updatePrice(cartObj,discount){
    $('.subtotal span').text(`$${cartObj.subTotalPrice().toFixed(3)}`);
    $('.vat span').text(`$${cartObj.vat(discount).toFixed(3)}`);
    $('.discount > span').text(`$${cartObj.discount(discount).toFixed(3)}(${discount || "0%"})`);
    $('.total').text(`$${cartObj.totalPrice(discount).toFixed(3)}`);
}

function hideDiscount(){
    $('.discount').addClass('hide');
}

function insertBackground(cartObj){
    if(cartObj.quantities() == 0){
        console.log("hoho");
        $(".products").html(
          `<div style="display:flex; flex-direction:column; align-items:center;">
                <img src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg" class="emptyCart" alt="Empty Cart">
                <h2 style="text-align:center;">Không có gì trong rỏ hàng</h2>
            </div>`
        );
    }
}

const discountCode = {
    A : "10%",
    B : "20%",
    C : "30%",
    D : "40%",
    "LuongQuangHuy" : "90%",
}

$('body').ready(function(){
    const callbacks = $.Callbacks();
    callbacks.add(updateCount);
    callbacks.add(updatePrice);
    callbacks.add(hideDiscount);
    callbacks.add(insertBackground);
    const cart = new ShopingCart();
    const product1 = new Product("PRODUCT ITEM NUMBER 1", 5.99);
    const product2 = new Product("PRODUCT ITEM NUMBER 2", 9.99);

    cart.updatePackage(product1,$('.item1 .input').val());
    cart.updatePackage(product2, $('.item2 .input').val());
    callbacks.fire(cart);

    $('.input').on('change', event => {
        const value = Number.parseInt(event.target.value);
        if(value < 0){
            event.target.value = 0;
        }
    });

    $('.item1 .input').on('change', event => {
        cart.updatePackage(product1,event.target.value);
        callbacks.fire(cart);
    });

    $('.item2 .input').on('change', (event) => {
      cart.updatePackage(product2, event.target.value);
      callbacks.fire(cart);
    });

    $('#promo-code').on('change', event =>{
         const inputValue = event.target.value;
         if (discountCode.hasOwnProperty(inputValue)) {
           callbacks.fire(cart, discountCode[inputValue]);
           $(".discount").removeClass("hide");
         }
    });

    $('.promotion button').on('click', event => {
        const inputValue = $('#promo-code').val();
        if(discountCode.hasOwnProperty(inputValue)){
            callbacks.fire(cart,discountCode[inputValue]);
            $('.discount').removeClass('hide');
        }
    });

    $('.remove--1').on('click',event=>{
        event.target.closest('li').remove();
        cart.removeProduct(product1);
        callbacks.fire(cart);
    });

    $(".remove--2").on("click", (event) => {
      event.target.closest("li").remove();
      cart.removeProduct(product2);
      callbacks.fire(cart);
    });
});