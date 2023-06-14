module.exports = (app) => {
  const postcontroller = require("../controllers/post.controller.js");

  // Create a new Note
  app.post("/posts", postcontroller.create);

  // Retrieve all Notes
  app.get("/posts", postcontroller.findAll);

  // Retrieve a single Note with noteId
  app.get("/posts/:postId", postcontroller.findOne);

  // Update a Note with noteId
  app.put("/posts/:postId", postcontroller.update);

  // Delete a Note with noteId
  app.delete("/posts/:postId", postcontroller.delete);
};
