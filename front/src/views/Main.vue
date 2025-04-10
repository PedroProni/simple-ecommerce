<script setup lang="ts">
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";

interface Product {
    name: string;
    images: { url: string }[];
    prices: { price: number }[];
}

interface Category {
    name: string;
    category_code: string;
    status: string;
}

onMounted(() => {
    axios.get("http://localhost:3000/products?limit=12").then((response) => {
        products.value = response.data;
        products_filtered.value = response.data;
    }).catch((error) => {
        console.error("Error fetching products:", error);
    });

    axios.get("http://localhost:3000/categories").then((response) => {
        categories.value = response.data;
    }).then(() => {
        console.log(categories.value);
    }).catch((error) => {
        console.error("Error fetching categories:", error);
    });
})

const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);
const products_filtered = ref<Product[]>([]);
const current_page = ref(1);


const filterCategory = (category_code: string) => {
  console.log(category_code);
  if (category_code === "") {
    current_page.value = 1;
  } else {
    current_page.value = 3;
  }
  axios.get(`http://localhost:3000/products?main_category=${category_code}&limit=12`).then((response) => {
    products_filtered.value = response.data;
  }).then(() => {
    console.log(products_filtered.value);
  }).catch((error) => {
    console.error("Error fetching products by category:", error);
  });
}

const getMoreProducts = () => {
  current_page.value += 1;
  const url = `http://localhost:3000/products?page=${current_page.value}&limit=12`;

  axios.get(url).then((response) => {
    console.log(response.data);
    products_filtered.value.push(...response.data);
  }).catch((error) => {
    console.error("Error fetching more products:", error);
  });
}

const nextProduct = () => {
  const container = document.querySelector(".new-products") as HTMLElement;
  container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
}

const previousProduct = () => {
  const container = document.querySelector(".new-products") as HTMLElement;
  container.scrollBy({ left: -container.offsetWidth, behavior: "smooth" });
}
</script>

<template>
    <div class="main">
        <div class="banner">
            <div class="banner-text">
                <h2 class="season-title">Spring / Summer Season</h2>
                <div class="banner-discounts">
                    <h4 class="discount-prefix">up<br>to</h4>
                    <h4 class="discount-value">50% off</h4>
                </div>
                <div class="banner-button">
                    <button>SHOP NOW</button>
                </div>
            </div>
            <div class="banner-image">
                <img src="../assets/images/mouse.png" alt="Banner" class="animated-image"/>
            </div>
        </div>
        <div class="container-light">
            <div class="content-container">
                <div class="categories">
                    <label class="title-category" for="categories">SHOP BY:</label>
                    <div class="category">
                        <input type="radio" id="all" name="categories" @click="filterCategory('')" checked/>
                        <label for="all">All</label>
                    </div>
                    <div v-for="category in categories" :key="category.name" class="category">
                        <input type="radio" :id="`category-${category.category_code}`" name="categories" @click="filterCategory(category.category_code)"/>
                        <label :for="`category-${category.category_code}`">{{ category.name }}</label>
                    </div>
                </div>
                <div class="products">
                    <div v-for="product in products_filtered" :key="product.name" class="product">
                        <img :src="product.images[0].url" :alt="product.name"/>
                        <button class="overview">OVERVIEW</button>
                        <a>{{ product.name }}</a>
                        <p> {{ product.prices[0]?.price ? `$ ${product.prices[0]?.price.toFixed(2)}` : 'No prices available'  }}</p>
                    </div>
                    <div class="button-div">
                        <button v-if="current_page !== 3" @click="getMoreProducts()" class="load-button">LOAD MORE</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="second-banner">
            <div class="second-banner-text">
                <h2 class="second-banner-title">ULTRA<br>BOOST</h2>
                <button class="second-banner-button" >SHOP NOW</button>
            </div>
            <div class="second-banner-image-div">
                <img src="../assets/images/headset.png" alt="headset" class="second-banner-image" />
            </div>
        </div>
        <div class="small-container-light">
            <div class="title-new-products">
                <h2>NEW PRODUCTS</h2>
            </div>
            <div class="new-products-container">
                <button @click="previousProduct()" class="previous-button"><</button>
                <div class="new-products">
                    <div v-for="product in products_filtered" :key="product.name" class="product">
                        <img :src="product.images[0].url" :alt="product.name"/>
                        <button class="overview">OVERVIEW</button>
                        <a>{{ product.name }}</a>
                        <p> {{ product.prices[0]?.price ? `$ ${product.prices[0]?.price.toFixed(2)}` : 'No prices available'  }}</p>
                    </div>
                </div>
                <button @click="nextProduct()" class="next-button">></button>
            </div>
        </div>
        <div class="third-banner">
            <div class="third-banner-text">
                <h2 class="third-banner-title">EXPLORE OUR PRODUCTS</h2>
                <button class="third-banner-button" >SHOP NOW</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    animation: fadeIn 0.3s ease-in-out;
}

.banner {
    background-image: linear-gradient(rgba(03, 03, 03, 0.8), rgba(03, 03, 03, 0.8)), url("../assets/images/banner.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    background-color: rgb(56, 53, 53);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    z-index: 1;
    overflow: hidden;
    transition: all 300ms ease-in-out;
}

.banner-text {
    position: absolute;
    left: 11%;
    top: 50%;
    transform: translateY(-50%);
    color: white;
}

.season-title {
    font-size: 6rem;
    font-weight: lighter;
    line-height: 1;
}

.banner-discounts {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.discount-prefix {
    font-size: 5rem;
    line-height: 1;
}

.discount-value {
    font-size: 12rem;
    line-height: 1;
}

.banner-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.banner-button button {
    background-color: white;
    color: black;
    font-size: 2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 300ms ease-in-out;
}

.banner-button button:hover {
    background-color: black;
    color: white;
}

.banner-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 0;
    transform: scale(1.5);
}

.banner-image img {
    transition: all 300ms ease-in-out;
}

.container-light {
    background-color: rgb(230, 230, 230);
    min-height: 100vh;
    width: 100%;
}

.content-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 2rem;
    gap: 5rem;
    width: 100%;
}

.categories {
  width: 19rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: flex-start;
  padding-top: 4rem;
  height: 100%;
}

.category {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.title-category {
    font-size: 2rem;
    font-weight: 800;
    color: black;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
}

.category input[type="radio"] {
    width: 1.5rem;
    height: 1.5rem;
    appearance: none;
    -webkit-appearance: none;
    background-color: white;
    border: 0.1rem solid rgb(207, 206, 206);
    border-radius: 0;
    cursor: pointer;
    transition: all 300ms ease-in-out;
}

.category input[type="radio"]:checked {
    background-color: black;
    border: 0.3rem solid rgb(230, 230, 230);
    outline: black;
    box-shadow: 0 0 0 0.1rem rgb(207, 206, 206);
}

.products {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
    position: relative;
    border-left: 0.1rem solid #ccc;
    overflow: hidden;
}

.product {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 25rem;
    height: 35rem;
    cursor: pointer;
}

.product:hover img {
    transition: all 300ms ease-in-out;
    box-shadow: 0 0 15rem rgba(0, 0, 0, 0.2);
}

.product a {
    font-size: 2rem;
    font-weight: 300;
    color: black;
    text-decoration: none;
    margin-top: 1rem;
    transition: all 300ms ease-in-out;
}

.product img {
    width: 100%;
    height: 70%;
    object-fit: cover;
    transition: all 300ms ease-in-out;
    background-color: white;
}

.product:hover img {
    transition: all 300ms ease-in-out;
}

.button-div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.load-button {
  background-color: transparent;
  color: black;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 2rem 6rem;
  border: 0.1rem solid black;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  margin-top: 2rem;
}

.load-button:hover {
    background-color: black;
    color: white;
}

.overview {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    height: 5rem;
    width: 25rem;
    margin-top: 13.4rem;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    position: absolute;
    transition: all 300ms ease-in-out;
    opacity: 0;
}

.product:hover .overview {
    animation: growUp 0.3s ease-in-out forwards;
}

.second-banner {
    background-image: linear-gradient(rgba(03, 03, 03, 0.8), rgba(03, 03, 03, 0.8)), url("../assets/images/second-banner.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 40vh;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 1;
    overflow: hidden;
    transition: all 300ms ease-in-out;
    padding: 0 10rem;
}

.second-banner-image {
    width: 50%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.6);
}

.second-banner-text {
    color: white;
    text-align: right;
    font-size: 5rem;
    font-weight: 800;
    width: 50%;
    padding: 2rem;
}

.second-banner-title {
    font-size: 8rem;
    font-weight: 800;
    line-height: 1;
}

.second-banner-button {
    background-color: white;
    color: black;
    height: 5rem;
    width: 15rem;
    font-size: 2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    z-index: 1;
    position: relative;
}

.second-banner-button:hover {
    background-color: black;
    color: white;
}

.small-container-light {
    background-color: rgb(230, 230, 230);
    min-height: 40vh;
    width: 100%;
    padding: 2rem;
    display: flex;
    margin-top: 3rem;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    position: relative;
}
.small-container-light h2 {
    font-size: 1.7rem;
    font-weight: 800;
    color: black;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    top: 0;
}

.new-products {
    display: flex;
    position: relative;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 84%;
    gap: 2rem;
    padding: 2rem;
    scroll-behavior: smooth;
    white-space: nowrap;
    overflow: hidden;
}

.new-products .product {
    flex: 0 0 auto;
}

.new-products .product:hover img {
    box-shadow: none;
}

.next-button, .previous-button {
    background-color: rgba(0, 0, 0, 0.5);
    gap: 1rem;
    color: white;
    font-size: 2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.next-button:hover, .previous-button:hover {
    transform: scale(1.2);
    background-color: rgba(0, 0, 0, 0.8);
}

.new-products-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
}

.third-banner {
    background-image: linear-gradient(rgba(03, 03, 03, 0.8), rgba(03, 03, 03, 0.8)), url("../assets/images/computer.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 40vh;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 1;
    overflow: hidden;
    transition: all 300ms ease-in-out;
    padding: 0 10rem;
}

.third-banner-text {
    color: white;
    text-align: center;
    font-size: 5rem;
    font-weight: 800;
    width: 50%;
    padding: 2rem;
}

.third-banner-title {
    font-size: 5rem;
    font-weight: 800;
    line-height: 1;
}

.third-banner-button {
    background-color: white;
    color: black;
    height: 5rem;
    width: 15rem;
    font-size: 2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    z-index: 1;
    position: relative;
}
.third-banner-button:hover {
    background-color: black;
    color: white;
}

@keyframes growUp {
    0% {
        opacity: 0;
        height: 3rem;
        transform: translateY(20%);
    }

    100% {
        opacity: 1;
        height: 5rem;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-2rem);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
