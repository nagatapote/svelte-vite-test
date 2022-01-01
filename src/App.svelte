<script lang="ts">
  import logo from './assets/svelte.png';
  import { slide } from 'svelte/transition';
  import { Priorities, todoList as todoListStore } from './stores';

  const priorityNames = {
    [Priorities.High]: '高',
    [Priorities.Mid]: '中',
    [Priorities.Low]: '低',
  } as const;

  let title = '';
  let priority: number = 2;

  $: disabledCreateButton = title === '';
  $: sortedTodoList = $todoListStore.sort((item1, item2) => item1.priority - item2.priority);

  const handleClickCreateButton = () => {
    if (priority === 1 || priority === 2 || priority === 3) {
      todoListStore.addItem(title, priority);
    }
    title = '';
  };
</script>

<main>
  <img src="{logo}" alt="Svelte Logo" />
  <h1>Hello world!</h1>
</main>

<div>
  <div>
    <form>
      <div>
        <label>
          タイトル
          <input bind:value="{title}" />
        </label>
      </div>
      <div>
        <label for="priority">優先度</label>
        <select bind:value="{priority}">
          {#each Object.entries(priorityNames) as [value, label]}
            <option value="{Number(value)}">{label}</option>
          {/each}
        </select>
      </div>
      <button disabled="{disabledCreateButton}" on:click="{handleClickCreateButton}">作成</button>
    </form>
  </div>
  <div>
    {#if $todoListStore.length === 0}
      <div>アイテムを作成してください。</div>
    {:else}
      <div>件数: {$todoListStore.length}</div>
      <ul>
        {#each sortedTodoList as todoItem (todoItem.id)}
          <li class="todo-list-item" transition:slide>
            <span
              class="badge"
              class:badge-danger="{todoItem.priority === Priorities.High}"
              class:badge-warning="{todoItem.priority === Priorities.Mid}"
              class:badge-success="{todoItem.priority === Priorities.Low}"
            >
              {priorityNames[todoItem.priority]}
            </span>
            {todoItem.title}
            <button on:click="{() => todoListStore.completeItem(todoItem.id)}">X</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  .todo-list-item {
    margin-top: 6px;
  }

  .badge {
    padding: 4px;
  }

  .badge-danger {
    background-color: #ff3e00;
  }

  .badge-warning {
    background-color: yellow;
  }

  .badge-success {
    background-color: greenyellow;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
