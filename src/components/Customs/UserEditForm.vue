<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">회원정보 수정</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>ID</label>
              <md-input v-model="item.userid" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Name</label>
              <md-input v-model="item.username" type="text"></md-input>
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
              <md-input v-model="item.phone" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Address</label>
              <md-input v-model="item.address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="check">수정</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: "user-edit-form",

  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      item: {},
      userpwd: '',
      repwd: '',
    };
  },

  created() {
        axios.get('http://localhost:9999/happyhouse/api/user/login/' + this.$session.get('user') + '&' + this.$session.get('password')).then(({ data }) => {
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

    deleteUser() {
        axios
        .delete('http://localhost:9999/happyhouse/api/user/' + this.item.userid)
        .then(({ data }) => {
            if (data === 'success') {
                this.notifyVue('top', 'center', '탈퇴가 정상적으로 처리되었습니다.', 'success');
                this.$session.destroy();
                this.$router.push('/');
            } else {
                this.notifyVue('top', 'center', '탈퇴 처리 중 오류가 발생했습니다.', 'danger');
            }
        });
    },

    check() {
      if (!this.item.username || !this.userpwd || !this.repwd || !this.item.phone || !this.item.address) {
        this.notifyVue('top', 'center', '빠진항목이 있습니다.', 'danger');
      } else {
        if (this.userpwd != this.repwd) {
            this.notifyVue('top', 'center', '비밀번호가 다릅니다.', 'danger');
        } else {
            this.userUpdate();
        }
      }
    },

    userUpdate() {
        axios
            .put('http://localhost:9999/happyhouse/api/user/updateUser/', {
                userid: this.item.userid,
                userpwd: this.userpwd,
                username: this.item.username,
                phone: this.item.phone,
                address: this.item.address,
            })
            .then(({ data }) => {
                if (data === 'success') {
                    this.$session.set('password', this.userpwd);
                    this.notifyVue('top', 'center', '회원 정보 수정이 정상적으로 처리되었습니다.', 'success');
                    this.$router.push('/');
                } else {
                    this.notifyVue('top', 'center', '회원 정보 수정 도중 에러가 발생했습니다.', 'danger');
                }
        });
    },
  }
};
</script>
<style></style>
