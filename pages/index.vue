<template>
  <v-layout>
    <v-flex text-xs-center>
      <blockquote class="blockquote">
        &#8220;Welcome! Please choose one of the options given on left sidebar.&#8221;
        <footer>
          <small>
            <em>&mdash;Cenna</em>
          </small>
        </footer>
      </blockquote>
      <v-card-title class="headline">Background</v-card-title>
      <v-card-text align='left'>
        Due to weak enforcement of constraints, assessing the completeness of entities in open-domain knowledge bases such as Wikidata is a challenging task. To address the problem, we are building a tool for profiling the completeness of entities in Wikidata that allows users to analyze the completeness of information of entities of interest. It is based on class-facet-attribute (CFA) profiles, a concept which allows to define, for a given class of interest, a set of attributes that should be analyzed, and a set of facets to structure the entities.<br><br>

This web application is targeted for people who are interested to see or compare data completeness of a defined CFA profile. The aim is to able to visualise certain point of interest such as the amount of existing data, and the completeness within available data. 

      </v-card-text>
      <v-card-title class="headline">Available examples</v-card-title>
      <v-card-text align='left'>
        University profile</br>
Class: University(Q3918)</br>
Facets: Country(P17)</br>
Attributes: inception(P571), official website(P856), location(P131), chairperson(P488)</br> </br>

Country profile</br>
Class: Country(Q6256)</br>
Facets: Continent(P30), member of(P463)</br>
Attributes: head of govt(P6), capital(P36), currency(P38), official language(P37), inception(P571), central bank(P1304)</br>
      </v-card-text>
    </v-flex>
  </v-layout>
</template>
