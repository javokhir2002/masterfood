import model from './model.js'

export default {
    Query:{
        orders: async (_)=> await model.orders()
    },
    Mutation:{
        addOrder:async(_,args)=>{
            try{
                let table = await model.addOrder(args)
                if(table){
                    return{
                        status:201,
                        message:"The new order has been added !!!",
                        data:table
                    }
                }else throw new Error("There is an error !")
            }catch(error){
                return{
                    status:400,
                    message:error,
                    data:null
                }
            }
        },
        updateOrder:async(_,args)=>{
            try{
                let table = await model.updateOrder(args)
                if(table){
                    return{
                        status:201,
                        message:"The order has been updated !!!",
                        data:table
                    }
                }else throw new Error("There is an error !")
            }catch(error){
                return{
                    status:400,
                    message:error,
                    data:null
                }
            }
        },
        deleteOrder:async(_,args)=>{
            try{
                let table = await model.deleteOrder(args)
                if(table){
                    return{
                        status:201,
                        message:"The order has been deleted !!!",
                        data:table
                    }
                }else throw new Error("There is an error !")
            }catch(error){
                return{
                    status:400,
                    message:error,
                    data:null
                }
            }
        },
        addOrderSet:async(_,args)=>{
            try{
                let table = await model.addOrderSet(args)
                if(table){
                    return{
                        status:201,
                        message:"The new orderSet has been added !!!",
                        data:table
                    }
                }else throw new Error("There is an error !")
            }catch(error){
                return{
                    status:400,
                    message:error,
                    data:null
                }
            }
        }, 
        deleteOrderSet:async(_,args)=>{
            try{
                let table = await model.deleteOrderSet(args)
                if(table){
                    return{
                        status:201,
                        message:"The orderSet has been deleted !!!",
                        data:table
                    }
                }else throw new Error("There is an error !")
            }catch(error){
                return{
                    status:400,
                    message:error,
                    data:null
                }
            }
        },
        payOrder:async(_,args)=>{
            try{
                let table = await model.payOrder(args)
                if(table){
                    return{
                        status:201,
                        message:"The orderSet has been deleted !!!",
                        data:table
                    }
                }else throw new Error("There is an error !")
            }catch(error){
                return{
                    status:400,
                    message:error,
                    data:null
                }
            }
        }
    },
    Order: {
        orderId:        global => global.order_id ,
        tableNumber:    global => global.table_number ,
        orderPaid:      global => global.order_paid ,
        OrderSets:      global => global.order_sets ,
        orderCreatedAt: global => global.order_created_at,
        orderPrize:     global => global.order_total_price 
    },
    OrderSet: {
        orderSetId: global => global.order_set_id 
    }
}