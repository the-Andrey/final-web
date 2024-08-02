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
          user: user
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

