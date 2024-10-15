"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const types_1 = require("./types");
const resolvers_1 = require("./resolvers");
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
exports.typeDefs = `#graphql
${types_1.types}
type Query{
${queries_1.queries}
 }
 type Mutation{
    ${mutations_1.mutation}
 }

`;
exports.resolvers = {
    Query: Object.assign({}, resolvers_1.queryResolver),
    Mutation: Object.assign({}, resolvers_1.mutationResolver)
};
// export const User = { types, resolvers, queries };
