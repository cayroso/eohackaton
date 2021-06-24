<style scoped>
    /*.table-hover > tbody > tr:hover {
        background-color: papayawhip;
    }*/
    .b-left {
        border-left: 3px solid orange;
    }
</style>
<template>
    <div v-cloak>

        <div class="table-responsive m-0">
            <table class="table table-hover d-none d-md-table" v-bind:class="tableCss">
                <thead v-bind:class="theadCss">
                    <slot name="header">
                        <tr>
                            <th>#</th>
                            <th v-for="col in header.columns">{{col.title}}</th>
                        </tr>
                    </slot>
                </thead>
                <tbody>
                    <slot name="table" v-bind:item="item" v-bind:index="i" v-for="(item,i) in items">
                        <tr :key="`row1-${item[header.key]}`" @click="onSelectedRow(item)" v-bind:class="trCss">
                            <td>{{getRowNumber(i)}}</td>
                            <td v-for="col in header.columns">
                                <a v-if="col.href" :href="col.href(item[header.key])" class="font-weight-bold">
                                    {{item[col.field]}}
                                </a>
                                <span v-else>
                                    {{item[col.field]}}
                                </span>
                            </td>
                        </tr>
                    </slot>
                </tbody>
                <slot name="footer">
                    <!--<tfoot>
                        <tr>
                            <th>test</th>
                        </tr>
                    </tfoot>-->
                </slot>
            </table>


        </div>
        <div class="d-block d-md-none">
            <div v-for="(item,i) in items"
                 :key="`row2-${item[header.key]}`"
                 @click="onSelectedRow(item)"
                 class="border">

                <div class="p-1" v-bind:class="{'b-left':isSelected(item)}">
                    <slot name="list" v-bind:item="item" v-bind:index="i">
                        <div v-for="col in header.columns" class="form-group row no-gutters">
                            <label class="col-5 col-form-label">{{col.title}}</label>
                            <div class="col align-self-center">
                                <a v-if="col.href" :href="col.href(item[header.key])" class="font-weight-bold">
                                    {{item[col.field]}}
                                </a>
                                <span v-else>
                                    {{item[col.field]}}
                                </span>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            items: Array,
            header: Object,
            getRowNumber: Function,
            setSelected: Function,
            isSelected: Function,
            tableCss: String,
            theadCss: String,
            trCss: String,
        },
        data() {
            return {
            };
        },
        mounted() {
        },
        methods: {
            onSelectedRow(item) {
                const vm = this;

                vm.setSelected(item);

                vm.$emit('onSelectedRow', item);
            }
        }
    }
</script>