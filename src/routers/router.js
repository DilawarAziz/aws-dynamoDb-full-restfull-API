var documentClient = new AWS.DynamoDB.DocumentClient();
const express = require("express");
const router = new express.Router();
let random = Math.random() * 100000000000000000;
// transactGet
router.get("/users", (req, res) => {
  const params = {
    TransactItems: [
      {
        Get: {
          TableName: "userdata",
          Key: {
            _id: 15087789521050788000,
            index: 15087789521050788000,
          },
        },
      },
      {
        Get: {
          TableName: "users",
          Key: {
            _id: "654756fg757",
            Index: "654756fg757",
          },
        },
      },
    ],
  };

  documentClient.transactGet(params, function (err, data) {
    if (err) console.log(err);
    else {
      res.send(data);
      console.log(data);
    }
  });
});
// transactWrite
router.post("/users", (req, res) => {
  // multiple method called in different table in only one transact function
  let { name, email } = req.body;
  var params = {
    TransactItems: [
      {
        Put: {
          TableName: "users",
          Item: {
            _id: "654756fg7571",
            Index: "654756fg7572",
            name: name,
            email: email,
          },
        },
      },
      {
        Update: {
          TableName: "userdata",
          Key: { _id: 58254226874496130000, index: 58254226874496130000 },
          UpdateExpression: "set #a =:a",
          ExpressionAttributeNames: { "#a": "name" },
          ExpressionAttributeValues: {
            ":a": "jhon cina",
          },
        },
      },
    ],
  };

  documentClient.transactWrite(params, function (err, data) {
    if (err) console.log(err);
    else {
      res.send(data);
      console.log(data);
    }
  });
});
// batchWrite
router.post("/users", (req, res) => {
  //replacing item in a table
  var params = {
    RequestItems: {
      userdata: [
        {
          DeleteRequest: {
            Key: { _id: 58254226874496130000, index: 58254226874496130000 },
          },
        },
        {
          PutRequest: {
            Item: {
              _id: 5825422687449613,
              index: 5825422687449613,
              name: req.body.name,
            },
          },
        },
      ],
    },
  };

  documentClient.batchWrite(params, function (err, data) {
    if (err) console.log(err);
    else {
      console.log(data);
      res.send(data);
    }
  });
});
// batchGet
router.get("/users", async (req, res) => {
  var params = {
    RequestItems: {
      userdata: {
        Keys: [
          {
            _id: 15087789521050788000,
            index: 15087789521050788000,
          },
        ],
      },
      users: {
        Keys: [{ _id: "654756fg757", Index: "654756fg757" }],
      },
    },
  };
  documentClient.batchGet(params, function (err, data) {
    if (err) console.log(err);
    else {
      res.send(data);
      console.log(data);
    }
  });
  var params = {
    //////////////////////////////////Scan(i used here two mehtod in one request at a time  please comment out one to use only one)//////////
    FilterExpression: "#n  = :a",
    ExpressionAttributeNames: {
      "#n": "name",
    },
    ExpressionAttributeValues: {
      ":a": "umair",
    },
    // ProjectionExpression: "#AT",
    TableName: "userdata",
  };
  await documentClient.scan(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else res.send(data);
  });
});
//////////////put
router.post(
  ("users/",
  (req, res) => {
    //post or write
    let { phone, name, email } = req.body;
    var params = {
      TableName: "userdata",
      Item: {
        _id: random,
        index: random,
        name: name,
        email: email,
        phone: phone,
        class: req.body.class,
        type: true,
      },
      ReturnValues: "ALL_OLD",
    };

    await documentClient.put(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send("data send succcefully");
      }
    });
  })
);
// simple get mothod
router.get(
  ("/users",
  (req, res) => {
    var params = {
      TableName: "userdata",
    };

    documentClient.scan(params, function (err, data) {
      if (err) console.log(err);
      else res.send(data);
    });
  })
);
//delete
router.delete("/users", (req, res) => {
  var params = {
    TableName: "userdata",
    Key: {
      _id: 3889164964996338700,
      index: 3889164964996338700,
    },
  };

  documentClient.delete(params, function (err, data) {
    if (err) console.log(err);
    else res.send(data);
  });
});

//update
router.patch("/users", (req, res) => {
  let params = {
    TableName: "userdata",
    Key: { _id: 934822850000940000, index: 934822850000940000 },
    UpdateExpression: "set #n = :n",

    ExpressionAttributeNames: {
      // these are used to know the  actual names of  attributes in the database
      "#n": "email",
    },
    ExpressionAttributeValues: {
      ":n": "email92@gmail.com",
    },
  };
  documentClient.update(params, function (err, data) {
    if (err) console.log(err);
    else res.send(data);
  });
});

module.exports = router;
