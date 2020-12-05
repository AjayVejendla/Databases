const database = require("@mysql/xdevapi");
const express = require("express");

const config = {

    password: 'databases336',
    user: 'av591',
    host: 'localhost',
    port: 33060,
    schema: 'FinalProject'
    
};




async function executeQuery(queryString){
    try{
    session = await database.getSession(config);
    query = await session.sql(queryString).execute()

    session.close()
    results = query.fetchAll()
    return results
    }
    catch(err){
        session.close()
        return err

    }
}


exports.query = executeQuery;
