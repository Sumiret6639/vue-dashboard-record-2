<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                  placeholder="請輸入圖片連結" v-model="addTemp.imageUrl">
              </div>
              <div class="form-group">
                <label for="customFile">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="addStatus.isUpdating"></i>
                </label>
                <input type="file" id="customFile" class="form-control"
                  ref="files" @change="updatedfile">
              </div>
              <img :src="addTemp.imageUrl"
                class="img-fluid" alt="">
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title"
                  placeholder="請輸入標題" v-model="addTemp.title">
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category"
                    placeholder="請輸入分類" v-model="addTemp.category">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input type="unit" class="form-control" id="unit"
                    placeholder="請輸入單位" v-model="addTemp.unit">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                  <input type="number" class="form-control" id="origin_price"
                    placeholder="請輸入原價" v-model="addTemp.origin_price">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" id="price"
                    placeholder="請輸入售價" v-model="addTemp.price">
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea type="text" class="form-control" id="description"
                  placeholder="請輸入產品描述" v-model="addTemp.description"></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                  placeholder="請輸入產品說明內容" v-model="addTemp.content "></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                    id="is_enabled" v-model="addTemp.is_enable"
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
          <button type="button" class="btn btn-primary" @click="emitProduct(addTemp)">確認</button>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  props:{
    addTemp: {
      type: Object,
    },

    addStatus: {
      type: Object,
    }
  },

  methods:{
    emitProduct(item){
      // console.log(item)
      this.$emit('emitproduct', item)
    },

    updatedfile() {
      console.log(this)
      const vm = this
      const updatedFile = this.$refs.files.files[0]
      console.log(updatedFile)
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      const formData = new FormData()
      // vm.status.isUpdating = true
      formData.append('file-to-upload', updatedFile)
      this.$http.post(api, formData, {
        headers:{
          'Content-Type' : 'multipart/form-data',
        } 
      }).then((response)=>{
        console.log(response.data)
        // vm.status.isUpdating = false
        if(response.data.success){
          vm.$set(vm.addTemp, 'imageUrl', response.data.imageUrl)
          // vm.tempProduct.imgUrl = response.data.imgUrl
        }else{
          this.$bus.$emit('message:push',response.data.message, 'danger')
        }
      })
    },
  }
}
</script>
