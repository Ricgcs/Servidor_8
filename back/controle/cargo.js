
import { conexao } from "../conexao.js";

const con = await conexao();

export const getCarg = async () => {
    try {
        const sql = "SELECT * FROM cargo";
        const rows = await con.query(sql);
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_user", error);
        res.status(500).json({ error: "Erro ao obter os cargos" });
    }
};

export const setCarg = async ({Empresa_Cod_empresa, Nome, Salario, Equipe, fluxo_caixa, servicos, orcamentos, estoque}) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
            'INSERT INTO cargo (Empresa_Cod_empresa, Nome, Salario, Equipe, fluxo_caixa, servicos, orcamentos, estoque)VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [Empresa_Cod_empresa, Nome, Salario, Equipe, fluxo_caixa, servicos, orcamentos, estoque]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        throw error;
    }
};


export const delCarg = async(valor,nome)=>{
    try{
const sql = `DELETE FROM cargo WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarCargo = async ({cod}) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT Nome FROM cargo WHERE Empresas_Cod_empresa = ?`,
            [cod]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao procurar o cargo:', error.message);
        throw error;
    }
};
export const atualizarCargo = async(valor, nome, ent, tipo)=>{

    try{
const sql = `UPDATE cargo SET ${valor} = ? where ${nome} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Cargo atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

