-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`empresa` (
  `Cod_empresa` INT NOT NULL AUTO_INCREMENT,
  `Nome_fantasia` VARCHAR(120) NOT NULL,
  `Razao_social` VARCHAR(120) NOT NULL,
  `Email` VARCHAR(120) NOT NULL,
  `CNPJ` INT NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `Imagen` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cliente` (
  `Cod_cliente` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(120) NOT NULL,
  `Email` VARCHAR(120) NOT NULL,
  `Senha` VARCHAR(20) NOT NULL,
  `CPF` INT NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  `imagen` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_cliente`),
  INDEX `fk_Cliente_Empresa_idx` (`Empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_Cliente_Empresa`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`agenda_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`agenda_cliente` (
  `Cod_agenda` INT NOT NULL AUTO_INCREMENT,
  `cliente_Cod_cliente` INT NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  `Data` DATE NOT NULL,
  `obs` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`Cod_agenda`, `cliente_Cod_cliente`),
  INDEX `fk_Agenda_empresa_copy1_cliente1_idx` (`cliente_Cod_cliente` ASC)  ,
  CONSTRAINT `fk_Agenda_empresa_copy1_cliente1`
    FOREIGN KEY (`cliente_Cod_cliente`)
    REFERENCES `mydb`.`cliente` (`Cod_cliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`agenda_empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`agenda_empresa` (
  `Cod_agenda` INT NOT NULL AUTO_INCREMENT,
  `empresa_Cod_empresa` INT NOT NULL,
  `Data` DATETIME NOT NULL,
  `obs` VARCHAR(300) NOT NULL,
  `marcacao` VARCHAR(255) NOT NULL,
  `Data_limite` DATETIME NOT NULL,
  PRIMARY KEY (`Cod_agenda`),
  INDEX `fk_Agenda_empresa_empresa1_idx` (`empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_Agenda_empresa_empresa1`
    FOREIGN KEY (`empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`fornecedor` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(45) NOT NULL,
  `nome_fantasia` VARCHAR(45) NOT NULL,
  `cnpj` INT NOT NULL,
  `telefone` INT NOT NULL,
  `cep` INT NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `estado` VARCHAR(60) NOT NULL,
  `cidade` VARCHAR(60) NOT NULL,
  `bairro` VARCHAR(60) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `imagen` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`agenda_fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`agenda_fornecedor` (
  `Cod_agenda` INT NOT NULL AUTO_INCREMENT,
  `fornecedor_cod` INT NOT NULL,
  `Data` DATETIME NOT NULL,
  `obs` VARCHAR(300) NOT NULL,
  `marcacao` VARCHAR(255) NOT NULL,
  `Data_limite` DATETIME NOT NULL,
  PRIMARY KEY (`Cod_agenda`, `fornecedor_cod`),
  INDEX `fk_agenda_fornecedor_fornecedor1_idx` (`fornecedor_cod` ASC)  ,
  CONSTRAINT `fk_agenda_fornecedor_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cargo` (
  `Cod_cargo` INT NOT NULL AUTO_INCREMENT,
  `Empresa_Cod_empresa` INT NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  `Salario` VARCHAR(45) NOT NULL,
  `Equipe` TINYINT NOT NULL,
  `fluxo_caixa` TINYINT NULL DEFAULT NULL,
  `servicos` TINYINT NULL DEFAULT NULL,
  `orcamentos` TINYINT NULL DEFAULT NULL,
  `estoque` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_cargo`),
  INDEX `fk_cargo_Empresa1_idx` (`Empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_cargo_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`funcionario` (
  `Cod_funcionario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(120) NOT NULL,
  `Email` VARCHAR(120) NOT NULL,
  `Telefone` INT NOT NULL,
  `foto` VARCHAR(120) NOT NULL,
  `CPF` INT NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  `cargo_Cod_cargo` INT NOT NULL,
  `senha` VARCHAR(35) NOT NULL,
  PRIMARY KEY (`Cod_funcionario`),
  INDEX `fk_funcionario_Empresa1_idx` (`Empresa_Cod_empresa` ASC)  ,
  INDEX `fk_funcionario_cargo1_idx` (`cargo_Cod_cargo` ASC)  ,
  CONSTRAINT `fk_funcionario_cargo1`
    FOREIGN KEY (`cargo_Cod_cargo`)
    REFERENCES `mydb`.`cargo` (`Cod_cargo`),
  CONSTRAINT `fk_funcionario_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`agenda_funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`agenda_funcionario` (
  `Cod_agenda` INT NOT NULL AUTO_INCREMENT,
  `funcionario_Cod_funcionario` INT NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  `Data` DATE NOT NULL,
  `obs` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`Cod_agenda`, `funcionario_Cod_funcionario`),
  INDEX `fk_Agenda_funcionario_funcionario1_idx` (`funcionario_Cod_funcionario` ASC)  ,
  CONSTRAINT `fk_Agenda_funcionario_funcionario1`
    FOREIGN KEY (`funcionario_Cod_funcionario`)
    REFERENCES `mydb`.`funcionario` (`Cod_funcionario`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`compras` (
  `cod_compras` INT NOT NULL AUTO_INCREMENT,
  `fornecedor_cod` INT NOT NULL,
  `empresa_Cod_empresa` INT NOT NULL,
  `data` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`cod_compras`),
  INDEX `fk_compras_fornecedor1_idx` (`fornecedor_cod` ASC)  ,
  INDEX `fk_compras_empresa1_idx` (`empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_compras_empresa1`
    FOREIGN KEY (`empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`),
  CONSTRAINT `fk_compras_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 73
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`produto_fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`produto_fornecedor` (
  `Cod_produto` INT NOT NULL AUTO_INCREMENT,
  `fornecedor_cod` INT NOT NULL,
  `Nome` VARCHAR(120) NOT NULL,
  `valor` FLOAT NOT NULL,
  `Quantidade` INT NOT NULL,
  `Altura` FLOAT NOT NULL,
  `Comprimento` FLOAT NOT NULL,
  `Largura` FLOAT NOT NULL,
  `si_altura` VARCHAR(45) NOT NULL,
  `si_comprimento` VARCHAR(45) NOT NULL,
  `si_largura` VARCHAR(45) NOT NULL,
  `Data` DATE NOT NULL,
  `observacao` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_produto`, `fornecedor_cod`),
  INDEX `fk_produto_fornecedor_fornecedor1_idx` (`fornecedor_cod` ASC)  ,
  CONSTRAINT `fk_produto_fornecedor_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`compras_medidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`compras_medidas` (
  `Cod_produto` INT NOT NULL AUTO_INCREMENT,
  `fornecedor_cod` INT NOT NULL,
  `produto_fornecedor_Cod_produto` INT NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  `Fornecedor` VARCHAR(120) NOT NULL,
  `Altura` FLOAT NOT NULL,
  `si_altura` VARCHAR(45) NOT NULL,
  `Comprimento` FLOAT NOT NULL,
  `si_comprimento` VARCHAR(45) NOT NULL,
  `Largura` FLOAT NOT NULL,
  `si_largura` VARCHAR(45) NOT NULL,
  `Quantidade` INT NOT NULL,
  `Valor` FLOAT NOT NULL,
  `Data` DATE NOT NULL,
  `ICMS` INT NOT NULL,
  `COFINS` INT NOT NULL,
  `IPI` INT NOT NULL,
  `PIS` INT NOT NULL,
  `estado` VARCHAR(45) NULL DEFAULT NULL,
  `compras_cod_compras` INT NOT NULL,
  PRIMARY KEY (`Cod_produto`, `fornecedor_cod`, `produto_fornecedor_Cod_produto`, `compras_cod_compras`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC)  ,
  INDEX `fk_compras_medidas_fornecedor1_idx` (`fornecedor_cod` ASC)  ,
  INDEX `fk_compras_medidas_produto_fornecedor1_idx` (`produto_fornecedor_Cod_produto` ASC)  ,
  INDEX `fk_compras_medidas_compras1_idx` (`compras_cod_compras` ASC)  ,
  CONSTRAINT `fk_compras_medidas_compras1`
    FOREIGN KEY (`compras_cod_compras`)
    REFERENCES `mydb`.`compras` (`cod_compras`),
  CONSTRAINT `fk_compras_medidas_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`),
  CONSTRAINT `fk_compras_medidas_produto_fornecedor1`
    FOREIGN KEY (`produto_fornecedor_Cod_produto`)
    REFERENCES `mydb`.`produto_fornecedor` (`Cod_produto`),
  CONSTRAINT `fk_Produto_Empresa100`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`produto_quantidade_fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`produto_quantidade_fornecedor` (
  `Cod_produto` INT NOT NULL AUTO_INCREMENT,
  `fornecedor_cod` INT NOT NULL,
  `Nome` VARCHAR(120) NOT NULL,
  `valor` FLOAT NOT NULL,
  `Quantidade` INT NOT NULL,
  `Data` DATE NOT NULL,
  `observacao` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_produto`, `fornecedor_cod`),
  INDEX `fk_produto_quantidade_fornecedor_fornecedor1_idx` (`fornecedor_cod` ASC)  ,
  CONSTRAINT `fk_produto_quantidade_fornecedor_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`compras_quantidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`compras_quantidade` (
  `Cod_produto` INT NOT NULL AUTO_INCREMENT,
  `fornecedor_cod` INT NOT NULL,
  `produto_quantidade_fornecedor_Cod_produto` INT NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  `Fornecedor` VARCHAR(120) NOT NULL,
  `Quantidade` INT NOT NULL,
  `Valor` FLOAT NOT NULL,
  `Data` DATE NOT NULL,
  `ICMS` INT NOT NULL,
  `COFINS` INT NOT NULL,
  `IPI` INT NOT NULL,
  `PIS` INT NOT NULL,
  `estado` VARCHAR(45) NULL DEFAULT NULL,
  `compras_cod_compras` INT NOT NULL,
  PRIMARY KEY (`Cod_produto`, `fornecedor_cod`, `produto_quantidade_fornecedor_Cod_produto`, `compras_cod_compras`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC)  ,
  INDEX `fk_compras_quantidade_fornecedor1_idx` (`fornecedor_cod` ASC)  ,
  INDEX `fk_compras_quantidade_produto_quantidade_fornecedor1_idx` (`produto_quantidade_fornecedor_Cod_produto` ASC)  ,
  INDEX `fk_compras_quantidade_compras1_idx` (`compras_cod_compras` ASC)  ,
  CONSTRAINT `fk_compras_quantidade_compras1`
    FOREIGN KEY (`compras_cod_compras`)
    REFERENCES `mydb`.`compras` (`cod_compras`),
  CONSTRAINT `fk_compras_quantidade_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`),
  CONSTRAINT `fk_compras_quantidade_produto_quantidade_fornecedor1`
    FOREIGN KEY (`produto_quantidade_fornecedor_Cod_produto`)
    REFERENCES `mydb`.`produto_quantidade_fornecedor` (`Cod_produto`),
  CONSTRAINT `fk_Produto_Empresa1000`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`lista_fornecedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`lista_fornecedores` (
  `cod_lista` INT NOT NULL AUTO_INCREMENT,
  `fornecedor_cod` INT NOT NULL,
  `empresa_Cod_empresa` INT NOT NULL,
  PRIMARY KEY (`cod_lista`, `fornecedor_cod`, `empresa_Cod_empresa`),
  INDEX `fk_lista_fornecedores_fornecedor1_idx` (`fornecedor_cod` ASC)  ,
  INDEX `fk_lista_fornecedores_empresa1_idx` (`empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_lista_fornecedores_empresa1`
    FOREIGN KEY (`empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`),
  CONSTRAINT `fk_lista_fornecedores_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`os`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`os` (
  `Cod_os` INT NOT NULL AUTO_INCREMENT,
  `funcionario_Cod_funcionario` INT NOT NULL,
  `empresa_Cod_empresa` INT NOT NULL,
  `cliente_Cod_cliente` INT NOT NULL,
  `Obs` VARCHAR(300) NOT NULL,
  `Data_inicio` DATE NOT NULL,
  `Data_fim` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_os`, `funcionario_Cod_funcionario`, `empresa_Cod_empresa`, `cliente_Cod_cliente`),
  INDEX `fk_os_funcionario1_idx` (`funcionario_Cod_funcionario` ASC)  ,
  INDEX `fk_os_empresa1_idx` (`empresa_Cod_empresa` ASC)  ,
  INDEX `fk_os_cliente1_idx` (`cliente_Cod_cliente` ASC)  ,
  CONSTRAINT `fk_os_cliente1`
    FOREIGN KEY (`cliente_Cod_cliente`)
    REFERENCES `mydb`.`cliente` (`Cod_cliente`),
  CONSTRAINT `fk_os_empresa1`
    FOREIGN KEY (`empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`),
  CONSTRAINT `fk_os_funcionario1`
    FOREIGN KEY (`funcionario_Cod_funcionario`)
    REFERENCES `mydb`.`funcionario` (`Cod_funcionario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`produto` (
  `Cod_produto` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(120) NOT NULL,
  `valor` FLOAT NOT NULL,
  `Quantidade` INT NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  `Altura` FLOAT NOT NULL,
  `Comprimento` FLOAT NOT NULL,
  `Largura` FLOAT NOT NULL,
  `si_altura` VARCHAR(45) NOT NULL,
  `si_comprimento` VARCHAR(45) NOT NULL,
  `si_largura` VARCHAR(45) NOT NULL,
  `Data` DATETIME NULL DEFAULT NULL,
  `observacao` VARCHAR(255) NULL DEFAULT NULL,
  `cod_compra` INT NULL DEFAULT NULL,
  `fornecedor` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_produto`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_Produto_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`produto_quantidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`produto_quantidade` (
  `Cod_produto` INT NOT NULL AUTO_INCREMENT,
  `Empresa_Cod_empresa` INT NOT NULL,
  `Nome` VARCHAR(120) NOT NULL,
  `valor` FLOAT NOT NULL,
  `Quantidade` INT NOT NULL,
  `Data` DATETIME NULL DEFAULT NULL,
  `observacao` VARCHAR(255) NULL DEFAULT NULL,
  `cod_compra` INT NULL DEFAULT NULL,
  `fornecedor` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_produto`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_Produto_Empresa11`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`materiais_os`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`materiais_os` (
  `idmateriais_os` INT NOT NULL,
  `os_Cod_os` INT NOT NULL,
  `os_funcionario_Cod_funcionario` INT NOT NULL,
  `os_empresa_Cod_empresa` INT NOT NULL,
  `os_cliente_Cod_cliente` INT NOT NULL,
  `produto_Cod_produto` INT NOT NULL,
  `produto_quantidade_Cod_produto` INT NOT NULL,
  PRIMARY KEY (`idmateriais_os`, `produto_Cod_produto`, `produto_quantidade_Cod_produto`),
  INDEX `fk_materiais_os_os1_idx` (`os_Cod_os` ASC, `os_funcionario_Cod_funcionario` ASC, `os_empresa_Cod_empresa` ASC, `os_cliente_Cod_cliente` ASC)  ,
  INDEX `fk_materiais_os_produto1_idx` (`produto_Cod_produto` ASC)  ,
  INDEX `fk_materiais_os_produto_quantidade1_idx` (`produto_quantidade_Cod_produto` ASC)  ,
  CONSTRAINT `fk_materiais_os_os1`
    FOREIGN KEY (`os_Cod_os` , `os_funcionario_Cod_funcionario` , `os_empresa_Cod_empresa` , `os_cliente_Cod_cliente`)
    REFERENCES `mydb`.`os` (`Cod_os` , `funcionario_Cod_funcionario` , `empresa_Cod_empresa` , `cliente_Cod_cliente`),
  CONSTRAINT `fk_materiais_os_produto1`
    FOREIGN KEY (`produto_Cod_produto`)
    REFERENCES `mydb`.`produto` (`Cod_produto`),
  CONSTRAINT `fk_materiais_os_produto_quantidade1`
    FOREIGN KEY (`produto_quantidade_Cod_produto`)
    REFERENCES `mydb`.`produto_quantidade` (`Cod_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`orcamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`orcamento` (
  `Cod_orcamento` INT NOT NULL AUTO_INCREMENT,
  `Nome_cliente` VARCHAR(120) NOT NULL,
  `Descricao` VARCHAR(120) NOT NULL,
  `Valor` INT NULL DEFAULT NULL,
  `Desconto` INT NULL DEFAULT NULL,
  `Data_inicio` DATE NULL DEFAULT NULL,
  `Data_entrega` DATE NULL DEFAULT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  PRIMARY KEY (`Cod_orcamento`),
  INDEX `fk_Orcamento_Empresa1_idx` (`Empresa_Cod_empresa` ASC)  ,
  CONSTRAINT `fk_Orcamento_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`parcela`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`parcela` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(4,4) NOT NULL,
  `forma` VARCHAR(45) NOT NULL,
  `data` DATE NOT NULL,
  `empresa_Cod_empresa` INT NOT NULL,
  `compras_cod_compras` INT NOT NULL,
  `estatus` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`cod`, `empresa_Cod_empresa`, `compras_cod_compras`),
  INDEX `fk_parcela_empresa1_idx` (`empresa_Cod_empresa` ASC)  ,
  INDEX `fk_parcela_compras1_idx` (`compras_cod_compras` ASC)  ,
  CONSTRAINT `fk_parcela_compras1`
    FOREIGN KEY (`compras_cod_compras`)
    REFERENCES `mydb`.`compras` (`cod_compras`),
  CONSTRAINT `fk_parcela_empresa1`
    FOREIGN KEY (`empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
