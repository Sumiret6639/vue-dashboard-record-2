<template>
	<div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" data-toggle="modal" data-target="#couponModal"
      @click="showCouponModal(true)">建立新優惠券</button>
    </div>

		<table class="table mt-4">
      <thead>
        <tr>
          <th>優惠券名稱</th>
          <th>折扣</th>
          <th>優惠代碼</th>
					<th>使用期限</th>
          <!-- <th width="80">售價</th> -->
          <th>啟用狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td class="text-right">
            {{item.percent}}
          </td>
          <td>{{item.code}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enable == 1" class="text_success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <button class="btn btn-outline-primary btn-sm mt-2" @click="showCouponModal(false, item)">編輯</button>
          <button class="btn btn-outline-primary btn-sm mt-2" @click="delCouponModal(item)">刪除</button>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
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
    </div> 

    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
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
    </div>

	</div>
</template>

<script>
import $ from 'jquery'


export default {
	data() {
    return {
      tempCoupon: {
        percent: 100
      },
      coupons:{},
      isLoading: false,
      isCouponNew: false,
    }
  },

  methods: {
    updateCoupons(isNew, id){
      const vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      if(!isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`
        httpMethod = 'put'
      }
      // vm.isLoading = true
      this.$http[httpMethod](api, {data : vm.tempCoupon}).then((response)=>{
        console.log(response) 
        // vm.isLoading = false
        if(response.data.success){
          vm.$bus.$emit('message:push', response.data.message, 'success')
          this.getCoupons()
        $('#couponModal').modal('hide')
        }else{
          vm.$bus.$emit('message:push', response.data.message, 'success')
          this.getCoupons()
          $('#couponModal').modal('hide')
        }
      })
    },
    
    getCoupons(page = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response)=>{
        console.log(response) 
        vm.isLoading = false
        vm.coupons = response.data.coupons
      })
    },

    deleteCoupons(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`
      const vm = this
      // vm.isLoading = true
      this.$http.delete(api).then((response)=>{
        console.log(response) 
        if(response.data.success){
          vm.getCoupons()
          $('#delCouponModal').modal('hide')
          vm.$bus.$emit('message:push', response.data.message, 'success')
        }else{
          vm.getCoupons()
          $('#delCouponModal').modal('hide')
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
        
        // vm.isLoading = false
        // vm.coupons = response.data.coupons
      })
    },
    
    showCouponModal(isCouponNew, item){
      const vm = this
      if(isCouponNew){
        vm.isCouponNew = true
        vm.tempCoupon = {}
      }else{
        vm.isCouponNew = false
        vm.tempCoupon = Object.assign({}, item)
      }
      $('#couponModal').modal('show')
    },

    delCouponModal(item){
      const vm = this
      vm.tempCoupon = item
      $('#delCouponModal').modal('show')
    },
  },

  created() {
    this.getCoupons()
  }
}
</script>