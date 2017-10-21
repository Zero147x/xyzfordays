<template>
  <b-row class="mt-5">
    <b-col sm="8" md=6 lg="5" xl="4" class="m-auto">
      <b-form-input
      v-model="src"
      placeholder="image url">
        
      </b-form-input>
    </b-col>
  </b-row>
</template>
<script>

export default {
  data () {
    return {
      src: ''
    }
  }
}
</script>

<style>

</style>