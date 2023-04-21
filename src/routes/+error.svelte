<script>
    import { page } from '$app/stores';
  </script>

  <div class="h-screen flex flex-wrap justify-center content-center">
      <h1 class="text-gray-500">{$page.status}: {$page.error.message}</h1>
  </div> 

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>