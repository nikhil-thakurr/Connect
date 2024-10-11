const express = require("express");
const userAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const requests = await connectionRequest
      .find({
        toUserId: loggedUser._id,
        status: "interested",
      })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "skills",
        "gender",
        "about",
      ]);

    res.json({
      message: "Data Fetched Successfully ",
      data: requests,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const connections = await connectionRequest
      .find({
        $or: [
          {
            toUserId: loggedUser._id,
            status: "accepted",
          },
          {
            fromUserId: loggedUser._id,
            status: "accepted",
          },
        ],
      })
      .populate("toUserId", [
        "firstName",
        "lastName",
        "age",
        "skills",
        "gender",
        "about",
        "photoUrl"
      ])
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "skills",
        "gender",
        "about",
        "photoUrl"
      ]);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    page = page < 1 ? 1 : page;
    const skip = (page - 1) * limit;

    // Step 1: Get all users except the logged-in user
    const allUsers = await User.find({ _id: { $ne: loggedUser._id } })
      .select("firstName lastName age gender about photoUrl skills")
      .skip(skip)
      .limit(limit);

    // Step 2: Get connection requests where loggedUser is either sender or receiver
    const feed = await connectionRequest.find({
      $or: [{ toUserId: loggedUser._id }, { fromUserId: loggedUser._id }],
    });

    // Step 3: Extract user IDs from the feed (both toUserId and fromUserId)
    const feedUserIds = feed.flatMap((req) => [
      req.toUserId.toString(),
      req.fromUserId.toString(),
    ]);

    console.log(feedUserIds);

    // Step 4: Filter allUsers to exclude those in feedUserIds
    const filteredUsers = allUsers.filter(
      (user) => !feedUserIds.includes(user._id.toString())
    );

    // Respond with the filtered list of users
    res.json({
      users: filteredUsers,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = userRouter;


