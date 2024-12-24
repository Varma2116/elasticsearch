const mongoose = require("mongoose");
const BaseEntitySchema = require("./BaseEntity");

// GeoPointType Schema
const GeoPointTypeSchema = {
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
};

// SubCategory Schema
const SubCategorySchema = {
  subCategoryId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categoryId: {
    type: String, // Could reference Category
  },
  iconUrl: {
    type: String,
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
  },
};

// Category Schema
const CategorySchema = {
  categoryId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  iconUrl: {
    type: String,
  },
  categoryType: {
    type: String,
    enum: ['PROFILE_INFO', 'INTERESTS'], // Enum for CategoryType
  },
  imageUrl: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  onBgColor: {
    type: String,
  },
  borderColor: {
    type: String,
  },
};

// ProfileInterest Schema
const ProfileInterestSchema = {
  category: CategorySchema, // Embed Category schema
  subCategories: [SubCategorySchema], // Array of SubCategories
};

// Prompt Schema
const PromptSchema = {
  subCategoryId: {
    type: String,
  },
  prompt: {
    type: String,
  },
  answer: {
    type: String,
  },
};

// UserInterest Schema (Assuming structure)
const UserInterestSchema = {
  category: CategorySchema, // Embed Category schema
  subCategories: [SubCategorySchema], // Array of SubCategories
};

// User Schema
const UserSchema = new mongoose.Schema({
  ...BaseEntitySchema.obj,
  email: {
    type: String,
    required: true,
    maxlength: 40,
    match: /.+\@.+\..+/,
  },
  mobile: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  role: {
    type: String, // Enum for roles
    enum: ["USER_CREATED", "BASIC_PROFILE_DETAIL", "PROFILE_INTEREST", "USER_INTEREST", "ONBOARDED"], // Example roles
  },
  profilePictureUrl: {
    type: String,
  },
  coverPictureUrl: {
    type: String,
  },
  mediaUrls: [{
    type: String,
  }],
  hashTags: [{
    type: String,
  }],
  description: {
    type: String,
  },
  dob: {
    type: Date,
  },
  issuer: {
    type: String,
  },
  uuid: {
    type: String,
  },
  gender: {
    type: String, // Enum for gender
    enum: ['MALE', 'FEMALE', 'OTHER'],
  },
  address: {
    type: mongoose.Schema.Types.Mixed, // Use a separate Address schema if needed
  },
  location: GeoPointTypeSchema, // Embedded GeoPoint schema
  profileInterests: [ProfileInterestSchema], // Array of ProfileInterests
  userInterests: [UserInterestSchema], // Array of UserInterests
  stage: {
    type: String, // Enum for stages
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
  },
  status: {
    type: String,
  },
  currentOnboardingStep: {
    type: Number,
  },
  onboardingSteps: {
    type: Number,
  },
  userStatus: {
    type: String,
  },
  deviceToken: {
    type: String,
  },
  bio: {
    type: String,
  },
  prompts: [PromptSchema], // Array of Prompts
  isVerified: {
    type: Boolean,
    default: false,
  },
  badges: [{
    type: String,
  }],
  auraPoints: {
    type: Number,
  },
  creditScore: {
    type: Number,
  },
  socketId: {
    type: String,
  },
  lastSeen: {
    type: Date,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

UserSchema.plugin(require("mongoose-autopopulate"));

// Exporting all schemas
module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema)