<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <log-in-form data-background-color="green"> </log-in-form>
      </div>
    </div>
  </div>
</template>

<script>
import { LogInForm } from "@/components";

export default {
  components: {
    LogInForm,
  }
};
</script>

<style>

</style>