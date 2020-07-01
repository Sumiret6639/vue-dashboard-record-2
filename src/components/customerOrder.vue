<template>
    <div class="container mb-80">
        <div class="row d-flex justify-content-center">
            <div class="check-progress-custom d-flex justify-content-around">
                <div class="progress-item">
                    <div class="circle"></div>  
                    <p>確認商品</p>            
                </div>
                <div class="progress-item">
                    <div class="circle"></div>  
                    <p>填寫訂購資料</p>            
                </div>
                <div class="progress-item">
                    <div class="circle circle-active"></div>  
                    <p>訂單完成</p>            
                </div>
                <div class="check-progress-border"></div>
            </div>
        </div>
        
        <div class="row d-flex justify-content-center">
            <form class="col-6" @submit.prevent="payOrder">
                <table class="table">
                <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">{{ order.total }}</td>
                    </tr>
                </tfoot>
                </table>

                <table class="table">
                <tbody>
                    <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                    <th>付款狀態</th>
                    <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                    </td>
                    </tr>
                </tbody>
                </table>
                <div class="text-center" v-if="order.is_paid === false">
                <button class="btn btn-danger">確認付款去</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            orderId: '',
            order: {
                user: {},
            },
        }
    },

    methods: {
        getOrder(){
            const vm = this
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`
				this.$http.get(api).then((response)=>{
					console.log(response) 
					if(response.data.success){
						console.log(response)
						vm.order = response.data.order
				}
			})
        },

        payOrder(){
            const vm = this
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`
				this.$http.post(api).then((response)=>{
					console.log(response) 
					if(response.data.success){
						console.log(response)
						vm.getOrder()
				}
			})
        },

    },

    created(){
        this.orderId =  this.$route.params.orderId
        this.getOrder()
    }
}
</script>
<style lang="scss" scoped>
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