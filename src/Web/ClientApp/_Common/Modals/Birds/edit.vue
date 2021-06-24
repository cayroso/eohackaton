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
                    Add Fowl
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
                    <label class="col-3 text-right col-form-label">Breeding</label>
                    <div class="col">
                        <b-form-select v-model="item.breedingId" :options="filteredBreedings" class="form-control-plaintext">
                        </b-form-select>
                    </div>
                </div>

                <div v-if="!item.breedingId" class="form-group row">
                    <label class="col-3 text-right col-form-label">Bloodline</label>
                    <div class="col">

                        <div v-for="(bl,i) in item.bloodlines" v-bind:class="{'is-invalid':validations.get('bloodlineId')}" class="my-1">
                            <div class="d-flex flex-row justify-content-between align-items-center">
                                <div>
                                    {{bl.percentage|decimalToFraction}} {{bl.name}}
                                    <span v-if="bl.gender===1">Cock</span>
                                    <span v-else>Hen</span>
                                </div>
                                <button @click="removeBloodline(i)" class="btn btn-sm btn-warning">
                                    <span class="fas fa-fw fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <span v-if="validations.has('bloodlineId')" class="text-danger">
                            {{validations.get('bloodlineId')}}
                        </span>

                        <div class="row no-gutters mt-2">
                            <div class="col-12 col-sm mb-1 mb-sm-0">
                                <b-form-select v-model="selectedBloodline.bloodlineId" :options="filteredBloodlines" class="w-100">
                                </b-form-select>
                            </div>
                            <div class="col-5 col-sm-auto ml-sm-1">
                                <b-form-select v-model="selectedBloodline.percent" class="form-control mr-sm-2" placeholder="%">
                                    <b-form-select-option :value="1">Full</b-form-select-option>
                                    <b-form-select-option :value="0.5">1/2</b-form-select-option>
                                    <b-form-select-option :value="0.25">1/4</b-form-select-option>
                                    <b-form-select-option :value="0.75">3/4</b-form-select-option>
                                </b-form-select>
                            </div>
                            <div class="col-4 col-sm-auto ml-1">
                                <b-form-select v-model="selectedBloodline.gender" class="form-control mr-sm-2" placeholder="%">
                                    <b-form-select-option :value="1">Cock</b-form-select-option>
                                    <b-form-select-option :value="2">Hen</b-form-select-option>
                                </b-form-select>
                            </div>
                            <div class="col-auto mt-sm-0 ml-1">
                                <button @click="addBloodline" class="btn btn-outline-primary">
                                    <span class="fas fa-fw fa-plus"></span>
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Pen</label>
                    <div class="col">
                        <b-form-select v-model="item.penId" :options="filteredPens" v-bind:class="{'is-invalid':validations.get('penId')}">
                        </b-form-select>
                        <span v-if="validations.has('penId')" class="text-danger">
                            {{validations.get('penId')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Gender</label>
                    <div class="col">
                        <b-form-radio-group v-model="item.gender" v-bind:class="{'is-invalid':validations.get('gender')}" class="form-control ">
                            <b-form-radio value="1">Cock</b-form-radio>
                            <b-form-radio value="2">Hen</b-form-radio>
                        </b-form-radio-group>
                        <span v-if="validations.has('gender')" class="text-danger">
                            {{validations.get('gender')}}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Category</label>
                    <div class="col">
                        <b-form-radio-group v-model="item.category" class="form-control" v-bind:class="{'is-invalid':validations.get('category')}">
                            <b-form-radio value="1">Battle</b-form-radio>
                            <b-form-radio value="2">Brood</b-form-radio>
                        </b-form-radio-group>
                        <span v-if="validations.has('category')" class="text-danger">
                            {{validations.get('category')}}
                        </span>
                    </div>
                </div>



                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Name</label>
                    <div class="col">
                        <input type="text" readonly class="form-control" placeholder="banding-marking-year" v-bind:value="generatedName" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Banding</label>
                    <div class="col">
                        <input type="text" v-model="item.banding" class="form-control" placeholder="Wing or Leg or both" v-bind:class="{'is-invalid':validations.get('banding')}" />
                        <span v-if="validations.has('banding')" class="text-danger">
                            {{validations.get('banding')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Marking</label>
                    <div class="col">
                        <input type="text" v-model="item.marking" class="form-control" placeholder="Toe or Nose or both" v-bind:class="{'is-invalid':validations.get('marking')}" />
                        <span v-if="validations.has('marking')" class="text-danger">
                            {{validations.get('marking')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Comb Type</label>
                    <div class="col">
                        <b-form-select v-model="item.combType" :options="filteredCombTypes" v-bind:class="{'is-invalid':validations.get('combType')}">
                        </b-form-select>
                        <span v-if="validations.has('combType')" class="text-danger">
                            {{validations.get('combType')}}
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Feather Color</label>
                    <div class="col">
                        <input v-model="item.featherColor" type="text" class="form-control" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Leg Color</label>
                    <div class="col">
                        <input v-model="item.legColor" type="text" class="form-control" />
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-3 text-right col-form-label">Birth Date</label>
                    <div class="col">
                        <input type="datetime-local" v-model="item.birthDate" class="form-control" v-bind:class="{'is-invalid':validations.get('birthDate')}" />
                        <span v-if="validations.has('birthDate')" class="text-danger">
                            {{validations.get('birthDate')}}
                        </span>
                    </div>
                </div>

                <fieldset>
                    <h2 class="h6 mb-sm-0">
                        Source
                    </h2>
                    <div class="form-group row">
                        <label class="col-3 text-right col-form-label">Name</label>
                        <div class="col">
                            <input v-model="item.sourceName" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-3 text-right col-form-label">Contact</label>
                        <div class="col">
                            <input v-model="item.sourceContact" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-3 text-right col-form-label">Address</label>
                        <div class="col">
                            <textarea v-model="item.sourceAddress" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-3 text-right col-form-label">Notes</label>
                        <div class="col">
                            <textarea v-model="item.sourceNotes" class="form-control"></textarea>
                        </div>
                    </div>
                </fieldset>

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
                item: {},

                selectedBloodline: {},
                bloodlinePercent: null,

                breedings: [],
                bloodlines: [],
                pens: [],

            };
        },
        computed: {
            filteredPens() {
                const vm = this;

                const items = vm.pens.map(e => {
                    const item = {
                        value: e.penId,
                        text: `${e.name} - [${e.penTypeText}]`
                    };

                    return item;
                });

                return items;
            },
            filteredBloodlines() {
                const vm = this;
                let selectedBloodlines = [];

                if (vm.item.bloodlines) {
                    selectedBloodlines = vm.item.bloodlines.map(e => e.bloodlineId);
                }

                const items = vm.bloodlines.filter(e => e.bloodlineId !== 'default' && !selectedBloodlines.includes(e.bloodlineId)).map(e => {
                    const item = {
                        value: e.bloodlineId,
                        text: e.name
                    };

                    return item;
                });

                items.unshift({
                    value: 'default',
                    text: 'Default',
                });

                return items;
            },
            filteredBreedings() {
                const vm = this;

                const items = vm.breedings.map(e => {

                    const text = e.parents.join('-');
                    const date = vm.$options.filters.toMoment(e.dateStart);

                    const item = {
                        value: e.breedingId,
                        text: `${text} ${date}`
                    };

                    return item;
                });

                items.unshift({
                    value: null,
                    text: 'None'
                });

                return items;
            },
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

                name += vm.item.banding ? vm.item.banding : '';
                name += vm.item.marking ? `-${vm.item.marking}` : '';

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

                if (!item.breedingId && !item.bloodlineId) {
                    let pct = 0;
                    item.bloodlines.forEach(bl => {
                        pct += bl.percentage;
                    });

                    if (pct != 1) {
                        validations.set('bloodlineId', `Bloodline total is not 100%, it is ${(pct * 100).toFixed(0)}%`);
                    }

                    if (item.bloodlines.length > 1) {
                        var cocks = item.bloodlines.filter(bl => bl.gender == 1).length;
                        var hens = item.bloodlines.filter(bl => bl.gender == 2).length;

                        if (cocks <= 0 || hens <= 0) {
                            validations.set('bloodlineId', 'Cock/Hen is required in multiple bloodlines.');
                        }
                    }
                    else {
                        if (item.gender && item.bloodlines.length > 0 && item.bloodlines[0].gender != item.gender) {
                            validations.set('bloodlineId', 'Fowl and bloodline gender not matched.');

                        }
                    }
                }
                if (!item.penId)
                    validations.set('penId', 'Pen is required.');
                if (!item.gender)
                    validations.set('gender', 'Gender is required.');
                if (!item.category)
                    validations.set('category', 'Category is required.');
                if (!item.banding && !item.marking) {
                    validations.set('banding', 'Banding is required.');
                    validations.set('marking', 'Marking is required.');
                }
                if (!item.birthDate)
                    validations.set('birthDate', 'BirthDate is required.');

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {

        },
        async mounted() {

        },
        methods: {

            async getBreedings() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`api/lookups/breedings`)
                        .then(resp => vm.breedings = resp.data);
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async getBloodlines() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`api/lookups/bloodlines`)
                        .then(resp => vm.bloodlines = resp.data);
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async getPens() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`api/lookups/pens`)
                        .then(resp => vm.pens = resp.data);
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            addBloodline() {
                const vm = this;

                if (vm.selectedBloodline) {
                    var bl = vm.bloodlines.find(e => e.bloodlineId == vm.selectedBloodline.bloodlineId);

                    if (bl) {
                        bl.percentage = vm.selectedBloodline.percent;
                        bl.gender = vm.selectedBloodline.gender;

                        vm.selectedBloodline = {};

                        vm.item.bloodlines.push(bl);
                    }
                }

            },

            removeBloodline(index) {
                const vm = this;

                vm.item.bloodlines.splice(index, 1);

            },


            async open(breedingId) {
                const vm = this;

                vm.selectedBloodline = {};

                vm.item = {
                    breedingId: breedingId || null,
                    bloodlines: [],
                    penId: null,
                    banding: null,
                    marking: null,
                    featherColor: null,
                    legColor: null,
                    sourceName: null,
                    sourceContact: null,
                    sourceAddress: null,
                    sourceNotes: null,
                    birthDate: moment().format('YYYY-MM-DDTHH:mm')
                };

                vm.isDirty = false;
                vm.validations.clear();

                await Promise.all([vm.getBreedings(), vm.getBloodlines(), vm.getPens()]);

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
                        bloodlines: item.bloodlines,
                        penId: item.penId,
                        gender: item.gender,
                        category: item.category,
                        banding: item.banding,
                        marking: item.marking,
                        combType: item.combType,
                        featherColor: item.featherColor,
                        legColor: item.legColor,
                        birthDate: moment(item.birthDate),
                        sourceName: item.sourceName,
                        sourceContact: item.sourceContact,
                        sourceAddress: item.sourceAddress,
                        sourceNotes: item.sourceNotes
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