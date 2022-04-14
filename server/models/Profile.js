const { model, Schema } = require("mongoose");

const ProfileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = model("User", ProfileSchema);

module.exports = Profile;
