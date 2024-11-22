import { conexao } from "../conexao.js";

const con = await conexao();

export const getProd = async () => {
    try {
        const sql = "SELECT * FROM Produto";
        const [rows] = await con.query(sql); 
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_Prod", error);
        res.status(500).json({ error: "Erro ao obter os produtos" });
    }
};
export const getnomeprod = async ({ nome, cod }) => {
    try {
        const sql = "SELECT * FROM Produto WHERE Nome = ? AND Empresa_Cod_empresa = ?";
        const [rows] = await con.query(sql, [nome, cod]);
        return rows;
    } catch (error) {
        console.error("Erro no select_Prod", error);
        throw new Error("Erro ao obter os produtos");
    }
};

export const setProd = async ({cod_fonrn,valor , quantidade,cod_empr ,fornecedor ,altura, comprimento, largura, a, c, l, data, icms, cofins, ipi, pis, estado}) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
        'INSERT INTO compras_medidas (Cod_produto, fornecedor_cod, produto_fornecedor_Cod_produto, Empresa_Cod_empresa, Fornecedor, Altura, si_altura, Comprimento, si_comprimento, Largura, si_largura, Quantidade, Valor, Data, ICMS, COFINS, IPI, PIS, estado)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cod_fonrn,valor , quantidade,cod_empr ,fornecedor ,altura, comprimento, largura, a, c, l, data, icms, cofins, ipi, pis, estado]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir compra:', error.message);
        console.log(cod_fonrn,valor , quantidade,cod_empr ,fornecedor ,altura, comprimento, largura, a, c, l, data, icms, cofins, ipi, pis, estado)
        throw error;
    }
};


export const delProd = async(valor,nome)=>{
    try{
const sql = `DELETE FROM Produto WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("Produto deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarProd = async (nome) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM compras_medidas WHERE Empresa_Cod_empresa = ?`,
            [nome]
           
        );

        return rows;
    } catch (error) {
        console.error('Erro ao procurar compra:', error.message);
        throw error;
    }
};

export const procurarProdcod = async (Cod_empresa, Cod_produto) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECt  * FROM compras_medidas WHERE Empresa_Cod_empresa = ? && Cod_produto = ?`,
            [Cod_empresa, Cod_produto]
           
        );

        return rows;
    } catch (error) {
        console.error('Erro ao procurar produto:', error.message);
        throw error;
    }
};

export const atualizarProd = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE Produto SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Produto atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}
