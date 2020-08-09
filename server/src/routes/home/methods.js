const getHTML =  (url) => {
    const request = require('request');
    const options = {
        method: 'get',
        url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {},
        json: true
    };
    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        const resp = response;
        if(err) {
          return reject(err)
        }
        if(resp.error) {
          return reject(new Error(response));
        }
        resolve(response.body)
      });
    });
  }
const addUser = async (data) => {
    const mySQLClient = await require("../../utils/mysql")()
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO People (
          name, 
          email, 
          phone, 
          created_date, 
          created_time, 
          created_by, 
          updated_date, 
          updated_time, 
          updated_by
          ) values (
            "${data.name}",
            "${data.email}",
            "${data.phone}",
            CURDATE(),
            CURTIME(),
            0,
            CURDATE(),
            CURTIME(),
            0
          )
        `
        mySQLClient.query(query, (err, results, field) => {
          
          mySQLClient.destroy()
            if(err) reject(err);
            resolve(results);
          });
        });

}
const getUsers = async data => {
    const isEmpty = require("lodash/isEmpty")
    const mySQLClient = await require("../../utils/mysql")()
    if(isEmpty(data)) {
      return new Promise((resolve, reject) => {
          const query = `select * from People where is_deleted = 0
          `
          mySQLClient.query(query, (err, results, field) => {
            mySQLClient.destroy()
            if(err) reject(err);
              resolve(results);
            });
          });
    } else {
      const search = JSON.parse(data)
      if(isEmpty(search)) {
        return new Promise((resolve, reject) => {
          const query = `select * from People where is_deleted = 0
          `
          mySQLClient.query(query, (err, results, field) => {
            mySQLClient.destroy()
            if(err) reject(err);
              resolve(results);
            });
          });
      }
      let searchquery = search.map((item, index) => {
        if(index === search.length  - 1) {
          return `name LIKE "%${item}%"`
        } else {
          return `name LIKE "%${item}%" or `
        }
      }
      )
      searchquery = searchquery.join("")
      return new Promise((resolve, reject) => {
        const query = `select * from People where is_deleted = 0 and
        (${searchquery})
        `
        console.log("q",query)
        mySQLClient.query(query, (err, results, field) => {
          mySQLClient.destroy()
          if(err) reject(err);
            resolve(results);
          });
        });
    }
   
}

const deleteUsers = async id => {
    const mySQLClient = await require("../../utils/mysql")()
    return new Promise((resolve, reject) => {
        const query = `update People set is_deleted = 1 where id = ${id}
        `
        mySQLClient.query(query, (err, results, field) => {
          mySQLClient.destroy()
          if(err) reject(err);
            resolve(results);
          });
        });
}
module.exports = {
    getHTML,
    addUser,
    getUsers,
    deleteUsers
}
    