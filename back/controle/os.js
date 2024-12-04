
import { conexao } from "../conexao.js";

const con = await conexao();

export const getOs = async () => {
    try {
        const sql = "SELECT * FROM cargo";
        const rows = await con.query(sql);
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_user", error);
        res.status(500).json({ error: "Erro ao obter os cargos" });
    }
};

export const setOs = async ({empresa_Cod_empresa, Obs, Cod_os, Data_inicio, Data_fim, Fornecedor, Cliente, valor, estado}) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
            'INSERT INTO os (empresa_Cod_empresa, Obs, Cod_os, Data_inicio, Data_fim, Fornecedor, Cliente, valor,estado)VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)',
            [empresa_Cod_empresa, Obs, Cod_os, Data_inicio, Data_fim, Fornecedor, Cliente, valor]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        throw error;
    }
};


export const delOs = async(valor,nome)=>{
    try{
const sql = `DELETE FROM cargo WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarOS = async ({cod}) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT Nome FROM cargo WHERE Empresa_Cod_empresa = ?`,
            [cod]
        );
        console.log("cod",cod)
        console.log(rows)
        return rows;
    } catch (error) {
        console.error('Erro ao procurar o cargo:', error.message);
        throw error;
    }
};

export const procurarCodOS = async ({cod, nome}) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT Cod_cargo FROM cargo WHERE Empresa_Cod_empresa = ? && Nome = ?`,
            [cod, nome]
        );
        console.log("cod",cod)
        console.log(rows[0])
        return rows[0];
    } catch (error) {
        console.error('Erro ao procurar o cargo:', error.message);
        throw error;
    }
};
// export const procurarOs = async ({cod, nome}) => {
//     const con = await conexao();
//     try {
//         const [rows] = await con.query(
//             `SELECT Salario FROM cargo WHERE Empresas_Cod_empresa = ? && Nome = ?`,
//             [cod, nome]
//         );
//         return rows;
//     } catch (error) {
//         console.error('Erro ao procurar o cargo:', error.message);
//         throw error;
//     }
// };
export const atualizarOS = async(valor, nome, ent, tipo)=>{

    try{
const sql = `UPDATE cargo SET ${valor} = ? where ${nome} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Cargo atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

