import { conexao } from "../conexao.js";

const con = await conexao(); 


export const salvarlista = async (cod, pesq) => {
    const con = await conexao();
   console.log(cod, pesq)
    try {
      
        const [result] = await con.execute(
            'INSERT INTO lista_fornecedores (fornecedor_cod, empresa_Cod_empresa) VALUES (?,?)',
            [ cod, pesq ]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir tarefa:', error.message);
        console.error({"codigo da empresa": empresa_Cod_empresa, "Data": fornecedor_cod});
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

export const mostrarLista = async (cod) => {
    const con = await conexao();    

    try
    {
       
        const [rows] = await con.query(`SELECT fornecedor_cod FROM lista_fornecedores WHERE empresa_Cod_empresa = ?`,[cod]);   
   
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

