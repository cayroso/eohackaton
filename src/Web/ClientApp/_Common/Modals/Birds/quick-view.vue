<template>
    <b-modal ref="modal"
             :no-close-on-esc="false"
             :no-close-on-backdrop="false"
             header-class=""
             body-class=""
             footer-class=""
             scrollable
             v-cloak>
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Fowl Quick Info
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <div class="d-flex flex-row justify-content-between">

                <button @click="$refs.modal.hide()" class="btn btn-secondary ml-1">
                    Close
                </button>
            </div>

        </template>
        <div v-if="birdInfo">
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Name</label>
                <div class="col">
                    <span class="form-control-plaintext">
                        <a :href="createViewLink()">
                            {{birdInfo.name}}
                        </a>
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Bloodlines</label>
                <div class="col">
                    <div class="form-control-plaintext">
                        <ul class="list-unstyled mb-0">
                            <li v-for="b in birdInfo.bloodlines">
                                <span v-if="b.percentage===1">Full</span>
                                <span v-else>{{b.percentage|decimalToFraction}}</span> {{b.name}} - {{b.genderText}} {{b.percentage*100}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="form-group row">

                <label class="col-4 text-right col-form-label">Type</label>
                <div class="col">
                    <span class="form-control-plaintext">{{birdInfo.type}}</span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Birth Date</label>
                <div class="col">
                    <span class="form-control-plaintext">{{birdInfo.dateStart|moment('calendar')}}</span>
                </div>
            </div>
            <div v-if="birdInfo.dead" class="form-group row">
                <label class="col-4 text-right col-form-label">Death Date</label>
                <div class="col">
                    <span class="form-control-plaintext">{{birdInfo.dateEnd|moment('calendar')}}</span>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    export default {
        mixins: [
        ],
        components: {
        },
        props: {
            urlView: String
        },
        data() {
            return {
                birdInfo: null,
            };
        },
        computed: {

        },
        async created() {

        },
        async mounted() {

        },
        methods: {

            async open(birdInfo) {
                const vm = this;
                
                vm.birdInfo = birdInfo;
                vm.$refs.modal.show();
            },

            createViewLink() {
                const vm = this;
                const url = `${vm.urlView}${vm.birdInfo.birdId}`;
                return url;
            },
        }
    }
</script>