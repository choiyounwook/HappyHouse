<template>
  <div>
    <md-table v-model="paginatedData" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="글 번호">{{ item.no }}</md-table-cell>
        <md-table-cell md-label="제목"> <router-link :to="'noticedetail?no=' + item.no">{{ item.subject }}</router-link> </md-table-cell>
        <md-table-cell md-label="작성자">관리자</md-table-cell>
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
    <template v-if="this.$session.get('user')=='admin'">
    <div class="md-layout-item md-size-100 text-right">
        <router-link to="/noticeAdd">
          <md-button class="md-raised md-success">등록</md-button>
        </router-link>
    </div>
    </template>
    
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
      selected: [],
      pageNum: 0,
      pageSize: 10,
      page: 10,
      keyword: '',
      searchType: '',
    };
  },
    created() {
      axios.get('http://localhost:9999/happyhouse/api/notice').then(({ data }) => {
          this.items = data;
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
      

      axios.get('http://localhost:9999/happyhouse/api/housedeal/' + this.$route.query.no).then(({ data }) => {
      this.item = data;
      this.date = data.dealYear + '.' + data.dealMonth + '.' + data.dealDay;
      });
    }
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