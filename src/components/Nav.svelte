<script>
  export let segment;
</script>

<style type="text/postcss">
  @import 'import.css';

  nav {
    padding: 0.3em 1em;
    border-bottom: 1px solid color-mod($dark3 alpha(0.1));
  }

  /* stylelint-disable-next-line selector-max-id */
  #logo {
    color: $text-color;
    font-size: $logo-text-size;
    text-decoration: none;
  }

  .nav-item {
    margin-left: 1em;
    padding: 0.65em 1em;
    text-decoration: none;
    border-bottom: 2px solid transparent;

    &:hover,
    &:focus,
    &:active,
    &.active {
      border-bottom-color: $intent-primary;
    }
  }
</style>

<nav class="dfc">
  <a id="logo" href="/">Max Milton</a>
  <a class="nav-item {segment === undefined ? 'active' : ''}" href=".">Home</a>
  <a class="nav-item {segment === 'about' ? 'active' : ''}" href="about">About</a>
  <a rel=prefetch class="nav-item {segment === 'blog' ? 'active' : ''}" href="blog">Blog</a>
</nav>
