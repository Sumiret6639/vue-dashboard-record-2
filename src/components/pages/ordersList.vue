<template>
	<div>
		<loading :active.sync="isLoading"></loading>
		<div class="text-right">
		</div>

		<table class="table mt-4">
			<thead>
				<tr>
				<th>訂單成立時間</th>
				<th>訂購者資訊</th>
				<th>購買商品</th>
				<th>應付總金額</th>
				<th>付款方式</th>
				<th>是否付款</th>
				<th>編輯</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, key) in orders" :key="item.id" :item="key">
				<td class="text-right">
					{{item.create_at}}
				</td>
				<td>
					<div>訂購者姓名： {{item.user.name}}</div>
					<div>電子郵件地址：{{item.user.email}}</div>
					<div>寄送地址： {{item.user.address}}</div>
					<div>聯絡電話：{{item.user.tel}}</div>
				</td>
				
				<!-- <td>{{item.products}}</td> -->
				<td>
					<div v-for="(item,key) in item.products" :key="key">
						<div>{{item.product.title}} × {{item.product.num}}</div>
					</div>
				</td>
				<td class="text-right"> ${{item.total}}</td>
				<td></td>
				<td>{{item.is_paid ? '已付款' : '未付款'}}</td>	
				<!-- <button class="btn btn-outline-primary btn-sm mt-2" @click="showCouponModal(false, item)">編輯</button>
				<button class="btn btn-outline-primary btn-sm mt-2" @click="delCouponModal(item)">刪除</button> -->
				</tr>
			</tbody>
			</table>

			<nav aria-label="Page navigation example">
				<Pagination 
					:paginationData="pagination" 
					v-on:emitpage="getProducts">
				</Pagination>
			</nav>

			<!-- <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content border-0">
				<div class="modal-header bg-dark text-white">
					<h5 class="modal-title" id="exampleModalLabel">
					<span>新增優惠券</span>
					</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
					<div class="col-sm-8">
						<div class="form-group">
						<label for="title">標題</label>
						<input type="text" class="form-control" id="title"
							placeholder="請輸入標題" v-model="tempCoupon.title">
						</div>

						<div class="form-row">
						<div class="form-group">
							<label for="category">折扣</label>
							<input type="number" class="form-control" id="category"
							placeholder="請輸入折扣" v-model="tempCoupon.percent">
						</div>
						</div>

						<hr>

						<div class="form-group">
						<label for="description">優惠代碼</label>
						<input type="text" class="form-control" id="description"
							placeholder="請輸入自訂代碼" v-model="tempCoupon.code">
						</div>
						<div class="form-group">
						<label for="content">到期日</label>
						<input type="date" class="form-control" id="content"
							placeholder="請輸入該代碼到期日" v-model="tempCoupon.due_date">
						</div>
						<div class="form-group">
						<div class="form-check">
							<input class="form-check-input" type="checkbox"
							id="is_enabled" v-model="tempCoupon.is_enable"
							:true-value="1" :false-value="0">
							<label class="form-check-label" for="is_enabled">
							是否啟用
							</label>
						</div>
						</div>
					</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" @click="updateCoupons(isNew,tempCoupon.id)">確認</button>
				</div>
				</div>
			</div>
			</div>  -->

			<!-- <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
				<div class="modal-header bg-danger text-white">
					<h5 class="modal-title" id="exampleModalLabel">
					<span>刪除產品</span>
					</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-dismiss="modal" >取消</button>
					<button type="button" class="btn btn-danger"  @click="deleteCoupons(tempCoupon.id)"
					>確認刪除</button>
				</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
import Pagination from './pagination'

export default {
	components: {
		Pagination,
	},

	data(){
        return {
			orders: [],
            isLoading: false,
            pagination: {},
        }
    },
    
    methods:{
        getProducts(page = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`
            const vm = this
            vm.isLoading = true
            this.$http.get(api).then((response)=>{
                console.log(response) 
                vm.isLoading = false
                vm.orders = response.data.orders
                vm.pagination = response.data.pagination
        	})
    	},
    },

	created(){
        this.getProducts()
	}
}
</script>