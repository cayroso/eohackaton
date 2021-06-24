<template>
    <pages-lookup-seasons-index :uid="uid"   :urlView="urlView" :urlAdd="urlAdd"></pages-lookup-seasons-index>
</template>
<script>

    import PagesLookupSeasonsIndex from '../../../../_Core/Pages/Lookups/Seasons/index.vue';

    export default {
        mixins: [
        ],
        components: {
            PagesLookupSeasonsIndex
        },
        props: {
            uid: String,
            urlView: String,
            urlAdd: String,
        },
        data() {
            return {};
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