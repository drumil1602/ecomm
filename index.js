// console.log("eComm App APIs");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connecting with Database", err));

// App routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running at port ${process.env.PORT}`);
});


/*
  login => userName,password => give him one token
    view profile => userName,password
    view profile => give him/her a one token 

    JWT => json web token
    hashing, encryption( key is required ), encoding(key is not required)

    then we are using encoding ??

    token => is in encoded format
      decoding => it will give data without key
      verify => we require key for this

    abc => 123(key which is created by me)
    abc => 345(key which is created by john)

    123 => (if i use john key) => it can't be decoded


    encryption, 
      decryption

    sending data from FE to BE  go for encryption

    evening delegation
    
    s => BE 
    o => be
    n => be
    y => be

    debounding and throttling

  customer => can put buying price
  
  i phone 15 5000rs 

  drive => 
  firebase
*/