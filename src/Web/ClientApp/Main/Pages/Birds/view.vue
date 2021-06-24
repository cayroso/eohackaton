<template>
    <page :uid="uid"  :id="id" :urlView="urlView" :urlViewBreeding="urlViewBreeding"></page>
</template>
<script>

    import page from '../../../_Common/Components/Birds/View/index.vue'

    export default {
        mixins: [
            //page
        ],
        components: {
            page
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            urlView: { type: String, required: true },
            urlViewBreeding: { type: String, required: true },
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