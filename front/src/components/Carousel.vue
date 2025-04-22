<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
    itemsToShow: 1,
    wrapAround: true,
    autoplay: 3500,
    pauseAutoplayOnHover: true,
}
</script>

<template>
    <Carousel v-bind="carouselConfig">
        <Slide>
            <div class="carousel__item">
                <img src="../assets/images/c1.png" alt="Slide 1" />
            </div>
        </Slide>
        <Slide>
            <div class="carousel__item">
                <img src="../assets/images/c2.png" alt="Slide 2" />
            </div>
        </Slide>
        <Slide>
            <div class="carousel__item">
                <img src="../assets/images/c3.png" alt="Slide 3" />
            </div>
        </Slide>
        <template #addons>
            <Pagination />
        </template>
    </Carousel>
</template>

<style scoped>
.carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    font-size: 24px;
    color: #333;
    height: 40rem;
    width: 100%;
    overflow: hidden;
}

.carousel__item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>
