<template>
  <div>
    <md-table v-model="paginatedData" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="번호">{{ item.no }}</md-table-cell>
        <md-table-cell md-label="동">{{ item.dong }}</md-table-cell>
        <md-table-cell md-label="아파트이름"> <router-link :to="'housedeal?no=' + item.no">{{ item.aptName }}</router-link> </md-table-cell>
        <md-table-cell md-label="거래금액">{{ item.dealAmount }}</md-table-cell>
        <md-table-cell md-label="거래종류">{{ item.type }}</md-table-cell>
      </md-table-row>
    </md-table>
    <div id="loading" v-if="loadingFlag">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "simple-table",

  components: {
    PulseLoader
  },

  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      items: [],
      pageNum: 0,
      pageSize: 10,
      page: 10,
      selected: '',
      userid: '',
      keyword: '',
      searchType: '',
      loadingFlag: false,
    };
  },
    created() {
      this.loadingFlag = true;
      axios.get('http://localhost:9999/happyhouse/api/housedeal').then(({ data }) => {
          this.items = data;
          this.loadingFlag = false;
        });
    },
  methods: {
    notifyVue(verticalAlign, horizontalAlign, msg, type) {
      this.$notify({
        message: msg,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type
      });
    },

    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },

    search() {
      this.loadingFlag = true;
      if (!this.searchType) {
        this.notifyVue('top', 'center', '검색 타입을 선택해야 합니다.', 'danger');
        this.loadingFlag = false;
      } else if (!this.keyword) {
        axios.get('http://localhost:9999/happyhouse/api/housedeal').then(({ data }) => {
          this.items = data;
        });
        this.loadingFlag = false;
      }else if (this.searchType == '주택 이름') {
        axios.get('http://localhost:9999/happyhouse/api/housedeal/aptname/' + this.keyword).then(({ data }) => {
          this.items = data;
        });
        this.loadingFlag = false;
      } else if (this.searchType == '동') {
        axios.get('http://localhost:9999/happyhouse/api/housedeal/dong/' + this.keyword).then(({ data }) => {
          this.items = data;
        });
        this.loadingFlag = false;
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

#loading {
  width: 60px;
  margin: 0px auto;
}

#searchbar {
  margin: 0px auto;
}
</style>