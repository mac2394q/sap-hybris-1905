import * as angular from "angular";
import { ITreeDndOptions, ITreeService, TreeDragOptions, TreeNgModel, TreeNode } from "./types";
import "./Ytree.scss";
/**
 * @ngdoc directive
 * @name treeModule.directive:ytree
 * @scope
 * @restrict E
 * @element ytree
 *
 * @description
 * This directive renders a tree of nodes and manages CRUD operations around the nodes.
 * <br/>It relies on {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} third party library
 * <br/>Its behaviour is defined by {@link treeModule.controller:YTreeController YTreeController} controller
 * @param {String} nodeTemplateUrl an HTML node template to be included besides each node to enhance rendering and behaviour of the tree. This template may use the nodeActions defined hereunder.
 * @param {String} nodeUri the REST entry point to be used to manage the nodes (GET, POST, PUT and DELETE).
 * @param {Object} dragOptions a map of callback functions to customize the drag and drop behaviour of the tree by exposing the {@link treeModule.object:YTreeDndEvent yTreeDndEvent}.
 * @param {String} nodeActions a map of methods to be closure-bound to the {@link treeModule.controller:YTreeController controller} of the directive in order to manage the tree from the parent scope or from the optional node template.
 * <br/> All nodeActions methods must take {@link treeModule.service:TreeService treeService} instance as first parameter.
 * <br/> {@link treeModule.service:TreeService treeService} instance will then prebound in the closure made available in the node template or in the parent scope.
 * <br/> Example in a parent controller:
 * <pre>
 * 	this.actions = {
 * 		myMethod: function(treeService, arg1, arg2) {
 * 			//some action expecting 'this'
 * 			//to be the YTreeController
 * 			this.newChild(this.root.nodes[0]);
 * 		}
 * 	};
 * </pre>
 * passed to the directive through:
 * <pre>
 * <ytree data-node-uri='ctrl.nodeURI' data-node-template-url='ctrl.nodeTemplateUrl' data-node-actions='ctrl.actions'/>
 * </pre>
 * And in the HTML node template you may invoke it this way:
 * <pre>
 * <button data-ng-click="$ctrl.myMethod('arg1', 'arg2')">my action</button>
 * </pre>
 * or from the parent controller:
 * <pre>
 * <button data-ng-click="$ctrl.actions.myMethod('arg1', 'arg2')">my action</button>
 * </pre>
 */
/**
 * @ngdoc controller
 * @name treeModule.controller:YTreeController
 * @description
 * Extensible controller of the {@link treeModule.directive:ytree ytree} directive
 */
export declare class YtreeComponent {
    private $scope;
    private $q;
    private TreeService;
    private _TreeDndOptions;
    nodeTemplateUrl: string;
    nodeUri: string;
    nodeActions: any;
    rootNodeUid: string;
    dragOptions: TreeDragOptions;
    removeDefaultTemplate: string;
    showAsList: boolean;
    isDisabled: boolean;
    treeOptions: ITreeDndOptions;
    private treeService;
    private root;
    constructor($scope: angular.IScope, $q: angular.IQService, TreeService: {
        new (uri: string): ITreeService;
    }, _TreeDndOptions: {
        new (options: TreeDragOptions): ITreeDndOptions;
    });
    $onInit(): void;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#collapseAll
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Causes all the nodes of the tree to collapse.
     * It does not affect their "initiated" status though.
     */
    collapseAll(): void;
    expandAll(): void;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#hasChildren
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Return a boolean to determine if the node is expandable or not by checking if a given node has children
     * @param {Object} handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given {@link treeModule.object:Node node}
     */
    hasChildren(handle: TreeNgModel): boolean;
    fetchData(nodeData: TreeNode): angular.IPromise<TreeNode[]>;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#toggleAndfetch
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Will toggle a {@link treeModule.object:Node node}, causing a fetch from server if expanding for the first time.
     * @param {Object} handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given {@link treeModule.object:Node node}
     */
    toggleAndfetch(handle: TreeNgModel): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#refresh
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Will refresh a node, causing it to expand after fetch if it was expanded before.
     */
    refresh(handle: TreeNgModel): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#refreshParent
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Will refresh the parent of a node, causing it to expand after fetch if it was expanded before.
     */
    refreshParent(handle: TreeNgModel): void;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#newChild
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Will add a new child to the node referenced by this handle.
     * <br/>The child is added only if {@link treeModule.service:TreeService#methods_saveNode saveNode} from {@link treeModule.service:TreeService this.TreeService} is successful.
     * @param {Object} handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given {@link treeModule.object:Node node}
     */
    newChild(handle: TreeNgModel): void;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#newSibling
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Will add a new sibling to the node referenced by this handle.
     * <br/>The sibling is added only if {@link treeModule.service:TreeService#methods_saveNode saveNode} from {@link treeModule.service:TreeService this.TreeService} is successful.
     * @param {Object} handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given {@link treeModule.object:Node node}
     */
    newSibling(handle: TreeNgModel): void;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#remove
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Will remove the node referenced by this handle.
     * <br/>The node is removed only if {@link treeModule.service:TreeService#methods_removeNode removeNode} from {@link treeModule.service:TreeService this.TreeService} is successful.
     * @param {Object} handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given {@link treeModule.object:Node node}
     */
    remove(handle: TreeNgModel): void;
    isRoot(handle: TreeNgModel): boolean;
    displayDefaultTemplate(): boolean;
    onNodeMouseEnter(node: TreeNode): void;
    onNodeMouseLeave(node: TreeNode): void;
    /**
     * @ngdoc method
     * @name treeModule.controller:YTreeController#getNodeById
     * @methodOf treeModule.controller:YTreeController
     * @description
     * Will fetch from the existing tree the node whose identifier is the given nodeUid
     * @param {String} nodeUid the identifier of the node to fetched
     */
    getNodeById(nodeUid: string, nodeArray: TreeNode[]): TreeNode;
}
