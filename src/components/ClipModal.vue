<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
    name: 'ClipModal',
    components: {},
    data() {
        return {
            dialog: ''
        }
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
    }
}
</script>
<style scoped>
.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    /* width: 50%;
    height: 50%; */
}
/* .modal-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
}
.modal-content {
    padding: 10px 20px;
}
.modal-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
}
.modal-enter-active, .modal-leave-active {
    transition: opacity 0.4s;
}
.modal-enter-active, .modal-leave-active > .modal-window {
    transition: opacity 0.4s, transform 0.4s;
}
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}
.modal-enter, .modal-leave-to {
    opacity: 0;
}
.modal-enter, .modal-leave-to > .modal-window {
    opacity: 0;
    transform: translateY(-20px);
} */
</style>
