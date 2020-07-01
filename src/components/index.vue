<template>
    <div class="wrap">
        <loading :active.sync="isLoading"></loading>
        <div class="container d-flex position-relative py-1" >
            <Header></Header>
            <div class="d-flex static">
                <button type="button" class="mr-0 position-relative" 
                    data-toggle="modal" data-target="#exampleModal"
                    @click="getCart()">
                    <i class="fas fa-shopping-cart txt-pink-primary"></i>
                    <!-- <div class="item-num">{{}}</div> -->
                </button>
                <router-link to="./login" class="d-flex align-items-center ml-3">
                    <i class="fas fa-user"></i>
                    <p class="text-dark ml-2">後台登入</p>
                </router-link>
            </div>
        </div>

        <div class="main">
            <router-view ref="itemNum"></router-view>
        </div>
        <Footer></Footer>    

        <div class="modal right fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content p-3">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">購物車內容</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-item" 
                            href="#" v-for="item in carts" 
                            :key="item.id">                    
                            <tr>
                                <td>{{item.product.title}}</td>
                                <td>{{item.qty}}</td>                        
                            </tr>
                            <tr class="d-flex justify-content-end">
                                <td >
                                    <a href="#" class="del"
                                    @click.prevent="deleteCart(item.id)">×</a>
                                </td>
                            </tr>
                        </div>
                    </div>
                    <div class="modal-footer">                                                            
                        <router-link v-if="cartLength" class="to-checkout" to="/custom_checkout">
                            <button data-dismiss="modal" aria-label="Close">前往結帳</button>
                        </router-link>   
                        <router-link v-else to="/allProducts" class="d-flex flex-column">
                            <p class="text-dark" disabled>購物車內尚無商品</p> 
                            <button data-dismiss="modal" class="to-pickout" aria-label="Close">立即前往選購</button>
                        </router-link>                                                
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import Header from './Header'
import Footer from './footer'
import $ from 'jquery'

export default {
    components: {
        Header,
        Footer,
    },

    data(){
        return{
            cart: [],
            carts: [],
            cartLength: false,
            isLoading: false,
        }
    },

    methods:{
        getCart(){
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
			const vm = this
			vm.isLoading = true
			this.$http.get(api).then((response)=>{
				console.log(response) 
                vm.cart = response.data.data
                vm.carts = vm.cart.carts
                vm.isLoading = false
                
                if(vm.carts.length != 0){
                    vm.cartLength = true;
                }else{
                    vm.cartLength = false;
                }
			})
        },
        
        deleteCart(id){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
            const vm = this
            vm.isLoading = true
            this.$http.delete(api).then((response)=>{
                // console.log(response) 
                if(response.data.success){
                    vm.getCart()
                    vm.$bus.$emit('message:push', response.data.message, 'success')
                    vm.isLoading = false
                }else{
                    vm.$bus.$emit('message:push', response.data.message, 'danger')
                }
            })
        },

    },

    created(){
        this.getCart()
    },

    mounted(){
        $('.carousel').carousel()
        
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/all.scss";

    .modal.right .modal-dialog {
		position: fixed;
        right:0;
        margin: auto;
        width: 360px;
        height: 100%;
        transform: translate3d(0%, 0, 0);
    }

    .modal.right .modal-content {
        height: 100%;
        overflow-y: auto;
    }

    .modal-content {
        border-radius: 0;
        border: none;
    }

    .modal-header {
        border-bottom: none;
    }

    .modal-footer{
        border-top:none;
    }

    .modal-item{
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: padding(0.625) padding(1);
        background-color: $gray-primary;
        margin-bottom: 8px;

        tr{
            width: 90%;
        }

        td{
            width: 100%;
        }

        .del{
            display: block;
            color: $black-primary;
            text-align: right;
        }
    }

    .static{
        position: absolute;
        top: 26px;
        transform: translateY(-50%);
        right: 20px;
    }

    .to-checkout{
        display: block;
        width: 50%;
        background-color: $pink-primary;
        color: white;
        text-align: center;
        line-height: 45px;
    }

    .to-pickout{
        display: block;
        background-color: $pink-primary;
        color: white;
        text-align: center;
        line-height: 45px;
    }

    .item-num{
        width: 24px;
        line-height: 24px;
        border-radius: 100%;
        font-size: 10px;
        background-color: $black-primary;
        color: #fff;
        position: absolute;
        z-index: -1;
        top: -10px;
        right: -10px;
    }
</style>