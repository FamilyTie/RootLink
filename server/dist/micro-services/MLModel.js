"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProfileAndFindMatches = void 0;
const processProfileAndFindMatches = async (user) => {
    const url = "https://rootlinkmachinelearning.onrender.com/model/process_user";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const json = await response.json();
    return json;
};
exports.processProfileAndFindMatches = processProfileAndFindMatches;
