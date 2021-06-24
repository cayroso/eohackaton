<template>
    <page :uid="uid" :id="id" :urlViewBird="urlViewBird" :urlAddBird="urlAddBird"></page>
</template>
<script>
    import page from '../../../_Common/Components/Breedings/view.vue'

    export default {
        mixins: [
        ],
        components: {
            page
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            urlViewBird: { type: String, required: true },
            urlAddBird: { type: String, required: true },
        },
        data() {
            return {};
        },
        computed: {

        },
        async created() {

        },
        async mounted() {
            const vm = this;

        },
        methods: {

        }
    }
</script>