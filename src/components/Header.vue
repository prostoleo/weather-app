<template>
  <header class="py-3" >
    <div class="container w-11/12 flex justify-between items-center mx-auto">
      <div class="logo w-3/12">
        <router-link to="/" class="d-inline-block">
          <img :src="`/icons/logo${props.notHome === true ? '-dark': ''}.svg`" alt="логотип" class="w-20">
        </router-link>
      </div>
      <form class="inline-flex items-center">
        <input type="text" class="bg-transparent border-b-1 p-1" :class="props.notHome === true ? 'text-black border-gray-900' : 'text-white border-grey-100'">
        <button>
          <img :src="`/icons/search${props.notHome === true ? '-dark': ''}.svg`" alt="">
        </button>
      </form>
    </div> 
  </header>
  <!-- <header class="header">
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
  </header> -->
</template>

<script setup lang="ts">
  const props = defineProps({
    notHome: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss" scoped>
// @use '../styles/main.scss' as *;

header.header_transparent {
  background: transparent !important;
}

//   header.header {
//     background: transparent;

//     .wrapper {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;

//       form {
//         input {
//           border-bottom: 1px solid $black80;
//         }
//       }
//     }
//   }
</style>