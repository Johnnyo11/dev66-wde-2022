<template>
  <div ref="homebody">
    <div class="box">
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; z-index: 1;">
        <span style="font-size: 32px; color: #333; margin-bottom: 20px;">Your application has been rejected.</span>
        <span style="font-size: 13px; color: #333; margin-bottom: 20px;">Reason: {{userData.reason}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    playing() {
    }
  },
  mounted() {
  },
  computed: {
    appbody: function() {
      return this.$parent.$refs.appbody
    },
    userData() {
      return this.$store.state.user.userData
    },
  }
}
</script>
<style lang="scss">
.box {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  height: 75vh;
  overflow: hidden;
}
</style>