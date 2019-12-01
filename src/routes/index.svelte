<script context="module">
  export async function preload() {
    const posts = await this.fetch(`/blog.json`).then((r) => r.json());
    return { posts };
  }
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>MaxMilton.com</title>
  <meta name="description" content="MaxMilton.com" />
  <link rel="alternate" type="application/rss+xml" title="Max Milton's blog" href="blog/rss.xml">
</svelte:head>

<header class="tc">
  <h1 class="headline">Max Milton</h1>
  <h2>Write the codes.</h2>
  <p class="lead ttu">&#9829; web tech, esoteric platforms, and experiments</p>
</header>

<div class="con dg ns-x3">
  <div class="ns-w2">
    <h3>Latest blog posts</h3>
    <ul>
      {#each posts.slice(0, 6) as post}
        <li class="post" data-pubdate="{post.metadata.dateString}">
          <a class="no-underline" rel="prefetch" href="blog/{post.slug}" title="Read the article">
            {post.metadata.title}
          </a>
        </li>
      {/each}
    </ul>
    <p><a href="blog">View all posts</a></p>
  </div>
  <div>
    <h3>More info</h3>
    <p><a href="about">About me</a></p>
    <p><a href="https://github.com/MaxMilton" target="_blank">My code on Github</a></p>
    <p><a href="mailto:max@wearegenki.com">max@wearegenki.com</a></p>
  </div>
</div>
