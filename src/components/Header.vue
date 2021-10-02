<template>
  <!-- <header class="bg-transparent">
    <div class="w-11/12 d-flex justify-between items-center mx-auto">
      <div class="logo w-3/12">
        <a href="/" class="d-inline-block">
          <img src="/icons/logo.svg" alt="логотип">
        </a>
      </div>
      <form class="d-inline-flex w-max flex-grow flex-shrink w-6/12 items-center">
        <input type="text" class="border-b-1 border-dark-100">
        <button>
          <img src="/icons/search.svg" alt="">
        </button>
      </form>
    </div> 
  </header> -->
  <header class="header">
    <BaseContainer>
      <div class="wrapper">
        <div class="logo">
          <a href="/" class="w-max d-inline-block">
            <img src="/icons/logo.svg" alt="логотип">
          </a>
        </div>
        <form >
          <input type="text" >
          <button>
            <img src="/icons/search.svg" alt="">
          </button>
        </form>
      </div>
    </BaseContainer> 
  </header>
</template>

<style lang="scss" scoped>
@use '../styles/main.scss' as *;

  header.header {
    background: transparent;

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      form {
        input {
          border-bottom: 1px solid $black80;
        }
      }
    }
  }
</style>