<script>
  export default {
    name: 'Render',
    props: {
      msg: {
        type: String,
        default: 'render式组件'
      }
    },
    render() {
      return <span> {this.msg}</span>
    }
  }
</script>
