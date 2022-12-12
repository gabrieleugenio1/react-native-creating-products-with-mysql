const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app =  express();
const models = require('./models');
let user = models.User;
let product = models.Product;

app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());

let PORT = process.env.PORT || 3000;


app.post('/create', async (req,res) => {
  let nome = req.body.nome;
  let email = req.body.email;
  let password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  let senhaCriptografada = bcrypt.hashSync(password, salt);
  let response = await user.create({nome:nome,
  email: email,
  password: senhaCriptografada,
  createdAt: new Date(),
  updatedAt: new Date()
  });
  console.log(response);
  res.send(response); 
});

app.post('/login', async (req, res) =>{
  let nome = req.body.nome;
  let password = req.body.password;
  await user.findOne({where: {nome:nome}}).then( usuario =>{
  if (usuario != undefined) {
      if (bcrypt.compareSync(password, usuario.password)) {
        res.send(usuario)
      } else {
          res.send(JSON.stringify("Error"));
      };
    } else {
      res.send(JSON.stringify("Error"));
    };
  }
 );
});

app.get('/', async(req,res) =>{
  let response = await product.findAll();
  res.send(response)
});

app.get('/produto/:id', async (req,res) =>{
    let id = req.params.id;
    await product.findByPk(id).then( produto =>{
            res.send(produto)      
            console.log(produto)
      })})

app.put('/produto/:id', async (req,res) =>{
    let id = req.params.id;
    let produto = req.body.produto;
    let armazenamento = req.body.armazenamento;
    let valor = req.body.valor;     
    await product.update({nome:produto,capacidade:armazenamento,preco:valor},{where:{id:id}}).then( produto =>{
            res.send(produto)                
      })})

app.post('/createproduto', async (req,res) => {
  let produto = req.body.produto;
  let armazenamento = req.body.armazenamento;
  let valor = req.body.valor; 
  let response = await product.create({nome:produto,
    capacidade: armazenamento,
    preco: valor,
    createdAt: new Date(),
    updatedAt: new Date()

  });
  console.log(response);
  res.send(response); 
});
 
app.delete('/produto/:id', async (req,res) =>{
  let id = req.params.id;
  console.log(id)
  await product.destroy({where:{id:id}}).then( () => {
          res.send("Confirmado")                
    })})




app.listen(PORT, ()=>{ console.log("Aplicação rodando na porta " + PORT);});