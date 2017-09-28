<template>
  <div id="app">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      
      <v-app dark id="example2" toolbar>
      
      <!--  TO DO:
            Figure out how to put the drawer and toolbar into
            a component together, or seperate components, without 
            sacrificing speed ( There is a delay when passing data between components)
      -->
      
      <v-navigation-drawer dark temporary absolute light v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile :to="{name: 'Community'}">
          <v-list-tile-action>
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Start Your Own Community</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    
  <!--  <side-menu :drawer="drawer" />-->
  <!--    <v-toolbar fixed class="indigo darken-4" dark>-->
  <!--  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
  <!--  <v-toolbar-title>Toolbar</v-toolbar-title>-->
  <!--</v-toolbar>-->
      
      <main>
        
        <v-container fluid>
          
          <!--<chat></chat>-->
          <router-view></router-view>
          
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu'
export default {
  data () {
    return {
      drawer: true
    }
  },
  components: {
    SideMenu
  },
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.list__tile--active {
  color:hsla(0,0%,100%,.3)
}
</style>
