export default {
  render () {
    return <div class="logo"><router-link to={{ path: '/' }}>
      {this.$t('app.title')}
    </router-link></div>
  }
}
