const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  fetch('../js/data.json')
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// Modal dialog id
const showProductDetails = document.getElementById("show-product-details");
// API fetch for Product Details
const loadProductDetails = async (id) =>{
  showProductDetails.textContent = "";
  const productDetailsApi = `https://fakestoreapi.com/products/${id}`;
      try {
        const Response = await fetch(productDetailsApi);
        const data = await Response.json();
        productDetailsData(data);
        
    } catch (error) {
        console.log(error)
    }
}

// show all product in UI 
const showProducts = (products) => {
  for (const product of products) {

    const image = product.image;
    const rate = Math.ceil(product.rating.rate);
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
      <img class="product-image img-fluid" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      
      <span class="fa fa-star ${rate > 1 ? 'checked' : ''}"></span>
      <span class="fa fa-star ${rate > 2 ? 'checked' : ''}"></span>
      <span class="fa fa-star ${rate > 3 ? 'checked' : ''}"></span>
      <span class="fa fa-star ${rate > 4 ? 'checked' : ''}"></span>
      <span class="fa fa-star ${rate > 5 ? 'checked' : ''}"></span>

      <span style="color: #690;">( Rating: ${product.rating.rate} )</span>
      <p><i class="fa fa-users" aria-hidden="true"></i>: ${product.rating.count}</p>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now">Add to cart</button>
      <button onclick="loadProductDetails(${product.id})" id="details-btn" class="product-details" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Display product details in modal
const productDetailsData = details =>{
  const div = document.createElement("div");
  const rate = Math.ceil(details.rating.rate);
  div.innerHTML = `
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${details.title}</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
          <div class="card mb-3" style="border: none;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${details.image}" class="img-fluid rounded-start" alt="${details.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <div class="bd-callout bd-callout-warning"> 
                  <h5 class="card-title">Price: $ ${details.price}</h5>
                  
                  <span class="fa fa-star ${rate > 1 ? 'checked' : ''}"></span>
                  <span class="fa fa-star ${rate > 2 ? 'checked' : ''}"></span>
                  <span class="fa fa-star ${rate > 3 ? 'checked' : ''}"></span>
                  <span class="fa fa-star ${rate > 4 ? 'checked' : ''}"></span>
                  <span class="fa fa-star ${rate > 5 ? 'checked' : ''}"></span>
            
                  <span> (Rating: <span style="color: #ffc107;">${details.rating.rate} </span>)</span>, 
                  <span style="color: #690;"><i class="fa fa-users" aria-hidden="true"></i>: ${details.rating.count}</span>
                  </div>
                  <p class="card-text">${details.description}</p>
                  <p class="card-text"><small class="text-muted">Category: ${details.category}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" onclick="addToCart(${details.id},${details.price})" class="btn btn-primary">
        Add To Cart
        </button>
      </div>
    </div>
  `;
  showProductDetails.appendChild(div);
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};


loadProducts();