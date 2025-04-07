<script setup lang="ts">
import { ref } from "vue";
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
                <img src="../assets/images/mouse.png" alt="Banner" />
            </div>
        </div>
        <div class="container-light">
            <div class="content-container">
                <div class="categories">
                    <label class="title-category" for="categories">SHOP BY:</label>
                    <div class="category">
                        <input type="radio" id="category1" name="category" value="category1" />
                        <label for="category1">category1</label>
                    </div>
                    <div class="category">
                        <input type="radio" id="category1" name="category" value="category1" />
                        <label for="category1">category1</label>
                    </div>
                    <div class="category">
                        <input type="radio" id="category1" name="category" value="category1" />
                        <label for="category1">category1</label>
                    </div>
                </div>
                <div class="products">
                    <div class="product">
                        <img src="https://i5.walmartimages.com/seo/Razer-BlackWidow-Wired-Mechanical-Gaming-Keyboard-for-PC-Chroma-RGB-Lighting-Black_72fd417f-74ca-44ef-8862-b432f1e715ca.d7d96d5ea55f1d5547248f161a560f6f.jpeg"
                            alt="Product 1" />
                        <button class="overview">OVERVIEW</button>
                        <a>Product 1</a>
                        <p>$19.99</p>
                    </div>
                    <div class="product">
                        <img src="https://a-static.mlcdn.com.br/1500x1500/mouse-gamer-logitech-g-prox-wireless-sem-fio-preto/logitechstoreoficial/39625/c98a82b93283539cc6b893232880eebf.jpeg"
                            alt="Product 2" />
                        <button class="overview">OVERVIEW</button>
                        <a>Product 2</a>
                        <p>$29.99</p>
                    </div>
                    <div class="product">
                        <img src="https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/171305" alt="Product 3" />
                        <button class="overview">OVERVIEW</button>
                        <a>Product 3</a>
                        <p>$39.99</p>
                    </div>
                </div>
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

.banner-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
    transform: translateY(-6rem);
}

.container-light {
    background-color: rgb(230, 230, 230);
    height: 100vh;
    width: 100%;
}

.content-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
}

.categories {
    width: 10rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
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
