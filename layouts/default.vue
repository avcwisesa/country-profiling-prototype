<template>
  <v-app dark>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-btn outline color="teal darken-3" :to="{path:'/'}">
        <v-toolbar-title class="green--text">
          <span class="wikiRed--text"><strong>Pro</strong></span>
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
      <v-btn depressed color="teal darken-3" :to="{path:'/profile/new'}">
        About
        <v-icon right>info</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
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
        title: 'ProWD'
      }
    }
  }
</script>