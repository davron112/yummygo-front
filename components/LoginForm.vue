<template>
  <Modal v-if="showModal" @close="closeModal">
    <form v-if="!sendOtp && !getLoggedIn" @submit.prevent="sendSms">
      <div class="field">
        <label v-if="sendOtp" class="label">Kod</label>
        <label v-else class="label">Telefon</label>
        <div class="control">
          <input v-show="!sendOtp" v-model="form.phone" class="input" type="phone" placeholder="Telefon" />
        </div>
      </div>
      <button type="submit" class="button is-primary">Kirish</button>
    </form>
    <form v-else-if="sendOtp && !getLoggedIn" @submit.prevent="submitOtpCode">
      <div class="field">
        <label v-if="sendOtp" class="label">Kod</label>
        <label v-else class="label">Telefon</label>
        <div class="control">
          <input v-show="sendOtp" v-model="formOtp.otp" class="input" type="text" placeholder="Kod" />
        </div>
      </div>
      <button type="submit" class="button is-primary">Kirish</button>
    </form>
    <div v-else-if="getLoggedIn" class="box">Siz ro'yhatdan muoffaqiyatli o'tdingiz!</div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { generateOtpLogin, verifyOtpCode } from '~/http/auth'

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        phone: ''
      },
      formOtp: {
        otp: ''
      },
      validOtp: false,
      sendOtp: false,
      showModal: false
    }
  },
  computed: {
    ...mapGetters('setting', ['address', 'latitude', 'longitude']),
    ...mapGetters('auth', ['getLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['loginData']),
    async sendSms() {
      this.validOtp = false
      await generateOtpLogin(this.form)
        .then((response) => {
          console.log(response, 'res')
          if (response.data.otp) {
            this.sendOtp = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fillForm() {
      this.formOtp = await Object.assign(this.formOtp, {
        phone: this.form.phone,
        name: '',
        email: null,
        password: null,
        address: {
          lat: this.latitude,
          lng: this.longitude,
          address: this.address,
          house: null,
          tag: null
        }
      })
    },
    async submitOtpCode() {
      await this.fillForm()
      await verifyOtpCode(this.formOtp)
        .then((response) => {
          console.log(response.data.data, 'response.data')
          this.loginData(response.data.data)
          this.closeModal()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped></style>
