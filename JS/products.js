// --- Category Products --- 

// get Products
const getProducts = async () => {
    try {
        const results = await fetch("data/products.json");
        const data = await results.json();
        // console.log(data.products);
        const products = data.products;
        return products;
    } catch (err) {
        console.log(err)
    }
};

// Load Products 
window.addEventListener("DOMContentLoaded", async () => {
    const products = await getProducts();
    console.log(products);
    displayProductItems(products)
});

const categoryCenter = document.querySelector(".category_center");


// Display Products 
const displayProductItems = items => {
    let displayProduct = items.map(product =>
        `<div class="product category_product">
        <div class="product_header">
            <img src="${product.image}" alt="iphone-6" />
        </div>
        <div class="product_footer">
            <h3>${product.title}</h3>
            <div class="rating">
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
            </div>
            <div class="product_price">
                <h4>${product.price}</h4>
                <a href="#">
                    <button type="button" class="product_btn">
                        Add to Cart
                    </button>
                </a>
            </div>
            <ul>
                <a href="#">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-eye"></use>
                    </svg>
                </a>
                <a href="#">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
                    </svg>
                </a>
                <a href="#">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-loop2"></use>
                    </svg>
                </a>
            </ul>
        </div>
    </div>`
    );

    displayProduct = displayProduct.join('');

    if (categoryCenter) {
        categoryCenter.innerHTML = displayProduct;
    };
};

// Filtering Products 
const filterBtn = document.querySelectorAll(".filter_btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
    categoryContainer.addEventListener("click", async e => {
        const target = e.target.closest(".section_title");
        // console.log(target);
        if (!target) return;

        const id = target.dataset.id;
        // console.log(id);
        const products = await getProducts();

        if (id) {
            // remove active from button 
            Array.from(filterBtn).forEach(btn => {
                btn.classList.remove("active");
            });
            target.classList.add("active");

            //    Load Products 
            let menuCategory = products.filter(product => {
                if (product.category === id) {
                    return product;
                }
            });
            if (id === "All Products") {
                displayProductItems(products);
            }
            else {
                displayProductItems(menuCategory);
            }
        }
    });
}
