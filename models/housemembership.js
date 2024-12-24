const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

const HouseMembershipSchema = new mongoose.Schema({
    ...BaseEntitySchema.obj,
    userId: { type: String, required: true },
    houseId: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

HouseMembershipSchema.index({ houseId: 1, userId: 1 }, { name: "unique_house_user_index", unique: true });

const houseMembership = mongoose.model("houseMemberships", HouseMembershipSchema);

module.exports = houseMembership;
