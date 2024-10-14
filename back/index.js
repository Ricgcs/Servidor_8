import express from "express";
import bodyParser from "body-parser";
import { atualizar, procurar, setUser, getUser, delUser, validarUser, login, qtd_clientes, avaliacao } from "../back/controle/usuario.js";
import { setProd, getProd, procurarProd, procurarProdcod, atualizarProd, delProd, getnomeprod } from "../back/controle/produtos.js";
import { setEmpr, procurarEmp, atualizarEmp, delEmpr, getEmpresa, pegarImg } from "../back/controle/empresa.js";
import { setCarg, procurarCargo, atualizarCargo, delCarg, getCarg } from "../back/controle/cargo.js";
import { setFunc, procurarFunc, atualizarFunc, delFunc, getFunc } from "../back/controle/funcionario.js";
import { setOrcamento, getOrcamento, delOrcamento, procOrcamento, atualizarOrcamento } from "./controle/orcamento.js";
import { __dirname } from "../nomeArquivo.js";
import path from 'path';
import cors from 'cors';
import multer from 'multer';

const app = express();
const host = "127.0.0.1";
const porta = 3000;

const storage = multer.memoryStorage();
const upload  = multer({storage:storage});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'front')));
app.use(cors());

//-----------------------------------------------usuário---------------------------------------------------------\\
app.get('/teste', async (req, res) => {
    let cod_em = Number(req.body.cod_empr);
    let cpf = Number(req.body.cpf);

    try {
        const count = await validarUser(cod_em, cpf);
        if (count == 0) {
            res.send("funciona");
        } else {
            res.send(`Usuário já existente: codigo_empresa(${cod_em}); cpf(${cpf}) `);
        }
    } catch (error) {
        res.status(500).send('Erro ao validar usuário.');
    }
});

app.get('/usuario/:nome/:email/:senha/:cpf/:cod', async (req, res) => {
    const nome = req.params.nome;
    const email = req.params.email;
    const senha = req.params.senha;
    const cpf = req.params.cpf;
    const cod = Number(req.params.cod);
    
    let userData = { nome, email, senha, cpf, cod };
     
    try {
        await setUser(userData);
        console.log(userData)
        res.status(200).send('Usuário criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro ao criar usuário.');
    }
});

app.post('/usuario/avaliacao/:nome/:sugestao/:nota/:profissao', async (req, res) => {
    const { nome, sugestao, profissao } = req.params;
    let { nota } = req.params;

    nota = Number(nota);

    if (isNaN(nota)) {
        return res.status(400).send('Avaliação deve ser um número válido.');
    }

    const userData = { nome, sugestao, nota, profissao };

    try {
        await avaliacao(userData);
        console.log("funcionou",userData);
        
        res.status(200).send('Comentário feito com sucesso, muito obrigado pelo apoio');
    } catch (error) {
        console.error('Oooops algo errado:', error);
        res.status(500).send('Oooops algo errado');
    }
});


app.get('/usuario/mostrar', async (req, res) => {
    const { what,valor, nome} = req.body; 
console.log(valor, nome)
    try {
        const resultado = await procurar({ what, valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar usuário", error: error.message });
    }
});


app.post('/usuario/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; 
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizar(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
});

app.post('/usuario/deletar', async (req, res) => {
    const { valor, nome} = req.body; 
console.log(valor, nome)
    try {
        const resultado = await delUser(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o usuário", error: error.message });
    }
});

app.get('/usuario/mostrar_todos', async (req, res) => {
    try {
      const usuarios = await getUser();  
      console.log('Usuários encontrados:', usuarios); 
      res.status(200).json(usuarios);  
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      res.status(500).json({ message: "Erro ao buscar todos os usuários", error: error.message });
    }
  });
  app.get('/usuario/logar/:cod/:nome/:senha', async (req, res) => {
    const cod = Number(req.params.cod);
    const nome = req.params.nome;
    const senha = req.params.senha;

    if (!cod || !nome || !senha) {
        return res.status(400).json({ message: 'Parâmetros inválidos' });
    }

    let envio = { cod, nome, senha };

    try {
        const teste = await login(envio.cod, envio.nome, envio.senha);
        
        if (teste == 1) {
            return res.status(200).json({ result: 1 });
        }
        else{
            return res.status(200).json({ result: 0 })
        }
    } 
    catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
});

//-----------------------------------------------Produto---------------------------------------------------------\\
app.post('/produto/:nome/:valor/:quantidade/:cod_empr/:altura/:comprimento/:largura', async (req, res) => {
    const { nome, valor, quantidade, cod_empr, altura, comprimento, largura } = req.params; 

    try {
        const resultado = await setProd({ nome, valor, quantidade, cod_empr, altura, comprimento, largura });
        res.status(201).json({ message: "Produto criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message });
    }
});



app.get('/produto/mostrar/:pesq', async (req, res) => {
    const pesq = req.params.pesq;  // O código da empresa que você quer pesquisar
    console.log('Código da empresa:', pesq);
  
    try {
      const resultado = await procurarProd(pesq);
      if (resultado.length > 0) {
        res.status(200).json({ data: resultado });
      } else {
        res.status(404).json({ message: 'Nenhum produto encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao procurar o produto', error: error.message });
    }
  });

app.get('/produto/mostrar_nome/:nome/:cod', async (req, res) => {
    const nome = req.params.nome;
    const cod = req.params.cod;
    console.log(`Nome: ${nome}, Código: ${cod}`);
    
    try {
        const resultado = await getnomeprod({ nome, cod });
        res.status(200).json({ data: resultado });
        console.log("Resultado:", resultado);
        return resultado;
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o produto", error: error.message });
        console.error("Erro:", error.message);
    }
});

app.post('/produto/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; 
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarProd(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
        console.log(resultado)
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o produto", error: error.message });
        console.log("erro")

    }
});

app.post('/produto/deletar', async (req, res) => {
    const { valor, nome} = req.body; 
console.log(valor, nome)
    try {
        const resultado = await delProd(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o produto", error: error.message });
    }
});


app.get('/produto/mostrar_todos', async (req, res) => {
 getProd()
});
//-----------------------------------------------Empresa------------------------------------------------------------\\

app.get('/imagem/:cod', async (req, res) => {
    const cod = req.params.cod;
    try {
        const response = await pegarImg(cod); 
        if (response && response.imagen) {

            res.send(response.imagen); 
        } else {
            res.status(404).send('Imagem não encontrada.');
        }
    } catch (error) {
        res.status(500).send('Erro ao buscar a imagem.');
    }
});

app.post('/empresa', upload.single('Imagem'), async (req, res) => {
    let nome = req.body.Nome_fantasia;
    let RS = req.body.Razao_social;
    let email = req.body.Email;
    let CNPJ = Number(req.body.CNPJ);
    let Senha = req.body.Senha;
    const Imagem = req.file; 

    console.log({ nome, RS, email, CNPJ, Senha, Imagem });

    try {
        const resultado = await setEmpr(nome, RS, email, CNPJ, Senha, Imagem);
        return res.status(200).json({ result: 1 });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar a empresa", error: error.message });
    }
});


app.get('/empresa/mostrar', async (req, res) => {
    const { valor, nome} = req.body;
console.log(valor, nome)
    try {
        const resultado = await procurarEmp({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar a empresa", error: error.message });
    }
});


app.post('/empresa/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body;
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarEmp(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar a empresa", error: error.message });
    }
});

app.post('/empresa/deletar', async (req, res) => {
    const { valor, nome} = req.body;
console.log(valor, nome)
    try {
        const resultado = await delEmpr(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar a empresa", error: error.message });
    }
});


app.get('/empresa/mostrar_todos', async (req, res) => {
 getEmpresa()
});
//-----------------------------------------------Cargo--------------------------------------------------------\\

app.post('/cargo', async (req, res) => {
    const {Nome, Salario, Cod_empresa } = req.body;

    try {
        const resultado = await setCarg({Nome, Salario, Cod_empresa });
        res.status(201).json({ message: "Cargo criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o cargo", error: error.message });
    }
});


app.get('/cargo/mostrar', async (req, res) => {
    const { valor, nome} = req.body;
console.log(valor, nome)
    try {
        const resultado = await procurarCargo({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o cargo", error: error.message });
    }
});


app.post('/cargo/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body;
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarCargo(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o cargo", error: error.message });
    }
});

app.post('/cargo/deletar', async (req, res) => {
    const { valor, nome} = req.body;
console.log(valor, nome)
    try {
        const resultado = await delCarg(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o cargo", error: error.message });
    }
});


app.get('/cargo/mostrar_todos', async (req, res) => {
 getCarg()
});

//---------------------------------------------Funcionário------------------------------------------\\

app.post('/funcionario', async (req, res) => {
    const {Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha } = req.body;
console.log(Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha )
    try {
        const resultado = await setFunc({Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha});
        res.status(201).json({ message: "Funcionário criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o funcionário", error: error.message });
    }
});


app.get('/funcionario/mostrar', async (req, res) => {
    const { valor, nome} = req.body;
console.log(valor, nome)
    try {
        const resultado = await procurarFunc({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o funcionário", error: error.message });
    }
});


app.post('/funcionario/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body;
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarFunc(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o funcionário", error: error.message });
    }
});

app.post('/funcionario/deletar', async (req, res) => {
    const { valor, nome} = req.body;
console.log(valor, nome)
    try {
        const resultado = await delFunc(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o funcionário", error: error.message });
    }
});


app.get('/funcionario/mostrar_todos', async (req, res) => {
 getFunc()
});

//--------------------------------------------------Orçamento--------------------------------------------------\\

app.post('/orcamento/:Nome/:Descricao/:Valor/:Desconto/:Data_inicio/:Data_entrega/:Empresa_Cod_empresa/', async (req, res) => {
   
    const { Nome, Descricao, Valor, Desconto, Data_inicio, Data_entrega, Empresa_Cod_empresa} = req.params;
    
    console.log(Nome, Descricao, Valor, Desconto, Data_inicio, Data_entrega, Empresa_Cod_empresa);
    
    try {
       
        const resultado = await setOrcamento(Nome, Descricao, Valor, Desconto, Data_inicio, Data_entrega, Empresa_Cod_empresa);
       

    } catch (error) {
       
        
        res.status(500).json({ message: "Erro ao criar o orçamento", error: error.message });
    }
});

app.get('/orcamento/mostrarTodos', async(req,res) =>{
    try{
        const response =await getOrcamento();       
       // res.json({data:response})
       res.status(200).json(response)

    }
    catch(err){
        console.log("erro servidor, /orcamento/mostrarTodos")
    }
});

app.get('/orcamento/mostrarProdutoNome/:cod_empresa/:cod_produto',async(req,res)=>{
const empresa = req.params.cod_empresa;
const produto = req.params.cod_produto;
try{
    const response = await procurarProdcod(empresa, produto)
    console.log(response)
    res.status(200).json(response)
}
catch(error){
    console.log(error)
}

});

//------------------------------------------------Servidor-----------------------------------------------------------\\
app.listen(porta, host,  () => {
    console.log("servidor rodando");
});
