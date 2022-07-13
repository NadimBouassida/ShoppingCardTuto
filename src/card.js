let label = document.getElementById('label');
let shoppingCard = document.getElementById("shopping-card");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((item )=> item.item)
    .reduce((prevItem,currentItem) => prevItem + currentItem, 0);
}

calculation()

let generateCardItem = () => {
    if(basket.length !== 0){
        return (shoppingCard.innerHTML = basket.map((item)=>{
            let search = shopItemsData
            .find((searchItem) => searchItem.id === item.id ) || [];
            return `
            <div class="cart-item">
            <img src=${search.img} width = "100" alt="img" />
            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${item.id})" class="bi bi-x-lg"></i>
                </div>
                <div class="buttons">
                        <i onclick = "decrement(${item.id})"  class="bi bi-dash-lg"></i>
                        <div id=${item.id} class="quantity">${item.item}</div>
                        <i onclick = "increment(${item.id})" class="bi bi-plus-lg"></i>
                </div>

                <h3>$ ${search.price * item.item}</h3>
            </div>
            </div>
            `
        }).join(""));
    }
    else{
       shoppingCard.innerHTML =  ``;
       label.innerHTML = `
       <h2>Card is Empty</h2>
       <a href="index.html">
        <button class="HomeBtn">Back to home</button>
       </a>
       `;
    }
}

generateCardItem();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    generateCardItem();
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((item) => item.item !==0);
    generateCardItem();
    localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((item) => item.id === id );
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (item) => {
    let selectedItem = item;
    basket = basket.filter((item)=>item.id !== selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    generateCardItem();
    calculation();
    totalAmount();
}

let totalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((item)=>{
            let search = shopItemsData.find((shopItem) => shopItem.id === item.id) || [];
                        return item.item * search.price;
        }).reduce((prevItemToatalPrice,currentItemTotalPrice)=> prevItemToatalPrice + currentItemTotalPrice);
        label.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button class="removeAll" onclick="clearCard()">Clear Card</button>
        `
    }else return;
}


let clearCard = () => {
    basket = [];
    generateCardItem();
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}

totalAmount();
