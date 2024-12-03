import { conexao } from "../conexao.js";

const con = await conexao();

export const getProd_quantidade = async () => {
    try {
        const sql = "SELECT * FROM Produto_quantidade";
        const [rows] = await con.query(sql); 
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_Prod", error);
        res.status(500).json({ error: "Erro ao obter os produtos" });
    }
};
export const getnomeprod_quantidade = async ({ nome, cod }) => {
    try {
        const sql = "SELECT * FROM Produto_quantidade WHERE Nome = ? AND Empresa_Cod_empresa = ?";
        const [rows] = await con.query(sql, [nome, cod]);
        return rows;
    } catch (error) {
        console.error("Erro no select_Prod", error);
        throw new Error("Erro ao obter os produtos");
    }
};

export const setProd_quantidade = async ({cod_empr, nome, valor, quantidade, data, obs, cod_compra, fornecedor}) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
            'INSERT INTO Produto_quantidade ( Empresa_Cod_empresa,Nome, Valor, Quantidade, Data, observacao, cod_compra, fornecedor)VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [ cod_empr, nome, valor, quantidade, data, obs, cod_compra, fornecedor  ]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir produto:', error.message);
        console.log(nome, valor, quantidade,cod_empr,data)
        throw error;
    }
};


export const delProd_quantidade = async(valor,nome)=>{
    try{
const sql = `DELETE FROM Produto_quantidade WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("Produto deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarProd_quantidade = async (nome) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM Produto_quantidade WHERE Empresa_Cod_empresa = ?`,
            [nome]
           
        );

        return rows;
    } catch (error) {
        console.error('Erro ao procurar produto:', error.message);
        throw error;
    }
};

export const procurarProdcod_quantidade = async (Cod_empresa, Cod_produto) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECt  * FROM Produto_quantidade WHERE Empresa_Cod_empresa = ? && Cod_produto = ?`,
            [Cod_empresa, Cod_produto]
           
        );

        return rows;
    } catch (error) {
        console.error('Erro ao procurar produto:', error.message);
        throw error;
    }
};

export const atualizarProd_quantidade = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE Produto_quantidade SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Produto atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}
