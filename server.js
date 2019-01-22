var express    = require('express');
var app        = express(); 
var bodyParser = require('body-parser');
var User     = require('./models/user');
var Order     = require('./models/order');
var Item     = require('./models/item');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router(); 

var mongoose   = require('mongoose');
mongoose.connect('mongodb://pivithuru:sysco19@ds161804.mlab.com:61804/project_db', { useMongoClient: true });  
var db = mongoose.connection;
db.on("error", ()=> console.log("DB Connection Error"));
db.once("open", ()=> console.log("connected to DB"));



router.route('/register').post(function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var hashedpassword = passwordHash.generate(password);
    User.findOne({email}, function(err, user){
        if(err){
            res.send(err);
        }else{
            if(user){
                res.send("User Already Exists!");
            }else{
                var user = new User({
                    email : email,
                    password : hashedpassword
                });
                user.save(function(err, user){
                    if(err){
                        res.send(err);
                    }else{
                        var token = jwt.sign({ email: email, password: password }, 'secret');
                        res.send(token);
                    }
                });
            }
        }
    });
});

router.route('/login').post(function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({email : email}, function(err, user){
        if(err){
            res.send(err);
        }else{
            if(user){
                var hashedpassword = passwordHash.generate(password);
                if(passwordHash.verify(password,user.password)){
                    var token = jwt.sign({ email: email, password: password }, 'secret');
                    res.send(token);
                }else{
                    res.send("Invalid Credentials!");
                }
            }else{
                res.send("No Such a User!");
            }
        }
    });
});

router.route('/order').post(function(req, res){
    var order = new Order({
        status : req.body.status,
        itemList : req.body.itemList
    });
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            order.save(function(err, order){
                if(err){
                    res.send("Failed to save to Database!");
                }else{
                    User.findOne({email: user.email}, function(err, userNew){
                        if(err){
                            res.send("Failed to Find the Relevant User!");
                        }else{
                            let currentOrders = userNew.orderList;
                            currentOrders.push(order._id);
                            userNew.orderList = currentOrders;
                            userNew.save(function(err, savedUser){
                                if(err){
                                    res.send("Failed to update the User!");
                                }else{
                                    res.send(order._id);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
});

router.route('/item').post(function(req, res){
    var item = new Item({
        name : req.body.name,
        price : req.body.price,
        count : req.body.count
    });
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            item.save(function(err, item){
                if(err){
                    res.send("Failed to save the Item!");
                }else{
                    res.json({id: item._id});
                }
                });
        }
    });    
});

router.route('/item').put(function(req, res){
    var item_id = req.body.item_id;
    var name  = req.body.name;
    var price = req.body.price;
    var count = req.body.count;
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            Item.findById(item_id, function(err, item){
                if(err){
                    res.send("Failed to Find the Item!");
                }else{
                    item.name = name;
                    item.price = price;
                    item.count = count;
                    item.save(function(err, item){
                        if(err){
                            res.send("Failed to Update the Item!");
                        }else{
                            res.send("Item Updated!");
                        }
                    });
                }
            });
        }
    });
});

router.route('/order').put(function(req, res){
    var order_id = req.body.order_id;
    var status  = req.body.status;
    var itemList = req.body.itemList;
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            Order.findById(order_id, function(err, order){
                if(err){
                    res.send("Failed to Find the Order!");
                }else{
                    order.status = status;
                    order.itemList = itemList;
                    order.save(function(err, order){
                        if(err){
                            res.send("Failed to Update the Order!");
                        }else{
                            res.send("Order Updated!");
                        }
                    });
                }
            });
        }
    });
});

router.route('/order/:order_id').get(function(req, res){
    var order_id = req.params.order_id;
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            Order.findById(order_id, function(err, order){
                if(err){
                    res.send("Failed to Find the Order!");
                }else{
                    res.send(order);
                }
            });
        }
    });  
});

router.route('/item/:item_id').get(function(req, res){
    var item_id = req.params.item_id;
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            Item.findById(item_id, function(err, item){
                if(err){
                    res.send("Failed to Find the Item!");
                }else{
                    res.send(item);
                }
            });
        }
    });
});

router.route('/order/:order_id').delete(function(req, res){
    var order_id = req.params.order_id;
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            Order.remove({_id : order_id}, function(err){
                if(err){
                    res.send("Failed to Delete the Order!");
                }else{
                    User.findOne({email: user.email}, function(err, userNew){
                        if(err){
                            res.send("Failed to Find the Relevant User!");
                        }else{
                            let currentOrders = userNew.orderList;
                            currentOrders.splice( currentOrders.indexOf(order_id), 1 );
                            userNew.orderList = currentOrders;
                            userNew.save(function(err, savedUser){
                                if(err){
                                    res.send("Failed to Update the User!");
                                }else{
                                    res.send("Order Deleted");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.route('/item/:item_id').delete(function(req, res){
    var item_id = req.params.item_id;
    var token = req.headers["authorization"];
    jwt.verify(token, "secret", function(err, user){
        if(err){
            res.send("Access Denied Please Log Again!");
        }else{
            Item.remove({_id : item_id}, function(err){
                if(err){
                    res.send("Failed to Delete the Item!");
                }else{
                    res.send("Item Deleted");
                }
            });
        }
    });
});


router.get('/', function(req, res) {
    res.json({ message: 'POS' });   
});

app.use('/api', router); 
app.listen(port);

console.log("Server Started on port : " + port);
