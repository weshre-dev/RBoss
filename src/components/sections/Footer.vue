<script setup lang="ts"></script>

<template>
  <footer>
    <hr class="mb-20" />
    <div class="flex w-full justify-between px-40">
      <p>Powered by Vite + Vue3 + Typescript + Vega Missile</p>
      <p>Satellisé par &copy; <a href="https://studio.weshre.com">WeShre Studio</a> 2025</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  margin-top: auto;
  padding-block: 20px;
  text-align: center;

  a {
    font-weight: 500;
    background: linear-gradient(90deg, #f0192c, #f79700, #249ee9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: inherit;
  }
  a:hover {
    text-shadow: 0 5px 10px rgba(255, 255, 255, 0.5);
  }
}

.footer-content {
  display: flex;
  justify-content: center;
  gap: 10em;
}
</style>
