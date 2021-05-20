class BinaryTree {
    constructor() {
        this.nodes = [];
        this.root = null;
    }

    getInitialResult() {
        return {
            path: '',
            visited: new Map()
        };
    }

    add(values) {
        for (const value of values) {
            const node = new Node(value);

            if (this.nodes.length === 0) {
                this.nodes = [...this.nodes, node];
                this.root = node;

                continue;
            }

            this.nodes = [...this.nodes, node];
            this.insertNode(node, this.root);
        }
    }

    insertNode(insertedNode, existingNode) {
        if (insertedNode.value > existingNode.value) {
            if (existingNode.rightChild) {
                this.insertNode(insertedNode, existingNode.rightChild);
            } else {
                existingNode.rightChild = insertedNode;
                insertedNode.parent = existingNode;
            }
        } else {
            if (existingNode.leftChild) {
                this.insertNode(insertedNode, existingNode.leftChild);
            } else {
                existingNode.leftChild = insertedNode;
                insertedNode.parent = existingNode;
            }
        }
    }

    // Visit-Left-Right: 5 -> 4 -> 2 -> 1 -> 3 -> 7 -> 6 -> 8 -> 9
    traversePreOrder(node, result) {
        if (!result) {
            result = this.getInitialResult();
        }

        this.visitNode(node, result);

        node.leftChild && this.traversePreOrder(node.leftChild, result);
        node.rightChild && this.traversePreOrder(node.rightChild, result);

        if (result.visited.size === this.nodes.length) {
            return result;
        }
    }

    // Left-Visit-Right: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
    traverseInOrder(node, result) {
        if (!result) {
            result = this.getInitialResult();
        }

        if (node.leftChild && result.visited.get(node.leftChild.value) === undefined) {
            this.traverseInOrder(node.leftChild, result);
        }

        if (result.visited.get(node.value) === undefined) {
            this.visitNode(node, result);
        }

        if (node.rightChild && result.visited.get(node.rightChild.value) === undefined) {
            this.traverseInOrder(node.rightChild, result);
        }

        if (result.visited.size === this.nodes.length) {
            return result;
        }

        this.traverseInOrder(node.parent, result);
    }

    // Left-Right-Visit: 1 -> 3 -> 2 -> 4 -> 6 -> 9 -> 8 -> 7 -> 5
    traversePostOrder(node, result) {
        if (!result) {
            result = this.getInitialResult();
        }

        if (node.leftChild && result.visited.get(node.leftChild.value) === undefined) {
            this.traversePostOrder(node.leftChild, result);
        }

        if (node.rightChild && result.visited.get(node.rightChild.value) === undefined) {
            this.traversePostOrder(node.rightChild, result);
        }

        if (result.visited.get(node.value) === undefined) {
            this.visitNode(node, result);
        }

        if (result.visited.size === this.nodes.length) {
            return result;
        }

        this.traversePostOrder(node.parent, result);
    }

    traverseLevelOrder(node, result) {

    }

    visitNode(node, result) {
        result.visited.set(node.value, true);

        result.path = result.path === '' ? `${node.value}` : result.path + ` -> ${node.value}`;
    }
}

class Node {
    constructor(value, parent, leftChild, rightChild) {
        this.value = value;
        this.parent = parent;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

const binaryTree = new BinaryTree();

binaryTree.add([5,4,2,3,1,7,8,6,9]);

const preOrderTraversal = binaryTree.traversePreOrder(binaryTree.root);
console.log('preOrderTraversal', preOrderTraversal);

const inOrderTraversal = binaryTree.traverseInOrder(binaryTree.root);
console.log('inOrderTraversal', inOrderTraversal);

const postOrderTraversal = binaryTree.traversePostOrder(binaryTree.root);
console.log('postOrderTraversal', postOrderTraversal);