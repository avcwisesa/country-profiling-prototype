<template>
  <v-container>
    <v-jumbotron
      :gradient="gradient"
      dark
      height="230px"
      src="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h2 class="display-4">
              <span class="wikiRed--text"><strong>Pro</strong></span>
              <span class="wikiGreen--text"><strong>W</strong></span>
              <span class="wikiBlue--text"><strong>D</strong></span>
            </h2>
            <div class="subheading my-4">{{ prowdPromo }}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-layout row justify-space-around class="mt-4">
      <v-flex xs3 offset-xs1>
        <img class="ml-1" src="/search.png" style="width: 40%"/>
      </v-flex>
      <v-flex xs3>
        <img class="ml-5" src="/analytics.png" style="width: 40%"/>
      </v-flex>
      <v-flex xs3>
        <img class="ml-5" src="/multitask.png" style="width: 40%"/>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs3>
        <v-card-text class="text-xs-center">{{ searchPromo }}</v-card-text>
      </v-flex>
      <v-flex xs3>
        <v-card-text class="text-xs-center">{{ viewPromo }}</v-card-text>
      </v-flex>
      <v-flex xs3>
        <v-card-text class="text-xs-center">{{ comparePromo }}</v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        gradient: 'to top right, rgba(5,5,5, .7), rgba(0,0,0, .7)',
        prowdPromo: 'Class-Facet-Attribute Profiling system for Wikidata',
        searchPromo: 'Know which entity has been completed? Which has not?',
        viewPromo: 'See overall completeness of a class of entities',
        comparePromo: 'Compare completeness between a class of entities'
      }
    }
  }
</script>
