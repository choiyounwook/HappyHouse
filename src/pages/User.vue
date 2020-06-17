<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
          <template v-if="this.$session.exists()">
              <my-page-form data-background-color="green"> </my-page-form>
          </template>
          <template v-else>
              <log-in-form data-background-color="green"> </log-in-form>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
import { MyPageForm, LogInForm } from "@/components";

export default {
  components: {
    MyPageForm,
    LogInForm,
  }
};
</script>

<style>

</style>