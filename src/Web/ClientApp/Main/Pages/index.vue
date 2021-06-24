
<template>
    <div v-cloak>
        Main Dashboard
    </div>
</template>
<script>

    //import page from '../../_Core/Mixins/pageMixin';

    export default {
        mixins: [
            //page
        ],
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                
            };
        },
        computed: {
            
        },
        async mounted() {
            const vm = this;

            const cache = JSON.parse(localStorage.getItem(vm.dashboardKey)) || {};

            
        },
        async created() {
            const vm = this;

            const cache = vm.$util.getWithExpiry(vm.feedbackCache);

            //if (cache)
            //    vm.showFeedback = false;

        },

        methods: {
            
        }
    }
</script>