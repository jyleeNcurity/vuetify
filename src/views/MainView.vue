<template>
  <v-container fluid>
    <v-app-bar app color="#124f84" dark class="pr-4">

      <!-- <v-row :style="{ width: '120px' }"> -->
      <v-row>
        <v-col cols="auto">
          <p class=" text-h4 font-weight-bold mb-0 ml-5 mt-4">I T M</p>
          <p class="white--text ml-5 mb-0" style="font-size:14px">a proofpoint company</p>
        </v-col>
      </v-row>

      <!-- <v-spacer></v-spacer> -->

      <span class="mr-2 mt-3">{{ PrintUser() }}</span>
      <span class="mr-2 mt-3"><span>|</span></span>
      <v-btn text @click="logout" class="pa-0 mt-3">
        <span>로그아웃</span>
      </v-btn>


      <template v-slot:extension>

        <v-tabs centered fixed-tabs>
          <v-tab style="font-size:15px" class="font-weight-bold " v-for="item in items" :key="item.title" link
            :to="item.to">{{
                item.title
            }}
          </v-tab>
        </v-tabs>
      </template>

    </v-app-bar>

    <v-main>
      <v-card class="nowarp" flat outlined>
        <v-row no-gutters>
          <v-col cols="auto" align-self="start">

            <v-navigation-drawer floating permanent>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h7" color="#124f84">

                    <p class="font-weight-bold">메뉴</p>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to"
                  active-class="primary--text text--accent-5">

                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>

          <v-col>
            <v-card class="pa-3 " outlined>
              <router-view />
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      right: null,
      items: [
        { title: '경고', to: "/warning" },
        { title: '상관관계', to: "/relation" },
        { title: '응용프로그램', to: "/program" },

      ],
    }
  },
  methods: {
    logout() {
      // sessionStorage.clear()
      this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
      this.$router.replace({ name: 'loginPage' })
    },
    PrintUser() {
      // const User = JSON.parse(sessionStorage.getItem("user"));
      const User = this.$cookies.get("user");
      return User;
    }
  }
}
</script>

<style>
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}
</style>