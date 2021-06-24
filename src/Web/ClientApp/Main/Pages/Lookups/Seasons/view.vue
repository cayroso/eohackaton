<template>
    <pages-lookup-seasons-view :uid="uid" :id="id" :urlViewBird="urlViewBird"></pages-lookup-seasons-view>
</template>
<script>
    import PagesLookupSeasonsView from '../../../../_Core/Pages/Lookups/Seasons/view.vue';

    export default {
        mixins: [
        ],
        components: {
            PagesLookupSeasonsView
        },
        props: {
            uid: String,
            id: String,
            urlViewBird: String,
        },
        data() {
            return {

            };
        },
        computed: {

        },
        async created() {

        },
        async mounted() {

        },
        methods: {

        }
    }
</script>