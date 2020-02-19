<template>
  <div class="about">
    <h1>{{data}}</h1>
    <img :src="'http://127.0.0.1:8090/dish/' + data[0].imgUrl" alt="">
  </div>
</template>
<script>
export default {
  props: ['did'],
  data() {
    return {
      data: [],
    }
  },
  created() {
    let url = `${this.$store.state.globalSettings.apiUrl}/admin/dish/${this.did}`;
    this.$axios
    .get(url)
    .then(({data}) => {
      this.data = data;
    }).catch(err => console.warn(err))
  }
}
</script>