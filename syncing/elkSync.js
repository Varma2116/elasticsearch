const { Client } = require("@elastic/elasticsearch");
const mongoose = require("mongoose");
const User = require("../models/user"); // Assuming the User schema is saved as user.js
const Lobby = require("../models/lobby"); // Assuming the Lobby schema is saved as lobby.js
const House = require("../models/house"); // Assuming the House schema is saved as house.js

// Elasticsearch Client
const elkClient = new Client({
    node: "http://172.31.39.131:9200", // Update with your Elasticsearch node
});

// MongoDB Connection URI
const mongoUri = "mongodb+srv://jvvprasad04:2NpRd7Lph4NGhd6P@aroundu-cluster1.2vqpnxe.mongodb.net/userdb?retryWrites=true&w=majority"; // Update with your database name

// Function to Sync Users to Elasticsearch
async function syncUsersToElk() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB for Users");

        // Fetch all users
        const users = await User.find({});
        console.log(`Fetched ${users.length} users from MongoDB`);

        // Sync each user to Elasticsearch
        for (const user of users) {
            const userDocument = {
                ...user.toObject(),
                userId: user._id, // Map MongoDB `_id` to Elasticsearch `userId`
            };
            delete userDocument._id;

            // Index user in Elasticsearch
            const response = await elkClient.index({
                index: "users", // Update to your desired Elasticsearch index
                document: userDocument,
            });

            console.log(`Indexed user: ${userDocument.userId}`, response.result);
        }

        console.log("All users synced to Elasticsearch");
    } catch (error) {
        console.error("Error syncing users to Elasticsearch:", error.message);
    } finally {
        // Close MongoDB connection
        mongoose.connection.close();
    }
}

// Function to Sync Lobbies to Elasticsearch
async function syncLobbiesToElk() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB for Lobbies");

        // Fetch all lobbies
        const lobbies = await Lobby.find({});
        console.log(`Fetched ${lobbies.length} lobbies from MongoDB`);

        // Sync each lobby to Elasticsearch
        for (const lobby of lobbies) {
            const lobbyDocument = {
                ...lobby.toObject(),
                lobbyId: lobby._id, // Map MongoDB `_id` to Elasticsearch `lobbyId`
            };
            delete lobbyDocument._id;

            // Index lobby in Elasticsearch
            const response = await elkClient.index({
                index: "lobbies", // Update to your desired Elasticsearch index
                document: lobbyDocument,
            });

            console.log(`Indexed lobby: ${lobbyDocument.lobbyId}`, response.result);
        }

        console.log("All lobbies synced to Elasticsearch");
    } catch (error) {
        console.error("Error syncing lobbies to Elasticsearch:", error.message);
    } finally {
        // Close MongoDB connection
        mongoose.connection.close();
    }
}

// Function to Sync Houses to Elasticsearch
async function syncHousesToElk() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB for Houses");

        // Fetch all houses
        const houses = await House.find({});
        console.log(`Fetched ${houses.length} houses from MongoDB`);

        // Sync each house to Elasticsearch
        for (const house of houses) {
            const houseDocument = {
                ...house.toObject(),
                houseId: house._id, // Map MongoDB `_id` to Elasticsearch `houseId`
            };
            delete houseDocument._id;

            // Index house in Elasticsearch
            const response = await elkClient.index({
                index: "houses", // Update to your desired Elasticsearch index
                document: houseDocument,
            });

            console.log(`Indexed house: ${houseDocument.houseId}`, response.result);
        }

        console.log("All houses synced to Elasticsearch");
    } catch (error) {
        console.error("Error syncing houses to Elasticsearch:", error.message);
    } finally {
        // Close MongoDB connection
        mongoose.connection.close();
    }
}

// Execute the Sync Functions
async function syncDataToElk() {
    console.log("Starting data sync...");
    await syncUsersToElk();
    // await syncLobbiesToElk();
    // await syncHousesToElk();
    console.log("Data sync completed.");
}

syncDataToElk();