import { conexao } from "../conexao.js";

const con = await conexao(); 

export const validarEmpresa = async (cnpj) => {
    const validar = 'SELECT COUNT(Cod_empresa) AS count FROM empresa WHERE CNPJ = ?';

        const [results] = await con.query(validar, [cnpj]);
        const count = results[0].count; 
        console.log(count);
        return count; 


}
export const nomeCod = async (nome) => {
    const validar = 'SELECT Cod_empresa FROM empresa WHERE Nome_fantasia = ?';

        const [results] = await con.query(validar, [nome]);
        const count = results[0].count; 
        console.log(count);
        return count; 
}


export const login_empresa = async (nome, cnpj, senha) => {
 
    try {
        const sql = "SELECT * FROM empresa";
        const rows = await con.query(sql); 
        
        let a;
let b = 0;


       for(a = 0; a < rows[0].length ;a++){

      if(rows[0][a].Razao_social == nome && rows[0][a].CNPJ == cnpj && rows[0][a].Senha == senha){
       
    return 1;
      }
       }

    } catch (error) {
        console.error("Erro no select_user", error);
      
    }
}

export const getEmpresa = async (res) => {
    try {
        const sql = "SELECT * FROM empresa";
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
export const setEmpr = async ({ Nome_fantasia, Razao_social, Email, CNPJ, Senha, img }) => {
    const con = await conexao();
   
    try {
        const imagen = img.buffer;
        const [result] = await con.execute(
            'INSERT INTO empresa (Nome_fantasia, Razao_social, Email, CNPJ, Senha, imagen) VALUES (?,?,?,?,?,?)',
            [ Nome_fantasia, Razao_social, Email, CNPJ, Senha, imagen]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir empresa:', error.message);
        console.error("Nome_fantasia: ",Nome_fantasia, "Razão social: ",Razao_social, "Email: ",Email, "CNPJ: ",CNPJ, "Senha: ",Senha, "Imagem:",imagen);
        throw error;
    } 
};

export const delEmpr = async(valor,nome)=>{
    try{
const sql = `DELETE FROM cliente WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarEmp = async (what) => {
    const con = await conexao();    

    try
    {
       
        const [rows] = await con.query(`SELECT ${what.what} FROM empresa WHERE ${what.valor} = ?`,[what.nome]);   
   
        return rows[0];
        
    } 
            catch (error) {
                console.error('Erro ao procurar empresa:', error.message)
           
            throw error;
        }
};

export const procurarImagem_empresa = async (nome) => {
    const con = await conexao();    
    try
    {
        const [rows] = await con.query(
            `SELECT imagen FROM empresa WHERE Razao_social = ?`,
        [nome]
    );       
        return rows;
    } 
            catch (error) {
                console.error('Erro ao procurar empresa:', error.message);
            throw error;
        }
};

export const qtd_empresa = async () => {
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

