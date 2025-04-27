import inquirer from "inquirer";

export default class linkedList {
  head = null;
  tail = null;
  actions = {
    "Insert node to the head": async () => {
      const value = await this.getInput();
      this.addTohead(value);
      console.log(`You inserted ${value} at the head of the linked list!`);
    },
    "Insert node to the tail": async () => {
      const value = await this.getInput();
      this.addToTail(value);
      console.log(`You inserted ${value} at the tail of the linked list!`);
    },
    "Remove node from head": async () => {
      const value = this.removeHead();
      console.log(`You removed ${value} at the head of the linked list!`);
    },
    "Remove node from tail": async () => {
      const value = this.removeTail();
      console.log(`You removed ${value} at the tail of the linked list!`);
    },
    "Search for node": async () => {
      const value = await this.getInput();
      const node = this.search(value);

      if (node === null) {
        console.log("Node not found.");
        return;
      }

      console.log(`
      Node found:
        value: ${node.value},
        next: ${node.next},
        prev: ${node.prev}
      `);
    },
    "Print linked list from tail to head": async () => {
      this.print();
    },
  };

  async getInput() {
    const { value } = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: "Insert a value:",
        validate: (input) =>
          input.length <= 10 ||
          "Please insert a string with max length of 10 characters",
      },
    ]);

    return value;
  }

  addTohead(value) {
    const newNode = new Node(value, this.head, null);

    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }

    this.head = newNode;
  }

  addToTail(value) {
    const newNode = new Node(value, null, this.tail);

    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
  }

  removeHead() {
    if (!this.head) {
      return null;
    }

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    return value;
  }

  removeTail() {
    if (!this.tail) {
      return null;
    }

    const value = this.tail.value;
    this.tail = this.tail.prev;

    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    return value;
  }

  search(searchValue) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === searchValue) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  print() {
    let currentNode = this.tail;
    const list = [];

    while (currentNode !== null) {
      list.push(currentNode.value);
      currentNode = currentNode.prev;
    }

    console.log(list.join(" -> "));
  }

  async run() {
    while (true) {
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "What do you want to do?",
          choices: [
            "Insert node to the head",
            "Insert node to the tail",
            "Print linked list from tail to head",
            "Remove node from head",
            "Remove node from tail",
            "Search for node",
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

class Node {
  value = null;
  next = null;
  prev = null;

  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
