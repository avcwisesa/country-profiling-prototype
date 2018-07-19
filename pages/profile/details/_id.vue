<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline"> {{profileName}} </v-card-title>
        <v-card-text>
          <h2>Class: {{ `${profileClass.name} (${profileClass.code})` }}</h2>
          <div v-if="subclass">(subclass included)</div>
          <h3 class="mt-3">Facets: </h3>
          <v-chip v-for="facet in facets" v-bind:key="facet.code">{{ `${facet.name} (${facet.code})` }}</v-chip>
          <h3>Attributes: </h3>
          <v-chip v-for="attribute in attributes" v-bind:key="attribute.code">{{ `${attribute.name} (${attribute.code})` }}</v-chip>
          <v-layout class="mt-4" row wrap>
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
