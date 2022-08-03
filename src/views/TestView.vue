<template>
    <div>
        <div id="clip"></div>
        <hr>
        <div class="text">
            <b>autoplay=true&muted=false</b><br>
            src: &lt;iframe src="https://clips.twitch.tv/embed?clip=HelplessPerfectBeeDendiFace-Y05FfC519qs8eTrt&parent=localhost&autoplay=true&preload=auto" width="400" height="300" frameborder="0px" allowfullscreen/&gt;
        </div>
        <iframe src="https://clips.twitch.tv/embed?clip=HelplessPerfectBeeDendiFace-Y05FfC519qs8eTrt&parent=localhost&autoplay=true&muted=false&preload=auto" width="400" height="300" frameborder="0px" allowfullscreen preload="metadata"/>
        <hr>
        <div class="text">
            <b>autoplay=false&muted=true</b>
        </div>
        <iframe src="https://clips.twitch.tv/embed?clip=HelplessPerfectBeeDendiFace-Y05FfC519qs8eTrt&parent=localhost&autoplay=false&muted=true" width="400" height="300" frameborder="0px" allowfullscreen preload="metadata"/>
        <hr>
        <div class="text">
            <b>autoplay=false&muted=true</b>
        </div>
        <iframe src="https://clips.twitch.tv/embed?clip=HelplessPerfectBeeDendiFace-Y05FfC519qs8eTrt&parent=localhost&autoplay=false&muted=false" width="400" height="300" frameborder="0px" allowfullscreen preload="metadata"/>
    </div>
</template>
<script src= "https://player.twitch.tv/js/embed/v1.js"></script>
<script>
export default {
    name: 'test',
    components: {},
    data() {
        return {
            sampleData: ''
        }
    },
    setup() {},
    created() {
        /* eslint-disable */
        const options = {
            width: '100%',
            height: '100%',
            video: 'sHelplessPerfectBeeDendiFace-Y05FfC519qs8eTrt',
            layout: 'video',
            autoplay: false
        }

        const twitchPlayer = new Twitch.Embed("clip", options)
        /* eslint-enable */
    },
    mounted() {
    },
    beforeUnmounted() {
        console.log('unmounted')
        const video = document.getElementsByTagName('video')
        console.log(video)
    },
    methods: {
        test() {
            const video = document.getElementsByTagName('video')
            console.log(video)
        }
    }
}
</script>
<style scoped>
hr {
    margin: 20px 0px;
}
.text {
    font-size: 1.2rem;
    margin-left: 20px;
}
</style>
