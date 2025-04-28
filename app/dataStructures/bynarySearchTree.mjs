import inquirer from "inquirer";

export default class BynarySearchTree {
  rootNode = null;
  actions = {
    "Insert node": async () => {
      const value = await this.getInput();

      if (this.rootNode === null) {
        this.rootNode = new NodeBST(value);
        return;
      }

      this.rootNode.insert(value);
      console.log(`node ${value} inserted at the binary search tree.`);
    },
    "Search for value": async () => {
      const value = await this.getInput();

      if (this.rootNode === null) {
        console.log(`value ${value} not found at binary search tree.`);
        return;
      }

      if (this.rootNode.contains(value)) {
        console.log(`value ${value} found!`);
        return;
      }

      console.log(`value ${value} not found at binary search tree.`);
    },
    "get min value": async () => {
      if (this.rootNode === null) {
        console.log("Binary searh tree is empty");
        return;
      }

      const value = this.rootNode.getMinValue();
      console.log(`Min value in binary tree search is ${value}`);
    },
    "Get max value": async () => {
      if (this.rootNode === null) {
        console.log("Binary searh tree is empty");
        return;
      }

      const value = this.rootNode.getMaxValue();
      console.log(`Min value in binary tree search is ${value}`);
    },
    "Print tree with with deep-first-traversal mode": async () => {
      if (this.rootNode === null) {
        console.log("Binary searh tree is empty");
        return;
      }

      const { order } = await inquirer.prompt([
        {
          type: "list",
          name: "order",
          message: "Print tree in what order?",
          choices: ["in-order", "pre-order", "post-order"],
        },
      ]);

      const print = (value) => {
        console.log(value);
      };

      this.rootNode.deepFirstTraversal(print, order);
    },
    "Print tree with with breadth-first-traversal mode": async () => {
      if (this.rootNode === null) {
        console.log("Binary searh tree is empty");
        return;
      }

      const print = (value) => {
        console.log(value);
      };

      this.rootNode.breadthFirstTraversal(print);
    },
  };

  async getInput() {
    const reg = new RegExp("^[0-9]+$");

    const { value } = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: "Insert a value:",
        validate: (input) => reg.test(input) || "Please, numbers are allowed",
      },
    ]);

    return value;
  }

  async run() {
    while (true) {
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "What do you want to do?",
          choices: [
            "Insert node",
            "Search for value",
            "get min value",
            "Get max value",
            "Print tree with with deep-first-traversal mode",
            "Print tree with with breadth-first-traversal mode",
            "Stop",
          ],
        },
      ]);

      if (action === "Stop") {
        console.log("Stopping...");
        break;
      }

      await this.actions[action]();
    }
  }
}

class NodeBST {
  value = null;
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value <= this.value) {
      if (this.left === null) {
        this.left = new NodeBST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new NodeBST(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  contains(value) {
    if (value === this.value) {
      return true;
    }

    if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    }
  }

  getMinValue() {
    if (this.left === null) {
      return this.value;
    }

    return this.left.getMinValue();
  }

  getMaxValue() {
    if (this.right === null) {
      return this.value;
    }

    return this.right.getMaxValue();
  }

  deepFirstTraversal(iteratorFunc, order) {
    if (order === "pre-order") {
      iteratorFunc(this.value);
    }

    if (this.left) {
      this.left.deepFirstTraversal(iteratorFunc, order);
    }

    if (order === "in-order") {
      iteratorFunc(this.value);
    }

    if (this.right) {
      this.right.deepFirstTraversal(iteratorFunc, order);
    }

    if (order === "post-order") {
      iteratorFunc(this.value);
    }
  }

  breadthFirstTraversal(iteratorFunc) {
    const queue = [this];

    while (queue.length) {
      let treeNode = queue.shift();

      iteratorFunc(treeNode.value);

      if (treeNode.left) {
        queue.push(treeNode.left);
      }

      if (treeNode.right) {
        queue.push(treeNode.right);
      }
    }
  }
}
