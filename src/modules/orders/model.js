import { fetch, fetchAll } from '../../lib/postgres.js'

// orders
const ORDERS = `
    select 
        o.order_id,
        o.order_created_at,
        o.order_paid,
        t.table_number,
        sum(os.price) as order_total_price,
        json_agg(os) as order_sets
    from orders o
    natural join tables t
    inner join(
        select
            os.order_set_id,
            os.count,
            os.order_id,
            os.order_set_price * os.count as price,
            row_to_json(s) as steak
        from order_sets os
        natural join steaks s
        group by os.order_set_id, s.*
    ) os on os.order_id = o.order_id    
    group by o.order_id, t.table_number
   
`
const orders = () => {
    try{
        return  fetchAll(ORDERS)
    }catch(error){
        throw error;
    }
}

// order added
const add_order = `
    insert into orders(
        table_id
    )values($1)
    returning *
`
const addOrder = ({tableId})=>{
    try{
        return fetch(add_order,tableId)
    }catch(error){
        throw error;
    }
}

// order updated
const update_order = `
    WITH old_data as (
        SELECT
        count
        FROM order_sets
        WHERE order_set_id = $1
    ) UPDATE order_sets os SET
        count = old_data.count + $2
    FROM old_data
    WHERE order_set_id = $1
    RETURNING os.*
`
const updateOrder = ({orderSetId,count})=>{
    try{
        return fetch(update_order,orderSetId,count)
    }catch(error){
        throw error;
    }
}

// order deleted
const delete_order = `
    delete from orders
    where order_id = $1
    returning *
`
const deleteOrder = ({orderId})=>{
    try{
        return fetch(delete_order,orderId)
    }catch(error){
        throw error;
    }
}

// order_set added
const add_order_set = `
    INSERT INTO order_sets (
        order_id,
        steak_id,
        count,
        order_set_price
    ) select $1, $2, $3, s.steak_price from steaks s
    where s.steak_id = $2
    RETURNING *
`
const addOrderSet = ({orderId,steakId,count})=>{
    console.log(orderId,steakId,count)
    try{
        return fetch(add_order_set,orderId,steakId,count)
    }catch(error){
        throw error;
    }
}

// order_set deleted
const delete_order_set = `
    delete from order_sets
    where order_set_id = $1
    returning *
`
const deleteOrderSet = ({orderSetId})=>{
    try{
        return fetch(delete_order_set,orderSetId)
    }catch(error){
        throw error;
    }
}

// pay order
const pay_order = `
    update orders set 
    order_paid = true
    where table_id = $1
    returning *
`
const payOrder = ({tableId})=>{
   try{
        return fetch(pay_order,tableId)
    }catch(error){
        throw error;
    }
}

export default {
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    addOrderSet,
    deleteOrderSet,
    payOrder

}