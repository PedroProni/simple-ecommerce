<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

interface RegUser {
    name: string;
    email: string;
    password: string;
}

const user = ref<RegUser>({
    name: '',
    email: '',
    password: '',
});


function handleRegister() {
    axios.post('http://localhost:3000/users', {
        name: user.value.name,
        email: user.value.email,
        role: 'user',
        password: user.value.password,
    })
        .then(async (response) => {
            toast.success('Register successful!');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            await new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
                window.location.href = '/';
            });
        })
        .catch((e) => {
            toast.error(e.response.data.message);
        });

}
</script>

<template>
    <div class="form-container">
        <h1 class="text-center text-white title">Register</h1>
        <form>
            <div class="mb form-group">
                <label for="name" class="form-label text-white">Name: </label>
                <input v-model="user.name" type="text" class="form-control" id="name" placeholder="Enter your name">
                <label for="email" class="form-label text-white">Email: </label>
                <input v-model="user.email" type="text" class="form-control" id="email" placeholder="Enter your email">
                <label for="password" class="form-label text-white">Password: </label>
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Enter your password">
            </div>
            <button @click.prevent="handleRegister()" type="submit" class="btn btn-primary">Signup</button>
        </form>
        <div class="mb">
            <a class="text-white register" @click="$emit('swapForm')">Already have an account? Login here</a>
        </div>
    </div>
</template>

<style scoped>
.form-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
}

.cont-invisible {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
}

.title {
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    margin-bottom: 1rem;
    animation: fadeIn 500ms ease-in;
    text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    text-align: center;
}

.register {
    text-decoration: underline;
    cursor: pointer;
    animation: fadeIn 500ms ease-in;
}

.mb {
    margin-bottom: 1rem;
}

form {
    animation: fadeIn 500ms ease-in;
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
    border-radius: 0.5rem;
    padding: 1rem;
    width: 30rem;
    transition: all 300ms ease-in-out;
    margin: 1rem 0;
}

.btn-primary {
    background-color: #484b4eaf;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    animation: fadeIn 500ms ease-in;
}

.btn-primary:hover {
    background-color: #484b4ef8;
    transform: scale(1.05);
}

.form-check-input {
    margin-right: 1rem;
    cursor: pointer;
    width: 2rem;
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
</style>
