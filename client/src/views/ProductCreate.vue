<template>
    <div>


    <main class="mt-3">
        <div class="container">
            <h2 class="text-center">제품 등록</h2>

            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="product.product_name">
                </div>
            </div>


            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품가격</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="product.product_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>

            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">배송비</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="product.delivery_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>

            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">추가배송비(도서산간)</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="product.add_delivery_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>


            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품카테고리</label>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-auto">
                            <select class="form-select"  @change="changeCategory1" v-model="cate1">
                                <option v-for="(cate,i) in category1" :key="i" :value="cate" >{{cate}}</option>
                            </select>
                        </div>

                        <div class="col-auto">
                            <select class="form-select" @change="changeCategory2"  v-model="cate2">
                                  <option v-for="(cate,i) in category2" :key="i" :value="cate" >{{cate}}</option>
                            </select>
                        </div>


                        <div class="col-auto">
                            <select class="form-select" v-model="cate3">
                               <option v-for="(cate,i) in category3" :key="i" :value="cate" >{{cate}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>


            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">태그</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" v-model="product.tags">
                </div>
            </div>


            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">출고일</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" v-model="product.outbound_days">
                        <span class="input-group-text">일 이내 출고</span>
                    </div>
                </div>
            </div>


            <div class="mb-3 row">
                <div class="col-6 d-grid p-1">
                    <button type="button" class="btn btn-lg btn-dark" @click="goToList">취소하기</button>
                </div>
                <div class="col-6 d-grid p-1">
                    <button type="button" class="btn btn-lg  btn-danger y" @click="productInsert">저장하기</button>
                </div>
            </div>


      
        </div>
    </main>



    </div>
</template>

<script>
    export default {
        data(){
            return {
                product:{
                    product_name:"",
                    product_price:0,
                    delivery_price:0,
                    add_delivery_price:0,
                    tags:"",
                    outbound_days:0,
                    seller_id:1,
                    category_id:1
                },
               categoryList:[],
               category1:[],
               category2:[],
               category3:[],
               cate1:"",
               cate2:"",
               cate3:""

            }
        },
            
        created() {
            this.getCategoryList();

        },
        computed:{
            user(){
                return this.$store.state.user;
            }
        },
        mounted() {
            if(this.user.email==undefined){
                //로그인 되어 있지 않으면 첫화면으로
               alert("로그인을 해야 이용할 수 있습니다.");
               this.$router.push({path:'/'});

            }
        },
        methods: {
            async getCategoryList(){
                let categoryList =await this.$api('/api/categoryList', 'post', {});
                this.categoryList=categoryList;
                console.log("카테고리 목록");
                console.log(categoryList);

                let oCategory ={}
                categoryList.forEach(item => {                        
                       oCategory[item.category1] =item.category_id;
                });
                console.log("oCategory :" );
                console.log(oCategory);

                let i=0;
                for(let key in oCategory){
                    if(i==0) this.cate1=key;
                    this.category1.push(key);
                    i++
                }
                console.log(this.category1);


                ////2. 카테고리 ////////////////////////
                let category2 =[]
                 category2 =categoryList.filter(item=>{
                     return  item.category1==this.category1[0];
                 });

                let oCategory2 ={}
                category2.forEach(item => {                        
                       oCategory2[item.category2] =item.category_id;
                });
                
                i=0;
                for(let key in oCategory2){  
                    if(i==0) this.cate2=key;                 
                    this.category2.push(key);                    
                    i++;
                }

                ////3. 카테고리 ////////////////////////
               let category3 =[]
               category3 =categoryList.filter(item=>{
                     return  item.category2==this.category2[0];
               });
              
               let oCategory3 ={}
               category3.forEach(item => {                        
                       oCategory3[item.category3] =item.category_id;
               });
               
               i=0;
               for(let key in oCategory3){
                    if(i==0) this.cate3=key;    
                    this.category3.push(key);
                    i++;
                }
                console.log("category3");
                console.log(this.category3);

            },

            changeCategory1(){
                console.log("changeCategory1" +this.cate1)   ;
                
                let filterCartegory=[];
                this.categoryList.forEach(item=>{
                    if(item.category1==this.cate1){
                        filterCartegory.push(item);
                    }
                });

                console.log(filterCartegory);

                 let oCategory2 ={};
                 filterCartegory.forEach(item=>{
                     oCategory2[item.category2]=item.category_id
                 });

                console.log(oCategory2);

                let category2=[];          
                let  i=0;
                for(let key in oCategory2){  
                    if(i==0) this.cate2=key;                 
                    category2.push(key);                    
                    i++;
                }
                this.category2=category2;

                this.changeCategory2();
            },

            changeCategory2(){
                console.log("changeCategory2" +this.cate2)   ;
                
                let filterCartegory=[];
                this.categoryList.forEach(item=>{
                    if(item.category2==this.cate2){
                        filterCartegory.push(item);
                    }
                });

                console.log(filterCartegory);

                 let oCategory3 ={};
                 filterCartegory.forEach(item=>{
                     oCategory3[item.category3]=item.category_id
                 });

                console.log(oCategory3);

                let category3=[];          
                let  i=0;
                for(let key in oCategory3){  
                    if(i==0) this.cate3=key;                 
                    category3.push(key);                    
                    i++;
                }
                this.category3=category3;
            }

            ,
             productInsert(){

                    if(this.product.product_name==""){
                        return this.$swal("제품명은 필수 입력값 입니다.");
                    }

                    if(this.product.product_price=="" || this.product.product_price ==0){
                        return this.$swal("제품 가격을 입력하세요.");
                    }


                    if(this.product.delivery_price=="" || this.product.delivery_price ==0){
                        return this.$swal("배송료를 입력하세요.");
                    }

                    if(this.product.add_delivery_price=="" || this.product.add_delivery_price ==0){
                        return this.$swal("추가배송료를  입력하세요.");
                    }

                   if(this.product.outbound_days=="" || this.product.outbound_days ==0){
                        return this.$swal("출고일을 입력하세요.");
                    }

                    this.product.category_id=this.categoryList.filter(item=>{
                     return (item.category1 ==this.cate1 && item.category2==this.cate2 && item.category3==this.cate3)
                    })[0].category_id;

                    console.log("categor_id : " +this.product.category_id);


                    this.$swal.fire({
                        title: '정말 등록 하시겠습니까?',
                        showCancelButton: true,
                        confirmButtonText: `생성`,
                        cancelButtonText:"취소"
                    }).then(async (result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                           console.log("등록 처리되었습니다. ");
                           await this.$api("/api/productInsert", "POST", {param:[this.product]});
                           this.$swal.fire('등록 되었습니다.', '', 'success') ;
                           this.$router.push({path:"/salesList"}) ;                        
                        }
                    });

            },

            goToList(){
                this.$router.push({path:'/salesList'});
            }


        },  
    }
</script>

   

<style scoped>

</style>