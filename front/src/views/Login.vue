<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import LoginForm from '../components/LoginForm.vue';
import RequestForm from '../components/RequestForm.vue';
import { ref } from 'vue';

const has_account = ref(false);

function toggleForm() {
   return has_account.value = !has_account.value
}

</script>

<template>
    <div class="main-bg">
        <Navbar class="nav-login"/>
        <div class="container">
            <LoginForm />
            <!-- <RequestForm /> -->
        </div>    
         
    </div>
</template>

<style scoped>
.nav-login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: transparent;
    transition: all 300ms ease-in-out;
    animation: fadeInAndDown 500ms ease-in;
}

.main-bg {
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/images/login.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    z-index: 0;
    animation: fadeIn 250ms ease-in;
}

.container {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2rem;
    width: 40rem;
    height: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    border: 0.1rem solid rgba(255, 255, 255, 0.18);
    border-radius: 1rem;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    animation: fadeInAndDown 500ms ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
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
