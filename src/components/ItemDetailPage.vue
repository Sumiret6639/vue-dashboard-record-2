<template>
    <div class="primary-content pt-80 pb-160 d-flex justify-content-center align-items-center">
        <loading :active.sync="isLoading"></loading>
        <div class="item-details container d-flex flex-column">
            <div class="top d-flex">
                <div class="left">
                    <div class="product-img"
                        style="height: 324px; 
                        background-size: cover; background-position: center"
                        :style="bgcss(product.imageUrl)">
                    </div>
                </div>
                
                <div class="right">
                    <div class="primary-infos">
                        <h2 class="item-title">{{ product.title }}</h2>
                        <div class="item-price">
                            <div class="item-origin-price">原價 {{product.origin_price}} 元</div>
                            <div class="item-sale-price">現在只要 {{product.price}} 元</div>
                        </div>
                    </div>
                    <div class="buy">
                        <div class="num-selection">
                            <div @click="product.num = product.num-1" class="minus">-</div>
                            <input type="text" v-model="product.num" class="num" readonly>
                            <div @click="product.num = product.num + 1" class="plus">+</div>
                        </div>

                        <div class="total">小計 {{ product.num * product.price }} 元</div>
                        <div class="detail-put-cart"
                            @click="addtoCart(product.id, product.num)">
                            加入購物車 
                        </div>

                        <hr>
                        <h4 class="news-title">商品描述</h4>
                        <div class="item-descript">{{ product.content }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            productId: '',
            product: {},
            isLoading: false,
        }
    },

    methods: {
        getProduct(){
            const vm = this
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`
			this.$http.get(api).then((response)=>{
                vm.product = response.data.product
                vm.isLoading = false;
                
			})
		},

        addtoCart(id, qty = 1){
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
			const vm = this
			const cart = {
				product_id: id,
				qty
			}
			this.$http.post(api, {data : cart}).then((response)=>{
				console.log(response) 
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
        this.productId =  this.$route.params.itemId
        this.getProduct()
        this.isLoading = true;
    },
}
</script>