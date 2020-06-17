<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">공지 사항</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout" >
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>글 번호</label>
              <md-input v-model="item.no" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>글 제목</label>
              <md-input v-model="item.subject" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>글 등록 날짜</label>
              <md-input v-model="item.noticeTime" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>글 내용</label>
              <md-input v-model="item.content" disabled></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-size-100 text-right">
            <template v-if="this.$session.get('user')=='admin'">
              <router-link to="/noticeList">
                <md-button class="md-raised md-success" @click="deleteNotice()">삭제</md-button>
              </router-link>
              <router-link :to="'noticeUpdate?no=' + item.no">
                <md-button class="md-raised md-success">수정</md-button>
              </router-link>
            </template>
              <router-link to="/noticeList">
                <md-button class="md-raised md-success">목록</md-button>
              </router-link>
          </div>
        </div>
      </md-card-content>
    </md-card>
    
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: "Info",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      item: {},
      date: '',
      time: ''
    };
  },


  created() {
     // 파라미터 값을 찾는 코드
    axios.get('http://localhost:9999/happyhouse/api/notice/' + this.$route.query.no).then(({ data }) => {
      this.item = data;
    });
  },

  methods: {
      deleteNotice() {
        axios.delete('http://localhost:9999/happyhouse/api/notice/' + this.$route.query.no);
      }
  }
};
</script>

<style>

</style>
