<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="[
        'el-message',
        type && !iconClass ? `el-message--${type}` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i v-if="iconClass" :class="typeIcon[0]"></i>
      <i v-else :class="typeIcon[0]"></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <p v-else class="el-message__content" v-html="message"></p>
      </slot>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close icon-times" @click="close"></i>
      <span style="font-style: italic; bottom: 3px; left: 5px; position: absolute; font-size: 10px; color: #c0c4cc">{{
        appVersion
      }}</span>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}
export default {
  data() {
    return {
      appVersion: process.env.appVersion,
      typeIcon: {
        success: 'icon-check-circle-o',
        info: 'icon-info-circle',
        warning: 'icon-warning',
        error: 'icon-warning'
      },
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: true,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    }
  },
  computed: {
    typeClass() {
      return this.type && !this.iconClass ? `el-message__icon el-icon-${typeMap[this.type]}` : ''
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`
      }
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  }
}
</script>
