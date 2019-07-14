var app=require("express")();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
//To make express check public dir
//app.use(express().static("public")); 
 
//initalising mongo Database..
var mongoose =require('mongoose');
mongoose.connect("mongodb://localhost/blog_app");

//initlising mongo Schema
var blogSchema = new mongoose.Schema({

			titl   : String,
			url    : String,
			body    : String,
			created : {type:Date ,default: Date.now}
}); 
// this is model of database ..
var blog =mongoose.model("blog",blogSchema);

// blog.create({
// 			titl : "Hermoine",
// 			url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNLQ6V_jlmFsa5up5gA182BIUFNt8Fy2I9by-Sx9giYrd2ecK1Pw",
// 			body  : "This is the beautiful dangerous Hermoine .. it wll be magical"
// },function(err,value){
// 	
// 		if (err)
// 			console.log(err);
// 		else
// 			console.log(value);
// });

//Routes Now..

app.get("/",function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
	blog.find({},function(err,data){
		if (err)
			console.log(err);
		else
		{
			res.render("index.ejs",{data:data});
		}
	});
	
});

app.get("/blogs/newpost",function(req,res){
	res.render("new.ejs");
});
//New Post Route..
app.post("/newpost",function(req,res){

	blog.create({
					titl:req.body.newtitl,
					url:req.body.newurl,
					body:req.body.newbody
	},function(err,value){
		if (err)
			console.log(err);
		else
			{
				console.log(value);
				res.redirect("/blogs");
			}
	});

});
//Show Route..
app.get("/blogs/:id",function(req,res){
	var postid=req.params.id;
	//blog.findById(id,callback)
	blog.findById(postid,function(err,data){
		if (err)
			console.log(err);
		else
		res.render("show.ejs",{data:data});
	});

});

app.listen(4040,function () {
	console.log("Serving U");
});