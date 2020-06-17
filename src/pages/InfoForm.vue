<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <div class="md-layout-item md-small-size-100 md-size-50">
          <h4 class="title">거래 주택</h4>
        </div>
        <template v-if="bookmark">
        <md-button   @click="bookmarkcancel()">
          <md-icon style="color:green" >thumb_up</md-icon>
        </md-button>
        </template>
         <template v-if="!bookmark">
        <md-button @click="bookmarkselect()">
          <md-icon style="color:white">thumb_up</md-icon>
        </md-button>
        </template>
      </md-card-header>

      <md-card-content>
        
        <div class="md-layout" >
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>주택번호</label>
              <md-input v-model="item.no" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>주택명</label>
              <md-input v-model="item.aptName" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>거래금액</label>
              <md-input v-model="item.dealAmount" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>월세금액</label>
              <md-input v-model="item.rentMoney" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>건축연도</label>
              <md-input v-model="item.buildYear" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>거래일</label>
              <md-input v-model="date" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>전용면적</label>
              <md-input v-model="item.area" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>법정동</label>
              <md-input v-model="item.dong" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>지번</label>
              <md-input v-model="item.jibun" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <!-- <md-field>
              <div></div>
            </md-field> -->
          </div>
          <template v-if="this.flag">
            <GmapMap
              :center="{lat: Number(this.lat), lng: Number(this.lng)}"
              :zoom="15"
              map-type-id="roadmap"
              style="width: 500px; height: 300px"
              >
                <GmapMarker ref="myMarker"
                  :position="google && new google.maps.LatLng(Number(this.lat), Number(this.lng))"
                  :label="item.aptName" 
                />
            </GmapMap>
          </template>
          <div class="md-layout-item md-size-100 text-right">
              <router-link to="/table">
                <md-button class="md-raised md-success">목록</md-button>
              </router-link>
          </div>
        </div>
      </md-card-content>
    </md-card>
    
  </form>
</template>

<script>
import axios from 'axios';
import {gmapApi} from 'vue2-google-maps'

export default {
  name: "Info",

  computed: {
    google: gmapApi
  },

  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      item: {},
      date: '',
      lat: '',
      lng: '',
      flag: false,
      bookmark:false,
      bookmarks:{
        bookmark_no: 0,
        userid: this.$session.get('user'),
        house_no: 0
      }
    };
  },

  created() {
     // 파라미터 값을 찾는 코드
    axios.get('http://localhost:9999/happyhouse/api/housedeal/' + this.$route.query.no).then(({ data }) => {
      this.item = data;
      this.date = data.dealYear + '.' + data.dealMonth + '.' + data.dealDay;

      axios.get('http://localhost:9999/happyhouse/api/houseinfo/' + this.item.aptName).then(({ data }) => {
        if (typeof data.lat != "undefined") {
          this.lat = data.lat;
          this.lng = data.lng;
          this.flag = true;
        }
      });
    });
    console.log(this.item.no);
            //bookmark =this.$session.get('bookmarks');
        this.$session.get('bookmarks').forEach(element => {
          console.log(element.house_no);
          console.log(this.item.no);
          console.log("++++++++++");
          if(element.house_no==this.item.no)
          {
            this.bookmark=true;
            this.bookmarks.bookmark_no=element.bookmark_no;
            console.log("this.bookmark");
          }
        });
  },

  methods: {
      moveList() {
          this.$router.push('/#/housedeal');
      },
      bookmarkcancel(){
          this.bookmark =false;
          console.log(this.bookmark);
      },
      bookmarkselect(){
        this.bookmarks.house_no= this.item.no;
        console.log(this.bookmarks.house_no);
        console.log(this.bookmarks.userid);
        axios.post('http://localhost:9999/happyhouse/api/bookmark',this.bookmarks);
        this.bookmark =true;
        console.log(this.bookmark);
      }

  }
};
</script>

<style>

</style>
