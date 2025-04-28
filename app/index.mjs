import inquirer from "inquirer";
import {
  HashTable,
  BynarySearchTree,
  LinkedList,
} from "./dataStructures/index.mjs";

const question = [
  {
    type: "list",
    name: "option",
    message: "Select data structure sample to run:",
    choices: [
      { name: "Run linked list sample", value: "linkedList" },
      { name: "Run hash table sample", value: "hashTable" },
      { name: "Run bynary tree sample", value: "bynaryTree" },
    ],
  },
];

const options = {
  linkedList: () => {
    const linkedList = new LinkedList();
    linkedList.run();
  },
  hashTable: () => {
    const hashTable = new HashTable();
    hashTable.run();
  },
  bynaryTree: () => {
    const bynarySearchTree = new BynarySearchTree();
    bynarySearchTree.run();
  },
};

inquirer.prompt(question).then((answer) => {
  const optionRunner = options[answer.option];

  if (optionRunner !== null) {
    optionRunner();
  }
});
