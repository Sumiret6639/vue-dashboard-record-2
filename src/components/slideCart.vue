<template>
    <div>
        <div class="slidedown">
            <button class="slidedown slide-custom"
                @click="getCart(), slideShow()">            
            </button>
            <div class="slidedown-menu">
                <div class="top">
                    <h5>購物車內容</h5>
                    <a href="" class="close"
                        @click.prevent="slideHidden()">
                        ✕
                    </a>
                </div>
                <div class="slidedown-item" 
                    href="#" v-for="item in cart.carts" 
                    :key="item.id">
                    <tr>
                        <td>{{item.product.title}}</td>
                        <td>{{item.qty}}</td>
                    </tr>
                </div>
                <router-link class="to-checkout" to="/custom_checkout">前往結帳</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {

    data(){
        return{
            cart: [],
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
				vm.isLoading = false
			})
		},

        

    },

    created(){
        this.getCart()
    }
}
</script>

<style scoped lang="scss">

// @import url('/assets/helpers/_variables.scss');

    .slidedown{
        position: fixed;
        top: 10px;
        right: 40px;
        z-index: 10;  
        
        button{
            outline: none;
            :focus{
                outline: none;
            }
        }
    }

    .slide-custom{
        width: 30px;
        height: 30px;
        background-color: transparent;
        border: none;
        background-image: url('../assets/images/shopping-cart.svg');
        background-size: cover; 
        margin-right: 10px;
    }

    .slidedown-menu{
        visibility: hidden;
        position: fixed;
        top: 0;
        right: 0;
        width: 30%;
        height: 100%;
        z-index: 10;
        background-color: #fff;
        box-shadow: 5px 5px 20px rgba(#eee,0.4);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        

        .top{
            width: 80%;
            display: flex;
            justify-content: space-between;
            margin: 32px 0;
        }
    }

    .slidedown-item{
        width: 80%;
        display: flex;
        justify-content: space-around;
        padding: 10px;
        background-color: #F5EBEF;
        margin-bottom: 8px;

        tr{
            width: 90%;
        }

        td{
            width: 100%;
        }
    }

    .to-checkout{
        display: block;
        margin-top: 16px;
        width: 50%;
        background-color: #D58180;
        color: white;
        text-align: center;
        line-height: 45px;
    }

    // .slide-custom::after{
    //     display: block;
    //     content: "";
    //     width: 20px;
    //     height: 20px;
    //     background-color:  #e83e8c;
    //     border-radius: 50%;
    //     position: absolute;
    //     top: 10px;
    //     right: -8px;
    // }

</style>