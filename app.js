const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// console.log(date.getDay());

const app = express();

const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];
// in const array -> it is possible to push item in array
//                -> it throw an error on asining (i.e. myArr[0] = "Zero")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    let day = date.getDate(); // or date.getDay();

    res.render('list', {listTitle: day,newListItem : items});
});

app.post("/",function(req,res){
    let item = req.body.newItem;

    // console.log(req.body); 
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

// Work List
app.get("/work",function(req,res){
    res.render('list',{listTitle: "Work List",newListItem : workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

// about
app.get("/about",function(req,res){
    res.render('about');
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
