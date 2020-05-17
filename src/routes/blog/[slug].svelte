<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`/blog/${params.slug}.json`);
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
  <h1 id="{post.slug}" class="tc">{post.metadata.title}</h1>
  <div class="tc mb4"><time datetime="{post.metadata.pubdate}">{post.metadata.date}</time></div>

  {@html post.html}
</article>

{#if post.metadata.tags && post.metadata.tags.length}
  <aside class="tc mt5">
    {#each post.metadata.tags as tag}
      <a href="/blog/tag/{tag}" class="dib tag">{tag}</a>
    {/each}
  </aside>
{/if}
