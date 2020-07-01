<template>
    <div class="index-content">
        <loading :active.sync="isLoading"></loading>
        <div class="banner container-fluid" style="position: relative; height: 650px">
            <div class="row justify-content-end right">
                <div class="col-md-6 bg-cover banner-pic-2" style="position: absolute; top: 0; bottom: 0; " :style="{backgroundImage:'url('+imgs+')'}"></div>
            </div>            
            <div class="container position-relative">
                <div class="row justify-content-start text-white text-md-dark mt-72">
                    <div class="col-md-6">  
                        <h1 class="">MOOSEBALL</h1> 
                        <h2>最符合人體需求的保養品</h2>
                        <p class="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Facilis sed maiores quisquam distinctio explicabo minus laborum modi voluptates. 
                        </p>
                        <router-link to="/allProducts">
                            <a class="shop-buttton mt-5" href="#" role="button">SHOP</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid bg-gray-primary mb-5">
            <div class="container mt-10 mb-10 bg-white"> 
                <div class="row">
                    <div class="col-12 d-flex justify-content-center mt-7">                       
                        <h2>關於MOOSEBALL</h2>
                    </div>                    
                </div>
                <hr class="my-6 w-50">                
                <ul class="row brand-infos">
                    <li class="col-12 mb-8">
                        <div class="container-fluid">
                            <div class="row d-flex justify-content-md-center">                               
                                <div class="d-flex flex-column justify-content-md-center align-items-md-center col-12 col-md-5">
                                    <h5 class="mb-3">嚴選天然植物萃取</h5>
                                    <p>我們相信，唯有純天然的成分對於人體的修護和放鬆最有效。
                                        所有商品的顏色、香味，皆由純天然植物萃取，並通過歐盟國家級檢驗認證合格。
                                    </p>
                                </div>  
                            </div>
                        </div>                                     
                    </li>
                    <li class="col-12 mb-8">
                        <div class="container-fluid">
                            <div class="row d-flex justify-content-md-center">
                                <div class="d-flex flex-column justify-content-md-center align-items-md-center col-12 col-md-5">
                                    <h5 class="mb-3">遴選富含礦物質的基底</h5>
                                    <p>全臺過敏人口高達七成，空氣污染、紫外線照射等傷害髮膚的危害無所不在。因此我們挑選包含氧化鋅、二氧化鈦及氧化鎂等天然礦物成分的彩妝品，保持無瑕妝感之餘，還能有效防止過敏和乾澀。</p>
                                </div>  
                            </div>
                        </div>                                     
                    </li>
                    <li class="col-12 mb-8">
                        <div class="container-fluid">
                            <div class="row d-flex justify-content-md-center">                                
                                <div class="d-flex flex-column justify-content-md-center align-items-md-center col-12 col-md-5">
                                    <h5 class="mb-3">使用公平交易原料</h5>
                                    <p>所有產品原料皆直接與世界各地的公平交易社群合作。我們深信，唯有透過公平貿易，才能確保好原料的來源和暢通，並鼓勵各地特色長久經營</p>
                                </div>  
                            </div>
                        </div>                                     
                    </li>
                </ul>
            </div>
        </div>
        
        <div id="carouselExampleIndicators" class="carousel slide carousel-custom container" data-ride="carousel">
            <h3 class="sub-title">現正熱賣</h3>
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active position-relative">
                    <img src="@/assets/images/carousel-1.jpg" class="d-block w-100 position-absolute" alt="">
                    <div class="img-txt position-absolute">
                        <h5>原萃保濕精華組</h5>
                    </div>
                    
                </div>
                <div class="carousel-item">
                    <img src="@/assets/images/carousel-2.jpg" class="d-block w-100 position-absolute" alt="">
                    <h5 class="position-absolute img-txt">蘆薈萃取精華液</h5>
                </div>
                <div class="carousel-item">
                    <img src="@/assets/images/carousel-3.jpg" class="d-block w-100 position-absolute" alt="...">
                    <h5 class="position-absolute img-txt">原萃保濕精華(體驗組)</h5>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</template>
<style lang="scss">
    .swiper-slide {
        width: 300px;
        height: auto;
        display: flex;
        flex-direction: column;
    }

    .article-tag{
        background-color: #eee;
        border-radius: 5px;
        padding: 5px 16px;
    }

</style>

<script>

import $ from 'jquery';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'


export default {
    components: {
        Swiper,
        SwiperSlide,
    },

    data(){
        return{
            isLoading: false, 
            imgs: require("@/../static/images/index-banner.jpg"), 
            feedbackPic:[
                'https://images.unsplash.com/photo-1591976947723-bc925db775c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                'https://images.unsplash.com/photo-1571816119553-df62a2eedf56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
                'https://images.unsplash.com/photo-1585883308132-4ba686bb4957?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
                'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
                'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
                'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80'
            ],
            swiperOptions: {
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination'
                },
            }
        }
    },

    methods: {
        onSetTranslate() {
            console.log('onSetTranslate')
            },
            onSwiperSlideChangeTransitionStart() {
            console.log('onSwiperSlideChangeTransitionStart')
            },
            onSwiperClickSlide(index, reallyIndex) {
            console.log('Swiper click slide!', reallyIndex)
        }
    },

    created(){
        setInterval(() => {
            $('carouselExampleIndicators').carousel({ interval: 1000 })
        },1000);
        this.isLoading = true;
    },

    mounted(){
        this.isLoading = false;
    }
}
</script>

