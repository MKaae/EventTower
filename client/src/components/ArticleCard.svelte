<script>
  export let article;
</script>

<div class="m-3 p-2 bg-light border border-3 border-grey rounded shadow">
  <h1>{article.title}</h1>
  <p>Author: {article.author}</p>
  <p>{article.body}</p>
</div>
