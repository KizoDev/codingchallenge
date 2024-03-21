"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {ITask} from '../types/task';
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Task', taskSchema);
