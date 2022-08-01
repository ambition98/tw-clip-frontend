<template>
    <div>
        <v-container>
            <iframe src="https://clips.twitch.tv/embed?clip=UgliestPlayfulMosquitoWoofer-eYyZWzJr9ovcxOdN&parent=localhost&autoplay=true&muted=false" frameborder="0"></iframe>
            <BroadcasterSearch :k="user.displayName"/>
            <div class="user-info">
                <div class="user-img">
                    <v-img :src="user.profileImageUrl" width="100" class="rounded-circle" />
                </div>
                <div>
                    <div class="user-name">
                        {{ user.displayName }}
                    </div>
                    <div>
                        {{ user.description }}
                    </div>
                </div>
            </div>
            <div v-if="userLoaded">
                <v-tabs
                    v-model="tab"
                    color="purple"
                    grow
                >
                <v-tab v-for="tab in tabName" :key="tab">
                    {{ tab }}
                </v-tab>
                </v-tabs>
                <div v-if="tab === 0 && tabLoaded[0]">
                    <BroadcasterClips :id="user.id" :startedAt="startedAt" :endedAt="endedAt" key="0" />
                </div>
                <div v-else-if="tab === 1 && tabLoaded[1]">
                    <BroadcasterClips :id="user.id" :startedAt="startedAt" :endedAt="endedAt" key="1"/>
                </div>
                <div v-else-if="tab === 2 && tabLoaded[2]">
                    <BroadcasterClips :id="user.id" :startedAt="startedAt" :endedAt="endedAt" key="2"/>
                </div>
                <div v-else>
                    <div class="calender-container">
                        <v-spacer></v-spacer>
                            <v-icon large color="purple" @click="openStarted()">mdi-calendar</v-icon>
                            <div v-if="openStartedPicker">
                                <DatePicker :modal="openStartedPicker" :date="startedAt" @close="openStartedPicker = false" @picker="updateStartedAt"/>
                            </div>
                                <v-text-field color="purple" @keyup.enter="reloadCustomPeriod" v-model="startedAt" label="YYYY-MM-DD 부터" />
                            <v-icon large color="purple" @click="openEnded()">mdi-calendar</v-icon>
                            <div v-if="openEndedPicker">
                                <DatePicker :modal="openEndedPicker" :date="endedAt" @close="openEndedPicker = false" @picker="updateEndedAt"/>
                            </div>
                                <v-text-field color="purple" @keyup.enter="reloadCustomPeriod" v-model="endedAt" label="YYYY-MM-DD 까지" />
                    </div>
                    <BroadcasterClips v-if="openCustomPeriod" :id="user.id" :startedAt="startedAt" :endedAt="endedAt" :key="componentKey"/>
                </div>
            </div>
        </v-container>
    </div>
</template>
<script>
import BroadcasterSearch from '@/components/BroadcasterSearch.vue'
import BroadcasterClips from '@/components/BroadcasterClips.vue'
import DatePicker from '@/components/DatePicker.vue'

export default {
    components: {
        BroadcasterSearch,
        BroadcasterClips,
        DatePicker
    },
    data() {
        return {
            tabName: ['일주전', '한달전', '세달전', '기간검색'],
            tab: 0,
            tabLoaded: [true, false, false, false],
            user: '',
            userLoaded: false,
            startedAt: '',
            endedAt: '',
            openStartedPicker: false,
            openEndedPicker: false,
            picker: '',
            openCustomPeriod: true,
            componentKey: 3
        }
    },
    watch: {
        tab: function() {
            for (var i = 0; i < this.tab.length; i++) {
                this.tabLoaded[i] = false
            }
            this.endedAt = this.getYMD(new Date())
            switch (this.tab) {
                case 0:
                    this.startedAt = this.getWeekAgo()
                    this.tabLoaded[0] = true
                    break
                case 1:
                    this.startedAt = this.getMonthAgo()
                    this.tabLoaded[1] = true
                    break
                case 2:
                    this.startedAt = this.getQuarterAgo()
                    this.tabLoaded[2] = true
                    break
                default:
                    //
            }
        }
    },
    created() {
        this.startedAt = this.getWeekAgo()
        this.endedAt = this.getYMD(new Date())
        this.$axios.get('/twitch/users', {
            params: {
                id: this.$route.params.id
            }
        }).then(res => {
            console.log(res.data)
            this.user = res.data.dto[0]
            this.userLoaded = true
        })
    },
    methods: {
        updateStartedAt(date) {
            this.startedAt = date
            this.reloadCustomPeriod()
        },
        updateEndedAt(date) {
            this.endedAt = date
            this.reloadCustomPeriod()
        },
        reloadCustomPeriod() {
            console.log('reload')
            this.componentKey++
        },
        openStarted() {
            this.openStartedPicker = true
        },
        openEnded() {
            this.openEndedPicker = true
        },
        getWeekAgo() {
            const now = new Date()
            now.setDate(now.getDate() - 7)
            return this.getYMD(now)
        },
        getMonthAgo() {
            const now = new Date()
            now.setMonth(now.getMonth() - 1)
            return this.getYMD(now)
        },
        getQuarterAgo() {
            const now = new Date()
            now.setMonth(now.getMonth() - 3)
            return this.getYMD(now)
        },
        getYMD(d) {
            const year = d.getFullYear()
            const month = d.getMonth() + 1
            const date = d.getDate()

            return year + '-' + month + '-' + date
        }
    }
}
</script>
<style scoped>
.user-info {
    display: flex;
    align-items: center;
}
.user-img {
    margin-right: 20px;
}
.user-name {
    font-size: 1.2rem;
    font-weight: bold;
}
.calender-container {
    display: flex;
    align-items: center;
    max-width: 500px;
    margin-left: auto;
    margin-top: 30px;
}
.icon-container {
    display: flex;
}
</style>
