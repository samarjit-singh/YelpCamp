const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 210);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61ea9688c53326b013bded5f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/random/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptate natus voluptatem repellat quisquam? Rerum sequi at sint cum accusantium odio. Laudantium numquam doloribus mollitia corrupti vitae, aliquid ullam! Laudantium!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
