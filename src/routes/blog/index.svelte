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
  <title>Blog</title>
  <meta name="description" content="Max's blog posts" />
  <link rel="alternate" type="application/rss+xml" title="Max Milton's blog" href="/blog/rss.xml">
</svelte:head>

<div class="con">
  <h1>Blog Posts</h1>

  {#each posts as post}
    <article class="post">
      <a class="db" rel="prefetch" href="/blog/{post.slug}" title="Read the article">
        <h2>{post.metadata.title}</h2>
        <p>{post.metadata.description}</p>
      </a>
    </article>
  {/each}
</div>
