<template>
  <b-row>
    <b-col sm="6">
      
      <b-row>
          <b-nav class="ml-auto mr-3" tabs>
            <b-nav-item class="notActive" :to="{name: 'Index', params: {community: 'omg'}}">
              omg
            </b-nav-item>
            <b-nav-item :to="{name: 'Edit'}">
              edit
            </b-nav-item>
          </b-nav>
      </b-row>
      
      <b-card id="chat">
        <b-row>
          <b-col sm="6">
            <b-form-textarea
            v-model="greeting"
            placeholder="Greeting Message"
            rows="3"
            >
            </b-form-textarea>
            
            <b-btn class="save"
            @click.stop="save"
            @click="test"
            variant="success">
              Save
            </b-btn>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import CommunityService from '../services/CommunityService'

export default {

  data () {
    return {
      greeting: '',
      description: ''
    }
  },
  methods: {
    async save () {
      await CommunityService.edit({
        greeting: this.greeting,
        path: this.$route.path
      })
    },
    test () {
      console.log(this.$route.params)
    }
  }
}
</script>

<style>
.save {
  margin-left: 360px;
}
.notActive > a:hover {
  border-color: #e9ecef #e9ecef #ddd !important
}

.notActive > a {
  border: 1px solid transparent !important;
  border-top-left-radius: 0.25rem !important;
  border-top-right-radius: 0.25rem !important;
}
#chat {
  overflow-y: auto;
  height: 780px
}
#chat::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5
}
#chat::-webkit-scrollbar-thumb {
    background: #DCDCDC
}
#chat::-webkit-scrollbar-track {
    background: #424242
}
.admin {
  color:red;
}
#usersList {
  overflow-y: auto;
}
/*.message_field {*/
/*  margin-top:5px;*/
/*}*/
/*.send_btn {*/
/*  margin-top:18px;*/
/*}*/
ul {
  list-style:none;
}
</style>