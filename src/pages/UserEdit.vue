<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <user-edit-form data-background-color="green"> </user-edit-form>
      </div>
    </div>
  </div>
</template>

<script>
import { UserEditForm } from "@/components";

export default {
  components: {
    UserEditForm,
  }
};
</script>

<style>

</style>