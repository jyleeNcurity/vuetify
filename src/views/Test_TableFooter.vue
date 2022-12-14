<template>
  <div id="app">
    <v-app class="container">
      <v-card flat>
        <h3>Vuetify Data Table - custom pagination footer example</h3>
        <v-card-title>
          <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" item-key="name" :search="search" :page.sync="page"
          :items-per-page="itemsPerPage" hide-default-footer>
        </v-data-table>


        <v-row class="text-center px-4 align-center" wrap>
          <v-col class="text-truncate" cols="12" md="2">
            Total {{ totalRecords }} records
          </v-col>
          <v-col cols="12" md="6">
            <v-pagination v-model="page" :length="pageCount">
            </v-pagination>
          </v-col>
          <v-col cols="6" md="3">
            <v-select dense outlined hide-details :value="itemsPerPage" label="Items per page"
              @change="itemsPerPage = parseInt($event, 10)" :items="perPageChoices">
            </v-select>
          </v-col>
          <v-col cols="6" md="1">
            <v-text-field v-model="page" label="Go to page" type="number" outlined hide-details dense
              @input="page = parseInt($event, 10)"></v-text-field>
          </v-col>
        </v-row>

        
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      items: [],
      headers: [
        { text: 'Beer', align: 'left', filterable: false, value: 'name' },
        { text: 'Desc', value: 'tagline' },
        { text: 'ABV', value: 'abv' },
        { text: 'IBU', value: 'ibu' },
      ],
      page: 1,
      itemsPerPage: 10,
      perPageChoices: [
        { text: '5 records/page', value: 5 },
        { text: '10 records/page', value: 10 },
        { text: '20 records/page', value: 20 },
      ]
    }
  },
  computed: {
    totalRecords() {
      return this.items.length
    },
    pageCount() {
      return this.totalRecords / this.itemsPerPage
    },
  },
  mounted() {
    axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=50')
      .then(response => {
        this.items = response.data.map((item) => {
          return {
            details: {},
            ...item
          }
        })
      })
  },
}
</script>

<style>

</style>