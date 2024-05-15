<script setup>
const props = defineProps({
  lat: 0,
  lng: 0,
  hight: 300,
})
</script>

<template>
  <iframe
    width="100%"
    height="300"
    :src="`https://maps.google.co.jp/maps?ll=${props.lat}, ${props.lng}&amp;q=${props.lat}, ${props.lng}&amp;output=embed&amp;t=m&amp;z=16`"
    frameborder="0" 
    marginwidth="0" 
    marginheight="0" 
    scrolling="no"
  ></iframe>
</template>