import { conexao } from "../conexao.js";

const con = await conexao(); 

export const validarFornecedor = async (cnpj) => {
    const validar = 'SELECT COUNT(cod) AS count FROM fornecedor WHERE cnpj = ?';

        const [results] = await con.query(validar, [cnpj]);
        const count = results[0].count; 
        console.log(count);
        return count; 

}
export const nomeCod_fornecedor = async (rs) => {
    const validar = 'SELECT cod FROM fornecedor WHERE razao_social = ?';

        const results = await con.query(validar, [rs]);
        const count = results; 
    
        return count[0][0].cod; 
}


export const login_fornecedor = async (rs, cnpj, senha) => {
 
    try {
        const sql = "SELECT * FROM fornecedor";
        const rows = await con.query(sql); 
        
        let a;
let b = 0;


       for(a = 0; a < rows[0].length ;a++){

      if(rows[0][a].razao_social == rs && rows[0][a].cnpj == cnpj && rows[0][a].senha == senha){
       
    return 1;
      }
       }

    } catch (error) {
        console.error("Erro no select_user", error);
      
    }
}

export const getFornecedor = async (res) => {
    try {
        const sql = "SELECT * FROM fornecedor";
        const [rows] = await con.query(sql); 
        console.log("Consulta realizada com sucesso");
        return rows;
    } catch (error) {
        console.error("Erro no select_user", error);
        if (res) {
            res.status(500).json({ error: "Erro ao obter fornecedor" });
        } else {
            throw error;
        }
    }
};



export const setForn = async ({ razao_social, nome_fantasia, cnpj, telefone,  cep, email, estado, cidade, bairro, senha, img }) => {
    const con = await conexao();
   
    try {
        const imagen = img.buffer;
        const [result] = await con.execute(
            'INSERT INTO fornecedor (razao_social, nome_fantasia, cnpj, telefone,  cep, email, estado, cidade, bairro, senha, imagen) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [ razao_social, nome_fantasia, cnpj, telefone,  cep, email, estado, cidade, bairro, senha, imagen ]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir fornecedor:', error.message);
        console.error({razao_social, nome_fantasia, cnpj, telefone,  cep, email, estado, cidade, bairro, senha, imagen});
        throw error;
    } 
};

export const delForn = async(valor,nome)=>{
    try{
const sql = `DELETE FROM fornecedor WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarForn = async (what) => {
    const con = await conexao();    

    try
    {
       
        const [rows] = await con.query(`SELECT ${what.what} FROM fornecedor WHERE ${what.valor} = ?`,[what.nome]);   
   
        return rows[0];
        
    } 
            catch (error) {
                console.error('Erro ao procurar fornecedor:', error.message)
           
            throw error;
        }
};

export const procurarImagem_fornecedor = async (nome) => {
    const con = await conexao();    
    try
    {
        const [rows] = await con.query(
            `SELECT imagen FROM fornecedor WHERE razao_social = ?`,
        [nome]
    );       
        return rows;
    } 
            catch (error) {
                console.error('Erro ao procurar fornecedor:', error.message);
            throw error;
        }
};

export const qtd_forn = async () => {
    const con = await conexao();

        const [rows] = await con.query('SELECT COUNT(cod) AS count FROM fornecedor');
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

