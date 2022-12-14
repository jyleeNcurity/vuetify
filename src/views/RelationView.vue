<template>
  <v-container fluid class="pa-0">

    <v-container class="pb-0 pt-0" fluid>
      <v-tabs>
        <v-tabs-slider color="#124f84">
        </v-tabs-slider>
        <v-tab class="font-weight-bold">상관관계</v-tab>
      </v-tabs>
    </v-container>
    <v-divider></v-divider>

    <v-data-table dense :headers="dataHeaders" :items="tableData" :expanded.sync="expanded" item-key="warning"
      show-expand class="elevation-1" show-select hide-default-footer :items-per-page="itemsPerPage" :page.sync="page"
      group-by="date" :group-desc="true" sort-by="time" :sort-desc="true">

      <template v-slot:expanded-item="{ headers, item }">

        <td :colspan="headers.length">
          <!-- More info about {{ item.endPointName.ip }} -->
          <!-- <v-data-table :headers="expandHeader" :items="expandData" :items-per-page="5" item-key="name"
            class="elevation-1" hide-default-footer>
          </v-data-table> -->

          <v-card>

            <v-list dense>

              <v-list-item>
                <v-list-item-action>
                  <v-icon color="primary">mdi-account</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="primary--text font-weight-bold">
                    누가?
                  </v-list-item-title>
                  <v-list-item-subtitle>DESKTOP-9BO9E7B\Tester</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon color="primary">mdi-mouse-variant</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="primary--text font-weight-bold">
                    수행한 작업?
                  </v-list-item-title>
                  <v-list-item-subtitle>수행된 붙여넣기: 이미지 <br>실행한 프로세스 wordpad
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon color="primary ">mdi-server</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="primary--text font-weight-bold">
                    어떤 컴퓨터에?
                  </v-list-item-title>
                  <v-list-item-subtitle>DESKTOP-9BO9E7B | 10.0.2.15</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon color="primary">mdi-laptop</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="primary--text font-weight-bold">
                    어떤 클라이언트가?
                  </v-list-item-title>
                  <v-list-item-subtitle>local (127.0.0.1)</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon color="primary">mdi-clock-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="primary--text font-weight-bold">
                    언제?
                  </v-list-item-title>
                  <v-list-item-subtitle>목요일, 11/3/2022 6:06 PM (엔드포인트 로컬 시간: 6:06 PM)</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-card>

        </td>

      </template>

      <template v-slot:item.video="{ item }">
        <v-icon size="20" class="mr-2" @click="showVideo(item)">
          mdi-television-play
        </v-icon>
      </template>

      <template v-slot:item.warning="{ item }">
        <div class="warningdata">
          <v-icon size="20" @click="showVideo(item)">
            mdi-message-outline
          </v-icon>
          <p class="ml-5 pt-2">{{ item.warning }}</p>
        </div>

      </template>

      <!-- <template v-slot:header.endPointName.ip="{ header }">
        <div class="endpoint">
          <p>{{ header.text }}</p>
          <v-switch></v-switch>
        </div>
      </template> -->

    </v-data-table>
    <!-- <v-card outlined> -->
    <v-row class="text-center px-4 align-center mt-1" wrap>
      <v-col>
        <v-pagination v-model="page" :length="pageCount" :total-visible="7" color="" class="ml-16">
        </v-pagination>

      </v-col>
      <v-col cols="auto">
        <v-select dense outlined hide-details :value="itemsPerPage" label="페이지당 항목 수" class="ml-8"
          @change="itemsPerPage = parseInt($event)" :items="perPageChoices" :style="{ width: '120px' }">
        </v-select>
      </v-col>
    </v-row>
    <!-- </v-card> -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: 20,
      itemsPerPage: 5,
      page: 1,
      perPageChoices: [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '20', value: 20 },
      ],
      expanded: [],
      singleExpand: false,
      dataHeaders: [
        { text: '', value: 'data-table-expand', sortable: false },
        { text: '날짜', value: 'date', width: '10%', sortable: false },
        { text: '시간', align: 'time', value: 'time', width: '10%', sortable: false },
        { text: '경고', value: 'warning', width: '40%', sortable: false },
        { text: '사용자', value: 'user', width: "10%", sortable: false },
        { text: '엔드포인트 이름', value: 'endPointName.ip', width: "25%", sortable: false },
        { text: '동영상', value: 'video', align: "center", width: "10%", sortable: false },

      ],
      tableData: [
        {
          date: '10/18/2022',
          time: '11:40 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 20",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/18/2022',
          time: '11:41 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 19",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/19/2022',
          time: '11:42 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 18",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/20/2022',
          time: '11:40 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 17",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/20/2022',
          time: '11:49 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 14",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/20/2022',
          time: '11:44 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 15",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/20/2022',
          time: '11:43 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 16",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/21/2022',
          time: '11:44 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 12",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/21/2022',
          time: '11:43 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 13",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/22/2022',
          time: '11:44 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 10",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/22/2022',
          time: '11:42 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 11",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/23/2022',
          time: '11:39 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 8",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/23/2022',
          time: '11:37 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 9",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/23/2022',
          time: '11:40 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 7",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/24/2022',
          time: '11:42 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 6",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/24/2022',
          time: '11:44 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 5",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/24/2022',
          time: '11:50 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 4",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/25/2022',
          time: '11:44 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 3",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/26/2022',
          time: '11:44 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 2",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },
        {
          date: '10/26/2022',
          time: '11:45 AM',
          warning: "[skt] 텍스트 복사 탐지 Rule 1",
          user: "손민성",
          endPointName: {
            name: "NOTEBOOK-SMS",
            ip: 192.10101
          },
          video: '1%',
        },

      ],
    }
  },
  mounted() {
    // const TOKEN = JSON.parse(sessionStorage.getItem("token"));
    const TOKEN = $cookies.get("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${TOKEN}`)
    fetch(`/v2/apis/report;realm=observeit/reports/audit_configuration_v0/data?rql=select()`, {
      method: "get",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
      })
  },
  computed: {
    totalRecords() {
      return this.items
    },
    pageCount() {
      return this.totalRecords / this.itemsPerPage
    },
  },

  methods: {
    showVideo(item) {
      this.dialog = true
    }
  }

}
</script>

<style>
.warningdata {
  display: flex
}

.v-data-table .v-data-table-header tr th {
  font-size: 14px !important;
}

/* main.v-main {
  padding-top: 80px !important
} */
</style>