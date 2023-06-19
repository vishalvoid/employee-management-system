const app = require("./app");
const mongoose = require("mongoose");

// mongodb url extracting from /config/config.env
const mongoDB_URL = process.env.MONGO_URI;

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(mongoDB_URL, { useNewUrlParser: true })
    .then((con) => console.log(`Database Connected : ${con.connection.host}`))
    .catch((error) =>
      console.log(`Error Occured from mongo side : ${error.message}`)
    );
};

// connecting to database.
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
