import { types } from "./types";
import { queryResolver,mutationResolver } from "./resolvers";
import { queries } from "./queries";
import { mutation } from "./mutations";

export const typeDefs = `#graphql
${types}
type Query{
${queries}
 }
 type Mutation{
    ${mutation}
 }

`;

export const resolvers = {
    Query:{
        ...queryResolver
    },
    Mutation:{
        ...mutationResolver
    }
}

// export const User = { types, resolvers, queries };
