<template>
    <v-layout>
        {{something}}
        <v-btn round @click="token()" color="green">token</v-btn>
        <v-btn round @click="addClaim()" color="green">addClaim</v-btn>
    </v-layout>
</template>

<script>

export default {
  data () {
    return {
      WIKIDATA_API_ENDPOINT: process.env.WIKIDATA_API_ENDPOINT,
      something: ''
    }
  },
  methods: {
    token () {
      this.$axios.post(this.WIKIDATA_API_ENDPOINT + '?action=query&format=json&origin=*&meta=tokens&type=csrf')
        .then((response) => {
          console.log(response)
        })
    },
    addClaim () {
      this.$axios.get('https://www.uuidgenerator.net/api/guid')
        .then((response) => {
          var guid = response.data
          var claim = {
            'id': guid,
            'rank': 'normal',
            'type': 'statement',
            'mainsnak': {
              'snaktype': 'value',
              'property': 'P31',
              'datavalue': {
                'type': 'wikibase-entityid',
                'value': 'Q1622272'
              }
            }
          }

          var formData = new FormData()
          formData.set('action', 'wbsetclaim')
          formData.set('format', 'json')
          formData.set('token', '+\\')
          formData.set('claim', JSON.stringify(claim))
          this.$axios.post(this.WIKIDATA_API_ENDPOINT + '?origin=*', formData)
            .then((response) => {
              console.log(response)
            })
        })
      // console.log(JSON.stringify(claim))
      // this.$axios.post(this.WIKIDATA_API_ENDPOINT + '?action=wbsetclaim&format=json&origin=*&token=\+\\&claim=' + JSON.stringify(claim))
      //   .then((response) => {
      //     console.log(response)
      //   })
      // this.$axios.post(this.WIKIDATA_API_ENDPOINT + '?origin=*', {
      //   action: 'wbsetclaim',
      //   format: 'json',
      //   token: '+\\',
      //   claim: claim
      // })
      //   .then((response) => {
      //     console.log(response)
      //   })
      // var formData = new FormData()
      // formData.set('action', 'wbsetclaim')
      // formData.set('format', 'json')
      // formData.set('token', '+\\')
      // formData.set('claim', JSON.stringify(claim))
      // this.$axios.post(this.WIKIDATA_API_ENDPOINT + '?origin=*', formData)
      //   .then((response) => {
      //     console.log(response)
      //   })
    }
  }
}
</script>