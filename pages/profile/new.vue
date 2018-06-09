<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 md10>
      <v-card >
        <v-card-title class="headline">Create new profile</v-card-title>

        <v-layout row wrap>
            <v-flex xs6>
                <v-subheader> Profile Name </v-subheader>
            </v-flex>
            <v-flex xs4>
                <v-text-field v-model=profileName
                    class="input-group--focused"
                ></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-subheader> Class </v-subheader>
            </v-flex>
            <v-flex xs4>
                <v-text-field v-model=profileClass
                    class="input-group--focused"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-card-text><h3>Facets</h3></v-card-text>
        <v-select
        v-model="facets" label="Add facets" chips tags solo prepend-icon="filter_list" append-icon="" clearable
        >
            <template slot="selection" slot-scope="data">
                <v-chip
                :selected="data.selected"
                close
                @input="remove(facets, data.item)"
                >
                <strong>{{ data.item }}</strong>&nbsp;
                <span>(facet)</span>
                </v-chip>
            </template>
        </v-select>
       <v-card-text><h3>Attributes</h3></v-card-text>
        <v-select
        v-model="attributes" label="Add attributes" chips tags solo prepend-icon="filter_list" append-icon="" clearable
        >
            <template slot="selection" slot-scope="data">
                <v-chip
                :selected="data.selected"
                close
                @input="remove(attributes, data.item)"
                >
                <strong>{{ data.item }}</strong>&nbsp;
                <span>(attr)</span>
                </v-chip>
            </template>
        </v-select>
        <p>{{ newProfile }}</p>
        <v-card-actions>
            <v-btn round @click="createProfile()" color="blue">CREATE</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  async fetch ({ store, params }) {
    // await store.dispatch('FETCH_PROFILE')
  },
  data () {
    return {
      API_ENDPOINT: process.env.API_ENDPOINT,
      profileName: '',
      profileClass: '',
      facets: [],
      attributes: []
    }
  },
  computed: {
    newProfile () {
      return {
        name: this.profileName,
        class: JSON.stringify({ code: this.profileClass, name: this.profileClass }),
        facets: JSON.stringify(this.facets.map(obj => {
          return {
            code: obj,
            name: obj
          }
        })),
        attributes: JSON.stringify(this.attributes.map(obj => {
          return {
            code: obj,
            name: obj
          }
        }))
      }
    }
  },
  methods: {
    async createProfile () {
      console.log(this.newProfile)
      await this.$store.dispatch('CREATE_PROFILE', this.newProfile)
    },
    remove (data, item) {
      console.log(data)
      data.splice(data.indexOf(item), 1)
      data = [...data]
    }
  }
}
</script>