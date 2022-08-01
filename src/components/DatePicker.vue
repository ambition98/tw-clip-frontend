<template>
    <div>
        <v-dialog v-model="open" max-width="300px">
            <v-date-picker
                v-model="picker"
                color="purple"
                min="2000-01-01"
                max="2030-12-31"
                locale="ko">
            </v-date-picker>
            <!-- <v-btn color="purple" style="color: white;" @click="open=false">확인</v-btn> -->
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'DatePicker',
    components: {},
    props: ['modal', 'date'],
    data() {
        return {
            open: '',
            picker: '',
            first: true
        }
    },
    watch: {
      open: function() {
        if (!this.open) {
          this.$emit('close')
        }
      },
      picker: function() {
        if (!this.first) {
            console.log('emit')
            this.$emit('picker', this.picker)
        }
      }
    },
    created() {
      this.open = this.modal
    //   this.picker = this.date
      this.first = false
    },
    methods: {}
}
</script>
