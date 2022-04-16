<template>
  <div>
    <div>Alerts</div>
    <ul>
      <li v-for="(alert, index) in alerts" :key="index">{{ alert }}</li>
    </ul>
  </div>
</template>

<script>
import { getAlerts } from '~/http/alert'

export default {
  name: 'Alert',
  data() {
    return {
      alerts: []
    }
  },
  methods: {
    loadAlerts() {
      getAlerts().then((response) => {
        this.alerts = response.data
      })
    }
  }
}
</script>

<style scoped></style>
