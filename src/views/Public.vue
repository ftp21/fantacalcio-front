<template>
  <div class="container-fluid bg-dark" style="width: 100% ; min-height: 100vh">
    <div class="row flex-fill h-100">
      <div class="col-sm-4">
        <div class="row flex-fill ">
          <div class="col-sm-12 flex-fill "  id="mmenu_screen--book">
            <Info></Info>
          </div>
        </div>
        <div class="row flex-fill ">
          <div class="col-sm-12 flex-fill"  id="mmenu_screen--information">
            <PublicAcquisto></PublicAcquisto>
          </div>
        </div>
      </div>
      <div class="col-sm-8 mmenu_screen--direktaction">
        <RosePublic></RosePublic>
      </div>
    </div>


  </div>

</template>


<script>
import Vue from 'vue'
import Info from "@/components/public/Info";
import PublicAcquisto from "@/components/public/PublicAcquisto";
import RosePublic from "@/components/public/RosePublic";
import VueNativeSock from 'vue-native-websocket'

export default {
  name: "Public",
  components: {Info,PublicAcquisto,RosePublic},
  created: function() {
    var ws_url=this.$wsBaseUrl;
    

    Vue.use(VueNativeSock,ws_url , {
      reconnection: true, // (Boolean) whether to reconnect automatically (false)
      reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
      reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
      store: this.$store,
    });



  }
}
</script>
<style scoped>

  .row{
    padding-top:50px
  }
</style>

