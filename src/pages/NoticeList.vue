<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">공지사항</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <simple-Notice table-header-color="green"></simple-Notice>
          </md-card-content>
        </md-card>
        
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleNotice} from "@/components/";


export default {
  components: {
    SimpleNotice
  }
};
</script>
