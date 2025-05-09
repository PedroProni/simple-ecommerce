<script setup lang="ts">
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faBagShopping, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted } from 'vue';
import { ref } from 'vue';

onMounted(() => {
    window.addEventListener('scroll', hasBeenScrolled);
});

const showSearch = ref(false);
const scrolled = ref(false);

function hasBeenScrolled() {
    if (window.scrollY > 0) {
        scrolled.value = true;
    } else {
        scrolled.value = false;
    }
}

function toggleSearch() {
    showSearch.value = !showSearch.value;
}

</script>

<template>
    <div @scroll="hasBeenScrolled()" :class="{scrolled: scrolled}"  class="navbar">
        <a href="#" class="logo">
            <img src="../assets/images/logo.png" alt="Logo" />
        </a>
        <div class="mid-div">
            <div class="navbar-links">
                <a @click="$router.push('/')">Home</a>
                <a>
                    Categories
                    <FontAwesomeIcon :icon="faAngleDown" style="font-size: 1.5rem; margin-left: 0.1rem;" />
                </a>
                <a>
                    Pages
                    <FontAwesomeIcon :icon="faAngleDown" style="font-size: 1.5rem; margin-left: 0.1rem;" />
                </a>
            </div>
        </div>
        <nav>
            <div class="search-container">
                <input :class="{ show: showSearch }" type="text" placeholder="Search..." class="search-bar" />
                <a>
                    <FontAwesomeIcon :icon="faMagnifyingGlass" style="font-size: 2.5rem; cursor: pointer;"
                        @click="toggleSearch" />
                </a>
            </div>
            <a href="#login">
                <FontAwesomeIcon :icon="faUser" style="font-size: 2.5rem;" />
            </a>
            <a href="#wishlist">
                <FontAwesomeIcon :icon="faHeart" style="font-size: 2.5rem;" />
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
    padding: 1rem 2rem;
    background-color: transparent;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    transition: background-color 300ms ease-in-out;
    animation: fadeInAndDown 500ms ease-in-out;
}

.navbar.scrolled {
    background-color: rgb(0, 0, 0);
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    z-index: 2;
}

.logo img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    transition: all 300ms ease-in-out;
    cursor: pointer;
}

.mid-div {
    display: flex;
    width: 100%;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
}

.navbar {
    padding: 0 5rem;
}

.navbar-links {
    display: flex;
    gap: 2rem;
}

.navbar-links a {
    color: white;
    text-decoration: none;
    font-size: 1.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8rem;
    transition: all 300ms ease-in-out;
    padding: 0.1rem;
    position: relative;
    margin-left: 1rem;
    cursor: pointer;
    background-image: linear-gradient(to right, #6b7477b0, #6b7477b0 50%, #fffcfc 50%);
    background-size: 200% 100%;
    background-position: -100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.navbar-links a:hover {
    background-position: 0;
    color: #6b7477b0;
}

.navbar-links a:hover:before {
    width: 100%;
}

nav {
    display: flex;
    gap: 2rem;
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

.search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: 1rem;
    cursor: pointer;
    transition: all 300ms ease-in-out;
}

.search-bar {
    display: none;
    width: 30rem;
    height: 4rem;
    padding: 0rem;
    animation: growDown 300ms ease-in-out;
}

.search-bar.show {
    display: block;
    width: 30rem;
    height: 4rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 0.5rem;
    background-color: white;
    color: black;
    position: absolute;
    right: 3.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    animation: growUp 300ms ease-in-out;
}

@keyframes growUp {
    from {
        width: 0;
    }

    to {
        width: 30rem;
    }
}

@keyframes growDown {
    from {
        display: block;
        width: 30rem;
        height: 4rem;
        padding: 0.5rem;
        font-size: 1.2rem;
        border: none;
        border-radius: 0.5rem;
        background-color: white;
        color: black;
        position: absolute;
        right: 3.5rem;
        top: 50%;
        transform: translateY(-50%);
    }

    to {
        display: block;
        width: 0rem;
        height: 4rem;
        padding: 0.5rem;
        font-size: 1.2rem;
        border: none;
        border-radius: 0.5rem;
        background-color: white;
        color: black;
        position: absolute;
        right: 3.5rem;
        top: 50%;
        transform: translateY(-50%);
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

@keyframes fadeInAndDown {
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
