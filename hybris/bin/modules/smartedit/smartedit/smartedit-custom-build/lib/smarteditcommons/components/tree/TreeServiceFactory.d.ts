/// <reference types="angular" />
/// <reference types="angular-cookies" />
/// <reference types="angular-mocks" />
/// <reference types="angular-resource" />
/// <reference types="angular-route" />
/// <reference types="angular-sanitize" />
/// <reference types="angular-translate" />
import { IRestService, IRestServiceFactory } from "smarteditcommons/services";
import { TreeNode } from "./types";
export declare const TreeServiceFactory: ($q: import("angular").IQService, restServiceFactory: IRestServiceFactory, getDataFromResponse: (response: any) => any) => {
    new (nodeUri: string): {
        nodesRestService: IRestService<TreeNode | TreeNode[]>;
        /**
         * @ngdoc method
         * @name treeModule.service:TreeService#fetchChildren
         * @methodOf treeModule.service:TreeService
         * @description
         * Will fetch the children of a given node by querying GET nodeUri?parentUid={parentUid}
         * - Once the children retrieved, the node will be marked as "initiated" and subsequent calls will not hit the server.
         * - Each children will be given a ManyToOne reference to their parent.
         * - The parent nodes will be assigned its children through the "nodes" property.
         * @param {Object} parent the parent {@link treeModule.object:Node node} object the nodes of which we want to fetch
         */
        fetchChildren(_parent: TreeNode): import("angular").IPromise<TreeNode[]>;
        /**
         * @ngdoc method
         * @name treeModule.service:TreeService#saveNode
         * @methodOf treeModule.service:TreeService
         * @description
         * Will save a new node for the given parent by POSTing to nodeUri. The payload will only contain the parentUid and a generated name.
         * On the front end side the parent model will be marked as having children.
         * @param {Object} parent the parent {@link treeModule.object:Node node} object from which to create a child
         */
        saveNode(_parent: TreeNode): import("angular").IPromise<TreeNode>;
        /**
         * @ngdoc method
         * @name treeModule.service:TreeService#removeNode
         * @methodOf treeModule.service:TreeService
         * @description
         * Will delete a node by sending DELETE to nodeUri/{uid}.
         * On the front end side the parent model "hasChildren" will be re-evaluated.
         * @param {Object} node the {@link treeModule.object:Node node} object to delete.
         */
        removeNode(node: TreeNode): import("angular").IPromise<void>;
    };
};
