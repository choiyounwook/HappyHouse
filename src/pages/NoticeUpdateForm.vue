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
              <md-input v-model="item.subject" ></md-input>
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
              <md-input v-model="item.content" ></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-size-100 text-right">
              <router-link to="/noticeList">
                <md-button class="md-raised md-success" @click="updateNotice()">수정</md-button>
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
    notifyVue(verticalAlign, horizontalAlign, msg, type) {
      this.$notify({
        message: msg,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type
      });
    },
      updateNotice() {
        console.log(this.item);
        axios.put('http://localhost:9999/happyhouse/api/notice/updateNotice/'+ this.$route.query.no,this.item).then(({data}) => {
          let msg = 'fail';
            if (data === 'success') {
              this.notifyVue('top', 'center', '공지사항 수정이 정상적으로 처리되었습니다.', 'success');
            } else {
              this.notifyVue('top', 'center', '공지사항 수정 처리 도중 에러가 발생했습니다.', 'danger');
            }
        });
      }
  }
};
</script>

<style>

</style>
