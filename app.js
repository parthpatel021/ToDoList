//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
main().catch(err => console.log(err));

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

    const itemSchema = new mongoose.Schema({
        name: String
    })
        
    const Item = mongoose.model("Item",itemSchema);
        
    const item1 = new Item({
        name: "Welcome to your to do list."
    });
        
    const item2 = new Item({
        name: "Hit the + button to add new item."
    });
        
    const item3 = new Item({
        name: "<--Hit this to delete this item."
    });
        
    const defaultItems = [item1, item2, item3];
    let foundItems = await Item.find({});
    if(foundItems.length === 0){
        Item.insertMany(defaultItems);
   }

    app.get("/", function(req, res) {
    
        res.render("list", {listTitle: "Today", newListItems: foundItems});
        
    });

    app.post("/", function(req, res){

        const itemName = req.body.newItem;
        const item = new Item({
            name: itemName
        });
        item.save();
        
        res.redirect("/");
    });

    app.get("/work", function(req,res){
        res.render("list", {listTitle: "Work List", newListItems: workItems});
    });

    app.get("/about", function(req, res){
        res.render("about");
    });

    app.listen(3000, function() {
        console.log("Server started on port 3000");
    });

}