const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    showInCompactView: { type: Boolean },
});

const LocationResponseSchema = new mongoose.Schema({
    exactLocation: LocationSchema,
    approxLocation: LocationSchema,
    areaName: { type: String },
});

const PositionSchema = new mongoose.Schema({
    row: { type: Number },
    column: { type: Number },
});

const GoogleSearchResponseSchema = new mongoose.Schema({
    description: { type: String },
    placeId: { type: String },
    structuredFormatting: {
        mainText: { type: String },
        secondaryText: { type: String },
    },
});

const LocationInfoSchema = new mongoose.Schema({
    title: { type: String },
    locationResponses: [LocationResponseSchema],
    iconUrl: { type: String },
    weightage: { type: Number },
    filterType: {
        type: String,
        enum: ["LOCATION", "DROP_DOWN_MENU", "INPUT", "RADIO_BUTTON", "DATE", "SLIDER", "DATE_RANGE", "CHECK_BOX", "RADIO_BUTTON_WITH_INPUT", "MULTIPLE_LOCATIONS"]
    },
    position: PositionSchema,
    googleSearchResponses: [GoogleSearchResponseSchema],
    isRequired: { type: Boolean },
    showInCompactView: { type: Boolean },
    hideLocation: { type: Boolean },
});

const UserSummarySchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    email: { type: String },
    profilePicture: { type: String },
});

const CategorySchema = new mongoose.Schema({
    categoryId: { type: String },
    name: { type: String },
    description: { type: String },
    iconUrl: { type: String },
    categoryType: { type: String, enum: ["PROFILE_INFO", "INTERESTS"] },
    imageUrl: { type: String },
    bgColor: { type: String },
    onBgColor: { type: String },
    borderColor: { type: String },
});

const SubCategorySchema = new mongoose.Schema({
    subCategoryId: { type: String },
    name: { type: String },
    description: { type: String },
    categoryId: { type: String },
    iconUrl: { type: String },
    averageRating: { type: Number, min: 0, max: 5 },
});

const RangeDtoSchema = new mongoose.Schema({
    min: { type: Number },
    max: { type: Number },
});


const HouseSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    location: LocationInfoSchema,
    photos: [{ type: String }],
    profilePhoto: { type: String },
    createdBy: UserSummarySchema,
    lobbies: [{ type: String }],
    followerCount: { type: Number, default: 0 },
    categories: [CategorySchema],
    subCategories: [SubCategorySchema],
    announcements: [{ type: String }],
    rangeDto: RangeDtoSchema,
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
    minimumVerificationLevel: { type: String },
    userStatus: { type: String, enum: ["ADMIN", "MEMBER", "VISITOR"] },
    activity: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "FULL"] },
});

const House = mongoose.model("houses", HouseSchema);
module.exports = House;