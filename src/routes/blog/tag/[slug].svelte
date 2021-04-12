<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`/blog/tag/${params.slug}.json`);
    const data = await res.json();

    if (res.ok) {
      return { posts: data, tag: params.slug };
    }

    this.error(res.status, data.message);
  }
</script>

<script>
  export let posts;
  export let tag;
</script>

<svelte:head>
  <title>{tag} Blog Posts</title>
  <meta name="description" content="Posts tagged as {tag}" />
</svelte:head>

<div class="con">
  <h1>{tag} Blog Posts</h1>

  {#each posts as post}
    <article class="post">
      <a
        class="db"
        rel="prefetch"
        href="/blog/{post.slug}"
        title="Read the article"
      >
        <h2>{post.metadata.title}</h2>
        <p>{post.metadata.description}</p>
      </a>
    </article>
  {/each}
</div>
