<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline"> {{profileName}} </v-card-title>
        <v-card-text>
          {{ profileID }}
          Class: {{ profileClass }} <br>
          Subclass: {{ subclass }} <br>
          Facets: {{ facets }} <br>
          Attributes: {{ attributes }} <br>
          <br>
          <v-layout row wrap>
            <v-flex xs2 v-if="facets.length > 0">
              <v-btn @click="deleteProfile()" color="error"> DELETE </v-btn>
            </v-flex>
          </v-layout>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BarChart from '~/components/BarChart.vue'

export default {
  async fetch ({ store, params }) {
    await store.dispatch('FETCH_PROFILE_BY_ID', params.id)
    await store.dispatch('FETCH_FACET_OPTIONS')
  },
  components: {
    BarChart
  },
  data () {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    }
  },
  computed: {
    countries () {
      return this.$store.state.countries1
    },
    profileID () {
      return this.$vnode.data.key.split('/')[3]
    },
    profileClass () {
      return this.$store.state.class
    },
    facets () {
      return this.$store.state.facets
    },
    attributes () {
      return this.$store.state.attributes
    },
    profileName () {
      return this.$store.state.profileName
    },
    subclass () {
      return this.$store.state.subclass
    }
  },
  methods: {
    async deleteProfile () {
      await this.$store.dispatch('DELETE_PROFILE', { name: this.profileName, id: this.profileID })
      this.$router.push({'path': '/profile/super/browse'})
    }
  }
}
</script>
