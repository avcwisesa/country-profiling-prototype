<template>
  <v-container>
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
        searchPromo: 'Know which entity has been completed? Which has not?',
        viewPromo: 'See overall completeness of a class of entities',
        comparePromo: 'Compare completeness between different facet of a class'
      }
    }
  }
</script>
