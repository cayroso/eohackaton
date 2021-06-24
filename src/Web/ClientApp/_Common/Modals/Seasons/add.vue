<template>
    <b-modal ref="modal"
             :no-close-on-esc="true"
             :no-close-on-backdrop="true"
             header-class=""
             body-class=""
             footer-class=""
             scrollable
             size="md">
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Add Season
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="save(false)" v-bind:disabled="!formIsValid" class="btn btn-primary">
                <span class="fas fa-fw fa-save mr-1"></span>Save
            </button>
            <button @click="save(true)" v-bind:disabled="!formIsValid" class="btn btn-primary">
                <span class="fas fa-fw fa-save mr-1"></span>Save and View
            </button>
            <button @click="close()" class="btn btn-secondary">
                Close
            </button>

        </template>
        <div>
            <b-overlay :show="busy">
                <fieldset>
                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Name</label>
                        <div class="col-sm">
                            <input v-model="item.name" type="text" class="form-control" v-bind:class="{'is-invalid':validations.get('name')}" />
                            <span v-if="validations.has('name')" class="text-danger">
                                {{validations.get('name')}}
                            </span>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Start</label>
                        <div class="col-sm">
                            <input type="date" v-model="item.dateStart" class="form-control" v-bind:class="{'is-invalid':validations.get('dateStart')}" />
                            <span v-if="validations.has('dateStart')" class="text-danger">
                                {{validations.get('dateStart')}}
                            </span>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">End</label>
                        <div class="col-sm">
                            <input type="date" v-model="item.dateEnd" class="form-control" v-bind:class="{'is-invalid':validations.get('dateEnd')}" />
                            <span v-if="validations.has('dateEnd')" class="text-danger">
                                {{validations.get('dateEnd')}}
                            </span>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 text-sm-right col-form-label">Description</label>
                        <div class="col-sm">
                            <textarea v-model="item.description" class="form-control" />
                        </div>
                    </div>

                </fieldset>
            </b-overlay>
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

        },
        data() {
            return {
                busy: false,
                isDirty: false,
                validations: new Map(),
                item: {}
            };
        },
        computed: {
            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const item = vm.item;
                const validations = new Map();

                if (!item.name)
                    validations.set('name', 'Name is required.');
                if (!item.dateStart)
                    validations.set('dateStart', 'Date Start is required.');
                if (!item.dateEnd)
                    validations.set('dateEnd', 'Date End is required.');

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {

        },
        async mounted() {

        },
        methods: {

            async open() {
                const vm = this;

                vm.item = {
                    name: null,
                    dateStart: moment().startOf('year').format('YYYY-MM-DD'),
                    dateEnd: moment().endOf('year').format('YYYY-MM-DD'),
                    description: null
                };

                vm.isDirty = false;
                vm.validations.clear();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            

            async save(flag) {
                const vm = this;
                const item = vm.item;

                if (vm.busy)
                    return;

                vm.isDirty = true;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const payload = {
                        name: item.name,
                        dateStart: moment(item.dateStart),
                        dateEnd: moment(item.dateEnd),
                        description: item.description,
                    }

                    await vm.$util.axios.post(`api/seasons`, payload)
                        .then(resp => {
                            
                            vm.$emit('saved', resp.data, flag);
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