let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
        
};

calculation ();

let generateCartItems =()=> {          
    if (basket.length !== 0){               //when its not equal to 0 \\
        return (shoppingCart.innerHTML = basket
        .map ((x)=>{
            let {id,item} = x;
            let search = shopItemsData.find((y)=> y.id === id) || []
            // let { img, name, price} = search; destructuring an object (opcional)
            return `
            <div class="cart-item">
             <img width="100" src=${search.img} alt="" />
             <div class="details">
             <div class="title-price-x"> 
                <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                </h4>
                <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
                    <div class="buttons"> <!--Para incrmentar o disminuir productos-->
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
             </div>
             
             <h3>$ ${item * search.price}</h3>

             </div>
            </div>
            `;
        })
        .join(""))          // quita las comas ("une" contenido)\\
    } 
    else {
       shoppingCart.innerHTML= `` 
       label.innerHTML = `
       <h2> Carrito esta vacio </h2>
        <a href="index.html">
            <button class="HomeBtn"> Regresar a Inicio </button>
        </a>
       `
    }
}

generateCartItems (); //invoking function\\

//! Función de incremento\\
let increment = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    let search = basket.find((x) => x.id === selectedItem.id); //! Search Function\\
    
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    else {
        search.item +=1; 
    }
    
    generateCartItems ();                            //renderiza para actualizar info\\
    update (selectedItem.id);

    
    localStorage.setItem("data", JSON.stringify(basket));
};

//! Función de decremento\\
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);  //guarda informacion en el local storage \\
    
    if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update (selectedItem.id);
  basket = basket.filter ((x)=> x.item !== 0);
  generateCartItems ();                                   //renderiza para eliminar cuando llega a 0\\

    localStorage.setItem("data", JSON.stringify(basket)); //tiene que ir al final para guardar la info \\
};

//! Función de actualización\\
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    // console.log (search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

//! Función para remove items\\
let removeItem =(id)=>{
    let selectedItem=id;
    // console.log(selectedItem.id)
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems ();
    totalAmount();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));

}

//! Función para cuenta final\\
let totalAmount = ()=>{
    if (basket.length !==0){
        let amount = basket
         .map((x)=>{
            let {item, id} = x
            let search = shopItemsData.find((y)=> y.id === id) || []

            return item * search.price;

        })
        .reduce((x,y)=> x+y,0);
    // console.log(amount);
    label.innerHTML = `
    <h2> Cuenta Total : $ ${amount}</h2>
    <button class="checkout"> Checkout </button>
    <button onclick="clearCart()" class="removeAll"> Vaciar Carrito </button>
    `
    }
    else return

    };

//! Función para clear cart\\
let clearCart = ()=> {
    basket = []
    generateCartItems();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
}

totalAmount();