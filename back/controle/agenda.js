import { conexao } from "../conexao.js";

const con = await conexao(); 


export const salvar = async ({empresa_Cod_empresa, data, obs, nome}) => {
    const con = await conexao();
   
    try {
      
        const [result] = await con.execute(
            'INSERT INTO agenda_empresa (empresa_Cod_empresa, data, obs, nome) VALUES (?,?,?,?)',
            [ empresa_Cod_empresa, data, obs, nome]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir empresa:', error.message);
        console.error({"codigo da empresa": empresa_Cod_empresa, "Data": data, "Dados": obs});
        throw error;
    } 
};

export const Deletar = async(valor,nome)=>{
    try{
const sql = `DELETE FROM agenda_empresa WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const mostrarTarefas = async (cod) => {
    const con = await conexao();    

    try
    {
       
        const [rows] = await con.query(`SELECT * FROM agenda_empresa WHERE empresa_Cod_empresa = ?`,[cod]);   
   
        return rows;
        
    } 
            catch (error) {
                console.error('Erro ao procurar dados:', error.message)
           
            throw error;
        }
};


export const atualizarAgenda = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE agenda_empresa SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("usuário atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

