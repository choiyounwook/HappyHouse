<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">비밀번호 찾기</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>ID</label>
              <md-input v-model="userid" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>이름</label>
              <md-input v-model="username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="check">비밀번호 찾기</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: "find-password-form",

  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      userid: null,
      username: null,
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

    check() {
      if (!this.userid || !this.username) {
        this.notifyVue('top', 'center', '빠진항목이 있습니다.', 'danger');
      } else {
          this.findPassword()
      }
    },

    findPassword() {
        axios.get('http://localhost:9999/happyhouse/api/user/searchpwd/' + this.userid + '&' + this.username).then(({ data }) => {
            if (data != "") {
                alert('회원님의 비밀번호는 ' + data);
                this.$router.push('/');
            } else {
                this.notifyVue('top', 'center', '입력하신 정보와 맞는 회원정보가 없습니다.', 'danger');
            }
        });
    },
  }
};
</script>
<style></style>
