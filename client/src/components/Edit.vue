<template>
  <b-row>
    <b-col sm="6">
      
      <b-row>
        <b-col v-if="success" sm="5">
          <b-alert show class="success" variant="success">
            Changes saved!
          </b-alert>
        </b-col>
        
        <b-nav class="ml-auto mr-3" tabs>
          <b-nav-item class="notActive" :to="{name: 'Index', params: {community: $route.params.community}}">
            {{this.$route.params.community}}
          </b-nav-item>
          <b-nav-item :to="{name: 'Edit'}">
            edit
          </b-nav-item>
        </b-nav>
      </b-row>
      
      <b-card id="chat">
          <b-col sm="6">
            <b-form-textarea
            v-model="greeting"
            placeholder="Greeting Message"
            rows="3"
            >
            </b-form-textarea>
            <b-col class="save" sm="4">
              <b-btn
              @click.stop="save"
              variant="success">
                Save
              </b-btn>
            </b-col>
          </b-col>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import CommunityService from '../services/CommunityService'

export default {

  data () {
    return {
      success: false,
      greeting: '',
      description: ''
    }
  },
  sockets: {
    updateLocal: function (val) {
      this.$store.dispatch('socket_users', val.users)
    },
    updateRoom: function (val) {
      this.$store.dispatch('socket_room', val)
    }
  },
  methods: {
    async save () {
      const response = await CommunityService.edit({
        greeting: this.greeting,
        path: this.$route.path
      })
      if (response) {
        this.success = true
      }
    }
  },
  async beforeMount () {
    if (!this.$store.state.user) {
      this.$router.push({
        name: 'NotFound'
      })
    }
    const response = await CommunityService.editIndex(this.$route.params)
    console.log(response)
    if (response.data.error) {
      this.$router.push({
        name: 'NotFound'
      })
    } 
    
  }
}
</script>

<style>
.success {
  height:42px;
  margin-bottom: 0;
}
.save {
  width: 78px;
  padding-left: 0;
}
.notActive > a:hover {
  color: black !important;
  border-color: #e9ecef #e9ecef #ddd !important
}

.notActive > a {
  color: blue !important;
  border: 1px solid transparent !important;
  border-top-left-radius: 0.25rem !important;
  border-top-right-radius: 0.25rem !important;
}
</style>