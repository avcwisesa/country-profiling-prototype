<template>
  <v-layout row wrap>
    <v-flex v-for="profile in profiles" v-bind:key="profile.ID" xs12 sm8 md6>
      <v-card >
        <v-card-title class="headline">{{profile.name}}</v-card-title>
        <v-card-actions>
             <v-btn round @click="goTo(profile.ID)" color="green">SEE PROFILE</v-btn>
             <v-btn round @click="compare(profile.ID)" color="brown">COMPARE</v-btn>
             <v-btn round disabled color="orange">EDIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex v-if="profiles.length == 0" xs12 sm8 md6>
      <v-card >
        <v-card-text>There are no existing profile. Click below to create a new one</v-card-text>
        <v-card-actions>
             <v-btn round @click="goToCreate()" color="green">CREATE NEW PROFILE</v-btn>
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
    },
    compare (ID) {
      this.$router.push({'path': '/profile/compare/' + ID})
    },
    goToCreate () {
      this.$router.push({'path': '/profile/new'})
    }
  }
}
</script>