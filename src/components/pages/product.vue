<template>
  <div class="mt-5" >
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" data-toggle="modal" data-target="#productModal"
      @click="showModal(true)">建立新產品</button>
    </div>
    
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="80">分類</th>
          <th width="120">產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th >啟用狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">
            {{item.origin_price | currency}} / {{item.unit}}
          </td>
          <td class="text-right">
            {{item.price | currency}} / {{item.unit}}
          </td>
          <td>
            <span v-if="item.is_enable == 1" class="text_success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <button class="btn btn-outline-primary btn-sm mt-2" @click="showModal(false, item)">編輯</button>
          <button class="btn btn-outline-primary btn-sm mt-2" @click="showDelModal(true, item)">刪除</button>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <Pagination 
        :paginationData="pagination" 
        v-on:emitpage="getProducts">
      </Pagination>
    </nav>   
    
    <AddModal 
      :addTemp="tempProduct" 
      :addStatus="status"
      v-on:emitproduct="updatedProduct">
    </AddModal>

    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
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
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="deleteProduct(true)"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from './pagination'
import AddModal from './addModal'

export default {
  components: {
    Pagination,
    AddModal,
    },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isDel: false,
      isLoading: false, 
      status: {
        isUpdating: false
      },
      pagination: {}
    }
  },
  methods: {
    getProducts(page = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response)=>{
        console.log(response) 
        vm.isLoading = false
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },

    showModal(isNew, item){
      // 模板和行為同時提供給編輯和新增使用
      if(isNew){
        this.tempProduct = {}
        this.isNew = true
        this.isDel = false
      }else{
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      $('#productModal').modal('show')
    },

    showDelModal(isDel, item){
      if(isDel){
        $('#delProductModal').modal('show')
        this.isDel = true
        this.tempProduct = item
      }else{
        this.isDel = false
      }
    },

    deleteProduct(isDel){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      const vm = this
      let httpMethod = ''
      
      if(vm.isDel){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'delete'
      }
        this.$http[httpMethod](api, {data : vm.tempProduct}).then((response)=>{
        console.log(response.data)
        if(response.data.success){
          $('#delProductModal').modal('hide')
          this.getProducts()
        }else{
          $('#delProductModal').modal('hide')
          this.getProducts()
          console.log("新增失敗")
        }
      })
    },

    updatedProduct(item = {}){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      const vm = this
      let httpMethod = 'post' 
      let mod = '#productModal'
      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
        this.$http[httpMethod](api, {data :item}).then((response)=>{
        console.log(response.data)
        if(response.data.success){
          $(mod).modal('hide')
          this.getProducts()
        }else{
          $(mod).modal('hide')
          this.getProducts()
          console.log("新增失敗")
        }
      })
    }
  },

  created(){
    this.getProducts()
  }
}
</script>