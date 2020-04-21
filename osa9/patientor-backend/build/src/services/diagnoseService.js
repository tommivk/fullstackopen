"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoseData = require("../../data/diagnoses.json");
const diagnoses = diagnoseData;
const getEntries = () => {
    return diagnoses;
};
exports.default = { getEntries };
