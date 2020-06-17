<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Log In</h4>
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
              <label>Password</label>
              <md-input v-model="userpwd" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-50 text-right">
            <md-button class="md-raised md-success" @click="check">로그인</md-button>
          </div>
          <div class="md-layout-item md-size-50 text-left">
              <router-link to="/findpassword">
                <md-button class="md-raised md-success">비밀번호 찾기</md-button>
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
  name: "log-in-form",

  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      userid: null,
      userpwd: null,
    };
  },

  created() {
      if (this.$session.exists()) {
          console.log("세션 유지중");
          console.log(this.$session.get('password'));
      }
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
      if (!this.userid || !this.userpwd) {
        this.notifyVue('top', 'center', '빠진항목이 있습니다.', 'danger');
      } else {
          this.logIn()
      }
    },

    logIn() {
        axios.get('http://localhost:9999/happyhouse/api/user/login/' + this.userid + '&' + this.userpwd).then(({ data }) => {
            if (typeof data.userid != "undefined") {
                this.notifyVue('top', 'center', '로그인 성공!', 'success');
                this.$session.set('user', this.userid);
                this.$session.set('password', this.userpwd);
                this.$router.push('/');
            } else {
                this.notifyVue('top', 'center', '로그인 실패!', 'danger');
            }
        });
    },
  }
};
</script>
<style></style>
