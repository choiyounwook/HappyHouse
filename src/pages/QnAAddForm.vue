<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">질문 등록</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout" >

          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>질문 제목</label>
              <md-input v-model="item.qnaTitle" ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>질문 내용</label>
              <md-input v-model="item.qnaContent" ></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-size-100 text-right">
              <router-link to="/qnAList">
                <template v-if="item.qnaContent==''||item.qnaTitle==''">
                  <md-button class="md-raised md-success" disabled>등록</md-button>
                </template>
                <template v-if="item.qnaContent!=''&&item.qnaTitle!=''">
                  <md-button class="md-raised md-success" @click=" onSubmit()">등록</md-button>
                </template>
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
      item: {
        qnaNo: '',
        qnaTitle: '',
        qnaContent: '',
        qnaDatetime: '',
        qnaUserid: this.$session.get('user')
      }
    };
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
      onSubmit() {
          axios.post('http://localhost:9999/happyhouse/api/qna',this.item).then(({data}) => {
          let msg = 'fail';
            if (data === 'success') {
              this.notifyVue('top', 'center', '질문 등록이 정상적으로 처리되었습니다.', 'success');
            } else {
              this.notifyVue('top', 'center', '질문 등록 처리 도중 에러가 발생했습니다.', 'danger');
            }
        });
      }
  }
};
</script>

<style>

</style>
