<template>
    <b-sidebar id="navDrawer" :title="appName" backdrop shadow>
        <b-nav vertical pills>
            <template v-for="menu in menus">
                <b-nav-item v-if="!menu.subMenus" :to="menu.to" :key="menu.to">
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
        </b-nav>

    </b-sidebar>
</template>
<script>
    export default {
        props: {
            appName: { type: String, required: true },
            menus: { type: Array, required: true }
        }
    };
</script>