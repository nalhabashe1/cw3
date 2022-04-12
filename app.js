const express = require("express");
var path = require("path");
const cors = require("cors");
var fs = require("fs");
const app = express();
app.use(cors());
app.set("port", 3000);
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    "In comes a request from " +
      req.method +
      " to " +
      req.url +
      " at " +
      new Date()
  );
  next();
});

app.use((req, res, next) => {
  var filePath = path.join(__dirname, "public", req.url);
  fs.stat(filePath, (err, fileInfo) => {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

// app.use((req, res) => {
//   res.status(404).send("404 File not Found!");
// });

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "/public/index.html"));
});

const MongoClient = require("mongodb").MongoClient;

app.use((req, res, next) => {
  //connecting to your db monogodb access
  MongoClient.connect(
    "mongodb+srv://nalhabashe:LOL1234567@cluster0.8j2zj.mongodb.net/test"
  )
    .then((client) => {
      var db = client.db("activities");
      req.lessonsCollection = db.collection("lessons");
      req.ordersCollection = db.collection("orders");
      console.log("Connected to database successfully!");
      next();
    })
    .catch((err) => {
      console.log(err + "Unable to connect to the database!");
    });
});

// lessons route get
app.get("/lessons", async (req, res) => {
  await req.lessonsCollection
    .find()
    .toArray()
    .then((results) => {
      res.status(200).send(JSON.stringify(results));
    })
    .catch((err) => {
      console.log(err);
    });
});

//search bar
app.get("/lessons/:search", (req, res) => {
  let payload = req.params.search;
  // console.log(payload);
  req.lessonsCollection
    .find({ subject: { $regex: new RegExp("^" + payload + ".*", "i") } })
    .toArray()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

// orders route get
app.get("/orders", (req, res) => {
  req.ordersCollection
    .find()
    .toArray()
    .then((orders) => {
      res.status(200).send(JSON.stringify(orders));
    })
    .catch((err) => {
      console.log(err);
    });
});

// add new order
app.post("/orders", (req, res) => {
  const order = req.body;
  console.log(order);
  req.ordersCollection
    .insertOne(order)
    .then(() => {
      res
        .status(200)
        .send({ status: true, message: "Order submitted successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .send({ status: false, message: "Unable to submit the order!" });
    });
});

// return with object id
const ObjectID = require("mongodb").ObjectID;
app.get("/lessons/:id", (req, res, next) => {
  req.lessonsCollection.findOne(
    { _id: new ObjectID(req.params.id) },
    (e, result) => {
      if (e) return next(e);
      res.send(result);
    }
  );
});

//update an object
app.put("/lessons/:id", (req, res, next) => {
  req.lessonsCollection.update(
    { _id: new ObjectID(req.params.id) },
    { $set: req.body },
    { safe: true, multi: false },
    (e, result) => {
      if (e) return next(e);
      res.send(
        result.modifiedCount === 1 ? { msg: "success" } : { msg: "error" }
      );
    }
  );
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on localhost link: http://localhost:${port}`);
});
