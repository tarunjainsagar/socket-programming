import Parent from "./model/Parent.js";
import Child from "./model/Child.js";

// Call from parent's object
const parent = new Parent();
console.log(parent.getName());

// Call from child's object
const child = new Child();
console.log(child.getName()); // Function overriding
console.log(child.getParentName()); // Inherit parent's property
