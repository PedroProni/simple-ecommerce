<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
    <div class="banner">
        <div class="banner-text">
            <h2 class="season-title">Spring / Summer Season</h2>
            <div class="banner-discounts">
                <h4 class="discount-prefix">up<br>to</h4>
                <h4 class="discount-value">50% off</h4>
            </div>
            <div class="banner-button">
                <button class="">SHOP NOW</button>
            </div>
        </div>
        <div class="banner-image">
            <img src="../assets/images/mouse.png" alt="Banner" />
        </div>
    </div>
    <div class="container-white">
    </div>
</template>

<style scoped>
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

.container-white {
    background-color: white;
    height: 100vh;
    width: 100%;
}

.parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 20rem;
}

.div1 {
    grid-area: 1 / 1 / 2 / 3;
    font-size: 3rem;
    font-weight: lighter;
    line-height: 1;
}

.div2 {
    grid-area: 2 / 1 / 3 / 2;

}

.div3 {
    grid-area: 2 / 2 / 3 / 3;
}

.div4 {
    grid-area: 3 / 1 / 4 / 3;
}
</style>
