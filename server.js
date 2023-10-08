const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 5000;
const path = require("path");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Limax:Limax123@einkaufsliste.2njzwrl.mongodb.net/Einkaufsapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const listSchema = {
  title: String,
  value: Number,
  unit: String,
  pieces: Number,
};

const List = mongoose.model("List", listSchema);

app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.join(__dirname, "views")); // Set the views directory

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "addItem.html"));
});

app.post("/addItem", function (req, res) {
  const newItem = new List({
    title: req.body.title,
    value: req.body.value,
    unit: req.body.unit,
    pieces: req.body.pieces,
  });

  newItem.save()
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("Error saving item to database.");
  });
});

app.get("/shoppingList", async function (req, res) {
  try {
    const items = await List.find({}).exec();
    console.log(items); // Überprüfen Sie, ob die Daten korrekt abgerufen werden
    res.render("shoppingList", { items: items });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving items from database.");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle DELETE request to delete an item by ID
app.delete("/deleteItem/:itemId", async function (req, res) {
  const itemId = req.params.itemId;

  try {
      const deletedItem = await List.findByIdAndRemove(itemId).exec();
      if (deletedItem) {
          res.json({ success: true, message: "Item deleted successfully." });
      } else {
          res.json({ success: false, message: "Item not found." });
      }
  } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ success: false, message: "Error deleting item from the database." });
  }
});