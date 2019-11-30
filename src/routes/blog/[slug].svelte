<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`blog/${params.slug}.json`);
    return res.ok ? { post: await res.json() } : this.error(404, 'Not found');
  }
</script>

<script>
  export let post;
</script>

<svelte:head>
  <title>{post.metadata.title}</title>
  <meta name="description" content="{post.metadata.description}" />
</svelte:head>

<article class="con">
  <h1 id="{post.slug}">{post.metadata.title}</h1>
  <div>{post.metadata.description}</div>
  <div><a href="{post.metadata.authorURL}">{post.metadata.author}</a> <time datetime="{post.metadata.pubdate}">{post.metadata.dateString}</time></div>

  {@html post.html}
</article>
