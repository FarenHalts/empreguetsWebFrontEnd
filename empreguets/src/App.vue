<template>
<div id="app">
    <!-- <head>
         <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    </head> -->
    <headerEmp v-if="renderApp">
    </headerEmp>
    <router-view />
</div>
</template>

<script>
import profileAPI from './views/login/loginService'
import headerEmp from '@/components/headerEmp'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        headerEmp
    },
    data() {
        return {}
    },
    created() {
        this.setUserData();
    },
    computed: {
        ...mapGetters({
            renderApp: 'renderApp'
        }),
    },
    methods: {
        setUserData() {
            profileAPI.verifyToken(localStorage.getItem("token")).then(response => {
                if (response.status == 200) {
                    this.loggedUser = response.data.data[0];
                }
            })
        },
    }
}
</script>

<style>
</style>
