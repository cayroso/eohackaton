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
                    Add Offspring
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="save(false)" v-bind:disabled="!formIsValid" class="btn btn-primary">
                Save
            </button>
            <button @click="save(true)" v-bind:disabled="!formIsValid" class="btn btn-primary">
                Save and View
            </button>
            <button @click="close()" class="btn btn-secondary">
                Close
            </button>
        </template>
        <div>
            <div class="mt-2">
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Category*</label>
                    <div class="col">
                        <b-form-radio-group buttons button-variant="outline-primary" v-model="item.category" v-bind:class="{'is-invalid':validations.get('category')}" class="btn-block">
                            <b-form-radio value="1">Battle</b-form-radio>
                            <b-form-radio value="2">Brood</b-form-radio>
                        </b-form-radio-group>
                        <span v-if="validations.has('category')" class="text-danger">
                            {{validations.get('category')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Gender*</label>
                    <div class="col">
                        <b-form-radio-group buttons button-variant="outline-primary" v-model="item.gender" v-bind:class="{'is-invalid':validations.get('gender')}" class="btn-block">
                            <b-form-radio value="1">Cock</b-form-radio>
                            <b-form-radio value="2">Hen</b-form-radio>
                        </b-form-radio-group>
                        <span v-if="validations.has('gender')" class="text-danger">
                            {{validations.get('gender')}}
                        </span>
                    </div>
                </div>
                <br />
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Name</label>
                    <div class="col">
                        <span class="form-control bg-info">{{generatedName}}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">DoB*</label>
                    <div class="col">
                        <input type="date" v-model="item.birthDate" class="form-control" v-bind:class="{'is-invalid':validations.get('birthDate')}" />
                        <span v-if="validations.has('birthDate')" class="text-danger">
                            {{validations.get('birthDate')}}
                        </span>
                    </div>
                </div>




                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Banding**</label>
                    <div class="col">
                        <input type="text" :value="item.banding.toUpperCase()" @input="item.banding = $event.target.value.toUpperCase()"
                               class="form-control" placeholder="Wing or Leg or both" v-bind:class="{'is-invalid':validations.get('banding')}" />
                        <span v-if="validations.has('banding')" class="text-danger">
                            {{validations.get('banding')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Marking**</label>
                    <div class="col">
                        <input type="text" :value="item.marking.toUpperCase()" @input="item.marking = $event.target.value.toUpperCase()"
                               class="form-control" placeholder="Toe or Nose or both" v-bind:class="{'is-invalid':validations.get('marking')}" />
                        <span v-if="validations.has('marking')" class="text-danger">
                            {{validations.get('marking')}}
                        </span>
                    </div>
                </div>
                <br />
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Comb</label>
                    <div class="col">
                        <b-form-select v-model="item.combType" :options="filteredCombTypes" v-bind:class="{'is-invalid':validations.get('combType')}">
                        </b-form-select>
                        <span v-if="validations.has('combType')" class="text-danger">
                            {{validations.get('combType')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Feather</label>
                    <div class="col">
                        <input v-model="item.featherColor" type="text" class="form-control" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Leg</label>
                    <div class="col">
                        <input v-model="item.legColor" type="text" class="form-control" />
                    </div>
                </div>

                <div class="small">
                    <p>*    Required</p>
                    <p>**   Dependent to other fields</p>
                </div>
            </div>
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
                item: {
                    banding: '',
                    marking: '',
                },

                selectedBloodline: {},
                bloodlinePercent: null,

                breedings: [],
                bloodlines: [],
                pens: [],
            };
        },
        computed: {
            filteredCombTypes() {
                const vm = this;

                const list = vm.enums.combTypes.map(ct => {
                    const item = {
                        value: ct.id,
                        text: ct.name
                    };

                    return item;
                });

                return list;
            },
            generatedName() {
                const vm = this;
                const bd = moment(vm.item.birthDate);

                let name = '';

                name += vm.item.banding ? `${vm.item.banding}` : '';
                name += vm.item.marking ? (vm.item.banding ? '-' : '') + `${vm.item.marking}` : '';

                if (name)
                    name += `-${bd.format('YY')}`;

                return name;
            },
            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const item = vm.item;
                const validations = new Map();

                if (!item.birthDate)
                    validations.set('birthDate', 'BirthDate is required.');
                if (!item.gender)
                    validations.set('gender', 'Gender is required.');
                if (!item.category)
                    validations.set('category', 'Category is required.');
                if (!item.banding && !item.marking) {
                    validations.set('banding', 'Banding is required.');
                    validations.set('marking', 'Marking is required.');
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

            async open(breedingId) {
                const vm = this;

                vm.selectedBloodline = {};

                vm.item = {
                    breedingId: breedingId,
                    birthDate: moment().format('YYYY-MM-DD'),
                    penId: null,
                    banding: '',
                    marking: '',
                    featherColor: null,
                    legColor: null,

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
                        breedingId: item.breedingId,
                        birthDate: moment(item.birthDate),
                        gender: item.gender,
                        category: item.category,
                        banding: item.banding,
                        marking: item.marking,
                        combType: item.combType,
                        featherColor: item.featherColor,
                        legColor: item.legColor,

                    };

                    await vm.$util.axios.post(`api/birds`, payload)
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