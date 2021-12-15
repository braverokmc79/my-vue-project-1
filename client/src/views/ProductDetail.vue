<template>
    <div>



        <main class="mt-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-5">

                        <div id="carouselExampleIndicators" class="carousel carousel-dark slide "
                            data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">

                                <div :class="`carousel-item ${i==0? 'active' :''}`" v-for="(image, i) in productImage"
                                    :key="i">
                                    <img :src="image.path" class="d-block w-100" alt="...">
                                </div>



                            </div>
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                    <div class="col-md-7">

                        <!-- active_yn: "Y"
add_delivery_price: 5000
category1: "전자제품"
category2: "컴퓨터"
category3: "악세사리"
category_id: 1
created_date: "2021-12-02T23:08:32.000Z"
delivery_price: 2500
outbound_days: 5
path: "http://placeimg.com/526/526/tech/grayscale"
product_id: 1
product_name: "웨이코스 씽크웨이 CROAD C604 체리미엄 PBT"
product_price: 75820
seller_id: 1
tags: "키보드,기계식,게이밍"
type: 3 -->

                        <div class="card shadow-sm ">
                            <div class="card-body">
                                <h5 class="card-title">{{productDetail.product_name}} </h5>
                                <h5 class="card-title pt-3 pb-3 border-top">{{getCurrencyFormat(productDetail.product_price)}}원 </h5>
                                <p class="card-text pt-3 pb-3 border-top">
                                    <span class="badge bg-dark">{{productDetail.category1}}</span>
                                    <span class="badge bg-dark">{{productDetail.category2}}</span>
                                    <span class="badge bg-dark">{{productDetail.category3}}</span>
                                </p>

                                <p class="card-text  pb-3 border-top">
                                    배송비 {{getCurrencyFormat(productDetail.delivery_price)}}원 | 도서산관(제주도) 베송비 추가
                                    {{getCurrencyFormat(productDetail.add_delivery_price)}}원 | 택배배송 | {{getCurrencyFormat(productDetail.outbound_days)}}일 이내
                                    출고 (주말,공휴일 제외)
                                </p>

                                <div class="card-text border-top pb-3">
                                    <div class="row">
                                        <div class="col-auto">
                                            <label class="col-form-label">구매수량</label>
                                        </div>
                                        <div class="col-auto">

                                            <div class="input-group mb-3">
                                                <span class="input-group-text span-minus"
                                                    @click="calculatePrice(-1)">-</span>
                                                <input type="text" class="form-control text-end"
                                                    aria-label="Amount (to the nearest dollar)" style="width:60px"
                                                    v-model="total">
                                                <span class="input-group-text span-plus"
                                                    @click="calculatePrice(1)">+</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="row pt-3 pb-3 border-top">
                                    <div class="col-6">
                                        <h3>총 상품 금액</h3>
                                    </div>
                                    <div class="col-6 text-end">
                                        <h3>{{getCurrencyFormat(totalPrice)}}원</h3>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <div class="col-6 d-grid p-1">
                                        <button type="button" class="btn btn-lg btn-dark  ">장바구니담기</button>
                                    </div>
                                    <div class="col-6 d-grid p-1">
                                        <button type="button" class="btn btn-lg  btn-danger y">주문하기</button>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>



            <div class="container mt-3">
                <div class="row">
                    <div class="col-12">
                        <img :src="productDetail.path" class="img-fluid">
                    </div>
                </div>
            </div>
        </main>


    </div>
</template>

<script>
    export default {

        data() {
            return {
                productId: 0,
                productDetail: {},
                productImage: [],
                totalPrice: 0,
                total: 1
            }
        },
        created() {
            this.productId = this.$route.query.product_id;
            this.getProductDetail();
            this.getProductImage();
            this.totalPrice;
            console.log("상세 - created");
        },

        methods: {

            calculatePrice(cnt) {                
                let total=this.total+cnt;
                if(total<1) total=1;
                this.total=total;
                this.totalPrice=this.productDetail.product_price * this.total;

            },

            getCurrencyFormat(price){
                return this.$currencyFormat(price);
            },

            async getProductDetail() {
                  console.log("상세페이지 - getProductDetail");
                  
                let productDetail = await this.$api("/api/productDetail", "POST", {
                    param: [this.productId]
                });
                if (productDetail.length > 0) {
                    this.productDetail = productDetail[0];
                    this.totalPrice=this.productDetail.product_price;                    
                }
                console.log(this.productDetail);
                
            },

            async getProductImage() {
                this.productImage = await this.$api("/api/productMainImages", "POST", {
                    param: [this.productId]
                });
                console.log(this.productImage);
            }



        },
    }
</script>

<style scoped>
</style>