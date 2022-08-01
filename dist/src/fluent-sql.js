"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FluentSQLBuilder_instances, _FluentSQLBuilder_database, _FluentSQLBuilder_limit, _FluentSQLBuilder_select, _FluentSQLBuilder_where, _FluentSQLBuilder_orderBy, _FluentSQLBuilder_performLimit, _FluentSQLBuilder_hasWhere, _FluentSQLBuilder_performSelect, _FluentSQLBuilder_performOrderBy;
Object.defineProperty(exports, "__esModule", { value: true });
class FluentSQLBuilder {
    constructor(database) {
        _FluentSQLBuilder_instances.add(this);
        _FluentSQLBuilder_database.set(this, void 0);
        _FluentSQLBuilder_limit.set(this, 0);
        _FluentSQLBuilder_select.set(this, []);
        _FluentSQLBuilder_where.set(this, []);
        _FluentSQLBuilder_orderBy.set(this, "");
        __classPrivateFieldSet(this, _FluentSQLBuilder_database, database, "f");
    }
    static for(database) {
        return new FluentSQLBuilder(database);
    }
    select(props) {
        __classPrivateFieldSet(this, _FluentSQLBuilder_select, props, "f");
        return this;
    }
    where(query) {
        const [[prop, selectedValue]] = Object.entries(query);
        const whereFilter = selectedValue instanceof RegExp
            ? selectedValue
            : new RegExp(selectedValue);
        __classPrivateFieldGet(this, _FluentSQLBuilder_where, "f").push({ prop, filter: whereFilter });
        return this;
    }
    limit(max) {
        __classPrivateFieldSet(this, _FluentSQLBuilder_limit, max, "f");
        return this;
    }
    orderBy(field) {
        __classPrivateFieldSet(this, _FluentSQLBuilder_orderBy, field, "f");
        return this;
    }
    build() {
        const results = [];
        for (const item of __classPrivateFieldGet(this, _FluentSQLBuilder_database, "f")) {
            if (!__classPrivateFieldGet(this, _FluentSQLBuilder_instances, "m", _FluentSQLBuilder_hasWhere).call(this, item)) {
                continue;
            }
            const currentItem = __classPrivateFieldGet(this, _FluentSQLBuilder_instances, "m", _FluentSQLBuilder_performSelect).call(this, item);
            results.push(currentItem);
            if (__classPrivateFieldGet(this, _FluentSQLBuilder_instances, "m", _FluentSQLBuilder_performLimit).call(this, results)) {
                break;
            }
        }
        return __classPrivateFieldGet(this, _FluentSQLBuilder_instances, "m", _FluentSQLBuilder_performOrderBy).call(this, results);
    }
}
exports.default = FluentSQLBuilder;
_FluentSQLBuilder_database = new WeakMap(), _FluentSQLBuilder_limit = new WeakMap(), _FluentSQLBuilder_select = new WeakMap(), _FluentSQLBuilder_where = new WeakMap(), _FluentSQLBuilder_orderBy = new WeakMap(), _FluentSQLBuilder_instances = new WeakSet(), _FluentSQLBuilder_performLimit = function _FluentSQLBuilder_performLimit(results) {
    return __classPrivateFieldGet(this, _FluentSQLBuilder_limit, "f") && results.length === __classPrivateFieldGet(this, _FluentSQLBuilder_limit, "f");
}, _FluentSQLBuilder_hasWhere = function _FluentSQLBuilder_hasWhere(item) {
    for (const { prop, filter } of __classPrivateFieldGet(this, _FluentSQLBuilder_where, "f")) {
        if (!item[prop].match(filter)) {
            return false;
        }
    }
    return true;
}, _FluentSQLBuilder_performSelect = function _FluentSQLBuilder_performSelect(item) {
    let currentItem = {};
    const entries = Object.entries(item);
    for (const [key, value] of entries) {
        if (__classPrivateFieldGet(this, _FluentSQLBuilder_select, "f").length && !__classPrivateFieldGet(this, _FluentSQLBuilder_select, "f").includes(key)) {
            continue;
        }
        currentItem[key] = value;
    }
    return currentItem;
}, _FluentSQLBuilder_performOrderBy = function _FluentSQLBuilder_performOrderBy(results) {
    if (!__classPrivateFieldGet(this, _FluentSQLBuilder_orderBy, "f")) {
        return results;
    }
    return results.sort((prev, next) => {
        return prev[__classPrivateFieldGet(this, _FluentSQLBuilder_orderBy, "f")].localeCompare(next[__classPrivateFieldGet(this, _FluentSQLBuilder_orderBy, "f")]);
    });
};
