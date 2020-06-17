<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header :data-background-color="sidebarItemColor" >
            <h4 class="title">질문 게시판</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <md-card-content>
            <SimpleQnA :table-header-color="sidebarItemColor"></SimpleQnA>
          </md-card-content>
        </md-card>
        
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleQnA} from "@/components/";


export default {
  components: {
    SimpleQnA
  },
  props:{
    sidebarItemColor: {
      type: String,
      default: "green",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    }
  }
};
</script>
