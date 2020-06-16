<template>
  <div>
    <md-table v-model="paginatedData" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="질문 번호">{{ item.qnaNo }}</md-table-cell>
        <md-table-cell md-label="제목"> <router-link :to="'qnAdetail?qnaNo=' + item.qnaNo">{{ item.qnaTitle }}</router-link> </md-table-cell>
        <md-table-cell md-label="작성자">{{ item.qnaUserid }}</md-table-cell>
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
    <div class="md-layout-item md-size-100 text-right">
        <router-link to="/qnAAdd">
          <md-button class="md-raised md-success">등록</md-button>
        </router-link>
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
    };
  },
    created() {
      axios.get('http://localhost:9999/happyhouse/api/qna').then(({ data }) => {
          this.items = data;
        });
    },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
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
</style>