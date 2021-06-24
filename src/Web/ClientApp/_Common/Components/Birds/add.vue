<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center pb-2 border-bottom">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Add Bird
                </h1>
            </div>
            <div class="col-auto">
                <div class="btn-group" role="group">
                    <button v-bind:disabled="!formIsValid" id="btnGroupSave" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="fas fa-fw fa-save mr-1"></span>Save
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupSave">
                        <a class="dropdown-item" href="#" @click.prevent="save(true)">Save and Add</a>
                        <a class="dropdown-item" href="#" @click.prevent="save(false)">Save and View</a>
                        <a class="dropdown-item" href="#" @click.prevent="save()">Save and Close</a>
                    </div>
                </div>
                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>

        <div class="mt-2">
            <b-overlay :show="busy">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <fieldset>
                            <h2 class="h6">
                                Information
                            </h2>

                            <div class="form-group row">
                                <label class="col-3 text-right col-form-label">DoB</label>
                                <div class="col">
                                    <input type="date" v-model="item.birthDate" class="form-control" v-bind:class="{'is-invalid':validations.get('birthDate')}" />
                                    <span v-if="validations.has('birthDate')" class="text-danger">
                                        {{validations.get('birthDate')}}
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-3 text-right col-form-label">Bloodline*</label>
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

                                    <div class="row no-gutters">
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

                            <br />
                            <div class="form-group row">
                                <label class="col-3 text-right col-form-label">Category*</label>
                                <div class="col align-self-center">
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
                                    <b class="form-control bg-info">
                                        {{generatedName}}
                                    </b>
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
                        </fieldset>

                    </div>
                </div>

            </b-overlay>



        </div>

    </div>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin'

    export default {
        mixins: [
            page,
        ],
        components: {

        },
        props: {
            uid: String,
            urlView: String,
        },
        data() {
            return {
                isDirty: false,
                validations: new Map(),
                item: {
                    bloodlines: [],
                    banding: '',
                    marking: '',
                    birthDate: moment().format('YYYY-MM-DD'),

                },

                selectedBloodline: {},

                bloodlines: [],
            };
        },
        computed: {

            filteredBloodlines() {
                const vm = this;
                let selectedBloodlines = [];

                if (vm.item.bloodlines) {
                    selectedBloodlines = vm.item.bloodlines.map(e => e.bloodlineId);
                }

                const items = vm.bloodlines.filter(e => !selectedBloodlines.includes(e.bloodlineId)).map(e => {
                    const item = {
                        value: e.bloodlineId,
                        text: e.name
                    };

                    return item;
                });

                //items.unshift({
                //    value: 'default',
                //    text: 'Default',
                //});

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


                let pct = 0;
                item.bloodlines.forEach(bl => {
                    pct += bl.percentage;
                });

                if (pct != 1) {
                    validations.set('bloodlineId', `Bloodline total is not 100%, it is ${(pct * 100).toFixed(0)}%`);
                }

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
            const vm = this;

            await Promise.all([vm.getBloodlines(), vm.getPens()]);
        },
        async mounted() {

        },
        methods: {

            async getBloodlines() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/lookups/bloodlines`)
                        .then(resp => vm.bloodlines = resp.data);
                } catch (e) {
                    vm.$util.handleError(e);
                }
            },

            async getPens() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/lookups/pens`)
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
                        bloodlines: item.bloodlines,
                        gender: item.gender,
                        category: item.category,
                        banding: item.banding,
                        marking: item.marking,
                        combType: item.combType,
                        featherColor: item.featherColor,
                        legColor: item.legColor,
                        birthDate: moment(item.birthDate)
                    };

                    await vm.$util.axios.post(`api/birds`, payload)
                        .then(resp => {

                            vm.$bvToast.toast('Fowl created.', { title: 'Add Fowl', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            setTimeout(() => {
                                if (flag) {
                                    location.reload();
                                }
                                else if (flag == false) {
                                    const url = `${vm.urlView}${resp.data}`;
                                    vm.$util.href(url);
                                }
                                else {
                                    vm.close();
                                }

                            }, 300);
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