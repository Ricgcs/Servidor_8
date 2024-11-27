import express, { response } from "express";
import bodyParser from "body-parser";
import { atualizar, procurar, setUser, getUser, delUser, validarUser, login, qtd_clientes, avaliacao, procurarImagem_nome_cod } from "../back/controle/usuario.js";
import { setProd, getProd, procurarProd, procurarProdcod, atualizarProd, delProd, getnomeprod } from "../back/controle/produtos.js";
import { setEmpr, procurarEmp, getEmpresa, procurarImagem_empresa, login_empresa, validarEmpresa, nomeCod } from "../back/controle/empresa.js";
import { setCarg, procurarCargo,procurarSalario, procurarCodCargo, atualizarCargo, delCarg, getCarg } from "../back/controle/cargo.js";
import { setFunc, procurarFunc, atualizarFunc, delFunc, getFunc } from "../back/controle/funcionario.js";
import { setOrcamento, getOrcamento, delOrcamento, procOrcamento, atualizarOrcamento } from "./controle/orcamento.js";
import { getnomeprod_quantidade, procurarProd_quantidade, setProd_quantidade } from "./controle/produtos_quantidade.js";
import { getFornecedor, login_fornecedor, nomeCod_fornecedor, procurarForn, procurarImagem_fornecedor, setForn, validarFornecedor } from "./controle/fornecedor.js";
import { atualizarProd_fornecedor, delProd_fornecedor, getnomeprod_fornecedor, getProd_fornecedor, procurarProd_fornecedor, setProd_fornecedor } from "./controle/produtos_fornecedor.js";
import { getnomeprod_quantidade_fornecedor, procurarProd_quantidade_fornecedor, setProd_quantidade_fornecedor } from "./controle/produtos_quantidade_fornecedor.js";
import { __dirname } from "../nomeArquivo.js";
import { mostrarTarefas, salvar } from "./controle/agenda_empresa.js";
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import { mostrarTarefasFornecedor, salvarFornecedor } from "./controle/agenda_fornecedor.js";





const app = express();
const host = "127.0.0.1";
const porta = 3000;

const storage = multer.memoryStorage();
const upload  = multer({storage:storage});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'front')));
app.use(cors());






//-----------------------------------------------Fornecedor------------------------------------------------------------\\
app.get('/fornecedor/validar', async (req, res) => {
    let cnpj = Number(req.body.cnpj);

    try {
        const count = await validarFornecedor(cnpj);
        if (count == 0) {
            res.send("funciona");
        } else {
            res.send(`Empresa já existente: cnpj(${cnpj}) `);
            console.log(`Empresa já existente: cnpj(${cnpj}) `);
        }
    } catch (error) {
        res.status(500).send('Erro ao validar empresa.');
    }
});

app.get('/fornecedor/cod/:nome', async (req, res) => {
    const rs = req.params.nome;  
    
    try {
    
      const response = await nomeCod_fornecedor(rs);    
     console.log(response);
      res.json(response);
     
    } catch (error) {
      console.log("Erro ao buscar o cod:", error);
      console.log("Nome:", rs);
      
      res.status(500).send('Erro ao processar o cod');
    }
  });   



app.get('/fornecedor/imagem/:nome', async (req, res) => {
    const nome = req.params.nome;
    
    
    try {
    
      const response = await procurarImagem_fornecedor(nome);    

        res.set('Content-type', 'image/jpg');
        res.send(response[0].imagen); 
     
    } catch (error) {
      console.log("Erro ao buscar a imagem:", error);
      console.log("Nome:", nome);
      
      res.status(500).send('Erro ao processar a solicitação');
    }
  });

app.post('/fornecedor',upload.single('img'), async (req, res) => {


    console.log('teste funciona')
    const nome_fantasia = req.body.nome_fantasia;
    const razao_social = req.body.razao_social;
    const email = req.body.email;
    const cnpj = Number(req.body.cnpj);
    const senha = req.body.senha;   
    const cep = req.body.cep;  
    const estado = req.body.senha;   
    const cidade = req.body.senha;   
    const bairro = req.body.senha;   
    const telefone = req.body.telefone;   

    const img = req.file;
    console.log('teste funciona 2')
    
    let fornData = { razao_social, nome_fantasia, cnpj, telefone, cep, email, estado, cidade, bairro, senha, img };
     
    try {

        const validar = await validarFornecedor(cnpj);    
       if(validar == 1)
        {
        return res.status(200).json(2);
       }

        await setForn(fornData);
        console.log(fornData)
        res.status(200).send('Fornecedor cadastrado com sucesso!');
    } catch (error) {
    console.log('teste funciona 4')

        console.error('Erro ao cadastrar fornecedor:', error);
        res.status(500).send('Erro ao cadastrar fornecedor.');
    }
});


app.get('/fornecedor/mostrar', async (req, res) => {
    const { what,valor, nome} = req.body; 
console.log(valor, nome)
    try {
        const resultado = await procurar({ what, valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar fornecedor: ", error: error.message });
    }
});


app.get('/fornecedor/mostrar/:what/:valor/:nome', async (req, res) => {
    const what= req.params.what; 
    const valor = req.params.valor; 
    const nome = req.params.nome; 

    try {
       
        const resultado = await procurarForn({ what, valor, nome});
        const name = resultado.Nome;
    
  
        //res.status(200).json({data:name});
        res.status(200).send({data:name});
     
    } catch (error) {

        res.status(500).json({ message: "Erro ao procurar o fornecedor no servidor", error: error.message });
    }
});


app.get('/fornecedor/mostrar_todos', async (req, res) => {
    try {
      const fornecedor = await getFornecedor();  
      console.log('Fornecedores encontrados:', fornecedor); 
      res.status(200).json(fornecedor);  
    } catch (error) {
      console.error('Erro ao buscar todos os fornecedores:', error);
      res.status(500).json({ message: "Erro ao buscar todos os fornecedores", error: error.message });
    }
  });


  app.post('/fornecedor/logar', async (req, res) => {
    const rs = req.body.razao_social;
    const cnpj = Number(req.body.cnpj);
    const senha = req.body.senha;
    console.log("Dados recebidos no servidor:", req.body);
    let envio = { rs, cnpj, senha };

    try {

        const teste = await login_fornecedor(envio.rs, envio.cnpj, envio.senha);
        console.log("teste:", envio);

        if (teste == 1){
            return res.status(200).json(1);
        }

        else{
            return res.status(200).json(0);
        }
    } 
    catch(err){
        console.error(err);
        return res.status(500).send('Erro no servidor');
        }
});

//-----------------------------------Produto_quantidade_fornecedor--------------------------------------------\\
app.post('/produto_quantidade_fornecedor/:cod_empr/:nome/:valor/:quantidade/:data/:obs', async (req, res) => {
    const {cod_empr, nome, valor, quantidade,data, obs} = req.params; 

    try {
        const resultado = await setProd_quantidade_fornecedor({cod_empr, nome, valor, quantidade,data, obs});
        res.status(201).json({ message: "Produto criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message });
    }
});


app.get('/produto_quantidade_fornecedor/mostrar/:pesq', async (req, res) => {
    const pesq = req.params.pesq;  
    console.log('Código da empresa:', pesq);
  
    try {
      const resultado = await procurarProd_quantidade_fornecedor(pesq);
      if (resultado.length > 0) {
        res.status(200).json({ data: resultado });
      } else {
        res.status(404).json({ message: 'Nenhum produto encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao procurar o produto', error: error.message });
    }
  });


  app.get('/produto_quantidade_fornecedor/mostrar_nome/:nome/:cod', async (req, res) => {
    const nome = req.params.nome;
    const cod = req.params.cod;
    console.log(`Nome: ${nome}, Código: ${cod}`);
    
    try {
        const resultado = await getnomeprod_quantidade_fornecedor({ nome, cod });
        res.status(200).json({ data: resultado });
        console.log("Resultado:", resultado);
        return resultado;
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o produto", error: error.message });
        console.error("Erro:", error.message);
    }
});


//-----------------------------------------------Produto_fornecedor---------------------------------------------------------\\
app.post('/produto_fornecedor/:cod_empr/:nome/:valor/:quantidade/:altura/:comprimento/:largura/:a/:c/:l/:data/:obs', async (req, res) => {
    const {cod_empr, nome, valor, quantidade, altura, comprimento, largura,a,c,l,data,obs } = req.params; 

    try {
        const resultado = await setProd_fornecedor({cod_empr, nome, valor, quantidade, altura, comprimento, largura, a, c, l,data,obs});
        res.status(201).json({ message: "Produto criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message });
    }
});


app.get('/produto_fornecedor/mostrar/:pesq', async (req, res) => {
    const pesq = req.params.pesq; 
    console.log('Código da empresa:', pesq);
  
    try {
      const resultado = await procurarProd_fornecedor(pesq);
      if (resultado.length > 0) {
        res.status(200).json({ data: resultado });
      } else {
        res.status(404).json({ message: 'Nenhum produto encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao procurar o produto', error: error.message });
    }
  });

app.get('/produto_fornecedor/mostrar_nome/:nome/:cod', async (req, res) => {
    const nome = req.params.nome;
    const cod = req.params.cod;
    console.log(`Nome: ${nome}, Código: ${cod}`);
    
    try {
        const resultado = await getnomeprod_fornecedor({ nome, cod });
        res.status(200).json({ data: resultado });
        console.log("Resultado:", resultado);
        return resultado;
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o produto", error: error.message });
        console.error("Erro:", error.message);
    }
});

app.post('/produto_fornecedor/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; 
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarProd_fornecedor(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
        console.log(resultado)
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o produto", error: error.message });
        console.log("erro")

    }
});

app.post('/produto_fornecedor/deletar', async (req, res) => {
    const { valor, nome} = req.body; 
console.log(valor, nome)
    try {
        const resultado = await delProd_fornecedor(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o produto", error: error.message });
    }
});


app.get('/produto_fornecedor/mostrar_todos', async (req, res) => {
 getProd_fornecedor()
});


//-----------------------------------------------Agenda_fornecedor------------------------------------------------------------\\

app.get('/agenda_fornecedor/:cod/:data_inicio/:data_limite/:obs/:marcacao',async (req, res) => {
    //empresa_Cod_empresa, data, obs
 
    const empresa_Cod_empresa = Number(req.params.cod);
    const data_inicio = req.params.data_inicio;
    const data_limite = req.params.data_limite;
    const obs = req.params.obs;    
    const marcacao = req.params.marcacao;    
   
 
    let setAgenda = { empresa_Cod_empresa, data_inicio, data_limite, obs, marcacao};
     console.log(setAgenda)
    try {
  

        await salvarFornecedor(setAgenda);
        console.log(setAgenda)
        res.status(200).send('Agenda salva com sucesso!');
    } catch (error) {


        console.error('Erro ao salvar agenda:', error);
        res.status(500).send('Erro ao salvar agenda.');
    }
});


app.get('/agenda_fornecedor/mostrar/:cod', async (req, res) => {
    const cod = req.params.cod; 
console.log(cod)
    try {
        const resultado = await mostrarTarefasFornecedor(cod);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar tarefa", error: error.message });
    }
});

//-----------------------------------------------Agenda_empresa------------------------------------------------------------\\

app.get('/agenda_empresa/:cod/:data_inicio/:data_limite/:obs/:marcacao',async (req, res) => {
    //empresa_Cod_empresa, data, obs
 
    const empresa_Cod_empresa = Number(req.params.cod);
    const data_inicio = req.params.data_inicio;
    const data_limite = req.params.data_limite;
    const obs = req.params.obs;    
    const marcacao = req.params.marcacao;    
   
 
    let setAgenda = { empresa_Cod_empresa, data_inicio, data_limite, obs, marcacao};
     console.log(setAgenda)
    try {
  

        await salvar(setAgenda);
        console.log(setAgenda)
        res.status(200).send('Agenda salva com sucesso!');
    } catch (error) {


        console.error('Erro ao salvar agenda:', error);
        res.status(500).send('Erro ao salvar agenda.');
    }
});


app.get('/agenda_empresa/mostrar/:cod', async (req, res) => {
    const cod = req.params.cod; 
console.log(cod)
    try {
        const resultado = await mostrarTarefas(cod);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar tarefa", error: error.message });
    }
});

//-----------------------------------------------Empresa------------------------------------------------------------\\
app.get('/teste', async (req, res) => {
    let cnpj = Number(req.body.cnpj);

    try {
        const count = await validarEmpresa(cnpj);
        if (count == 0) {
            res.send("funciona");
        } else {
            res.send(`Empresa já existente: cnpj(${cnpj}) `);
            console.log(`Empresa já existente: cnpj(${cnpj}) `);
        }
    } catch (error) {
        res.status(500).send('Erro ao validar empresa.');
    }
});

app.get('/empresa/cod/:nome', async (req, res) => {
    const nome = req.params.nome;  
    
    try {
    
      const response = await nomeCod(nome);    
     console.log(response);
      res.json(response);
     
    } catch (error) {
      console.log("Erro ao buscar o cod:", error);
      console.log("Nome:", nome);
      
      res.status(500).send('Erro ao processar o cod');
    }
  });   



app.get('/empresa/imagem/:nome', async (req, res) => {
    const nome = req.params.nome;
    
    
    try {
    
      const response = await procurarImagem_empresa(nome);    

        res.set('Content-type', 'image/jpg');
        res.send(response[0].imagen); 
     
    } catch (error) {
      console.log("Erro ao buscar a imagem:", error);
      console.log("Nome:", nome);
      
      res.status(500).send('Erro ao processar a solicitação');
    }
  });

app.post('/empresa',upload.single('img'), async (req, res) => {

    console.log('teste funciona')
    const Nome_fantasia = req.body.Nome_fantasia;
    const Razao_social = req.body.Razao_social;
    const Email = req.body.Email;
    const CNPJ = Number(req.body.CNPJ);
    const Senha = req.body.Senha;    
    const img = req.file;

    console.log('teste funciona 2')
    
    let emprData = { Nome_fantasia, Razao_social, Email, CNPJ, Senha, img };
     
    try {
    console.log('teste funciona 3')

        await setEmpr(emprData);
        console.log(emprData)
        res.status(200).send('Empresa criada com sucesso!');
    } catch (error) {
    console.log('teste funciona 4')

        console.error('Erro ao criar empresa:', error);
        res.status(500).send('Erro ao criar empresa.');
    }
});


app.get('/empresa/mostrar', async (req, res) => {
    const { what,valor, nome} = req.body; 
console.log(valor, nome)
    try {
        const resultado = await procurar({ what, valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar usuário", error: error.message });
    }
});


app.get('/empresa/mostrar/:what/:valor/:nome', async (req, res) => {
    const what= req.params.what; 
    const valor = req.params.valor; 
    const nome = req.params.nome; 

    try {
       
        const resultado = await procurar({ what, valor, nome});
        const name = resultado.Nome;
    
  
        //res.status(200).json({data:name});
        res.status(200).send({data:name});
     
    } catch (error) {

        res.status(500).json({ message: "Erro ao procurar empresa no servidor", error: error.message });
    }
});


app.get('/empresa/mostrar_todos', async (req, res) => {
    try {
      const empresas = await getEmpresa();  
      console.log('Empresas encontrados:', empresas); 
      res.status(200).json(usuarios);  
    } catch (error) {
      console.error('Erro ao buscar todos as empresas:', error);
      res.status(500).json({ message: "Erro ao buscar todos as empresas", error: error.message });
    }
  });


  app.get('/empresa/logar/:nome/:cnpj/:senha', async (req, res) => {
    const nome = req.params.nome;
    const cnpj = Number(req.params.cnpj);
    const senha = req.params.senha;

    if (!nome || !cnpj || !senha) {
        return res.status(400).json({ message: 'Parâmetros inválidos' });
    }

    let envio = { nome, cnpj, senha };

    try {
        const teste = await login_empresa(envio.nome, envio.cnpj, envio.senha);
        console.log(envio)
        if (teste == 1) {
            return res.status(200).json(1);
        }
        else{
            return res.status(200).json(0)
        }
    } 
    catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
});
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


// app.get('/imagem/:cod', async (req, res) => {
//     const cod = req.params.cod;
//     try {
//         const response = await pegarImg(cod); 
//         if (response && response.imagen) {

//             res.set('Content-type','image/jpg');
//             res.send(response.imagen); 
//         } else {
//             res.status(404).send('Imagem não encontrada.');
//         }
//     } catch (error) {
//         res.status(500).send('Erro ao buscar a imagem.');
//     }
// });

app.get('/usuario/imagem/:nome/:cod', async (req, res) => {
    const nome = req.params.nome;
    const cod = req.params.cod;
    
    try {
    
      const response = await procurarImagem_nome_cod(nome, cod);    
      
    
        res.set('Content-type', 'image/jpg');
        res.send(response[0].imagen); 
     
    } catch (error) {
      console.log("Erro ao buscar a imagem:", error);
      console.log("Cod:", cod);
      console.log("Nome:", nome);
      
      res.status(500).send('Erro ao processar a solicitação');
    }
  });

app.post('/usuario',upload.single('imagem'), async (req, res) => {
    console.log('teste funciona')
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const img = req.file;
    const cod = Number(req.body.cod);
    console.log('teste funciona 2')
    
    let userData = { nome, email, senha, cpf, cod, img };
     
    try {
    console.log('teste funciona 3')

        await setUser(userData);
        console.log(userData)
        res.status(200).send('Usuário criado com sucesso!');
    } catch (error) {
    console.log('teste funciona 4')

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


app.get('/usuario/mostrar/:what/:valor/:nome', async (req, res) => {
    const what= req.params.what; 
    const valor = req.params.valor; 
    const nome = req.params.nome; 

    try {
       
        const resultado = await procurar({ what, valor, nome});
        const name = resultado.Nome;
    
  
        //res.status(200).json({data:name});
        res.status(200).send({data:name});
     
    } catch (error) {

        res.status(500).json({ message: "Erro ao procurar usuário no servidor", error: error.message });
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
//------------------------------------------Produto_quantidade---------------------------------------------------\\
app.post('/produto_quantidade/:cod_empr/:nome/:valor/:quantidade/:data/:obs', async (req, res) => {
    const {cod_empr, nome, valor, quantidade,data, obs} = req.params; 

    try {
        const resultado = await setProd_quantidade({cod_empr, nome, valor, quantidade,data, obs});
        res.status(201).json({ message: "Produto criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message });
    }
});


app.get('/produto_quantidade/mostrar/:pesq', async (req, res) => {
    const pesq = req.params.pesq;  
    console.log('Código da empresa:', pesq);
  
    try {
      const resultado = await procurarProd_quantidade(pesq);
      if (resultado.length > 0) {
        res.status(200).json({ data: resultado });
      } else {
        res.status(404).json({ message: 'Nenhum produto encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao procurar o produto', error: error.message });
    }
  });


  app.get('/produto_quantidade/mostrar_nome/:nome/:cod', async (req, res) => {
    const nome = req.params.nome;
    const cod = req.params.cod;
    console.log(`Nome: ${nome}, Código: ${cod}`);
    
    try {
        const resultado = await getnomeprod_quantidade({ nome, cod });
        res.status(200).json({ data: resultado });
        console.log("Resultado:", resultado);
        return resultado;
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o produto", error: error.message });
        console.error("Erro:", error.message);
    }
});


//-----------------------------------------------Produto---------------------------------------------------------\\
app.post('/produto/:nome/:valor/:quantidade/:cod_empr/:altura/:comprimento/:largura/:a/:c/:l/:data/:obs', async (req, res) => {
    const { nome, valor, quantidade, cod_empr, altura, comprimento, largura,a,c,l,data,obs } = req.params; 

    try {
        const resultado = await setProd({ nome, valor, quantidade, cod_empr, altura, comprimento, largura, a, c, l,data,obs});
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


//-----------------------------------------------Cargo--------------------------------------------------------\\

app.post('/cargo/:Empresa_Cod_empresa/:Nome/:Salario/:Equipe/:fluxo_caixa/:servicos/:orcamentos/:estoque', async (req, res) => {
    const {Empresa_Cod_empresa, Nome, Salario, Equipe, fluxo_caixa, servicos, orcamentos, estoque} = req.params;
    console.log(req.params)
    try {
        const resultado = await setCarg({Empresa_Cod_empresa, Nome, Salario, Equipe, fluxo_caixa, servicos, orcamentos, estoque});
        res.status(201).json({ message: "Cargo criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o cargo", error: error.message });
    }
});


app.get('/cargo/mostrar/:cod', async (req, res) => {
    const {cod} = req.params;
console.log("codigo:", cod)
    try {
        const resultado = await procurarCargo({cod});
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
app.post('/funcionario',upload.single('foto'), async (req, res) => {
//Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha 
    console.log('teste funciona')
    const Nome = req.body.Nome;
    const Telefone = Number(req.body.Telefone);
    const Email = req.body.Email;
    const CPF = Number(req.body.CPF);
    const senha = req.body.senha;    
    const foto = req.file;
    const Cod_empresa = Number(req.body.Cod_empresa);
    const Cod_cargo = Number(req.body.Cod_cargo);
  
    let funcData = {Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha};
     
    try {

        await setFunc(funcData);
        console.log(funcData)
        res.status(200).send('Funcionário criada com sucesso!');
    } catch (error) {

        console.error('Erro ao criar funcionário:', error);
        res.status(500).send('Erro ao criar funcionário.');
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

app.get('/funcionario/mostrarCod/:cod/:nome', async (req, res) => {
    const { cod, nome} = req.params;
console.log(cod, nome)
    try {
        const resultado_inicio = await procurarCodCargo({ cod, nome});
        const resultado = await resultado_inicio.Cod_cargo;

        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o codigo do cargo", error: error.message });
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
