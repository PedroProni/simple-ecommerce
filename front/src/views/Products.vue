<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import Carousel from "../components/Carousel.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';

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
const arrow_up = ref(true);
const selected_sort_option = ref("position");
const selected_show_option = ref(15);


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
    }).catch((error) => {
        toast.error("Error fetching categories:");
        console.error("Error fetching categories:", error);
    });
})

const changeSortOrder = () => {
    arrow_up.value = !arrow_up.value;
}

const filterCategory = (category_code: string) => {
  axios.get(`http://localhost:3000/products?main_category=${category_code}&limit=${selected_show_option}`).then((response) => {
    products_filtered.value = response.data;
  }).catch((error) => {
    toast.error("Error fetching products by category:");
    console.error("Error fetching products by category:", error);
  });
}

</script>

<template>
    <div class="main">
        <div class="black-box"></div>
        <div class="carousel-c">
            <div class="carousel">
                <Carousel />
            </div>
        </div>
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
                            <input class="category-input" :id="`category-${category.category_code}`" type="radio" :value="category.category_code" @click="filterCategory(category.category_code)"/>
                            <label :for="`category-${category.category_code}`">{{ category.name }}</label>
                        </div>
                    </div>
                    <div class="filter-price">
                        <h3>Price</h3>
                        <input type="range" min="0" max="1000" step="1" v-model="price_range" />
                        <div class="price-range">
                            <span class="price-text" v-if="price_range != 0">$0.00 - ${{ price_range }}.00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="products">
                <div class="toolbar">
                    <div class="sort-by">
                        <a class="menu-title">Sort by:</a>
                        <select class="menu-select" v-model="selected_sort_option">
                            <option value="position">Position</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                        <span class="arrow" :class="arrow_up ? 'arrow-up' : 'arrow-down'" @click="changeSortOrder()">
                            <FontAwesomeIcon :icon="faUpLong" />
                        </span>
                    </div>
                    <div class="show">
                        <a class="menu-title">Show:</a>
                        <select class="menu-select" v-model="selected_show_option">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                    </div>
                </div>
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

.carousel-c {
    width: 100%;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.carousel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2rem;
    padding: 1rem;
}

.inner-filter {
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

.category-input {
    -webkit-appearance: none;
    appearance: none;
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
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
}

.products-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 100%;
    max-height: 100%;
    padding: 0.5rem;
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

.toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 80%;
}

.sort-by,
.show {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    box-sizing: border-box;
    margin: 0;

}

.menu-title {
    font-size: 1.5rem;
    font-weight: 300;
    color: rgb(63, 63, 63, 1);
    text-decoration: none;
}

.menu-select {
    font-size: 1.5rem;
    font-weight: 300;
    color: rgb(63, 63, 63, 1);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: white;
    transition: all 300ms ease-in-out;
    border: 1px solid rgb(200, 200, 200);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    line-height: 1.5rem;
    height: 3.5rem;
    width: 8rem;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M7 10l5 5 5-5H7z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5rem;
    cursor: pointer;
    box-sizing: border-box;
}

.menu-select option {
    font-size: 1.5rem;
    font-weight: 300;
    color: rgb(63, 63, 63, 1);
    background-color: white;
    padding: 0.5rem 1rem;
    border: none;
    text-decoration: none;
}

.sort-by select:hover {
    box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.2);
}

.arrow {
    cursor: pointer;
}

.arrow-up {
    transform: rotate(0deg);
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
}

.arrow-down {
    transform: rotate(180deg);
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
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
