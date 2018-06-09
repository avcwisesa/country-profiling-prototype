<template>
  <v-layout row wrap>
    <v-flex v-for="profile in profiles" v-bind:key="profile.ID" xs12 sm8 md6>
      <v-card >
        <v-card-title class="headline">{{profile.name}}</v-card-title>
        <v-card-actions>
             <v-btn round @click="goTo(profile.ID)" color="green">SEE PROFILE</v-btn>
             <v-btn round disabled color="orange">EDIT</v-btn>
            <!-- <a>{{API_ENDPOINT + 'profile/' + profile.ID}}</a> -->
        </v-card-actions>
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
  },
  methods: {
    goTo (ID) {
      this.$router.push({'path': '/profile/' + ID})
    }
  }
}
</script>