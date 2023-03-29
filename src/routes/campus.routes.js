const express = require("express");
const router = express.Router();
const Campus = require("../model/campus.model");
const mongoose = require("mongoose");

router.post("/", (request, response) => {
  try {
    const body = request.body;
    const newCampus = new Campus({
      ...body,
    });
    newCampus.save().then((batch) => {
      return response
        .status(201)
        .json({ success: true, message: "Campus created successfully" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// get campus by id
router.get("/:id", (request, response) => {
  try {
    const campusId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(campusId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Campus.findById(campusId).then((campus) => {
      if (campus) return response.status(200).json(campus);
      else
        return response
          .status(200)
          .json({ success: false, message: "campus not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// get all campus
router.get("/", (request, response) => {
  try {
    Campus.find().then((campus) => {
      if (campus.length > 0) return response.status(200).json(campus);
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
    const campusId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(campusId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Campus.findByIdAndRemove(campusId).then((deleted) => {
      if (deleted)
        return response
          .status(200)
          .json({ success: true, message: "campus deleted successfully" });
      else
        return response
          .status(200)
          .json({ success: false, message: "campus not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// permet de mettre ajour un campus par son id
router.put("/:id", (request, response) => {
  try {
    const campusId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(campusId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    Campus.findByIdAndUpdate(campusId, { ...request.body }, { new: true }).then(
      (updated) => {
        if (updated)
          return response
            .status(200)
            .json({ success: true, message: "campus updated successfully" });
        else
          return response
            .status(200)
            .json({ success: false, message: "campus not found" });
      }
    );
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
