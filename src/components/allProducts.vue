<template>
    <div class="primary-content pb-80">
        <loading :active.sync="isLoading"></loading>
        <div class="bg-cover-500" :style="{backgroundImage:'url('+imgs+')'}">
            <div class="container pl-5">
                <h2 class="img-title">
                    全部
                    <br>檢索
                </h2>                
            </div>
        </div>
        <div class="container">
            <ul class="row justify-content-center">
                <li class="col-12 col-md-6 col-lg-4" v-for="(item) in products" :key="item.id">
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

        <Pagination
            class="pagination d-flex justify-content-center txt-black-lighten " 
            :paginationData="pagination" 
            v-on:emitpage="getProducts">
        </Pagination> 

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
            pagination: {},
            isLoading: false,
            imgs: require("@/../static/images/banner-2.jpg"), 
        }
    },

    methods: {
        getProducts(page = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`
            const vm = this
            vm.isLoading = true
            this.$http.get(api).then((response)=>{
                // console.log(response) 
                vm.isLoading = false
                vm.products = response.data.products
                vm.pagination = response.data.pagination
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
				console.log(response) 
				vm.cart = response.data.data
				vm.isLoading = false
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
		}
    },
    
    created(){
        this.getProducts()
    }
}
</script>
