const express = require("express");
const router = express.Router();
const Stack = require("../model/stack.model");
const mongoose = require("mongoose");

// get stack by id
router.get("/:id", (request, response) => {
  try {
    const stackId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(stackId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Stack.findById(stackId).then((stack) => {
      if (stack) return response.status(200).json(stack);
      else
        return response
          .status(200)
          .json({ success: false, message: "stack not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// get all stack
router.get("/", (request, response) => {
  try {
    Stack.find().then((stacks) => {
      if (stacks.length > 0) return response.status(200).json(stacks);
      else
        return response
          .status(200)
          .json({ success: false, message: "il ya aucun utilisateur" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

router.post("/", (request, response) => {
  try {
    const body = request.body;
    const newStack = new Stack({
      ...body,
    });
    newStack.save().then((batch) => {
      return response
        .status(201)
        .json({ success: true, message: "Stack created successfully" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

router.delete("/:id", (request, response) => {
  try {
    const stackId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(stackId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Stack.findByIdAndRemove(stackId).then((deletedStack) => {
      if (deletedStack)
        return response
          .status(200)
          .json({ success: true, message: "stack deleted successfully" });
      else
        return response
          .status(200)
          .json({ success: false, message: "stack not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// permet de mettre ajour un stack par son id
router.put("/:id", (request, response) => {
  try {
    const stackId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(stackId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Stack.findByIdAndUpdate(stackId, { ...request.body }, { new: true }).then(
      (updated) => {
        if (updated)
          return response
            .status(200)
            .json({ success: true, message: "stack updated successfully" });
        else
          return response
            .status(200)
            .json({ success: false, message: "stack not found" });
      }
    );
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
