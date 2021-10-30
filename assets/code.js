"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var addButton = document.querySelector(".addButton");
var input = document.querySelector(".input");
var container = document.querySelector(".container");
var item = /** @class */ (function () {
    function item(itemName) {
        this.createDiv(itemName);
    }
    item.prototype.createDiv = function (itemName) {
        var _this = this;
        var input = document.createElement("input");
        input.value = itemName;
        input.disabled = true;
        input.classList.add("item_input");
        input.type = "text";
        var itemBox = document.createElement("div");
        itemBox.classList.add("item");
        var editButton = document.createElement("button");
        editButton.innerHTML = "EDIT";
        editButton.classList.add("editButton");
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "REMOVE";
        removeButton.classList.add("removeButton");
        container.appendChild(itemBox);
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);
        editButton.addEventListener("click", function () { return _this.edit(input.value); });
        removeButton.addEventListener("click", function () {
            return _this.remove(itemBox, input.value);
        });
    };
    item.prototype.edit = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var newInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newInput = prompt("Enter new msg:", input);
                        if (newInput === null) {
                            return [2 /*return*/];
                        }
                        input.value = newInput;
                        return [4 /*yield*/, fetch("/api/modify", {
                                method: "POST",
                                body: JSON.stringify({ old: input.value, new: newInput }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    item.prototype.remove = function (item, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container.removeChild(item);
                        return [4 /*yield*/, fetch("/api/delete", {
                                method: "POST",
                                body: JSON.stringify({ record: value }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return item;
}());
function check() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(input.value != "")) return [3 /*break*/, 2];
                    new item(input.value);
                    return [4 /*yield*/, fetch("/api/create", {
                            method: "POST",
                            body: JSON.stringify({ record: input.value }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    _a.sent();
                    input.value = "";
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function boot() {
    return __awaiter(this, void 0, void 0, function () {
        var records;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/get").then(function (t) { return t.json(); })];
                case 1:
                    records = _a.sent();
                    records.forEach(function (_a) {
                        var record = _a.record;
                        new item(record);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
boot();
addButton.addEventListener("click", check);
window.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        check();
    }
});
