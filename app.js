const express = require ("express")
const MercadoPago = require("mercadopago")
const app = express();

MercadoPago.configure({

    sandbox:true,
    access_token : "TEST-4425042818282530-082500-ed30a0afa9e70d9a5697a7a203fd49d6-224163688"
})

app.get("/",(req,res)=>{

res.send("Ola mundo")


})

app.get("/pagar",async (req,res)=>{
var id = ""+Date.now();
var emaildoPagador ="vstutorial45@gmail.com"
 var  dados = {

 items :[
     item = {
      id: id,
      title : "Teste",
      quantity : 1,
      currency_id: 'BRL',
      unit_price: parseFloat(150)

     }
 ],
payer : {
    email :emaildoPagador
},
external_reference:id


 }
 try {
    var pagamento = await MercadoPago.preferences.create(dados)
    console.log(pagamento)
    return res.redirect(pagamento.body.init_point)
     
 } catch (error) {
      return  res.send(error.message)
 }

})


const PORT = process.env.PORT|| 8081
app.listen(PORT,(req,res)=>{

console.log("Servidor Rodando")


})
