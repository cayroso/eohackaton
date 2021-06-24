<template>
    <nav class="navbar navbar-expand-md navbar-toggleable-sm navbar-dark bg-dark sticky-top shadow">
        <div class="container-xl">
            <b-navbar-toggle target="navDrawer"></b-navbar-toggle>

            <a href="/" class="navbar-brand ml-2 ml-sm-0">
                {{appName}}
            </a>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <b-navbar-nav>
                    <template v-for="menu in menus">
                        <b-nav-item v-if="!menu.subMenus" :href="menu.to" :key="menu.to" type="dark">
                            <span v-bind:class="menu.icon"></span>&nbsp;{{menu.label}}
                        </b-nav-item>
                        <b-nav-item-dropdown v-else>
                            <template v-slot:button-content>
                                <span v-bind:class="menu.icon"></span>&nbsp;{{menu.label}}
                            </template>
                            <b-dropdown-item v-for="mnu in menu.subMenus" :to="mnu.to" :key="mnu.to">
                                <span class="mr-1" v-bind:class="mnu.icon"></span>{{mnu.label}}
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </template>
                </b-navbar-nav>
            </div>

        </div>

        <nav-drawer :appName="appName" :menus="menus"></nav-drawer>
    </nav>
</template>
<script>
    import navbarMixin from '../../../_Core/Mixins/navbarMixin';

    import NavDrawer from './nav-Drawer.vue';

    export default {
        mixins: [
            navbarMixin
        ],
        components: {
            NavDrawer
        },
        props: {
            appName: { type: String, required: true },
            urlProfilePicture: String,
            menus: Array,
            baseUrl: String
        },
        data() {
            return {

            };
        },
        computed: {

        },

        async mounted() {
            const vm = this;

        },
        methods: {

        }
    };

</script>