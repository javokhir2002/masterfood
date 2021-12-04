import { gql } from 'apollo-server'

export default gql`

    extend type Query {
        orders(orderId:ID tableId:ID):[Order!]!
    }

    extend type Mutation {
        addOrder(tableId:ID!):MutationResponse!
        updateOrder(orderSetId:ID! count:Int!):MutationResponse!
        deleteOrder(orderId:ID!):MutationResponse!
        addOrderSet(orderId:ID! steakId:ID! count:Int!):MutationResponse!
        deleteOrderSet(orderSetId:ID!):MutationResponse!
        payOrder(tableId:ID!):MutationResponse!
    }
    
    
    type Order {
        orderId:ID!
        tableNumber:Int!
        orderPaid:Boolean!
        OrderSets:[OrderSet]!
        orderCreatedAt:Date!
        orderPrize:Int!
    }

    

    type OrderSet {
        orderSetId:ID!
        steak:Steak!
        count:Int!
        price:Int!
    }
`