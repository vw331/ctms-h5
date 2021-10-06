<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  setup() {
    /* console.log(this.foo)
    this.$http.get('http://aboutsunhao.com/api/test')
      .then(res => {
        console.log(res)
      }) */
  },
  created() {
    console.log(this.foo)
    this.$http.get('http://aboutsunhao.com/api/test')
      .then(res => {
        console.log(res)
      }) 
  }
}
</script>
