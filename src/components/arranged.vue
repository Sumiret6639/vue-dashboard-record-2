<template>
    <div class="primary-content pb-80">
        <loading :active.sync="isLoading"></loading>
        <div class="bg-cover-500" :style="{backgroundImage:'url('+imgs+')'}">
            <div class="container pl-5">
                <h2 class="img-title">
                    類別
                    <br>檢索
                </h2>                
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="arranged-slidebar col-12 col-md-2 d-flex flex-column align-items-center">
                    <ul class="arranged-list">
                        <li v-for="(item, key) in categoryList" :key="key" class="arranged-item" >
                            <input type="radio" name="a" 
                            @click="category = item"
                            class="radio"
                            :checked="key == 0">
                            {{item}}
                        </li>
                    </ul>
                </div>
                <div class="col-12 col-md-10">
                    <div class="container">
                        <ul class="all-product-list row">
                            <li class="col-12 col-md-6 col-lg-4" v-for="(item) in arranged" :key="item.id" ref="itemNum">
                                <div class="put-cart" @click="addtoCart(item.id)">
                                    + <i class="fas fa-shopping-cart"></i> 
                                </div>
                                <div class="all-product-item">
                                    <div class="product-img"
                                        style="height: 200px; 
                                        background-size: cover; background-position: center"
                                        :style="bgcss(item.imageUrl)">
                                    </div>
                                    <div class="product-infos">
                                        <div class="product-title">{{item.title}}</div>
                                        <div class="product-sale-price">{{item.price}} 元</div>                            
                                        <div class="to-detail" 
                                        @click.prevent="getProduct(item.id)"> 更多資訊 </div>                            
                                    </div>                   
                                </div>
                            </li>                
                        </ul>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Pagination from './pages/pagination'
import $ from 'jquery'

export default {
    components: {
        Pagination,
    },

    data(){
        return {
            products: [],
            product: {},
            cart: {},
            carts: [],
            arrangedProducts: [],
            pagination: {},
            isLoading: false, 
            category: '美妝',
            categoryList: [],
            imgs: require("@/../static/images/banner-3.jpg"),
            cartLengthNum: 0,
        }
    },

    methods: {
        getProducts(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
            const vm = this
            vm.isLoading = true
            this.$http.get(api).then((response)=>{
                // console.log(response) 
                vm.isLoading = false
                vm.products = response.data.products
                vm.pagination = response.data.pagination
                vm.categoryList = vm.products.map((item)=>{
                    return item.category 
                })
                vm.categoryList = vm.categoryList.filter((item, index, arr)=>{
                    return arr.indexOf(item) === index && item != undefined 
                })
            })  
        },

        getProduct(id){
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
			const vm = this
			// vm.status.productLoading = id
			this.$http.get(api).then((response)=>{
                vm.product = response.data.product
                vm.pagination = response.data.pagination
                vm.$router.push(`/product/${response.data.product.id}`)
                // vm.status.productLoading = ''
			})
        },
        
        getCart(){
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
			const vm = this
			vm.isLoading = true
			this.$http.get(api).then((response)=>{
				// console.log(response) 
                vm.cart = response.data.data
                vm.carts = vm.cart.carts
                // console.log(vm.carts.length)
                vm.cartLengthNum = vm.carts.length
                vm.isLoading = false
                
                if(vm.carts.length != 0){
                    vm.cartLength = true;
                }else{
                    vm.cartLength = false;
                }
			})
        },

		addtoCart(id, qty = 1){
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
			const vm = this
			const cart = {
				product_id: id,
				qty
			}
			// vm.status.productLoading = id
			this.$http.post(api, {data : cart}).then((response)=>{
				console.log(response) 
				// vm.status.productLoading = ''
                vm.getCart()
                
			})
        },
        
        bgcss(img){
			return {
				'background-image' : `url(${img})`
			}
        },
        
    },

    computed: {
        arranged(){
            const vm = this
            let items = []
            if(vm.category !== ''){
                items = vm.products.filter((el)=>{
                    return el.category == vm.category
                })
            }else{
                items = vm.products
            }
            return vm.arrangedProducts = items
        },    
    },
    
    created(){
        this.getProducts()
        this.getCart();
    }
}
</script>
