<style>
</style>
<template>

    <div>
        <!-- Page Wrapper -->
        <div id="wrapper">

            <!-- Sidebar -->
            <ul class="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion border-right border-light" id="accordionSidebar">

                <!-- Sidebar - Brand -->
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div class="sidebar-brand-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">DRASCO</div>
                </a>

                <!-- Divider -->
                <hr class="sidebar-divider my-0">

                <!-- Nav Item - Dashboard -->
                <li class="nav-item">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-chart-bar"></i>
                        <span>Statistics</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-info-circle"></i>
                        <span>About DRASCO</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-lightbulb"></i>
                        <span>Methodology</span>
                    </a>
                </li>
                <!-- Divider -->
                <hr class="sidebar-divider">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-users"></i>
                        <span>About the Team</span>
                    </a>
                </li>


            </ul>
            <!-- End of Sidebar -->
            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column bg-secondary">

                <!-- Main Content -->
                <div id="content">

                    <!-- Topbar -->
                    <nav class="navbar navbar-expand navbar-dark bg-dark topbar mb-4 static-top shadow">

                        <!-- Sidebar Toggle (Topbar) -->
                        <!--<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>-->

                        <div class="form-group form-row mb-0">
                            <label for="inputEmail3" class="col-auto col-form-label">Region</label>
                            <div class="col">
                                <b-select :options="regions" class="form-control"></b-select>
                            </div>
                        </div>

                        <div class="form-group form-row mb-0 ml-2">
                            <label for="inputEmail3" class="col-auto col-form-label">Month</label>
                            <div class="col">
                                <b-select :options="months" class="form-control"></b-select>
                            </div>
                        </div>

                    </nav>
                    <!-- End of Topbar -->
                    <!-- Begin Page Content -->
                    <div class="container-fluid">
                        <div class="row no-gutters row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6">
                            <div class="py-1 pr-1">
                                <div class="card p-2 h-100 text-success bg-dark border-secondary">
                                    <div class="row no-gutters">
                                        <div class="col-3">
                                            <div class="fas fa-fw fa-lg fa-vector-square"></div>
                                        </div>
                                        <div class="col">
                                            <h5 class="mb-0">54,123 km<sup>2</sup></h5>
                                            AREA
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-1">
                                <div class="card p-2 h-100 text-success bg-dark border-secondary">
                                    <div class="row no-gutters">
                                        <div class="col-3">
                                            <div class="fas fa-fw fa-lg fa-user-friends"></div>
                                        </div>
                                        <div class="col">
                                            <h5 class="mb-0">54.56 M</h5>
                                            POPULATION
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-1">
                                <div class="card p-2 h-100 text-success bg-dark border-secondary">
                                    <div class="row no-gutters">
                                        <div class="col-3">
                                            <div class="fas fa-fw fa-lg fa-bus"></div>
                                        </div>
                                        <div class="col">
                                            <h5 class="mb-0">54%</h5>
                                            AUTOMOTIVE ACTIVITY
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-1">
                                <div class="card p-2 h-100 text-success bg-dark border-secondary">
                                    <div class="row no-gutters">
                                        <div class="col-3">
                                            <div class="fas fa-fw fa-lg fa-running"></div>
                                        </div>
                                        <div class="col">
                                            <h5 class="mb-0">56%</h5>
                                            SOCIAL ACTIVITY
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-1">
                                <div class="card p-2 h-100 text-success bg-dark border-secondary">
                                    <div class="row no-gutters">
                                        <div class="col-3">
                                            <div class="fas fa-fw fa-lg fa-water"></div>
                                        </div>
                                        <div class="col">
                                            <h5 class="mb-0">865.90</h5>
                                            CO2 PPM
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="py-1 pl-1">
                                <div class="card p-2 h-100 text-success bg-dark border-secondary">
                                    TBD
                                </div>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="card bg-dark border-secondary">
                                        <div class="card-header bg-dark text-white">
                                            RANKING OF CITIES (BASED ON CO2)
                                        </div>
                                        <div class="table-responsive mb-0">
                                            <table class="table table-dark table-sm table-striped">
                                                <thead>
                                                    <tr>
                                                        <td>CITY NAME</td>
                                                        <td>POPULATION</td>
                                                        <td>AUTOMOTIVE ACTIVITY</td>
                                                        <td>SOCIAL ACTIVITY</td>
                                                        <td>CO2 EMISSION</td>
                                                        <td>AREA</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Manila</td>
                                                        <td>13,000,22</td>
                                                        <td>70%</td>
                                                        <td>80%</td>
                                                        <td>220 PPM</td>
                                                        <td>42.88 KM<sup>2</sup></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Manila</td>
                                                        <td>13,000,22</td>
                                                        <td>70%</td>
                                                        <td>80%</td>
                                                        <td>220 PPM</td>
                                                        <td>42.88 KM<sup>2</sup></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Manila</td>
                                                        <td>13,000,22</td>
                                                        <td>70%</td>
                                                        <td>80%</td>
                                                        <td>220 PPM</td>
                                                        <td>42.88 KM<sup>2</sup></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Manila</td>
                                                        <td>13,000,22</td>
                                                        <td>70%</td>
                                                        <td>80%</td>
                                                        <td>220 PPM</td>
                                                        <td>42.88 KM<sup>2</sup></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="mt-3 card bg-dark border-secondary">
                                        <div class="card-header bg-dark text-white">
                                            <div class="d-flex flex-row justify-content-between">
                                                <h6>C02 EMISSION HISTORICAL DATA AND PREDICTIONS</h6>
                                                <div class="text-success">
                                                    2021
                                                </div>
                                            </div>

                                        </div>
                                        <div class="card-body">
                                            Graph Here
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <!--<div>
                                        <b-select :options="styles" @change="styleChanged"></b-select>
                                    </div>-->
                                    <div class="pt-2 pt-md-0">
                                        <div id="mapContainer" class="basemap border rounded" style="min-height:500px;">test</div>
                                    </div>

                                    <div class="mt-2">
                                        <div class="card p-2  bg-dark">
                                            <div class="row">
                                                <div class="col">
                                                    X HIGH CO2 EMISSION
                                                </div>
                                                <div class="col">
                                                    X MEDIUM CO2 EMISSION
                                                </div>
                                                <div class="col">
                                                    X LOW CO2 EMISSION
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- /.container-fluid -->

                </div>
                <!-- End of Main Content -->
                <!-- Footer -->
                <!--<footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2020</span>
                        </div>
                    </div>
                </footer>-->
                <!-- End of Footer -->

            </div>
            <!-- End of Content Wrapper -->

        </div>
        <!-- End of Page Wrapper -->
        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

    </div>
</template>
<script>

    //import page from '../../_Core/Mixins/pageMixin';
    import mapboxgl from "mapbox-gl";

    export default {
        mixins: [
            //page
        ],
        components: {

        },
        props: {

        },
        data() {
            return {
                accessToken: 'pk.eyJ1IjoiY2F5ZGV2MjAxMCIsImEiOiJja3FiOGphZ3ExN2Y4Mndtdmp0NzR6dTc5In0.u97hhxcg2FKUZwbXIYRfDg',
                map: null
            };
        },
        computed: {
            regions() {
                const list = [
                    { value: 'mapbox://styles/mapbox/streets-v11', text: 'NCR' },
                    { value: 'mapbox://styles/mapbox/outdoors-v11', text: 'Calabarzon' },
                    { value: 'mapbox://styles/mapbox/light-v10', text: 'Mimaropa' },
                ];

                return list;
            },
            months() {
                const list = [
                    { value: 'mapbox://styles/mapbox/streets-v11', text: 'This Month' },
                    { value: 'mapbox://styles/mapbox/outdoors-v11', text: 'January' },
                    { value: 'mapbox://styles/mapbox/light-v10', text: 'Februay' },
                ];

                return list;
            },
            styles() {
                const list = [
                    { value: 'mapbox://styles/mapbox/streets-v11', text: 'Streets' },
                    { value: 'mapbox://styles/mapbox/outdoors-v11', text: 'Outdoors' },
                    { value: 'mapbox://styles/mapbox/light-v10', text: 'Light' },
                    { value: 'mapbox://styles/mapbox/dark-v10', text: 'Dark' },
                    { value: 'mapbox://styles/mapbox/satellite-v9', text: 'Satellite' },
                    { value: 'mapbox://styles/mapbox/satellite-streets-v11', text: 'Satellite Streets' },
                    { value: 'mapbox://styles/mapbox/navigation-day-v1', text: 'Navigation Day' },
                    { value: 'mapbox://styles/mapbox/navigation-night-v1', text: 'Navigation Night' },
                ];

                return list;
            }
        },
        async mounted() {
            const vm = this;

            const cache = JSON.parse(localStorage.getItem(vm.dashboardKey)) || {};

            mapboxgl.accessToken = vm.accessToken;

            vm.map = new mapboxgl.Map({
                container: "mapContainer",
                //style: "mapbox://styles/mapbox/streets-v11",
                //style: 'mapbox://styles/mapbox/satellite-streets-v10',
                //style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
                //center: [103.811279, 1.345399],
                zoom: 18,
                //maxBounds: [
                //    [103.6, 1.1704753],
                //    [104.1, 1.4754753],
                //],
            });

            const nav = new mapboxgl.NavigationControl();
            vm.map.addControl(nav, "top-right");

            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            });

            vm.map.addControl(geolocate, "top-right");

            vm.map.setStyle(vm.styles[3].value);




            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                //debugger;
                //var geolocpoint = new google.maps.LatLng(latitude, longitude);
                vm.map.flyTo({ center: [longitude, latitude] });//line added for setting center

                const marker = new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(vm.map);
            });
        },
        async created() {
            const vm = this;

            const cache = vm.$util.getWithExpiry(vm.feedbackCache);

            //if (cache)
            //    vm.showFeedback = false;

        },

        methods: {
            styleChanged(style) {
                const vm = this;

                vm.map.setStyle(style);
            }
        }
    }
</script>