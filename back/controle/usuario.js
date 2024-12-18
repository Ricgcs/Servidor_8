import { conexao } from "../conexao.js";

const con = await conexao(); 

export const validarUser = async (codigo_empresa, cpf) => {
    const validar = 'SELECT COUNT(Nome) AS count FROM cliente WHERE Empresa_Cod_empresa = ? AND CPF = ?';

        const [results] = await con.query(validar, [codigo_empresa, cpf]);
        const count = results[0].count; 
        console.log(count);
        return count; 
}



export const login = async (cod, nome, senha) => {
 
    try {
        const sql = "SELECT * FROM cliente";
        const rows = await con.query(sql); 
        
        let a;
let b = 0;


       for(a = 0; a < rows[0].length ;a++){

      if(rows[0][a].Empresa_Cod_empresa == cod && rows[0][a].Nome == nome && rows[0][a].Senha == senha){
       
    return 1;
      }
       }

    } catch (error) {
        console.error("Erro no select_user", error);
      
    }
}

export const getUser = async (res) => {
    try {
        const sql = "SELECT * FROM cliente";
        const [rows] = await con.query(sql); 
        console.log("Consulta realizada com sucesso");
        return rows;
    } catch (error) {
        console.error("Erro no select_user", error);
        if (res) {
            res.status(500).json({ error: "Erro ao obter usuários" });
        } else {
            throw error;
        }
    }
};

export const getNomeUser = async (cod) => {
    try {
        const sql = "SELECT Nome FROM cliente where Empresa_Cod_empresa = ?";
        const [rows] = await con.query(sql,[cod]); 
        console.log("Consulta realizada com sucesso");
        return rows;
    } catch (error) {
        console.error("Erro no select_user", error);
        if (res) {
            res.status(500).json({ error: "Erro ao obter usuários" });
        } else {
            throw error;
        } 
    }
};

export const setUser = async ({ nome, email, senha, cpf, cod, img }) => {
    const con = await conexao();
    console.log(cod)
    try {
        const imagem = img.buffer;
        const [result] = await con.execute(
            'INSERT INTO cliente (Nome, Email, Senha, CPF, Empresa_Cod_empresa, imagen ) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, email, senha, cpf, cod, imagem]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        console.error("Nome: " + nome, "Email: " + email, "Senha: " + senha, "CPF: " + cpf, "Empresa: " + cod);
        throw error;
    } 
};


export const avaliacao = async ({ nome, sugestao, nota, profissao }) => {
    const con = await conexao();

    try {
        const [result] = await con.execute(
            'INSERT INTO sugestoes (nome, sugestao, avaliacao, profissao) VALUES (?, ?, ?, ?)',
            [nome, sugestao, nota, profissao] 
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        console.error("Nome: " + nome, "Sugestão: " + sugestao, "Avaliação: " + avaliacao_number, "Profissão: " + profissao);
        throw error;
    }
};

export const delUser = async(valor,nome)=>{
    try{
const sql = `DELETE FROM cliente WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurar = async (what) => {
    const con = await conexao();    

    try
    {
       
        const [rows] = await con.query(`SELECT ${what.what} FROM cliente WHERE ${what.valor} = ?`,[what.nome]);   
   
        return rows[0];
        
    } 
            catch (error) {
                console.error('Erro ao procurar usuário:', error.message)
           
            throw error;
        }
};

export const procurarImagem_nome_cod = async (nome,cod) => {
    const con = await conexao();    
    try
    {
        const [rows] = await con.query(
            `SELECT imagen FROM cliente WHERE Nome = ? && Empresa_Cod_empresa = ?`,
        [nome,cod]
    );       
        return rows;
    } 
            catch (error) {
                console.error('Erro ao procurar usuário:', error.message);
            throw error;
        }
};

export const qtd_clientes = async () => {
    const con = await conexao();

        const [rows] = await con.query('SELECT COUNT(Nome) AS count FROM cliente');
        const count = rows[0].count;
        return count;
   
};


export const atualizar = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE cliente SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("usuário atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

