<template>
    <div>
        <BroadcasterSearch />
        <div style="width: 50%; margin: auto">
            <v-container>
                <v-row>
                    <v-col
                        v-for="partner in partners"
                        :key="partner.id"
                        align-self="start"
                        cols="12"
                    >
                        <v-hover v-slot="{ hover }">
                            <v-card
                                :elevation="hover ? 10 : 5"
                                @click="goToBroadcasterPage(partner)"
                            >
                                <div class="card">
                                    <div style="display: flex; align-items: center;">
                                        <v-img max-width="100" :src="partner.profileImageUrl" class="img" style="display: inline-block"></v-img>
                                        <div style="font-weight: bold; font-size: 1.1rem">
                                            {{ partner.displayName }}
                                            <v-icon color="purple" style="bottom: 2px;">mdi-check-circle</v-icon>
                                        </div>
                                    </div>
                                    <div style="margin-top: 10px">{{ partner.description}}</div>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <v-divider style="margin: 20px 0px"></v-divider>

        <v-container>
            <v-row>
                <v-col
                    v-for="user in users"
                    :key="user.id"
                    align-self="start"
                    cols="12"
                    md="3"
                    sm="6"
                >
                    <v-hover v-slot="{ hover }">
                        <v-card
                            :elevation="hover ? 10 : 5"
                            @click="goToBroadcasterPage(user)"
                        >
                            <div class="card">
                                <div style="display: flex; align-items: center;">
                                    <v-img max-width="50" :src="user.profileImageUrl" class="img" style="display: inline-block"></v-img>
                                    <div style="font-weight: bold">
                                        {{ user.displayName }}
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
        파트너
        <div v-for="partner in partners" :key="partner.id">
            {{ partner }}
        </div>

        <v-divider></v-divider>

        일반
        <div v-for="user in users" :key="user.id">
            {{ user }}
        </div>
    </div>
</template>
<script>
import BroadcasterSearch from '@/components/BroadcasterSearch.vue'

export default {
    components: {
        BroadcasterSearch
    },
    data() {
        return {
            partners: [],
            users: []
        }
    },
    created() {
        console.log('created')
        this.$axios.get('/twitch/search/user?keyword=' + this.$route.query.keyword)
        .then(res => {
            console.log(res)
            res.data.dto.forEach(user => {
                if (user.broadcasterType === 'partner') {
                    this.partners.push(user)
                } else {
                    this.users.push(user)
                }
            })
        })
    },
    updated() {
    },
    mounted() {
        console.log('mounted')
    },
    methods: {
        goToBroadcasterPage(user) {
            this.$router.push({
                name: 'broadcaster',
                params: {
                    id: user.id,
                    user: user
                }
            })
        }
    }
}
</script>
<style scoped>
.card {
    /* display: flex; */
    padding: 10px;
    align-items: center;
    background: rgb(245, 245, 245);
    cursor: pointer;
}
.img {
    /* display: block; */
    margin-right: 10px;
    border-radius: 100%;
}
</style>
