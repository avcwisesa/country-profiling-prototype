<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline"> {{profileName}} - Details </v-card-title>
        <v-card-text>
          <h2>Profile name:</h2>
          <v-text-field v-model=profileName required
              class="input-group--focused"
          ></v-text-field>
          <h2>Class:</h2>
          <h2 class="white--text mt-3">{{ profileClass.name }} ({{ profileClass.code }})</h2>
          <v-card-text> {{ profileClass['description'] }} </v-card-text>
          <v-autocomplete
            v-model="profileClass" label="Search class" :items="suggestedEntity" required box
            item-text="name" return-object :search-input.sync="currClass"
          >
            <template
              slot="item"
              slot-scope="data"
            >
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title >{{data.item.name}} ({{data.item.code}})</v-list-tile-title>
                  <v-list-tile-sub-title>{{data.item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
          <v-switch
            :label="'Include subclasses'"
            v-model="subclass"
          ></v-switch>
          <h3 class="mt-3">Facets: </h3>
          <v-combobox
            v-model="facets" label="Edit facets" chips multiple clearable required
            item-text="label" :items="suggestedEntity" :search-input.sync="currFacet"
          >
            <template slot="selection" slot-scope="data">
                <v-chip
                :selected="data.selected"
                close
                @input="remove(facets, data.item)"
                >
                <strong>{{ data.item['code'] }}</strong>&nbsp;
                <span>({{data.item['name']}})</span>
                </v-chip>
            </template>
            <template
              slot="item"
              slot-scope="data"
            >
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title >{{data.item.name}} ({{data.item.code}})</v-list-tile-title>
                  <v-list-tile-sub-title>{{data.item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-combobox>
          <h3>Attributes: </h3>
          <v-combobox
            v-model="attributes" label="Edit attributes" chips multiple clearable required
            item-text="label" :items="suggestedEntity" :search-input.sync="currAttribute"
          >
            <template slot="selection" slot-scope="data">
                <v-chip
                :selected="data.selected"
                close
                @input="remove(attributes, data.item)"
                >
                <strong>{{ data.item['code'] }}</strong>&nbsp;
                <span>({{data.item['name']}})</span>
                </v-chip>
            </template>
            <template
              slot="item"
              slot-scope="data"
            >
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title >{{data.item.name}} ({{data.item.code}})</v-list-tile-title>
                  <v-list-tile-sub-title>{{data.item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-combobox>
          <v-layout class="mt-4" row wrap>
            <v-flex class="mx-1" xs2>
              <v-dialog full-width
                v-model="updateDialog"
                width="500"
              >
                <v-btn slot="activator" block color="orange"> UPDATE </v-btn>

                <v-card>
                  <v-card-title
                    class="headline grey"
                    primary-title
                  >
                    Update Profile
                  </v-card-title>

                  <v-card-text>
                      Are you sure you want to update this profile?
                  </v-card-text>

                  <v-card-text>
                    <h2>Profile name: {{profileName}}</h2>
                    <h2>Class: {{ `${profileClass.name} (${profileClass.code})` }}</h2>
                    <div v-if="subclass">(subclass included)</div>
                    <h3 class="mt-3">Facets: </h3>
                    <v-chip v-for="facet in facets" v-bind:key="facet.code">{{ `${facet.name} (${facet.code})` }}</v-chip>
                    <h3>Attributes: </h3>
                    <v-chip v-for="attribute in attributes" v-bind:key="attribute.code">{{ `${attribute.name} (${attribute.code})` }}</v-chip>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="orange"
                      flat
                      @click="updateProfile()"
                    >
                      UPDATE
                    </v-btn>
                    <v-btn
                      color="blue"
                      flat
                      @click="updateDialog = false"
                    >
                      CANCEL
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex class="mx-1" xs2>
              <v-dialog full-width
                v-model="deleteDialog"
                width="500"
              >
                <v-btn slot="activator" block color="red"> DELETE </v-btn>

                <v-card>
                  <v-card-title
                    class="headline grey"
                    primary-title
                  >
                    Delete Profile
                  </v-card-title>

                  <v-card-text>
                      Are you sure you want to delete this profile?
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      flat
                      @click="deleteProfile()"
                    >
                      DELETE
                    </v-btn>
                    <v-btn
                      color="blue"
                      flat
                      @click="deleteDialog = false"
                    >
                      CANCEL
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
      API_ENDPOINT: process.env.API_ENDPOINT,
      profileName: 'Anonymous',
      profileClass: { label: 'Empty', id: 'undefined', description: '-' },
      currClass: null,
      currFacet: '',
      currAttribute: '',
      subclass: false,
      attributes: [],
      facets: [],
      updateDialog: false,
      deleteDialog: false
    }
  },
  computed: {
    newProfile () {
      return {
        name: this.profileName,
        class: JSON.stringify({ code: this.profileClass.code, name: this.profileClass.name }),
        facets: JSON.stringify(this.facets.map(obj => {
          return {
            code: obj.code,
            name: obj.name
          }
        })),
        attributes: JSON.stringify(this.attributes.map(obj => {
          return {
            code: obj.code,
            name: obj.name
          }
        })),
        subclass: this.subclass
      }
    },
    profileID () {
      return this.$vnode.data.key.split('/')[3]
    },
    suggestedEntity () {
      var entities = []
      this.$store.state.suggestedEntity.forEach(element => {
        entities.push({
          name: element.label,
          code: element.id,
          description: element.description
        })
      })
      return entities
    }
  },
  watch: {
    currAttribute (query) {
      this.entitySuggestion('property', query)
    },
    currFacet (query) {
      this.entitySuggestion('property', query)
    },
    currClass (query) {
      this.entitySuggestion('item', query)
    }
  },
  methods: {
    async deleteProfile () {
      await this.$store.dispatch('DELETE_PROFILE', { name: this.profileName, id: this.profileID })
      this.$router.push({'path': '/profile/super/browse'})
    },
    async updateProfile () {
      console.log(this.newProfile)
      await this.$store.dispatch('UPDATE_PROFILE', this.newProfile)
      this.$router.push({'path': '/profile/' + this.profileID})
    },
    remove (data, item) {
      data.splice(data.indexOf(item), 1)
      data = [...data]
    },
    entitySuggestion (type, query) {
      this.$store.dispatch('SUGGESTER', { type: type, query: query })
    }
  },
  mounted () {
    this.profileName = this.$store.state.profileName
    this.subclass = this.$store.state.subclass
    this.profileClass = this.$store.state.class
    this.attributes = this.$store.state.attributes
    this.facets = this.$store.state.facets
  }
}
</script>
