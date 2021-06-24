<template>
    <page :uid="uid" :id="id" :urlViewBreeding="urlViewBreeding"></page>
</template>
<script>
    import page from '../../../_Common/Components/Pens/view.vue'

    export default {
        mixins: [
        ],
        components: {
            page
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            //urlView: { type: String, required: true },
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