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
AUTO_INCREMENT = 15
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
  INDEX `fk_Cliente_Empresa_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
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
  INDEX `fk_Agenda_empresa_copy1_cliente1_idx` (`cliente_Cod_cliente` ASC) VISIBLE,
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
  INDEX `fk_Agenda_empresa_empresa1_idx` (`empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Agenda_empresa_empresa1`
    FOREIGN KEY (`empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
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
AUTO_INCREMENT = 3
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
  INDEX `fk_agenda_fornecedor_fornecedor1_idx` (`fornecedor_cod` ASC) VISIBLE,
  CONSTRAINT `fk_agenda_fornecedor_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 23
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
  `fluxo_caixa` TINYINT NULL,
  `servicos` TINYINT NULL,
  `orcamentos` TINYINT NULL,
  `estoque` TINYINT NULL,
  PRIMARY KEY (`Cod_cargo`),
  INDEX `fk_cargo_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_cargo_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
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
  INDEX `fk_funcionario_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  INDEX `fk_funcionario_cargo1_idx` (`cargo_Cod_cargo` ASC) VISIBLE,
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
  INDEX `fk_Agenda_funcionario_funcionario1_idx` (`funcionario_Cod_funcionario` ASC) VISIBLE,
  CONSTRAINT `fk_Agenda_funcionario_funcionario1`
    FOREIGN KEY (`funcionario_Cod_funcionario`)
    REFERENCES `mydb`.`funcionario` (`Cod_funcionario`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
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
  INDEX `fk_produto_fornecedor_fornecedor1_idx` (`fornecedor_cod` ASC) VISIBLE,
  CONSTRAINT `fk_produto_fornecedor_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
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
  PRIMARY KEY (`Cod_produto`, `fornecedor_cod`, `produto_fornecedor_Cod_produto`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  INDEX `fk_compras_medidas_fornecedor1_idx` (`fornecedor_cod` ASC) VISIBLE,
  INDEX `fk_compras_medidas_produto_fornecedor1_idx` (`produto_fornecedor_Cod_produto` ASC) VISIBLE,
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
  INDEX `fk_produto_quantidade_fornecedor_fornecedor1_idx` (`fornecedor_cod` ASC) VISIBLE,
  CONSTRAINT `fk_produto_quantidade_fornecedor_fornecedor1`
    FOREIGN KEY (`fornecedor_cod`)
    REFERENCES `mydb`.`fornecedor` (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
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
  PRIMARY KEY (`Cod_produto`, `fornecedor_cod`, `produto_quantidade_fornecedor_Cod_produto`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  INDEX `fk_compras_quantidade_fornecedor1_idx` (`fornecedor_cod` ASC) VISIBLE,
  INDEX `fk_compras_quantidade_produto_quantidade_fornecedor1_idx` (`produto_quantidade_fornecedor_Cod_produto` ASC) VISIBLE,
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
  INDEX `fk_Orcamento_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Orcamento_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
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
  INDEX `fk_os_funcionario1_idx` (`funcionario_Cod_funcionario` ASC) VISIBLE,
  INDEX `fk_os_empresa1_idx` (`empresa_Cod_empresa` ASC) VISIBLE,
  INDEX `fk_os_cliente1_idx` (`cliente_Cod_cliente` ASC) VISIBLE,
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
  `Data` DATE NOT NULL,
  `observacao` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_produto`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Produto_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
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
  `Data` DATE NOT NULL,
  `observacao` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Cod_produto`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Produto_Empresa11`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`empresa` (`Cod_empresa`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
