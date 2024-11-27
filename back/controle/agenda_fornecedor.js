import { conexao } from "../conexao.js";

const con = await conexao(); 


export const salvarFornecedor = async ({empresa_Cod_empresa, data_inicio, data_limite , obs, marcacao}) => {
    const con = await conexao();
   console.log(empresa_Cod_empresa, data_inicio, data_limite , obs, marcacao)
    try {
      
        const [result] = await con.execute(
            'INSERT INTO agenda_fornecedor (fornecedor_cod, Data, obs, marcacao, data_limite) VALUES (?,?,?,?,?)',
            [ empresa_Cod_empresa, data_inicio, obs, marcacao, data_limite]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir tarefa:', error.message);
        console.error({"codigo da empresa": empresa_Cod_empresa, "Data": data, "Dados": obs});
        throw error;
    } 
};

export const DeletarFornecedor = async(valor,nome)=>{
    try{
const sql = `DELETE FROM agenda_fornecedor WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const mostrarTarefasFornecedor = async (cod) => {
    const con = await conexao();    

    try
    {
       
        const [rows] = await con.query(`SELECT * FROM agenda_fornecedor WHERE fornecedor_cod = ?`,[cod]);   
   
        return rows;
        
    } 
            catch (error) {
                console.error('Erro ao procurar dados:', error.message)
           
            throw error;
        }
};


export const atualizarAgendaFornecedor = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE agenda_fornecedor SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("usuário atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

