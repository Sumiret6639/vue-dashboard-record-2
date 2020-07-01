<template>
    <div class="footer py-5">
        <div class="container d-flex flex-column py-5">
            <h1 class="mb-5">
            Subscribe for Exclusive Offer
            </h1>
            <div class="submit-email">
                <input type="text" class="email" placeholder="Your email address">
                <button>Subscribe</button>
            </div>
        </div>
        <div class="container d-flex justify-content-between">
            <p class="copy order-2 order-md-2 order-lg-1">© 2020. All Rights Reserved.</p>
            <ul class="d-flex flex-column flex-md-row order-1 order-md-1 order-lg-2">
                <li class="mr-48 pad-mb-16 mb-3 mb-md-0">Purchase Policy</li>
                <li class="mr-48 pad-mb-16 mb-3 mb-md-0">Privacy Policy</li>
                <li class="mr-48 pad-mb-48 mb-5 mb-md-0">Terms & Conditions</li>
            </ul>
        </div>       
    </div>
</template>

<style lang="scss">
    @import "@/assets/all.scss";
    .footer{
        width: 100%;
        min-height: 80px;
        padding: 25px;
        background-color: #a89ce5;
        color: white;

        h1{
            color: $black-primary;
        }

        li{
            margin-left: 15px;
        }

        input[type=text]{
            height: 40px; 
            padding: 8px;           
        }

        button{
            color: #fff;
            height: 100%;
            background-color: $black-primary;
        }
    }

</style>