<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  link: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "32px",
  },
});
const url = new URL(props.link);
const { pathname } = url;

const name = pathname.split("/").pop();
const suffix = name.split(".").pop();

const icon = computed(() => {
  const iconMapping = {
    doc: "doc",
    docx: "doc",
    jpg: "jpg",
    html: "html",
    mp3: "icon_MP-",
    png: "png",
    dll: "dll",
    ppt: "ppt",
    mp4: "mp4",
    pdf: "pdf",
    gif: "gif",
    exe: "exe",
    mpg: "mpg",
    psd: "psd",
    mkv: "mkv",
    xls: "xls",
    xlsx: "xls",
    rmvb: "rmvb",
    txt: "txt",
    wav: "wav",
    swf: "swf",
    avi: "avi",
    zip: "zip",
    folder: "folder",
    othe: "othe",
  };
  return iconMapping[suffix] || iconMapping.othe;
});
</script>


<template>
  <svg
    class="icon"
    aria-hidden="true"
    :style="{
      height: props.size,
      width: props.size,
    }"
  >
    <use v-bind:xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<style>
</style>