<template>
    <div>

        <main class="mt-3">
            <div class="container">
               
                        <div class="text-end mb-1">
                            <button type="button" class="btn btn-dark" @click="goToInsert">제품 등록</button>
                        </div>
            <table class="table table-border">
                <thead>
                    <tr>    
                        <th></th>
                        <th>제품명</th>
                        <th>제품가격</th>
                        <th>배송비</th>
                        <th>추가 배송비</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, i) in productList"  :key="i">
                        <td><img :src="product.path"  style="height: 50px; width:auto"></td>

                        <td>{{product.product_name}}</td>
                        <td>{{product.product_price}}</td>
                        <td>{{product.delivery_price}}</td>
                        <td>{{product.add_delivery_price}}</td>
                        <td>
                            <button type="button" class="btn btn-info me-1 mb-1" @click="goToImageInsert(product.product_id)">사진등록</button>
                            <button type="button" class="btn btn-warning me-1 mb-1" @click="goToUpdate(product.product_id)">수정</button>
                            <button type="button" class="btn btn-danger me-1" @click="deleteProduct(product.product_id)">삭제</button>
                        </td>
                    </tr>
                </tbody>

            </table>
             
             
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
                this.productList = await this.$api("/api/productList2", "post", {});
            },
            
            goToDetail(product_id){
                this.$router.push({path:'/detail', query:{product_id:product_id}});              
            },

            goToInsert(){
                this.$router.push({path:'/create'})
            },

            goToImageInsert(product_id){
                this.$router.push({path:'/image_insert', query:{product_id:product_id}});    
            },

            goToUpdate(product_id){
                this.$router.push({path:'/update', query:{product_id:product_id}});
            },

            deleteProduct(product_id){
                    console.log("삭제 " ,product_id);

                    this.$swal.fire({
                        title: '정말 삭제 하시겠습니까?',
                        showCancelButton: true,
                        confirmButtonText: `삭제`,
                        cancelButtonText:"취소"
                    }).then(async (result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                           console.log("삭제 처리되었습니다. ");
                           await this.$api("/api/productDelete", "POST", {param:[product_id]});
                           this.getProductList();
                           this.$swal.fire('삭제되었습니다.', '', 'success')                           
                        }
                    });



              //  if(this.$swal('삭제 하시겠습니까?')){
               //    console.log("삭제 " ,product_id);
                //}

               // if(confirm("정말 삭제 하시겠습니까?")){
                    //await this.$api("/api/productDelete", "POST", {param:[product_id]});
               // }


            }


        }

    }
</script>

<style scoped>

</style>