"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProfileAndFindMatches = void 0;
require('dotenv').config();
const processProfileAndFindMatches = async (user) => {
    console.log('findingMatches');
    const url = `${process.env.PYTHON_URL}/model/process_user`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
};
exports.processProfileAndFindMatches = processProfileAndFindMatches;
