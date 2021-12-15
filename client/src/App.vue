<template>
<div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">SoldOut</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item">
                        <router-link class="nav-link"  to="/">홈</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">제품리스트</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/detail">제품상세페이지</router-link>
                    </li>

                    <li class="nav-item" v-if="user.email != undefined">
                        <router-link class="nav-link" to="/salesList">제품등록페이지</router-link>
                    </li>



                    <li v-if="user.email==undefined"><button class="btn btn-success" type="button" @click="kakaoLogin">로그인</button></li>
                    <li v-else><button class="btn btn-danger" type="button" @click="kakaoLogout">로그아웃</button></li>

                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  
                </form>
            </div>
        </div>
    </nav>

  <router-view/>


  
    <footer class="mt-5 py-5 bg-dark">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-md-10 offset-md-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img"
                    viewBox="0 0 24 24">
                    <title>Product</title>
                    <circle cx="12" cy="12" r="10" />
                    <path
                        d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" />
                </svg>
                <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
            </div>
            <div class="col-3 col-md-3 offset-md-1">
                <h5>Features</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="link-secondary" href="#">Cool stuff</a></li>
                    <li><a class="link-secondary" href="#">Random feature</a></li>
                    <li><a class="link-secondary" href="#">Team feature</a></li>
                    <li><a class="link-secondary" href="#">Stuff for developers</a></li>
                    <li><a class="link-secondary" href="#">Another one</a></li>
                    <li><a class="link-secondary" href="#">Last time</a></li>
                </ul>
            </div>
            <div class="col-3 col-md-3">
                <h5>Resources</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="link-secondary" href="#">Resource name</a></li>
                    <li><a class="link-secondary" href="#">Resource</a></li>
                    <li><a class="link-secondary" href="#">Another resource</a></li>
                    <li><a class="link-secondary" href="#">Final resource</a></li>
                </ul>
            </div>
            <div class="col-3 col-md-3">
                <h5>Resources</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="link-secondary" href="#">Business</a></li>
                    <li><a class="link-secondary" href="#">Education</a></li>
                    <li><a class="link-secondary" href="#">Government</a></li>
                    <li><a class="link-secondary" href="#">Gaming</a></li>
                </ul>
            </div>

        </div>
    </footer>
</div>
</template>



<script>
export default {
  computed:{
      user(){
          return this.$store.state.user;
      }
  },
  methods: {
     kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.profile.nickname; //카카오 닉네임
          const email = kakao_account.email; //카카오 이메일
 
          console.log("kakao_account", kakao_account);
          console.log("nickname", nickname);
          console.log("email", email);
          //로그인 처리 구현
 
          console.log(kakao_account);
         //  this.$store.commit("user", kakao_account);
 
          this.login(kakao_account);
               

        },
        fail: (error) => {
          // this.$router.push("/errorPage");
          console.log(error);
        },
      });
    },

   async login(kakao_account){
       console.log("/api/login");
       await this.$api('/api/login',"post",{
           param:[
               {
                   email:kakao_account.email,
                   nickname:kakao_account.profile.nickname               
               },
               {nickname:kakao_account.profile.nickname  }
           ]
       });
       
        this.$store.commit('user', kakao_account);
        alert("로그인 성공!");
        console.log("user() 상태  "  , this.user.email);
   },

    kakaoLogout() {
      if (!window.Kakao.Auth.getAccessToken()) {
        console.log("Not logged in.");
        return;
      }
 
      window.Kakao.Auth.logout((response) => {
        //로그아웃

         this.$store.commit('user', {});
            alert("로그아웃");
            console.log("access token:", window.Kakao.Auth.getAccessToken());
            console.log("log out:", response);
            console.log("user() 상태  "  , this.user);
            this.$router.push({path:'/'});
      });
    },


  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.badge{
  margin-right: 3px;
}

a{
    cursor: pointer;
}
.span-minus, .span-plus{
    cursor: pointer;
}
</style>
