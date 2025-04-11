<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";

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

const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);
const products_filtered = ref<Product[]>([]);
const price_range = ref(0);

onMounted(() => {
    axios.get("http://localhost:3000/products?limit=15").then((response) => {
        products.value = response.data;
        products_filtered.value = response.data;
    }).catch((error) => {
        toast.error("Error fetching products:");
        console.error("Error fetching products:", error);
    });

    axios.get("http://localhost:3000/categories").then((response) => {
        categories.value = response.data;
    }).then(() => {
        console.log(categories.value);
    }).catch((error) => {
        toast.error("Error fetching categories:");
        console.error("Error fetching categories:", error);
    });
})
</script>

<template>
    <div class="main">
        <div class="black-box"></div>
        <div class="page">
            <div class="page-title">
                <div class="current-page">
                    <h3>ALL</h3>
                </div>
                <div class="separation-div">
                </div>
            </div>
        </div>
        <div class="main-div">
            <div class="filters">
                <div class="inner-filter">
                    <div class="filter-categories">
                        <h3>Categories</h3>
                        <div v-for="category in categories" :key="category.name" class="category">
                            <a>{{ category.name }}</a>
                        </div>
                    </div>
                    <div class="filter-price">
                        <h3>Price</h3>
                        <input type="range" min="0" max="10000" step="1" v-model="price_range" />
                        <div class="price-range">
                            <span class="price-text" v-if="price_range != 0">$0.00 - ${{ price_range }}.00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="products">
                <div class="toolbar"></div>
                <div class="products-list">
                    <div v-for="product in products_filtered" :key="product.name" class="product">
                        <img :src="product.images[0].url" :alt="product.name" />
                        <button class="overview">OVERVIEW</button>
                        <div class="product-name">
                            <a>{{ product.name }}</a>
                            <a class="heart">
                                <FontAwesomeIcon :icon="faHeart" />
                            </a>
                        </div>
                        <p> {{ product.prices[0]?.price ? `$ ${product.prices[0]?.price.toFixed(2)}` : 'No prices available' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    background-color: rgb(230, 230, 230);
}

.black-box {
    width: 100%;
    height: 8rem;
    background-color: black;
}

.page {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.current-page {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.page-title {
    display: flex;
    flex-direction: column;
    padding: 2rem;
}

.page-title h3,
.page-title span {
    font-weight: 300;
}

.separation-div {
    width: 100%;
    height: 0.1rem;
    background-color: rgb(66, 66, 66, 0.5);
    margin: 0;
    padding: 0;
    border: 0;
    position: relative;
}

.main-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
}

.filters {
    width: 20%;
    height: 100vh;
}

.inner-filter {
    padding: 2rem;
    display: flex;
    flex-direction: column;
}

.filter-categories {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 0.1rem solid rgb(66, 66, 66, 0.5);
    padding: 1rem;
}

.category {
    display: flex;
    padding: 0.2rem;
    cursor: pointer;
    color: rgb(63, 63, 63, 1);
    font-weight: 300;
}

.filter-price {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 0.1rem solid rgb(66, 66, 66, 0.5);
    padding: 1rem;
}

.filter-price input[type="range"] {
    width: 100%;
    height: 0.5rem;
    -webkit-appearance: none;
    appearance: none;
    background: rgb(66, 66, 66, 0.5);
    border-radius: 0.5rem;
    outline: none;
}

.price-text {
    font-weight: 300;
    color: rgb(63, 63, 63, 1);
    font-size: 1.5rem;
}

.filter-price input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    background: black;
    border-radius: 100%;
    cursor: pointer;
}

.products {
    display: flex;
    width: 80%;
}

.products-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 100%;
    max-height: 100%;
    padding: 2rem;
    position: relative;
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
    box-shadow: 0 0 10rem rgba(0, 0, 0, 0.2);
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

.product-name {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.heart:hover {
    color: red;
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
</style>
