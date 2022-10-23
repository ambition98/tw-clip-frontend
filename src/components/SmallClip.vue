<template>
    <div>
        <div v-if="width < 550">
            <div v-if="clips.length == 0">
                즐겨찾기한 클립이 없습니다.
            </div>
            <div v-else v-for="(clip, i) in clips" :key="clip.id" class="s-container">
                <div class="s-check">
                    <input :id="i" type="checkbox" :value="clip.id" v-model="checkedArr">
                </div>
                <div class="s-info">
                    <div class="s-imgContainer">
                        <div class="s-img"><v-img eager :src="clip.thumbnailUrl" @click="openModal(clip)"/></div>
                        <div class="s-bName">{{ clip.broadcasterName }}</div>
                        <div class="s-viewCount">{{ clip.viewCount }}회</div>
                        <div class="s-createdAt">{{ clip.createdAt }}</div>
                    </div>
                    <div class="s-title">
                        {{ clip.title }}
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div v-if="clips.length == 0">
                즐겨찾기한 클립이 없습니다.
            </div>
            <table v-else>
                <tbody>
                    <tr v-for="(clip, i) in clips" :key="clip.id" class="line">
                        <td><div class="clip-check"><input :id="i" type="checkbox" :value="clip.id" v-model="checkedArr"></div></td>
                        <td style="width: 1%"><div class="clip-img" @click="openModal(clip)"><v-img eager :src="clip.thumbnailUrl"/></div></td>
                        <td><div class="clip-broadcaster-name">{{ clip.broadcasterName }}</div></td>
                        <td><div class="clip-title">{{ clip.title }}</div></td>
                        <td><div class="clip-viewcount">{{ clip.viewCount }}회</div></td>
                        <td><div class="clip-createdat">{{ clip.createdAt }}</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div v-if="clips">
            <div class="clips-container">
                <div class="clip-info" v-for="(clip, i) in clips" :key="clip.id">
                    <div class="clip-check clip"><input :id="i" type="checkbox" :value="clip.id" v-model="checkedArr"></div>
                    <div class="clip-img clip" @click="openModal(clip)"><v-img eager :src="clip.thumbnailUrl"/></div>
                    <div class="clip-broadcaster-name clip">{{ clip.broadcasterName }}</div>
                    <div class="clip-title clip">{{ clip.title }}</div>
                    <div class="clip-viewcount clip">{{ clip.viewCount }}회</div>
                    <div class="clip-createdat clip">{{ clip.createdAt }}</div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    props: ['clips'],
    name: 'SmallClip',
    data() {
        return {
            width: ''
        }
    },
    created() {
        this.width = window.innerWidth
    },
    methods: {}
}
</script>
<style scoped>
.clip-img {
    width: 100px;
}
table {
    text-align: center;
    width: 100%;
}
table{
    border-collapse: collapse;
}
td {
    border-bottom: 1px solid  darkgray;
}
table td{
    padding : 10px;
}
.clips-container {
    font-size: 0.9rem;
}
.clip-check {
    display: flex;
}
.clip-title {
    text-align: left;
}
.s-container {
    display: flex;
    border-bottom: 1px solid darkgray;
}
.s-container > * {
    padding: 5px;
}
.s-check {
    display: flex;
}
.s-imgContainer {
    display: flex;
    align-items: center;
}
.s-imgContainer > * {
    padding: 5px;
}
.s-img {
    height: 100%;
    width: 100px;
}
</style>
