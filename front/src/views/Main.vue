<script setup lang="ts">
import { ref } from "vue";

const products = ref([
  {
    "sku": "KBD1001",
    "name": "Slim Wireless Keyboard",
    "description": "A compact and silent wireless keyboard perfect for office use.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1587825140708-3c843977e6d3",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1002",
    "name": "Ergonomic Wireless Mouse",
    "description": "Designed for long hours of comfortable use with precise tracking.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1616627981263-e7b3e6409541",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1003",
    "name": "Mechanical RGB Keyboard",
    "description": "RGB backlit mechanical keyboard for gamers and coders.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1616246338693-297bb24f7b77",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1004",
    "name": "Gaming Mouse Pro X",
    "description": "High-precision gaming mouse with adjustable DPI and RGB lighting.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1618368193650-988c24555f1b",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1005",
    "name": "Bluetooth Foldable Keyboard",
    "description": "Portable and foldable keyboard ideal for tablets and travel.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1555617117-08fda9d9fdf1",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1006",
    "name": "Silent Click Mouse",
    "description": "Whisper-quiet mouse for focused workspaces and libraries.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1007",
    "name": "Full-Sized Office Keyboard",
    "description": "Standard wired keyboard with numeric keypad for productivity.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1008",
    "name": "Minimalist White Mouse",
    "description": "A sleek and elegant mouse for modern desk setups.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1009",
    "name": "Backlit Laptop Keyboard",
    "description": "Keyboard with adjustable backlighting for low-light work.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1010",
    "name": "Trackball Mouse",
    "description": "Ergonomic design with a built-in trackball for precision work.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1581307519480-d1e0a01d25fd",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1011",
    "name": "Aluminum Wireless Keyboard",
    "description": "Premium aluminum body with quiet scissor-switch keys.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1606813908695-758f2aefc562",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1012",
    "name": "RGB Wireless Gaming Mouse",
    "description": "Rechargeable mouse with dynamic RGB and high-speed tracking.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1013",
    "name": "Multimedia Keyboard",
    "description": "Includes shortcut keys for media, volume, and browser control.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1585076486312-c3d1e3fc5dfc",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1014",
    "name": "Bluetooth Travel Mouse",
    "description": "Compact and easy to carry with a durable battery life.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1612817154859-4c1c7d70c3e5",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1015",
    "name": "Low-Profile Keyboard",
    "description": "Sleek low-profile keyboard with soft-touch keys for quiet typing.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1623776053397-7c7c1c0d264d",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1016",
    "name": "Silent Wireless Mouse",
    "description": "Click-free mouse with long battery life and ergonomic design.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1620121692029-d088224ddc49",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1017",
    "name": "Wireless Numeric Keypad",
    "description": "Ideal companion for laptops or compact keyboards.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1582131503261-70e9c1c2b8a6",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1018",
    "name": "Vertical Mouse",
    "description": "Vertical grip to reduce wrist strain during extended use.",
    "status": "active",
    "main_category": "Second",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1603398938378-e8ab3f89b5d3",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "KBD1019",
    "name": "Compact Bluetooth Keyboard",
    "description": "Pairs with multiple devices and fits easily into any bag.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1608379531566-6574c580b310",
        "position": 1,
        "main_image": true
      }
    ]
  },
  {
    "sku": "MSE1020",
    "name": "Rechargeable Mouse",
    "description": "Recharge via USB-C and enjoy weeks of uninterrupted work.",
    "status": "active",
    "main_category": "Main",
    "um": "UN",
    "brand": "Ralph Lauren",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1612810805462-4e22ee5bde65",
        "position": 1,
        "main_image": true
      }
    ]
  }
]);
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
                    <div v-for="product in products" :key="product.name" class="product">
                        <img :src="product.images[0].url" :alt="product.name"/>
                        <button class="overview">OVERVIEW</button>
                        <a>{{ product.name }}</a>
                        <p>$19.99</p>
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
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 2rem;
    gap: 5rem;
    width: 100%;
}

.categories {
    width: 10rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding-top: 4rem;
    height: 100%;
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
    justify-content: flex-start;
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
