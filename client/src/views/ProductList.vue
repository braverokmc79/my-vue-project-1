<template>
    <div>

        <main class="mt-3">
            <div class="container">
                <div class="row mb-3">
                    <div class="col-12">
                        <select class="form-select">
                            <option selected></option>
                            <option value="1">노트북</option>
                            <option value="2">모니터</option>
                            <option value="3">마우스/키보드</option>
                        </select>
                    </div>
                </div>


                <div class="row g-3 mt-3 align-items-center justify-content-center">
                   
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                     v-for="(product , index) in productList"  :key="product.product_id" >
            

                        <div class="card">
                            <a  @click="goToDetail(product.product_id)">
                                 <img
                                    :src="product.path"
                                    class="card-img-top" :alt="product.product_name"> </a>
                            <div class="card-body">
                                <h5 class="card-title">{{index}}  {{product.product_name}} </h5>
                                <p class="card-text">
                                    <span class="badge bg-dark mr-2">{{product.category1}}</span>
                                    <span class="badge bg-dark mr-2">{{product.category2}}</span>
                                    <span class="badge bg-dark ">{{product.category3}}</span>
                                </p>

                                <div class="d-flex justify-content-between">
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" class="btn btn-sm  btn-outline-secondary">장바구니담기</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">주문하기</button>
                                    </div>
                                    <small class="text-dark ml-3"> {{product.product_price}}원</small>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>



            </div>
        </main>


    </div>
</template>

<script>
    export default {
        // mixins:[callAPI],//사용할 믹스인 파일을 배열로 등록


        data() {
            return {
                  productList:[]
            }
        },

        created() {
            this.getProductList();
        },

        methods: {

            async getProductList() {
                this.productList = await this.$api("/api/productList", "post", {});
            },
            
            goToDetail(product_id){
                this.$router.push({path:'/detail', query:{product_id:product_id}});              
            }

        }

    }
</script>

<style scoped>

</style>