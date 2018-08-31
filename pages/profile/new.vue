<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 md10>
      <v-card >
        <v-card-title class="headline">Create new profile</v-card-title>

        <v-layout row wrap>
            <v-flex xs3>
                <v-subheader><h3>Profile Name</h3></v-subheader>
            </v-flex>
            <v-flex xs7>
                <v-text-field v-model=profileName required
                    class="input-group--focused"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-layout row>
                <v-flex xs3>
                  <v-subheader><h3>Class</h3></v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-layout column>
                    <v-flex xs7>
                      <h3 class="white--text mt-3">{{ profileClass['label'] }} ({{ profileClass['id'] }})</h3>
                      <v-card-text> {{ profileClass['description'] }} </v-card-text>
                      <v-autocomplete
                        v-model="profileClass" label="Search class" :items="suggestedEntity" required box
                        item-text="label" return-object :search-input.sync="currClass"
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
                              <v-list-tile-title >{{data.item.label}} ({{data.item.id}})</v-list-tile-title>
                              <v-list-tile-sub-title>{{data.item.description}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs3></v-flex>
                    <v-flex xs8>
                      <v-switch
                        :label="'Include subclasses'"
                        v-model="subclass"
                      ></v-switch>
                    </v-flex>
                    <v-flex xs3></v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12><br></v-flex>
            <v-flex xs3>
              <v-subheader><h3>Facets</h3></v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-combobox
                v-model="facets" label="Add facets" chips multiple clearable required
                item-text="label" :items="suggestedEntity" :search-input.sync="currFacet"
              >
                  <template slot="selection" slot-scope="data">
                      <v-chip
                      :selected="data.selected"
                      close
                      @input="remove(facets, data.item)"
                      >
                      <strong>{{ data.item['id'] }}</strong>&nbsp;
                      <span>({{data.item['label']}})</span>
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
                        <v-list-tile-title >{{data.item.label}} ({{data.item.id}})</v-list-tile-title>
                        <v-list-tile-sub-title>{{data.item.description}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
              </v-combobox>
            </v-flex>
            <v-flex xs3>
              <v-subheader><h3>Attributes</h3></v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-combobox
                v-model="attributes" label="Add attributes" chips multiple clearable required
                item-text="label" :items="suggestedEntity" :search-input.sync="currAttribute"
              >
                <template slot="selection" slot-scope="data">
                    <v-chip
                    :selected="data.selected"
                    close
                    @input="remove(attributes, data.item)"
                    >
                    <strong>{{ data.item['id'] }}</strong>&nbsp;
                    <span>({{data.item['label']}})</span>
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
                      <v-list-tile-title >{{data.item.label}} ({{data.item.id}})</v-list-tile-title>
                      <v-list-tile-sub-title>{{data.item.description}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs3><v-card-text></v-card-text></v-flex>
            <v-flex xs6>
              <v-card-actions>
                <v-btn block round @click="createProfile()" color="blue">CREATE</v-btn>
              </v-card-actions>
            </v-flex>
        </v-layout>
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
      profileClass: { label: 'Empty', id: 'undefined', description: '-' },
      facets: [],
      attributes: [],
      subclass: false,
      currClass: null,
      currFacet: '',
      currAttribute: ''
    }
  },
  computed: {
    newProfile () {
      return {
        name: this.profileName,
        class: JSON.stringify({ code: this.profileClass['id'], name: this.profileClass['label'] }),
        facets: JSON.stringify(this.facets.map(obj => {
          return {
            code: obj['id'],
            name: obj['label']
          }
        })),
        attributes: JSON.stringify(this.attributes.map(obj => {
          return {
            code: obj['id'],
            name: obj['label']
          }
        })),
        subclass: this.subclass
      }
    },
    suggestedEntity () {
      return this.$store.state.suggestedEntity
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
    async createProfile () {
      console.log(this.newProfile)
      await this.$store.dispatch('CREATE_PROFILE', this.newProfile)
      this.$router.push({'path': '/profile/browse'})
    },
    remove (data, item) {
      data.splice(data.indexOf(item), 1)
      data = [...data]
    },
    entitySuggestion (type, query) {
      this.$store.dispatch('SUGGESTER', { type: type, query: query })
    }
  }
}
</script>