<template>
  <v-app dark>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-btn outline color="teal darken-3" :to="{path:'/'}">
        <v-toolbar-title class="green--text">
          <span class="wikiRed--text"><strong>P</strong></span>
          <span class="wikiBlack--text"><strong>ro</strong></span>
          <span class="wikiGreen--text"><strong>W</strong></span>
          <span class="wikiBlue--text"><strong>D</strong></span>
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn depressed color="teal darken-3" :to="{path:'/profile/browse'}">
        Browse
        <v-icon right>apps</v-icon>
      </v-btn>
      <v-btn depressed color="teal darken-3" :to="{path:'/profile/new'}">
        Create
        <v-icon right>fiber_new</v-icon>
      </v-btn>
      <v-btn depressed color="teal darken-3" :to="{path:'/about'}">
        About
        <v-icon right>info</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-jumbotron v-if="jumbotron"
        :gradient="gradient"
        dark
        height="250px"
        src="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <img class="ml-1" src="/prowd-logo-transparent.png" style="width: 40%"/>
              <div class="subheading my-4">{{ prowdPromo }}</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <v-container>
        <v-alert
          v-model="alertValue"
          color="success"
        >
          <a @click="dismissAlert()"><v-icon class="pr-2">cancel</v-icon></a>
          {{ alertMessage }}
        </v-alert>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      height="auto"
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-actions class="teal darken-3 justify-center">
          2018 — By <strong>Free University of Bozen-Bolzano and Universitas Indonesia</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    fetch (ctx) {
      this.alert = this.alertValue
      console.log(`alert value: ${this.alert}`)
    },
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        examples: [
          { icon: 'class', title: 'Single Profile', to: '/single' },
          { icon: 'class', title: 'Profile Comparison', to: '/compare' }
        ],
        menus: [
          { icon: 'home', title: 'Home', to: '/' },
          { icon: 'apps', title: 'Browse', to: '/profile/browse' },
          { icon: 'fiber_new', title: 'New Profile', to: '/profile/new' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ProWD',
        gradient: 'to top right, rgba(70,70,70, .7), rgba(70,70,70, .7)',
        prowdPromo: 'Class-Facet-Attribute Profiling system for Wikidata'
      }
    },
    computed: {
      alertValue () {
        return this.$store.state.alertValue
      },
      alertMessage () {
        return this.$store.state.alertMessage
      },
      jumbotron () {
        return this.$store.state.jumbotron
      }
    },
    methods: {
      dismissAlert () {
        this.$store.commit('SET_ALERT_VALUE', false)
        console.log('dismissed')
      }
    }
  }
</script>