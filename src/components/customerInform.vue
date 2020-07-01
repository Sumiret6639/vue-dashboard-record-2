<template>
    <div class="container customer-info-content ">
		<div class="check-progress-custom d-flex justify-content-around">
            <div class="progress-item">
                <div class="circle"></div>  
                <p>確認商品</p>            
            </div>
            <div class="progress-item">
                <div class="circle circle-active"></div>  
                <p>填寫訂購資料</p>            
            </div>
            <div class="progress-item">
                <div class="circle"></div>  
                <p>訂單完成</p>            
            </div>
            <div class="check-progress-border"></div>
        </div>
        <div class="form-custom">
			<form class="form-custom justify-content-center" @submit.prevent="submitOrder">
				<div class="form-group">
					<label for="useremail">Email</label>
					<ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
						<input type="email" class="form-control w-100" name="email" id="useremail"
							v-model="form.user.email" placeholder="請輸入 Email" required>
								<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
			
				<div class="form-group">
					<label for="username">收件人姓名</label>
					<ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
						<input type="text" class="form-control w-100" name="name" id="username"
							v-model="form.user.name" placeholder="輸入姓名">
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
			
				<div class="form-group">
					<label for="usertel">收件人電話</label>
					<ValidationProvider name="電話" rules="required" v-slot="{ errors }">
						<input type="tel" class="form-control w-100" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
			
				<div class="form-group">
					<label for="useraddress">收件人地址</label>
					<input type="text" class="form-control w-100" name="address" id="useraddress" v-model="form.user.address"
						placeholder="請輸入地址">
					<!-- <span class="text-danger">地址欄位不得留空</span> -->
				</div>
			
				<div class="form-group">
					<label for="comment">留言</label>
					<textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
				</div>
				<div class="text-center">
					<button class="btn btn-danger mb-5">送出訂單</button>
				</div>
			</form>
		</div>
    </div>
</template>

<script>

import { extend } from 'vee-validate';

export default {
    data(){
        return{
            form: {
				"user": {
				"name": "",
				"email": "",
				"tel": "",
				"address": ""
				},
				"message": ""
			}
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

        submitOrder(){
			const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
			const vm = this
				this.$http.post(api, {data : vm.form}).then((response)=>{
					console.log(response) 
					if(response.data.success){
						console.log(response)
						vm.getCart()
						vm.$router.push(`/custom_orders/${response.data.orderId}`)
						vm.$bus.$emit('message:push', response.data.message, 'success')
					}else{
						vm.$bus.$emit('message:push', response.data.message, 'danger')					
				}
			})	
        },
    },

    created(){
    }
}
</script>

<style lang="scss">
    .customer-info-content{
		display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
        box-sizing: border-box;

		.form-control{
			&:focus{
				box-shadow: 0 0 5px #D58E80;
			}
		}	
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