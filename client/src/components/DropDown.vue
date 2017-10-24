<template>
  <div>
    <b-col sm="12">
      <b-media vertical-align="center">
        <b-img slot="aside" :src="user.status.avatar" width="32" height="32" alt="placeholder" />
        <div v-click-outside="hide" class="user" @click="show"
        :class="{admin: user.status.isAdmin, user: !user.status.isAdmin}">
          {{user.username}}
        </div>
        <div class="menu" :class="{'show-menu': isActive}">
          <a class="menuItem" 
            v-if="this.$store.getters.admin && !user.status.isAdmin" 
            @click.stop="kick">kick</a>
          <a class="menuItem" 
            v-if="this.$store.getters.admin && !user.status.isAdmin" 
            @click.stop="ban">ban</a>
        </div>
      </b-media>
    </b-col>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isActive: false
      }
    },
    props: ['user'],
    methods: {
      show: function () {
        if (this.isActive === false) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      hide: function () {
        this.isActive = false
      },
      kick () {
        this.$socket.emit('kick', this.user.username, this.$store.state.room)
      },
      ban () {
        this.$socket.emit('ban', this.user.username, this.$store.state.room)
      }
    }
  }
</script>
<style scoped>
.user {
  padding: 0.5rem 0.75rem;
  line-height: 1.25;
}
.show-menu {
  display: block !important;
  position: absolute !important;
  transform: translate3d(0px, 38px, 0px) !important;
  top: 0px !important;
  left: 0px !important;
}
.media-body {
  border-radius: 5px;
}
.media-body:hover {
  cursor: pointer;
  background-color: #EDF1EE;
}
.media > div {
  margin-right: 0 !important;
}
.menu {
    position: absolute; 
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none; 
    float: left;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
}
.menuItem:active {
    color: #fff;
    text-decoration: none;
    background-color: #007bff;
}
.menuItem:hover {
    color: #16181b;
    text-decoration: none;
    box-shadow: inset 0 0 400px 110px rgba(0,0,0,.09);
}
.menuItem {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: normal;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background: none;
  border: 0;
  text-decoration: none;
}
.menuItem:focus {
  box-shadow: inset 0 0 400px 110px rgba(0,0,0,.09);
}
</style>