<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">질문 게시판</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout" >
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>질문 번호</label>
              <md-input v-model="item.qnaNo" disabled></md-input>
            </md-field>
          </div>
           <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>질문자</label>
              <md-input v-model="item.qnaUserid" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>질문 등록 날짜</label>
              <md-input v-model="item.qnaDatetime" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>제목</label>
              <md-input v-model="item.qnaTitle" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>질문 내용</label>
              <md-input v-model="item.qnaContent" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>답변자</label>
              <md-input v-model="item.replyUserid" disabled></md-input>
            </md-field>
          </div> 
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>답변 등록 날짜</label>
              <md-input v-model="item.replyDatetime" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>답변 내용</label>
              <md-input v-model="item.replyContent" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
              <router-link to="/qnAList">
                <md-button class="md-raised md-success" @click="deleteQnA()">삭제</md-button>
              </router-link>
              <router-link :to="'QnAUpdate?no=' + item.qnaNo">
                <md-button class="md-raised md-success">수정</md-button>
              </router-link>
              <router-link :to="'QnAReply?no=' + item.qnaNo">
                <md-button class="md-raised md-success">답변</md-button>
              </router-link>
              <router-link to="/qnAList">
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
    axios.get('http://localhost:9999/happyhouse/api/qna/' + this.$route.query.qnaNo).then(({ data }) => {
      this.item = data;
    });
  },

  methods: {
      deleteQnA() {
        axios.delete('http://localhost:9999/happyhouse/api/qna/' + this.$route.query.qnaNo);
      }
  }
};
</script>

<style>

</style>
