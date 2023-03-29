const express = require("express");
const router = express.Router();
const Batch = require("../model/batch.model");
const mongoose = require("mongoose");

router.post("/", (request, response) => {
  try {
    const body = request.body;
    const newBatch = new Batch({
      ...body,
    });
    newBatch.save().then((batch) => {
      return response
        .status(201)
        .json({ success: true, message: "Batch created successfully" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// get batch by id
router.get("/:id", (request, response) => {
  try {
    const batchId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(batchId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Batch.findById(batchId).then((batch) => {
      if (batch) return response.status(200).json(batch);
      else
        return response
          .status(200)
          .json({ success: false, message: "batch not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// get all batch
router.get("/", (request, response) => {
  try {
    Batch.find().then((batches) => {
      if (batches.length > 0) return response.status(200).json(batches);
      else
        return response
          .status(200)
          .json({ success: false, message: "il ya aucun utilisateur" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

router.delete("/:id", (request, response) => {
  try {
    const batchId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(batchId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Batch.findByIdAndRemove(batchId).then((deleted) => {
      if (deleted)
        return response
          .status(200)
          .json({ success: true, message: "batch deleted successfully" });
      else
        return response
          .status(200)
          .json({ success: false, message: "batch not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// permet de mettre ajour un batch par son id
router.put("/:id", (request, response) => {
  try {
    const batchId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(batchId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Batch.findByIdAndUpdate(batchId, { ...request.body }, { new: true }).then(
      (updated) => {
        if (updated)
          return response
            .status(200)
            .json({ success: true, message: "batch updated successfully" });
        else
          return response
            .status(200)
            .json({ success: false, message: "batch not found" });
      }
    );
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
