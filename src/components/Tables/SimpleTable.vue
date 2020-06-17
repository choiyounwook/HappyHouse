<template>
  <div>
    <!-- <div class="md-autocomplete">
      <md-autocomplete
        class="search"
        v-model="selectedEmployee"
        :md-options="employees"
      >
        <label>Search...</label>
      </md-autocomplete>
    </div> -->
    <!-- <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <div class="md-layout-item md-small-size-100 md-size-50">
      <md-field>
              <label>ID</label>
              <md-input v-model="userid" type="text"></md-input>
            </md-field>
    </div> -->

    <md-table v-model="paginatedData" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="번호">{{ item.no }}</md-table-cell>
        <md-table-cell md-label="동">{{ item.dong }}</md-table-cell>
        <md-table-cell md-label="아파트이름"> <router-link :to="'housedeal?no=' + item.no">{{ item.aptName }}</router-link> </md-table-cell>
        <md-table-cell md-label="거래금액">{{ item.dealAmount }}</md-table-cell>
        <md-table-cell md-label="거래종류">{{ item.type }}</md-table-cell>
      </md-table-row>
    </md-table>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
    <!-- <paginate
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
    </paginate> -->

    <div id="searchbar" class="md-layout-item md-small-size-100 md-size-50">
      <md-field>
        <label>검색</label>
        <md-input v-model="keyword" type="text"></md-input>
        <select v-model="searchType">
          <option disabled value=""></option>
          <option>주택 이름</option>
          <option>동</option>
        </select>
      </md-field>
      <div class="md-layout-item md-size-100 text-center">
        <md-button class="md-raised md-success" @click="search">검색</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate';


export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      items: [],
      // selected: [],
      pageNum: 0,
      pageSize: 10,
      page: 10,
      selected: '',
      userid: '',
      keyword: '',
      searchType: '',
    };
  },
    created() {
      axios.get('http://localhost:9999/happyhouse/api/housedeal').then(({ data }) => {
        console.log('hi');
          this.items = data;
          this.count = this.pageCount();
          this.paginated = this.paginatedData();
          console.log('count' + count);
        });
    },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },

    search() {
      console.log(this.searchType);
      
      if (this.searchType == '주택 이름') {
        axios.get('http://localhost:9999/happyhouse/api/housedeal/aptname/' + this.keyword).then(({ data }) => {
          console.log(data);
          this.item = data;
                    this.count = this.pageCount();
          this.paginated = this.paginatedData();
          console.log(this.pageCount());
        });
      } else if (this.searchType == '동') {
        axios.get('http://localhost:9999/happyhouse/api/housedeal/dong/' + this.keyword).then(({ data }) => {
          console.log(data);
          this.item = data;
          this.count = this.pageCount();
          this.paginated = this.paginatedData();
          console.log(this.pageCount());
        });
      }
    },
  },
  computed: {    
    pageCount () {
      let listLeng = this.items.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      
      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      return this.items.slice(start, end);
    }
  }
};
</script>

<style lang="css">
.pagination {
}
.page-item {
}

select {
  border: 0px solid #66CCFF;
}

#searchbar {
  margin: 0px auto;
}
</style>