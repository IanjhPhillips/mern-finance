const connection = await import('../db/connection.mjs')

exports.get=(req,res)=>{
    const transactions=connection.db.transactions.find();
    //const transactions=[{id:1,name:'Income',amount:500},{id:2,name:'Coffee', amount:5}, {id:3, name:'E-transfer', amount: 17.5}];
    res.json(transactions);
};
exports.post=(req,res)=>{
    connection.db.transactions.insertOne({date: req.body.date, description: req.body.description, amount: req.body.amount})
    res.redirect('/transactions');
}
