<template>
    <div class="container">
        <nav class="navbar d-inline-block d-md-flex navbar-expand-md navbar-light bg-transparent px-0">
            <button class="navbar-toggler border-0 pl-0" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>

            <router-link to="/home" class="pr-5 brand-name">MOOSEBALL</router-link>
            
            <div class="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="mr-5">
                        <router-link  to="/allProducts" class="txt-black-lighten">
                            全部商品
                        </router-link>
                    </li>
                    <li class="mr-5">
                        <router-link  to="/arranged" class="txt-black-lighten">
                            類別檢索
                        </router-link>
                    </li>
                    <li class="mr-5">
                        <router-link  to="/FAQ" class="txt-black-lighten">
                            常見問題
                        </router-link>
                    </li>
                </ul>
            </div> 
        </nav>
    </div>
</template>

<script>
import SlideCart from './slideCart'

export default {
    components: {
        SlideCart,
    },

    data(){
        return{
            cart: [],
            carts: [],
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
			})
        },
    },

    created(){
        this.getCart()
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/all.scss";
</style>    