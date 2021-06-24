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
                    Edit Eggs
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <b-overlay :show="busy">
                <button @click="save()" v-bind:disabled="!formIsValid" class="btn btn-primary">
                    Save
                </button>
                <button @click="close()" class="btn btn-secondary">
                    Close
                </button>
            </b-overlay>
        </template>
        <div>

            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Eggs</label>
                <div class="col">
                    <input v-model="eggs" type="number" class="form-control" v-bind:class="{'is-invalid':validations.get('eggs')}" />
                    <span v-if="validations.has('eggs')" class="text-danger">
                        {{validations.get('eggs')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Fertile</label>
                <div class="col">
                    <input v-model="fertile" type="number" class="form-control" v-bind:class="{'is-invalid':validations.get('fertile')}" />
                    <span v-if="validations.has('fertile')" class="text-danger">
                        {{validations.get('fertile')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Hatched</label>
                <div class="col">
                    <input v-model="hatched" type="number" class="form-control" v-bind:class="{'is-invalid':validations.get('hatched')}" />
                    <span v-if="validations.has('hatched')" class="text-danger">
                        {{validations.get('hatched')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Cocks</label>
                <div class="col">
                    <span class="form-control-plaintext">{{cocks}}</span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Hens</label>
                <div class="col">
                    <span class="form-control-plaintext">{{hens}}</span>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [
            page
        ],
        components: {
        },
        props: {

        },
        data() {
            return {
                isDirty: false,
                validations: new Map(),

                breedingId: '',
                token: '',
                eggs: null,
                hatched: null,
                fertile: null,
                cocks: null,
                hens: null,
            };
        },
        computed: {
            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const validations = new Map();
                const total = vm.cocks + vm.hens;
                const eggs = Number.parseInt(vm.eggs);
                const hatched = Number.parseInt(vm.hatched);
                const fertile = Number.parseInt(vm.fertile);

                if (isNaN(eggs) || eggs < 0) {
                    validations.set('eggs', 'Eggs is required.');
                }
                else if (vm.eggs < total) {
                    validations.set('eggs', 'Eggs is less than Cocks + Hens.');
                }

                if (isNaN(fertile) || fertile < 0) {
                    validations.set('fertile', '# of Fertile is required.');
                }
                else if (fertile > eggs) {
                    validations.set('fertile', '# of Fertile greater than Eggs.');
                }
                else if (fertile < total) {
                    validations.set('fertile', '# of Fertile is less than Cocks + Hens.');

                }

                if (isNaN(hatched) || hatched < 0) {
                    validations.set('hatched', 'Hatched is required.');
                }
                else if (hatched > fertile) {
                    validations.set('hatched', 'Hatched greater than # of fertile.');
                }
                else if (hatched < total) {
                    validations.set('hatched', 'Hatched is less than Cocks + Hens.');

                }

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {

        },
        async mounted() {

        },
        methods: {

            async open(breedingId, token, breedingPerformance) {
                const vm = this;

                Object.assign(vm.$data, this.$options.data());

                vm.breedingId = breedingId;
                vm.token = token;
                vm.eggs = breedingPerformance.eggs;
                vm.fertile = breedingPerformance.fertile;
                vm.hatched = breedingPerformance.hatched;
                vm.cocks = breedingPerformance.cocks;
                vm.hens = breedingPerformance.hens;

                vm.isDirty = false;
                vm.validations.clear();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            async save() {
                const vm = this;

                if (vm.busy)
                    return;

                vm.isDirty = true;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const payload = {
                        breedingId: vm.breedingId,
                        eggs: vm.eggs,
                        fertile: vm.fertile,
                        hatched: vm.hatched,
                        token: vm.token
                    };

                    await vm.$util.axios.put(`api/breedings/edit-eggs`, payload)
                        .then(resp => {
                            vm.$emit('updated', resp.data);
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            }
        }
    }
</script>