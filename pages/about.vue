<template>
  <v-container>
      <v-card-title class="headline">Background</v-card-title>
      <v-card-text align='left'>
        Due to weak enforcement of constraints, assessing the completeness of entities in open-domain knowledge bases such as Wikidata is a challenging task. To address the problem, we are building a tool for profiling the completeness of entities in Wikidata that allows users to analyze the completeness of information of entities of interest. It is based on class-facet-attribute (CFA) profiles, a concept which allows to define, for a given class of interest, a set of attributes that should be analyzed, and a set of facets to structure the entities.<br><br>

This web application is targeted for people who are interested to see or compare data completeness of a defined CFA profile. The aim is to able to visualise certain point of interest such as the amount of existing data, and the completeness within available data. 

      </v-card-text>
      <v-card-title class="headline">Credits</v-card-title>
      <v-card-text>
        Supported by the TaDaQua project, funded by <a href="https://www.unibz.it">the Free University of Bolzano</a>, Italy
      </v-card-text>
      <v-card-text>
        <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </v-card-text>
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
