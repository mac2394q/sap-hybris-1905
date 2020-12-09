/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TreeNode, TypedMap} from "smarteditcommons";

export interface NavigationNodeEntry {
	id: string;
	name: string;
	itemType: string;
}

export interface NavigationNode extends TreeNode {
	id: string;
	nodes: NavigationNode[];
	entries?: NavigationNodeEntry[];
	parent: NavigationNode;
}

export interface NavigationNodeCMSItem {
	catalogVersion: string;
	visible: boolean;
	title: TypedMap<string>;
	uuid: string;
	uid: string;
	entries: string[];
	pages: number[];
	itemtype: string;
	modifiedtime: string;
	children: string[];
	name: string;
	links: string[];
	creationtime: string;
}
