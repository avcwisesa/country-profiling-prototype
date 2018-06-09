<template>
  <v-app dark>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in menus"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group value="true">
          <v-list-tile slot="activator">
            <v-list-tile-title>Examples</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in examples"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
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
        title: 'ProWD Prototype'
      }
    }
  }
</script>