import express from "express" // importação do express
import mysql from "mysql"
import cors from "cors"

const app = express() // criação do app


app.use(express.json())
app.use(cors())
//conexão com o banco de dados
const db = mysql.createConnection({ // parâmetros para conexão
  host:"localhost",
  user:"andrey",
  password:"Ka$enshi211202",
  database:"final_web"
})

app.post("/show", (req, res) =>{
  const emailUser = req.body.email
  console.log("email user",emailUser)
  const query1 = "SELECT id FROM User WHERE email = ?";
  const query2 = "select id_contact from User_Contact where id_user = ?" // definindo qual a operação que será feita no banco
  const query3 = "select * from Contact where id in (?)"

  db.query(query1, [emailUser] ,(err, data) =>{
    console.log("data retornado da query 1", data)
    const result = data

    const ids = result.map(row => row.id)
    console.log("ids", ids)

    if(err) {
      return res.json(err)
    }
    
    db.query(query2, [ids], (err, r) => {
      const result2 = r
      console.log(r)
      const ids2 = result2.map(row => row.id_contact)
      console.log("ids 2", ids2)

      if(err){
        console.log("error query 2", err)
        return res.json(err)
      }

      if(ids2.length != 0){
        db.query(query3, [ids2], (err, r2) => {
          if(err){
            console.log("error query 3", err)
            return res.json(err)
          }
          console.log("r2:",r2)
  
          const contacts = r2.map(row => ({
            id: row.id,
            name: row.name,
            telefone: row.telefone,
            email: row.email
          }));
  
          console.log("contacts:", contacts);
          res.json(contacts);
  
        })
      }
    })
  })
})

app.post("/delete", (req, res) =>{
  const {id} = req.body
  const query = "delete from Contact where id = ?"

  db.query(query, [id], (err, data)=>{
    if (err) return res.json(err)
    
    return res.json('Deletado com sucesso!')
  })
})

app.post("/addcontact", (req, res) => {
  const query1 = "INSERT INTO Contact (`name`, `telefone`, `email`) VALUES (?)";
  const query2 = "SELECT id FROM Contact WHERE email = ?";
  const query3 = "SELECT id FROM User WHERE email = ?";
  const query4 = "INSERT INTO User_Contact (`id_user`, `id_contact`) VALUES (?,?)";

  // dados do contato
  const values = [
      req.body.contact.nome,
      req.body.contact.telefone,
      req.body.contact.email
  ];

  console.log("Values:",values)
  console.log("Values:",req.body)
  console.log("Req:",req.body.contact.nome)

  // 1. Inserir o novo contato
  db.query(query1, [values], (err, data) => {
      console.log("data",data)
      if (err) {
          return res.json(err);
      }

      // 2. Obter o id do contato recém-adicionado
      db.query(query2, [req.body.contact.email], (err, r) => {
          if (err) {
              return res.status(500).json("Erro ao buscar contato");
          }
          const id_contact = r[0]?.id; // Acesse o ID do contato

          // 3. Obter o id do usuário
          db.query(query3, [req.body.emailUser], (err, r2) => {
              if (err) {
                  return res.status(500).json("Erro ao buscar usuário");
              }
              const id_user = r2[0]?.id; // Acesse o ID do usuário

              // 4. Inserir a relação entre usuário e contato
              const ids = [
                  id_user,
                  id_contact
              ];
              db.query(query4, ids, (err, r3) => {
                  if (err) {
                      return res.status(500).json("Erro ao associar usuário e contato");
                  }
                  return res.json({ message: "Contato adicionado com sucesso", data });
              });
          });
      });
  });
});

app.post("/updatecontact", (req, res) => {
  const query = "update Contact set name = ?, telefone = ?, email = ? where id = ?"
  // dados do contato
  const values = [
      req.body.contact.nome,
      req.body.contact.telefone,
      req.body.contact.email,
      req.body.contact.id
  ];

  console.log("Values:",values)
  console.log("Values:",req.body)
  console.log("Req:",req.body.contact.nome)

  // 1. Inserir o novo contato
  db.query(query, values, (err, data) => {
      console.log("data",data)
      if (err) {
          console.log(err)
          return res.json(err);
      }
      res.json(data);
  });
});

app.post("/register", (req, res) =>{
  const query = "insert into User(`nome`, `telefone`, `endereco`,`email`, `password`) values (?)"

  const values = [
    req.body.nome,
    req.body.telefone,
    req.body.endereco,
    req.body.email,
    req.body.password
  ]

  db.query(query, [values], (err, data) => {
    if(err) {
      return res.json(err)
    }

    return res.json(data)

  })

})

app.post("/login", (req, res) => {
  const {email, password} = req.body
  const query = "select * from User where email = ?"

  db.query(query, [email], (err, data) =>{
    if(err){
      return res.json(err)
    }

    if(data.length > 0){
      const user = data[0]

      if(user.password == password){
        return res.json({
          message: "Login concluído",
          email: user.email
        })
      }else{
        return res.json("Senha incorreta")
      }
    }else{
      return res.json("Usuário não encontrado")
    }
  })
})

app.listen(8800, ()=>{
  console.log("Connected to backend!")
})

