<style>
    .node circle {
        fill: #fff;
        /*stroke: green;*/
        stroke-width: 3px;
    }

    .node text {
        font: 12px sans-serif;
    }

    .link {
        fill: none;
        stroke: #ccc;
        stroke-width: 2px;
    }

    .d3-tip {
        font: 12px sans-serif;
        padding: 12px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        border-radius: 2px;
    }
</style>
<template>
    <div id="family_tree" ref="family_tree" v-cloak></div>
</template>
<script>
    'use strict';

    import * as d3Bundle from 'd3';
    import * as d3DagBundle from 'd3-dag';
    import * as zoomBundle from 'd3-zoom';
    import tip from 'd3-tip';
    import 'd3-transition'
    //const d3 = Object.assign({}, d3Bundle, d3DagBundle, zoomBundle);
    window.d3 = Object.assign(d3Bundle, d3DagBundle, { zoomBundle });
    window.d3.tip = tip;

    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };


    export default {
        //mixins: [pageMixin],
        props: {
            uid: String,
            durl: String,
            rurl: String,
            //data: Object
            parentElementId: String,
        },
        data: () => (
            {
                dag: null,
                tree: null,
                all_nodes: [],
                g: null,
                duration: 700,
                tip: null,

            }
        ),
        async mounted() {
            const vm = this;
            //debugger
            //vm.refresh();
        },

        methods: {
            refresh(parentElementId, data1) {
                const vm = this;

                vm.data = data1;

                // mark unions
                for (var k in vm.data.unions) {
                    vm.data.unions[k].isUnion = true
                }
                // mark persons
                for (var k in vm.data.persons) {
                    vm.data.persons[k].isUnion = false
                }

                var div = document.getElementById(parentElementId);

                //const el = vm.$refs.family_tree;

                //const parent = el.parentElement;
                const screen_width = div.offsetWidth || '100',
                    screen_height = div.offsetHeight || '100';//document.documentElement.clientHeight;

                vm.zoom = d3.zoom().on("zoom", (evt, d) => vm.g.attr("transform", evt.transform));

                // initialize tooltips
                vm.tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .direction('e')
                    .offset([0, 5])
                    .html(
                        function (d) {

                            if (d.data.isUnion) return;

                            var content = `
                    <span style='margin-left: 2.5px;'><b>` + d.data.name + `</b></span><br>

                    `
                            return content.replace(new RegExp("null", "g"), "?")
                        }
                    );

                d3.select("#family_tree svg").remove();

                vm.svg = d3.select("#family_tree").append("svg")
                    .attr("width", `${screen_width}`)
                    .attr("height", `${screen_height}`)
                    .call(vm.zoom)
                    .call(vm.tip)
                    ;

                // append group element
                vm.g = vm.svg.append("g");

                // helper variables
                var x_sep = 500,
                    y_sep = 500;

                // declare a dag layout
                //debugger
                vm.tree = d3.sugiyama()//.debug(true)
                    .size([x_sep, y_sep])
                    //.nodeSize([x_sep, y_sep])

                    .layering(d3.layeringSimplex())
                    //.layering(d3.layeringCoffmanGraham())
                    //.layering(d3.layeringLongestPath())

                    //.decross(d3.decrossOpt())
                    //.decross(d3.decrossTwoLayer().order(d3.twolayerOpt()))
                    //.decross(d3.decrossTwoLayer())

                    //.coord(d3.coordQuad())
                //.coord(d3.coordTopological())
                //.coord(d3.coordGreedy())
                //.coord(d3.coordCenter())

                //.separation(
                //    (a, b) => { return 1; }
                //);
                //vm.tree = d3.sugiyama().debug(true)
                //    .nodeSize([x_sep, y_sep])
                //    .layering(d3.layeringLongestPath())
                //    .decross(d3.decrossTwoLayer())
                //    .coord(d3.coordCenter())
                //    .separation(
                //        (a, b) => { return 1; }
                //    );

                // make dag from edge list
                vm.dag = d3.dagConnect()(vm.data.links);

                let root = null;
                // in order to make the family tree work, the dag
                // must be a node with id undefined. create that node if
                // not done automaticaly
                if (vm.dag.id != undefined) {
                    root = vm.dag.copy();
                    root.id = undefined;
                    root.children = [vm.dag];
                    vm.dag = root;
                }

                // prepare node data
                vm.all_nodes = vm.dag.descendants();

                vm.all_nodes.forEach(n => {

                    //let data = vm.data.persons[n.data.id] ? vm.data.persons[n.data.id] : vm.data.unions[n.data.id];

                    //data._children = n.children(); // all nodes collapsed by default
                    //n.children2 = [];
                    //data.inserted_nodes = [];
                    //data.inserted_roots = [];
                    //data.neighbors = [];
                    //data.visible = false;
                    //data.inserted_connections = [];

                    //n.data = data;
                    
                    n.data = vm.data.persons[n.data.id] ? vm.data.persons[n.data.id] : vm.data.unions[n.data.id];
                    //debugger;
                    n._children = n.children(); // all nodes collapsed by default
                    n.children2 = [];
                    n.inserted_nodes = [];
                    n.inserted_roots = [];
                    n.neighbors = [];
                    n.visible = false;
                    n.inserted_connections = [];
                });
                //debugger
                // find root node and assign data
                root = vm.all_nodes.find(n => n.data.id == vm.data.start);
                root.visible = true;
                root.neighbors = vm.getNeighbors(root);
                root.x0 = screen_width / 2;
                root.y0 = screen_height / 2;

                // overwrite dag root nodes
                vm.dag.dagRoots = [root];

                //try {
                // draw dag
                vm.update(root);
                //}
                //catch (e) {
                //    debugger;
                //}
            },
            // collapse a node
            collapse: function (d) {
                const vm = this;

                // remove root nodes and circle-connections
                var remove_inserted_root_nodes = n => {
                    // remove all inserted root nodes                    
                    vm.dag.dagRoots = vm.dag.dagRoots.filter(c => !n.inserted_roots.includes(c));
                    // remove inserted connections
                    n.inserted_connections.forEach(
                        arr => {
                            debugger
                            // check existence to prevent double entries
                            // which will cause crashes
                            if (arr[0].children2.includes(arr[1])) {
                                debugger
                                arr[0]._children.push(arr[1]);
                                arr[0].children2.remove(arr[1]);
                            }
                        }
                    )

                    // repeat for all inserted nodes
                    n.inserted_nodes.forEach(remove_inserted_root_nodes);
                };
                remove_inserted_root_nodes(d);

                // collapse neighbors which are visible and have been inserted by this node
                var vis_inserted_neighbors = d.neighbors.filter(n => n.visible & d.inserted_nodes.includes(n));
                
                vis_inserted_neighbors.forEach(
                    n => {                        
                        // tag invisible
                        n.visible = false;
                        // if child, delete connection
                        if (d.children2.includes(n)) {
                            d._children.push(n);
                            d.children2.remove(n);
                        }
                        // if parent, delete connection
                        if (n.children2.includes(d)) {
                            n._children.push(d);
                            n.children2.remove(d);
                        }
                        // if union, collapse the union
                        if (n.data.isUnion) {
                            vm.collapse(n);
                        }
                        // remove neighbor handle from clicked node
                        d.inserted_nodes.remove(n);
                    }
                );
            },

            // uncollapse a node
            uncollapse: function (d, make_roots) {
                const vm = this;
                
                if (d == undefined) return;

                // neighbor nodes that are already visible (happens when
                // circles occur): make connections, save them to
                // destroy / rebuild on collapse
                var extended_neighbors = d.neighbors.filter(n => n.visible)
                extended_neighbors.forEach(
                    n => {
                        // if child, make connection
                        if (d._children.includes(n)) {
                            d.inserted_connections.push([d, n]);
                        }
                        // if parent, make connection
                        if (n._children.includes(d)) {
                            d.inserted_connections.push([n, d]);
                        }
                    }
                )

                // neighbor nodes that are invisible: make visible, make connections,
                // add root nodes, add to inserted_nodes
                var collapsed_neighbors = d.neighbors.filter(n => !n.visible);
                collapsed_neighbors.forEach(
                    n => {
                        // collect neighbor data
                        n.neighbors = vm.getNeighbors(n);
                        // tag visible
                        n.visible = true;
                        // if child, make connection
                        if (d._children.includes(n)) {
                            d.children2.push(n);
                            d._children.remove(n);
                        }
                        // if parent, make connection
                        if (n._children.includes(d)) {
                            n.children2.push(d);
                            n._children.remove(d);
                            // insert root nodes if flag is set
                            if (make_roots & !d.inserted_roots.includes(n)) {
                                d.inserted_roots.push(n);
                            }
                        }
                        // if union, uncollapse the union
                        if (n.data.isUnion) {
                            vm.uncollapse(n, true);
                        }
                        // save neighbor handle in clicked node
                        d.inserted_nodes.push(n);
                    }
                )

                // make sure this step is done only once
                if (!make_roots) {
                    var add_root_nodes = n => {
                        // add previously inserted root nodes (partners, parents)
                        n.inserted_roots.forEach(p => vm.dag.dagRoots.push(p));
                        // add previously inserted connections (circles)
                        n.inserted_connections.forEach(
                            arr => {
                                // check existence to prevent double entries
                                // which will cause crashes
                                if (arr[0]._children.includes(arr[1])) {
                                    arr[0].children2.push(arr[1]);
                                    arr[0]._children.remove(arr[1]);
                                }
                            }
                        )
                        // repeat with all inserted nodes
                        n.inserted_nodes.forEach(add_root_nodes)
                    };
                    add_root_nodes(d);
                }
            },

            is_extendable: function (node) {
                return node.neighbors.filter(n => !n.visible).length > 0
            },

            getNeighbors: function (node) {
                
                if (node.data.isUnion) {                    
                    return this.getChildren(node)
                        .concat(this.getPartners(node))
                }
                else {                    
                    return this.getOwnUnions(node)
                        .concat(this.getParentUnions(node))
                }
            },

            getParentUnions: function (node) {
                if (node == undefined) return [];
                if (node.data.isUnion) return [];
                var u_id = node.data.parent_union;
                //debugger;
                if (u_id) {
                    //debugger
                    var union = this.all_nodes.find(n => n.data.id == u_id);
                    //debugger;
                    return [union].filter(u => u != undefined);
                }
                else return [];
            },

            getParents: function (node) {
                var parents = [];
                if (node.data.isUnion) {
                    node.data.partner.forEach(
                        p_id => parents.push(all_nodes.find(n => n.id == p_id))
                    );
                }
                else {
                    var parent_unions = getParentUnions(node);
                    parent_unions.forEach(
                        u => parents = parents.concat(getParents(u))
                    );
                }
                return parents.filter(p => p != undefined)
            },

            getOtherPartner: function (node, union_data) {
                var partner_id = union_data.partner.find(
                    p_id => p_id != node.id & p_id != undefined
                );
                return this.all_nodes.find(n => n.id == partner_id)
            },

            getPartners: function (node) {
                var partners = [];
                // return both partners if node argument is a union
                if (node.data.isUnion) {
                    
                    node.data.partner.forEach(
                        p_id => partners.push(this.all_nodes.find(n => n.data.id == p_id))
                    )
                }
                // return other partner of all unions if node argument is a person
                else {
                    
                    var own_unions = getOwnUnions(node);
                    own_unions.forEach(
                        u => {
                            partners.push(getOtherPartner(node, u.data))
                        }
                    )
                }
                return partners.filter(p => p != undefined)
            },

            getOwnUnions: function (node) {
                if (node.data.isUnion) return [];
                let unions = [];
                //debugger;
                node.data.own_unions.forEach(u_id => {
                    //debugger;
                    unions.push(this.all_nodes.find(n => n.data.id == u_id));
                });
                //debugger;
                return unions.filter(u => u != undefined)
            },

            getChildren: function (node) {
                const vm = this;

                var children = [];
                if (node.data.isUnion) {
                    children = node.children2.concat(node._children);
                }
                else {
                    own_unions = getOwnUnions(node);
                    own_unions.forEach(
                        u => children = children.concat(getChildren(u))
                    )
                }
                // sort children by birth year, filter undefined
                children = children
                    .filter(c => c != undefined)
                    .sort((a, b) => Math.sign((vm.getBirthYear(a) || 0) - (vm.getBirthYear(b) || 0)));
                return children
            },

            getBirthYear: function (node) {
                return new Date(node.data.birthyear || NaN).getFullYear()
            },
            getDeathYear: function (node) {
                return new Date(node.data.deathyear || NaN).getFullYear()
            },

            update: function (source) {
                const vm = this;
                
                // Assigns the x and y position for the nodes
                var ddag = vm.tree(vm.dag).dag;
                //var dag_tree = tree(ddag),
                var nodes = ddag.descendants().filter(e => e.visible)
                var links = ddag.links().filter(e => e.target.visible);

                
                // ****************** Nodes section ***************************

                // Update the nodes...
                let i = 0;
                var node = vm.g.selectAll('g.node')
                    .data(nodes, function (d) {                        
                        return d.data.id || ++i;
                    })

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append('g')
                    .attr('class', 'node')
                    .attr("transform", function (d) {
                        return "translate(" + source.x0 + "," + source.y0 + ")";
                    })
                    //.on('click', click)
                    //.on('mouseover', vm.tip.show)
                    //.on('mouseout', vm.tip.hide)
                    .attr('visible', true)
                    ;

                // Add Circle for the nodes
                function fillFunction(d) {
                    let sex = d.data.sex;

                    if (vm.data.start == d.data.id) {
                        return 'gold';
                    }
                    if (sex === 'C')
                        return '#d6ddff';
                    if (sex === 'H')
                        return '#ffd6ee';

                    return '';
                }
                function strokeFunction(d) {
                    let sex = d.data.sex;
                    //if (vm.data.start == d.data.id) {
                    //    return 'Red';
                    //}
                    if (sex === 'C')
                        return 'royalblue ';
                    if (sex === 'H')
                        return 'mediumvioletred';
                    return '';
                }

                nodeEnter
                    .append('circle')
                    .on('click', click)
                    .attr('class', 'node')
                    .style("fill", fillFunction)
                    .style("stroke", strokeFunction)
                    .attr('r', 1e-6)
                    ;


                // Add names as node labels

                nodeEnter
                    .append('text')
                    .attr('fill', 'white')
                    //.on('click', vm.tip.show)
                    //.on('mouseover', vm.tip.show)
                    //.on('mouseout', vm.tip.hide)
                    .attr("dy", "5")
                    .attr("x", 17)
                    .attr('font-size', '30px')
                    .attr("text-anchor", "start")
                    .attr('cursor', 'help')
                    .text(d => d.data.name)
                    .on('click', (elem, node) => {
                        const birdId = node.data.id;

                        if (birdId && vm.data.start !== birdId) {
                            vm.$emit('birdInfo', birdId);
                        }
                    })
                    ;


                // UPDATE
                var nodeUpdate = nodeEnter.merge(node);
                //debugger
                // Transition to the proper position for the node

                nodeUpdate
                    .transition()
                    .duration(vm.duration)
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })
                    ;

                // Update the node attributes and style

                nodeUpdate.select('circle.node')
                    .attr('r', d => {
                        return d.data.isUnion ? 5 : 13;
                    })
                    .style("fill", function (d) {
                        if (vm.data.start == d.data.id)
                            return 'gold';

                        return vm.is_extendable(d) ? "green" : (d.data.isUnion ? 'steelblue' : (d.data.sex === 'C' ? '#d6ddff' : '#ffd6ee'));
                    })
                    .attr('cursor', 'pointer');


                // Remove any exiting nodes
                var nodeExit = node.exit()
                    .transition()
                    .duration(vm.duration)
                    .attr("transform", function (d) {
                        return "translate(" + source.x + "," + source.y + ")";
                    })
                    .attr('visible', false)
                    .remove();

                // On exit reduce the node circles size to 0
                nodeExit.select('circle')
                    .attr('r', 1e-6);

                // On exit reduce the opacity of text labels
                nodeExit.select('text')
                    .style('fill-opacity', 1e-6);


                // ****************** links section ***************************

                // Update the links...
                var link = vm.g.selectAll('path.link')
                    .data(links, function (d) { return d.source.id + d.target.id });



                // Enter any new links at the parent's previous position.
                var linkEnter = link.enter().insert('path', "g")
                    .attr("class", "link")

                    .attr('d', function (d) {
                        let linkToNode = d.source.data.isUnion;

                        let o = { x: source.x0, y: source.y0 }
                        return diagonal(o, o, linkToNode);
                    });

                linkEnter
                    //.enter()
                    .attr('stroke', 'red')// function (d, i) { debugger; return colors(i); })
                    .attr('stroke-width', '13px')
                    .attr('fill', 'none')
                    .attr('pointer-events', 'visibleStroke')
                    .on("mouseover", function (d) {

                        d3.select(this)
                            .style('stroke-width', '3px')
                            .style("stroke", 'green')//d3.select(this).attr('stroke'))
                            .attr('fill-opacity', 0.3)
                            .attr('z-index', 999)
                            ;

                    })
                    .on("mouseout", function (d) {
                            
                        d3.select(this)
                            .style('stroke-width', '')
                            .style("stroke", "")
                            .attr('fill-opacity', 1);
                    });

                // UPDATE
                var linkUpdate = linkEnter.merge(link);

                // Transition back to the parent element position
                linkUpdate
                    .transition()
                    .duration(vm.duration)
                    .attr('d', d => {
                        let linkToNode = d.source.data.isUnion;

                        return diagonal(d.source, d.target, linkToNode);
                    });


                // Remove any exiting links
                var linkExit = link.exit()
                    .transition()
                    .duration(vm.duration)

                    .attr('d', function (d) {
                        let linkToNode = d.source.data.isUnion;
                        let o = { x: source.x, y: source.y }
                        return diagonal(o, o, linkToNode);
                    })
                    .remove();

                // expanding a big subgraph moves the entire dag out of the window
                // to prevent this, cancel any transformations in y-direction

                vm.svg
                    .transition()
                    .duration(vm.duration)
                    .call(
                        vm.zoom.transform,
                        d3.zoomTransform(vm.g.node()).translate(-(source.x - source.x0), -(source.y - source.y0) / 2),
                    );

                // Store the old positions for transition.
                nodes.forEach(function (d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });


                // Creates a curved (diagonal) path from parent to the child nodes
                function diagonal(s, d, linkToNode) {
                    const y = (d.y - s.y) / 2;

                    let path = `M ${s.x},${s.y}`;

                    if (!linkToNode)
                        path += `, l 0 ${y} `;

                    path += `, l ${d.x - s.x} ${y} `;
                    path += `, L ${d.x},${d.y}`;

                    return path;
                }

                // Toggle unions, children, partners on click.
                function click(e, d) {

                    // do nothing if node is union
                    if (d.data.isUnion) return;

                    // uncollapse if there are uncollapsed unions / children / partners
                    if (vm.is_extendable(d)) {                        
                        vm.uncollapse(d);
                    }
                    // collapse if fully uncollapsed
                    else {                        
                        vm.collapse(d)
                    }

                    try {
                        vm.update(d);
                    } catch (e) {
                        vm.$util.handleError(e);
                    }
                }
            }

        }
    }
</script>