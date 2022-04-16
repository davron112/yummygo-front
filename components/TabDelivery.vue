<template>
  <ul class="columns" style="display: flex; padding: 0 5px">
    <li class="is-active column tab-delivery tab-courier">
      <i class="icon-motorcycle" aria-hidden="true"></i>&nbsp;Kurier orqali yetkazish
    </li>
    <li class="column tab-delivery">
      <i class="icon-directions_walk" aria-hidden="true"></i>
      &nbsp;Mijoz o'zi olib ketish
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TabDelivery'
}
</script>
<style lang="scss" scoped>
@media (max-width: 991px) {
  .tab-delivery {
    text-align: center;
    font-size: small;
  }
}

@media (min-width: 991px) {
  .tab-courier {
    justify-content: end;
    display: flex;
    line-height: 15px;
    margin-top: 5px;
  }
}
.tab-delivery {
  cursor: pointer;
}
</style>
