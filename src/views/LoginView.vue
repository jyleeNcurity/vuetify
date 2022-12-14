<template>
  <v-main>
    <v-container class="loginPage" fluid>

      <v-container class="loginContainer">
        <v-container class="mb-5">
          <v-row>
            <v-col>
              <p class="text-h3 white--text font-weight-bold mb-0  ">I T M</p>
              <p class="white--text mb-0 ">a proofpoint company</p>
            </v-col>
          </v-row>
        </v-container>
        <v-form class="loginForm">
          <v-text-field solo label="사용자이름" clearable v-model="username" @keyup.enter="checkLogin" class="ma-0">
          </v-text-field>
          <v-text-field solo label="암호" clearable v-model="password" type="password" @keyup.enter="checkLogin">
          </v-text-field>
          <v-btn class="loginBtn ml-1" color='primary' width="150" @click="checkLogin">
            로그인
          </v-btn>

          <v-alert class="loginfail ml-13 mt-5" outlined type="error" v-if="loginfailed" max-width="300px">
            사용자 정보를 확인하세요
          </v-alert>
        </v-form>

      </v-container>

      <!-- <v-alert dense outlined text type="error" width="100px"></v-alert> -->

    </v-container>
  </v-main>

</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loginfailed: false
      // accessToken: ""
    }
  },
  methods: {
    checkLogin() {
      const body = {
        username: this.username,
        password: this.password
      };
      // this.$store.dispatch("LOGIN", body)

      fetch(`/v2/apis/auth/logins`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("err");
          }
          return response.json();
        })
        .then((json) => {
          console.log(json);
          this.$cookies.set("token", json.access_token, { expires: "0" });
          this.$cookies.set("user", json.oit.name, { expires: "0" });
          this.$router.replace({ name: "mainPage" });
        })
        .catch(() => {
          this.loginfailed = true
        });

      this.username = ""
      this.password = ""
    },
  }
}
</script>

<style>
.loginfail {
  width: 260px;
  font-size: 16px;
  margin: 0 !important;
  border: 0px !important;
}

.loginPage {
  background: linear-gradient(#124f84, #162c41);
  height: 100%
}

.loginContainer {
  margin-top: 8%;
  text-align: center
}

.loginForm {
  display: inline-block;
  width: 372px;
}

p {
  user-select: none;
}
</style>