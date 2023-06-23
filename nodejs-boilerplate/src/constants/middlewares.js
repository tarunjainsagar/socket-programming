import express from "express";

const middlewares = [
  express.json(),

  // custom middleware example
  (req, res, next) => {
    console.log(`Executing ${req.path}`);
    next(); // Call next() to pass control to the next middleware or route handler
  },
];

export { middlewares };
