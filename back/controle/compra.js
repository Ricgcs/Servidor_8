
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

export const setCompra = async ({fornecedor_cod, empresa_Cod_empresa, data, valorTotal}) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
            'INSERT INTO compras (fornecedor_cod, empresa_Cod_empresa, data, valor_total)VALUES (?, ?, ?, ?)',
            [fornecedor_cod, empresa_Cod_empresa, data,valorTotal]
            
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir compra:', error.message);
        throw error;
    }
};


export const procCompraHora = async (empresa_Cod_empresa, data) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
            'select cod_compras from compras where empresa_Cod_empresa = ? and data = ?',
            [empresa_Cod_empresa, data]
            
        );
        return result;
    } catch (error) {
        console.error('Erro ao procurar compra:', error.message);
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

export const procurarCompra_empresa = async ({cod}) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM compras WHERE Empresa_Cod_empresa = ?`,
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

export const procurarPedido_fornecedor = async ({cod}) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM compras WHERE fornecedor_cod = ?`,
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

export const procurarCodCargo = async ({cod, nome}) => {
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
export const procurarSalario = async ({cod, nome}) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT Salario FROM cargo WHERE Empresas_Cod_empresa = ? && Nome = ?`,
            [cod, nome]
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

