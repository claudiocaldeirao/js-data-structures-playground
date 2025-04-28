import inquirer from "inquirer";

const { HASH_TABLE_SIZE } = process.env;

export default class HashTable {
  tableSize = HASH_TABLE_SIZE ? parseInt(HASH_TABLE_SIZE, 10) : 50;
  table = Array(this.tableSize);

  actions = {
    "Upsert hash node": async () => {
      const hashNode = await this.getInput();
      this.upsertHashNode(hashNode);
    },
    "Get hash node": async () => {
      const { key } = await inquirer.prompt([
        {
          type: "input",
          name: "key",
          message: "Enter the key:",
        },
      ]);

      const node = this.getHashNode(key);

      if (node === null) {
        console.log("Hash node not found!");
        return;
      }

      console.log(node);
    },
    "Print table": async () => {
      this.printTable();
    },
  };

  printTable() {
    console.log(this.table);
  }

  async getInput() {
    const { key } = await inquirer.prompt([
      {
        type: "input",
        name: "key",
        message: "Enter the key:",
      },
    ]);

    const { value } = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the value for key "${key}":`,
      },
    ]);

    return new HashNode(key, value);
  }

  hashKey(key) {
    let total = 0;

    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }

    return total % this.tableSize;
  }

  upsertHashNode(hashNode) {
    const hashedKey = this.hashKey(hashNode.key);

    if (!this.table[hashedKey]) {
      this.table[hashedKey] = hashNode;
    } else if (this.table[hashedKey].key === hashNode.key) {
      this.table[hashedKey].value = hashNode.value;
    } else {
      let currentNode = this.table[hashedKey];

      while (currentNode.next) {
        if (currentNode.next.key === hashNode.key) {
          currentNode.next.value = hashNode.value;
          return;
        }

        currentNode = currentNode.next;
      }

      currentNode.next = hashNode;
    }
  }

  getHashNode(key) {
    const hashedKey = this.hashKey(key);
    if (!this.table[hashedKey]) {
      return null;
    }

    let currentNode = this.table[hashedKey];

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  async run() {
    while (true) {
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "What do you want to do?",
          choices: ["Upsert hash node", "Get hash node", "Print table", "Stop"],
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

class HashNode {
  key = null;
  value = null;
  next = null;

  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next || null;
  }
}
