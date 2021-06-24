<template>
    <b-modal ref="modal"
             :no-close-on-esc="true"
             :no-close-on-backdrop="true"
             header-class=""
             body-class=""
             footer-class=""
             scrollable>
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Add Pen
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
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Name</label>
                    <div class="col">
                        <input v-model="item.name" type="text" class="form-control" v-bind:class="{'is-invalid':validations.get('name')}" />
                        <span v-if="validations.has('name')" class="text-danger">
                            {{validations.get('name')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Pen Type</label>
                    <div class="col">
                        <b-form-select v-model="item.penType" :options="filteredPenTypes" v-bind:class="{'is-invalid':validations.get('penType')}">
                        </b-form-select>
                        <span v-if="validations.has('penType')" class="text-danger">
                            {{validations.get('penType')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Capacity</label>
                    <div class="col">
                        <input type="number" v-model="item.capacity" class="form-control" v-bind:class="{'is-invalid':validations.get('capacity')}" />
                        <span v-if="validations.has('capacity')" class="text-danger">
                            {{validations.get('capacity')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Description</label>
                    <div class="col">
                        <textarea v-model="item.description" type="text" class="form-control"></textarea>
                    </div>
                </div>
            </b-overlay>
        </div>
    </b-modal>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin'
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

                item: {}
            };
        },
        computed: {
            filteredPenTypes() {
                const vm = this;

                const list = vm.enums.penTypes.map(ct => {
                    const item = {
                        value: ct.id,
                        text: ct.name
                    };

                    return item;
                });

                return list;
            },

            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const item = vm.item;
                const validations = new Map();

                if (!item.name)
                    validations.set('name', 'Name is required.');
                if (!item.penType)
                    validations.set('penType', 'Pen Type is required.');
                if (!item.capacity)
                    validations.set('capacity', 'Capacity is required.');

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
                    description: null,
                    penType: null,
                    capacity: null
                };

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
                        description: item.description,
                        penType: item.penType,
                        capacity: item.capacity
                    };

                    await vm.$util.axios.post(`api/pens`, payload)
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