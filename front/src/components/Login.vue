<script setup lang="ts">
import Navbar from './Navbar.vue';
</script>

<template>
    <div class="main-bg">
        <Navbar class="nav-login"/>
        <div class="container">
            <h1 class="text-center text-white title">Welcome to the Login Page</h1>
            <form>
                <div class="mb form-group">
                    <label for="email" class="form-label text-white">Email: </label>
                    <input type="text" class="form-control" id="email" placeholder="Enter your email">
                    <label for="password" class="form-label text-white">Password: </label>
                    <input type="password" class="form-control" id="password" placeholder="Enter your password">
                </div>
                <div class="mb">
                    <input type="checkbox" id="rememberMe" class="form-check-input">
                    <label for="rememberMe" class="form-check-label text-white">Remember Me</label>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <div class="mb">
                    <a class="text-white register">Don't have an account? Register here</a>
            </div>
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

.title {
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 1rem;
    animation: fadeIn 500ms ease-in;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.register {
    text-decoration: underline;
    cursor: pointer;
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

.mb{
    margin-bottom: 1rem;
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
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeInAndDown 500ms ease-in;
}

.text-center {
    text-align: center;
}

.text-white {
    color: white;
}

.form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form-label {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

.form-control {
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 5px;
    padding: 10px;
    transition: all 300ms ease-in-out;
    margin: 1rem 0;
}

.btn-primary {
    background-color: #484b4eaf;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 500ms ease-in;
}
.btn-primary:hover {
    background-color: #484b4ef8;
    transform: scale(1.05);
}
.form-check-input {
    margin-right: 10px;
    cursor: pointer;
    width: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    accent-color: #484b4e;
}
.form-check-label {
    color: white;
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
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
