import inquirer from "inquirer";
import { HashTable, BynaryTree, LinkedList } from "./dataStructures/index.mjs";
import linkedList from "./dataStructures/linkedList.mjs";

const question = [
  {
    type: 'list',
    name: 'option',
    message: 'Select data structure sample to run:',
    choices: [
      { name: 'Run linked list sample', value: 'linkedList' },
      { name: 'Run hash table sample', value: 'hashTable' },
      { name: 'Run bynary tree sample', value: 'bynaryTree' }
    ]
  }
];

inquirer.prompt(question).then((answer) => {
  switch (answer.option) {
    case 'linkedList':
        const linkedList = new LinkedList();
        linkedList.run();
        break;
    case 'hashTable':
        const hashTable = new HashTable();
        hashTable.run();
        break;
    case 'bynaryTree':
        const bynaryTree = new BynaryTree();
        bynaryTree.run();
        break;
    default:
        console.log('Invalid option!');
  }
});
