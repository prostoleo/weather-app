<template>
  <header class="bg-transparent">
    <div class="w-11/12 flex justify-between items-center mx-auto">
      <div class="logo w-3/12">
        <router-link to="/" class="d-inline-block">
          <img src="/icons/logo.svg" alt="логотип">
        </router-link>
      </div>
      <form class="inline-flex items-center">
        <input type="text" class="bg-transparent border-b-1 border-grey-100">
        <button>
          <svg width="17" height="18" viewBox="0 0 17 18" fill="" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5635 11.0534L15.3744 14.8642C15.5083 14.9982 15.5835 15.18 15.5835 15.3695C15.5834 15.559 15.5081 15.7407 15.374 15.8746C15.24 16.0086 15.0582 16.0838 14.8687 16.0837C14.6792 16.0837 14.4975 16.0083 14.3636 15.8743L10.5527 12.0634C9.41354 12.9458 7.98099 13.361 6.5465 13.2246C5.11202 13.0883 3.78337 12.4105 2.83084 11.3293C1.87831 10.2481 1.37345 8.84464 1.41897 7.40441C1.46449 5.96418 2.05696 4.59538 3.07587 3.57648C4.09477 2.55757 5.46357 1.9651 6.9038 1.91958C8.34403 1.87406 9.74751 2.37892 10.8287 3.33145C11.9099 4.28398 12.5877 5.61263 12.724 7.04711C12.8604 8.4816 12.4452 9.91415 11.5628 11.0534H11.5635ZM7.08333 11.8332C8.2105 11.8332 9.29151 11.3855 10.0885 10.5884C10.8856 9.79141 11.3333 8.7104 11.3333 7.58323C11.3333 6.45606 10.8856 5.37506 10.0885 4.57803C9.29151 3.781 8.2105 3.33323 7.08333 3.33323C5.95616 3.33323 4.87516 3.781 4.07813 4.57803C3.2811 5.37506 2.83333 6.45606 2.83333 7.58323C2.83333 8.7104 3.2811 9.79141 4.07813 10.5884C4.87516 11.3855 5.95616 11.8332 7.08333 11.8332Z" fill="white"/>
          </svg>
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

<style lang="scss" scoped>
// @use '../styles/main.scss' as *;

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