<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Edit Profile</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>ID</label>
              <md-input v-model="userid" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Name</label>
              <md-input v-model="username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Password</label>
              <md-input v-model="userpwd" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Reconfirm-PW</label>
              <md-input v-model="repwd" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Phone</label>
              <md-input v-model="phone" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Address</label>
              <md-input v-model="address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="check">회원가입</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  
  name: "sign-up-form",
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
      userpwd: null,
      repwd: null,
      address: null,
      phone: null,
      result: null
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
      if (!this.userid || !this.username || !this.userpwd || !this.address || !this.phone) {
        this.notifyVue('top', 'center', '빠진항목이 있습니다.', 'danger');
      } else {
        if (this.userpwd != this.repwd) {
          this.notifyVue('top', 'center', '비밀번호가 다릅니다.', 'danger');
        } else {
          this.createUser();
        }
      }
    },

    createUser() {
      axios
        .post('http://localhost:9999/happyhouse/api/user', {
          userid: this.userid,
          username: this.username,
          userpwd: this.userpwd,
          phone: this.phone,
          address: this.address,
        })
        .then(({data}) => {
          let msg = 'fail';
            if (data === 'success') {
              this.notifyVue('top', 'center', '회원가입이 정상적으로 처리되었습니다.', 'success');
              this.$router.push('/');
            } else {
              this.notifyVue('top', 'center', '회원가입 처리 도중 에러가 발생했습니다.', 'danger');
            }
        });
    },
  }
};
</script>
<style></style>
