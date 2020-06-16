<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">공지 사항 등록</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout" >

          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>글 제목</label>
              <md-input v-model="item.subject" ></md-input>
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
                <template v-if="item.content==''||item.subject==''">
                  <md-button class="md-raised md-success" disabled>등록</md-button>
                </template>
                <template v-if="item.content!=''&&item.subject!=''">
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
        no: '',
        subject: '',
        content: '',
        noticetime: ''
      }
    };
  },

  methods: {
      onSubmit() {
          axios.post('http://localhost:9999/happyhouse/api/notice',this.item);
      }
  }
};
</script>

<style>

</style>
