export default function (ctx) {
  if (ctx.route.path.split('/')[1] === '') {
    ctx.store.commit('SET_JUMBOTRON_VALUE', true)
  } else if (ctx.route.path.split('/')[1] != 'assets') {
    ctx.store.commit('SET_JUMBOTRON_VALUE', false)
  }
}
