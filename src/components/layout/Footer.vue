<template>
    <div>
        <v-app>
            <v-app-bar
            color="grey darken-2"
            elevation="4"
            >
            <div class="d-flex align-center footer" id="footer">
            <v-icon
                color="white"
            >
                mdi-email
            </v-icon>
            ambition65@naver.com
            </div>

            <v-spacer></v-spacer>

            <span class="github" @click="goToGithubFront">
            <v-img
                class="github-logo"
                contain
                src="@/assets/github_logo.png"
                transition="scale-transition"
                max-width="30"
            /> <span class="github-span">Frontend</span>
            </span>
            <span class="github" @click="goToGithubBack">
            <v-img
                class="github-logo"
                contain
                src="@/assets/github_logo.png"
                transition="scale-transition"
                max-width="30"
            /> <span class="github-span">Backend</span>
            </span>
            </v-app-bar>
        </v-app>
    </div>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style scoped>
#footer {
  font-size: 1.2rem;
  color: white;
}
#footer > i {
  margin-right: 10px;
}
.github {
  margin-left: 20px;
  cursor: pointer;
}
.github-logo {
  margin-left: 20px;
}
.github-span {
  font-size: 1.1rem;
  color: white;
}
</style>
