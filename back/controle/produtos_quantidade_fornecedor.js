import { conexao } from "../conexao.js";

const con = await conexao();

export const getProd_quantidade_fornecedor = async () => {
    try {
        const sql = "SELECT * FROM produto_quantidade_fornecedor";
        const [rows] = await con.query(sql); 
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_Prod", error);
        res.status(500).json({ error: "Erro ao obter os produtos" });
    }
};
export const getnomeprod_quantidade_fornecedor = async ({ nome, cod }) => {
    try {
        const sql = "SELECT * FROM produto_quantidade_fornecedor WHERE Nome = ? AND fornecedor_cod = ?";
        const [rows] = await con.query(sql, [nome, cod]);
        return rows;
    } catch (error) {
        console.error("Erro no select_Prod", error);
        throw new Error("Erro ao obter os produtos");
    }
};

export const getcod_nome_a = async ({ cod }) => {
    try {
        const sql = "SELECT * FROM produto_quantidade_fornecedor WHERE fornecedor_cod = ?";
        const [rows] = await con.query(sql, [cod]);
        return rows;
    } catch (error) {
        console.error("Erro no select_Prod", error);
        throw new Error("Erro ao obter os produtos");
    }
};

export const setProd_quantidade_fornecedor = async ({cod_empr, nome, valor, quantidade, data, obs}) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
            'INSERT INTO produto_quantidade_fornecedor ( fornecedor_cod,Nome, Valor, Quantidade, Data, observacao)VALUES (?, ?, ?, ?, ?, ?)',
            [ cod_empr, nome, valor, quantidade, data, obs ]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir produto:', error.message);
        console.log(nome, valor, quantidade,cod_empr,data)
        throw error;
    }
};


export const delProd_quantidade_fornecedor = async(valor,nome)=>{
    try{
const sql = `DELETE FROM produto_quantidade_fornecedor WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("Produto deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarProd_quantidade_fornecedor = async (nome) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM produto_quantidade_fornecedor WHERE fornecedor_cod = ?`,
            [nome]
           
        );

        return rows;
    } catch (error) {
        console.error('Erro ao procurar produto:', error.message);
        throw error;
    }
};


export const procurarProdQuantidadenome_fornecedor = async (cod, nome) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECt  * FROM produto_quantidade_fornecedor WHERE fornecedor_cod = ? && Nome = ?`,
            [cod, nome]
           
        );

        return rows;
    } catch (error) {
        console.error('Erro ao procurar produto:', error.message);
        throw error;
    }
};

export const procurarProdcod_quantidade_fornecedor = async (Cod_empresa, Cod_produto) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECt  * FROM produto_quantidade_fornecedor WHERE fornecedor_cod = ? && Cod_produto = ?`,
            [Cod_empresa, Cod_produto]
           
        );

        return rows;
    } catch (error) {
        console.error('Erro ao procurar produto:', error.message);
        throw error;
    }
};

export const atualizarProd_quantidade_fornecedor = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE produto_quantidade_fornecedor SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Produto atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}
