let shop = document.getElementById('shop');

// let shopItemsData = [{
//     id: "unique",
//     name: "Casual Shirt",
//     price: 45,
//     description: "lLorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-1.jpg",
// }, 
// {
//     id: "unique2",
//     name: "Office Shirt",
//     price: 100,
//     description: "lLorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-2.jpg",
// },
// {
//     id: "unique3",
//     name: "T-Shirt",
//     price: 25,
//     description: "lLorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-3.jpg",
// }, 
// {
//     id: "unique4",
//     name: "Mens Suit",
//     price: 300,
//     description: "lLorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-4.jpg",
// }] // \\

//! Canasta de compra\\


let basket = JSON.parse(localStorage.getItem("data")) || []
// recupera info en local storage\\

let generateShop =() => {
    return (shop.innerHTML = shopItemsData
        .map((x)=> {
        let { id,name,price,description,img} =x;
        let search = basket.find((x)=> x.id === id) || []
       return ` 
       <div id=product-id-${id} class="item">
       <img width="220" src=${ img} alt="">
       <div class="details">
           <h3>${name}</h3>
           <p>${ description}</p>
           <div class="price-quantity">
               <h2>$ ${price}</h2>
               <div class="buttons">                              <!--Para incrmentar o disminuir productos-->
                   <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                   <div id=${id} class="quantity">
                   ${search.item === undefined? 0 : search.item }
                   </div>
                   <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
               </div>
           </div>
       </div>
   </div>`  
    }) 
    .join (""));  
}    // Map function= Usa comilla especial ``\\
 

generateShop()  // invoking the function\\

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
    // console.log(basket);
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
   

    localStorage.setItem("data", JSON.stringify(basket)); //tiene que ir al final para guardar la info \\
};

//! Función de actualización\\
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    // console.log (search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

//! Función de suma carrito\\
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
        
};

calculation ();