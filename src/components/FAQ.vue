<template>
    <div class="container-fluid FAQ-content pb-80">
        <div class="bg-cover-500 container-fluid" :style="{backgroundImage:'url('+imgs[0]+')'}">
            <div class="container pl-5">
                <h2 class="img-title">
                    常見
                    <br>問題
                </h2>                
            </div>
        </div>
        <ul class="question-lists container">
            <li class="question-list-item">
                <div for="" class="slide-down-list">
                    <h5 class="quesition-title dib">Q1.請問是否有實體門市？</h5>
                    <input type="checkbox" name="" id="">
                    <div class="slide-content">
                        A1.目前商品均以線上店舖販售，尚未有實體店面。
                        <br>部分代理和自製產品預定於9月前於特定通路上架。詳細訊息將再於官網公布，或可訂閱我們接收最新開幕和優惠訊息。
                    </div>
                </div>
            </li>
            <li class="question-list-item">
                <div for="" class="slide-down-list">
                    <h5 class="quesition-title dib">Q2.是否可以超商取貨付款？</h5>
                    <input type="checkbox" name="" id="">
                    <div class="slide-content">
                        A2.請於訂單加註需超商取貨，我們將於寄給您的商品確認信件中附上超商取貨專屬代碼。
                            <br>也可選擇純取貨或者純付款。
                    </div>
                </div>
            </li>
            <li class="question-list-item">
                <div for="" class="slide-down-list">
                    <h5 class="quesition-title dib">Q3.我適合怎麼樣的產品？</h5>
                    <input type="checkbox" name="" id="">
                    <div class="slide-content">
                        A3.我們的產品均不含人工香精、合成添加物，過敏者可用。
                        <br>產品均有對應適合的年齡和膚質。美妝類若不確定自己膚況如何，請先與皮膚科醫師確認。
                        <br>寶寶產品適用各種年齡和膚況，效用溫和，適合長期保養和改善肌膚基底。
                    </div>
                </div>
            </li>
            <li class="question-list-item">
                <div for="" class="slide-down-list">
                    <h5 class="quesition-title dib">Q4.如果不適合能否退貨？</h5>
                    <input type="checkbox" name="" id="">
                    <div class="slide-content">
                        A4.我們非常重視您的體驗，也希望您可以挑選到真正適合肌膚的產品。
                        <br>因此退貨和換貨可於售出七天內申請。
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgs:[
                "https://images.unsplash.com/photo-1585431549947-1e9d762abd1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            ]
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/all";

.FAQ-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
    background-color: #F5EBEF;
}

.question-list-item{ 
    position: relative;
    border: 1px dashed #000;
    margin: margin(1);
    background-color: rgba(#fff, 0.5);
    
    .quesition-title{
        font-size: 20px;
        line-height: 60px;
        padding: 0px 36px; 
        font-weight: 500;
    }

    input[type=checkbox]{
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        outline: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
    }
    

    .slide-content{
        display: none;
        font-size: 16px;
        line-height: 24px;
    }

    input[type=checkbox]:checked + .slide-content{
        display: block;
        border-top: 1px solid #000;
        background-color: rgba($pink-lighten,0.5);
        padding: 22px 38px;
    }
}
</style>