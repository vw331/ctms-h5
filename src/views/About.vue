<script setup>
import { useDic } from '@/service/dic'
const { transformDic } = useDic()

const result = transformDic('notice', '1')
console.log(result)
</script>


<template>
  <div class="about">
    {{ $filter.dic('notice', '1') }}
  </div>
  <div class="about">
    {{ $filter.dic('issue_monitory_type', 'investigator') }}
  </div>
</template>

