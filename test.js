const {BinaryTree, Node} = require('./binary-tree');

const binaryTree = new BinaryTree();

binaryTree.add(5);
binaryTree.add(4);
binaryTree.add(2);
binaryTree.add(3);
binaryTree.add(1);
binaryTree.add(7);

binaryTree.addMany([8,6,9]);

// console.log(binaryTree.find(8));
// console.log(binaryTree.find(new Node(8)));
// console.log(binaryTree.find(new Node(11)));

// const preOrderTraversal = binaryTree.preOrder(node => console.log(node.value));
// console.log('preOrderTraversal', preOrderTraversal);

// const inOrderTraversal = binaryTree.inOrder(node => console.log(node.value));
// console.log('preOrderTraversal', inOrderTraversal);

const postOrderTraversal = binaryTree.postOrder(node => console.log(node.value));
console.log('postOrderTraversal', postOrderTraversal);