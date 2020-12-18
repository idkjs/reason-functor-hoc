'use strict';


function make(param) {
  console.log("Should not log");
  return "How are you?";
}

exports.make = make;
/* No side effect */
