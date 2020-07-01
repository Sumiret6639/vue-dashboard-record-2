<template>
    <div class="customer-check-content container">
        <div class="check-progress-custom d-flex justify-content-around">
            <div class="progress-item">
                <div class="circle circle-active"></div>  
                <p>確認商品</p>            
            </div>
            <div class="progress-item">
                <div class="circle"></div>  
                <p>填寫訂購資料</p>            
            </div>
            <div class="progress-item">
                <div class="circle"></div>  
                <p>訂單完成</p>            
            </div>
            <div class="check-progress-border"></div>
        </div>
        <div class="table-custom">
			<table class="mx-auto table">
                <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="item in cart.carts" :key="item">
                        <td class="align-middle">
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                                已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle ">{{ parseInt(item.final_total) }}</td>

                        <td class="align-middle text-right">
                            <button type="button" 
                                class="btn btn-outline-danger btn-sm"
                                @click="deleteCart(item.id)">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>

                <tfoot> 
                    <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{ cart.total }}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success">{{ parseInt(cart.final_total)}}</td>
                    </tr>
                    <tr>
                        <td>
                            <router-link colspan="3" to="/custom_Inform"
                                class="btn btn-outline-danger btn-sm text-right">
                                下一步
                            </router-link>
                        </td>
                    </tr>
                </tfoot>
			</table>

			<hr>

			<div class="input-group mb-3 input-group-sm">
				<input type="text" 
					class="form-control" 
					placeholder="請輸入優惠碼"
					v-model="couponCode.code">
				<div class="input-group-append">
					<button 
						class="btn btn-outline-secondary" 
						type="button"
						@click="getCoupon()">
						套用優惠碼
					</button>
				</div>
			</div>
		</div>
    </div>
</template>

<script>

export default { 
    data(){
        return{
            cart: {
			},
			couponCode: {
				code: ''
            },
        }
    },

    methods: {
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
    }
}
</script>

<style lang="scss">
    .customer-check-content{
        display: flex;
        flex-direction: column;
        align-items: center;    
        height: 800px;
        box-sizing: border-box;
        position: relative;
    }

    .table-custom{
        width: 50%;
        background-color: #fff;
        padding: 20px;
    }

    .check-progress-custom{
        width: 50%;
        margin: 32px 0;
        background-color: none;
        position: relative;

        .check-progress-border{
            position: absolute;
            top: 9px;
            width: 65%;
            border-top: 1px solid #F5EBEF;
            z-index: 1;
        }

        .progress-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 3;

            p{
                margin-top: 8px;
            }
        }

        .circle{
            width: 20px;
            height: 20px;
            border-radius: 100%;
            background-color: #F5EBEF;
        }

        .circle-active{
            background-color: #F8CDBD;
        }
    }
</style>

