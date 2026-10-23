<script>
  export let height = 30;
  export let href = '/index.html';
</script>

<a class="logo" {href} aria-label="똑비 홈">
  <img src="/assets/logo.png" alt="똑비" style="height: {height}px" />
</a>

<style>
  .logo {
    display: inline-flex;
    align-items: center;
  }
  .logo img {
    width: auto;
    display: block;
  }
</style>
