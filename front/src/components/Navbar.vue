<script setup lang="ts">
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faBagShopping, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

</script>

<template>
    <div class="navbar">
        <div class="logo">
            <img src="#" alt="Logo" />
        </div>
        <div class="navbar-links">
            <a>
                Shop
                <FontAwesomeIcon :icon="faAngleDown" style="font-size: 1.5rem;"/>
            </a>
            <a>
                Home
                <FontAwesomeIcon :icon="faAngleDown" style="font-size: 1.5rem;"/>
            </a>
            <a>
                Categories
                <FontAwesomeIcon :icon="faAngleDown" style="font-size: 1.5rem;"/>
            </a>
            <a>
                Pages
                <FontAwesomeIcon :icon="faAngleDown" style="font-size: 1.5rem;"/>
            </a>
        </div>
        <nav>
            <a href="#login">
                <FontAwesomeIcon :icon="faUser" style="font-size: 2.5rem;" />
            </a>
            <a href="#wishlist">
                <FontAwesomeIcon :icon="faHeart" style="font-size: 2.5rem;" />
            </a>
            <a href="#search">
                <FontAwesomeIcon :icon="faMagnifyingGlass" style="font-size: 2.5rem;" />
            </a>
            <a href="#cart">
                <FontAwesomeIcon :icon="faBagShopping" style="font-size: 2.5rem;" />
                <FontAwesomeIcon :icon="faAngleDown" style="font-size: 1.5rem; margin-left: 0.5rem;" />
            </a>
        </nav>
    </div>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: rgb(17, 17, 17);
    color: white;
}

.logo img {
    height: 50px;
}

.navbar {
    padding: 0 5rem;
}

.navbar-links {
    display: flex;
    gap: 20px;
}

.navbar-links a {
    color: white;
    text-decoration: none;
    font-size: 1.7rem;
    transition: all 300ms ease-in-out;
    padding: 0.1rem;
    position: relative;
    margin-left: 1rem;
    cursor: pointer;
}

nav {
    display: flex;
    gap: 20px;
}

nav a {
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    position: relative;
    margin-left: 1rem;
    font-size: 2.5rem;
    transition: all 300ms ease-in-out;
    padding: 0.1rem;
}

nav a:after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: white;
    transition: all 300ms ease-in-out;
    position: absolute;
    bottom: 1.5rem;
}

nav a:hover:after {
    width: 100%;
}
</style>
