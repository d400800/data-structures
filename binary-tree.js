class BinaryTree {
    constructor() {
        this.size = 0;
        this.root = null;
    }

    add(value) {
        const node = new Node(value);
        this.insertNode(node);
    }

    addMany(values) {
        for (const value of values) {
            this.add(value);
        }
    }

    find(element) {
        let nodeValue = element instanceof Node ? element.value : element;

        if (!nodeValue) return false;

        let current = this.root;

        while (current.value !== nodeValue) {
            if (nodeValue < current.value) {
                current = current.leftChild;
            } else if (nodeValue > current.value) {
                current = current.rightChild
            }

            if (current === undefined) {
                return false; // if we traversed and there was no such child, failure
            }
        }

        return true; // we only reach here if current == element, which means we found element
    }

    visitNode(node, fn) {
        fn(node);
    }

    insertNode(element) {
        if (this.size === 0) {
            this.root = element;
            this.size = this.size + 1;
            return true;
        }

        let current = this.root;

        while (current.value !== element.value) {
            if (element.value < current.value) {
                if (current.leftChild === undefined) {
                    current.leftChild = element;

                    element.parent = current;

                    this.size = this.size + 1;

                    return true;
                } else {
                    current = current.leftChild;
                }
            } else if (element.value > current.value) {
                if (current.rightChild === undefined) {
                    current.rightChild = element;

                    element.parent = current;

                    this.size = this.size + 1;

                    return true;
                } else {
                    current = current.rightChild;
                }
            }
        }

        return false; // we only reach here if current == element, and we can't have duplicate elements
    }

    // Visit-Left-Right
    preOrder(onNodeVisit) {
        let current = this.root;
        const visitedNodes = new Map();

        while (current !== undefined) {
            if (!visitedNodes.get(current.value)) {
                this.visitNode(current, onNodeVisit);
                visitedNodes.set(current.value, true);
            }

            if (current.leftChild && !visitedNodes.get(current.leftChild.value)) {
                current = current.leftChild;
            } else if (current.rightChild && !visitedNodes.get(current.rightChild.value)) {
                current = current.rightChild;
            } else {
                current = current.parent;
            }
        }

        return true;
    }

    // Left-Visit-Right
    inOrder(onNodeVisit) {
        let current = this.root;
        const visitedNodes = new Map();

        while (current !== undefined) {
            if (current.leftChild && !visitedNodes.get(current.leftChild.value)) {
                current = current.leftChild;

            } else if (!visitedNodes.get(current.value)) {
                this.visitNode(current, onNodeVisit);
                visitedNodes.set(current.value, true);

            } else if (current.rightChild && !visitedNodes.get(current.rightChild.value)) {
                current = current.rightChild;

            } else {
                current = current.parent;
            }
        }

        return true;
    }

    // Left-Right-Visit
    postOrder(onNodeVisit) {
        let current = this.root;
        const visitedNodes = new Map();

        while (current !== undefined) {
            if (current.leftChild && !visitedNodes.get(current.leftChild.value)) {
                current = current.leftChild;

            } else if (current.rightChild && !visitedNodes.get(current.rightChild.value)) {
                current = current.rightChild;

            } else if (!visitedNodes.get(current.value)) {
                this.visitNode(current, onNodeVisit);
                visitedNodes.set(current.value, true);

            } else {
                current = current.parent;
            }
        }

        return true;
    }

    traverseLevelOrder(node, result) {

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

module.exports = {
    BinaryTree,
    Node
}