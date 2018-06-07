<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card v-for="profile in profiles" v-bind:key="profile.ID">
        <v-card-title class="headline">{{profile.name}}</v-card-title>
        <v-card-text >
            <a>{{API_ENDPOINT + 'profile/' + profile.ID}}</a>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  async fetch ({ store, params }) {
    await store.dispatch('FETCH_PROFILE')
  },
  data () {
    return {
      API_ENDPOINT: process.env.API_ENDPOINT,
      facetValue: {},
      query: '',
      datacollection: null
    }
  },
  computed: {
    profiles () {
      console.log(this.$store.state.profiles)
      return this.$store.state.profiles
    }
  }
}
</script>