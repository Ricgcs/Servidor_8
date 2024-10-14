import { conexao } from "../conexao.js";

const con = await conexao(); 

export const getEmpresa = async () => {
    try {
        const sql = "SELECT * FROM Empresa";
        const rows = await con.query(sql);
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_empresa", error);
        res.status(500).json({ error: "Erro ao obter as empresas" });
    }
};

export const setEmpr = async (Nome, RS, Email, CNPJ, Senha, Imagen) => {
    const con = await conexao(); 
    const img = Imagen ? Imagen.buffer : null;  // Corrija o tratamento da imagem

    console.log("Imagem enviada:", Imagen);

    try {
        const [result] = await con.execute(
            'INSERT INTO Empresa (Nome_fantasia, Razao_social, Email, CNPJ, Senha, Imagen) VALUES (?, ?, ?, ?, ?, ?)',
            [Nome, RS, Email, CNPJ, Senha, img]  // Agora a imagem é o 6º parâmetro
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir a empresa:', error.message);
        throw error;
    }
};


export const delEmpr = async(valor,nome)=>{
    try{
const sql = `DELETE FROM Empresa WHERE ? = ?`
const envio = await con.query(sql,valor,nome)
console.log("Empresa deletada com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarEmp = async ({ proc, valor, nome }) => {
    const con = await conexao();
   
    try {
        let sql = `SELECT ${proc} FROM Empresa WHERE ${valor} = ?`;

        const [rows] = await con.query(sql,[nome]);
        return rows[0][proc];
    } catch (error) {
        console.error('Erro ao procurar empresa:', error.message,`valor:${valor}`);
        
        throw error;
    }
};

export const pegarImg = async(cod) =>{
    const con = await conexao();
    let sql = "SELECT imagen FROM Empresa WHERE Cod_empresa = ?"
    const [rows] = await con.query(sql,cod);
    return rows[0]

}


export const atualizarEmp = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE Empresa SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Empresa atualizada",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}


