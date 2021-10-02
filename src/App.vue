<template>
  <router-view />
</template>

<script lang="ts">
// import WebFont from 'webfontloader';

// eslint-disable-next-line no-import-assign
/* WebFont.load({
	google: {
		families: ['Lato:300,400,600']
	}
}) */
</script>

<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
	title: 'Weather-app',
	meta: [
		{ name: 'description', content: 'Opinionated Vite Starter Template' },
	],
	link: [
		// todo 1 вариант загрузки шрифтов - синхронно, медленее, без дергания
		/* {
			rel: "preconnect",
			href: "https://fonts.googleapis.com"
 
		},
		{
			rel:"preconnect",
			href:"https://fonts.gstatic.com",
			crossorigin: true
		}, 
		{
			href: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap", rel="stylesheet"
		}, */
		// todo 2 вариант загрузки шрифтов - асинхронно, быстрее загрузка, есть дергания
		{
			rel: "preload", 
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      as: "style",
      onload: "this.onload=null; this.rel='stylesheet'; document.body.classList.add('fontLoaded')"
		}	
	]
})
</script>

<style lang="scss">
	body {
		font-family: Helvetica, Arial, sans-serif;
	}

	body.fontLoaded {
		font-family: 'Lato', sans-serif !important;
	}

	
</style>


