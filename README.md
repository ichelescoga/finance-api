# finance-api


-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `FinanceApp` ;
USE `FinanceApp` ;

-- -----------------------------------------------------
-- Table `FinanceApp`.`GENERO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`GENERO` (
  `Id_genero` INT NOT NULL AUTO_INCREMENT,
  `Descripcion` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_genero`),
  UNIQUE INDEX `Id_genero_UNIQUE` (`Id_genero` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`PAIS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`PAIS` (
  `Id_pais` INT NOT NULL AUTO_INCREMENT,
  `Nombre_pais` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `ISO_codigo` VARCHAR(10) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono_codigo` VARCHAR(10) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_pais`),
  UNIQUE INDEX `Id_pais_UNIQUE` (`Id_pais` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`CLIENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`CLIENTE` (
  `Id_cliente` INT NOT NULL AUTO_INCREMENT,
  `Primer_nombre` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Segundo_nombre` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Otros_nombres` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Primer_apellido` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Segundo_apellido` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Apellido_casada` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Estado_civil` VARCHAR(20) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `Id_genero` INT NULL DEFAULT NULL,
  `Fecha_nacimiento` DATE NULL DEFAULT NULL,
  `Oficio` VARCHAR(60) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `Nivel_estudios` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Direccion_residencia` VARCHAR(200) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono_residencia` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Lugar_de_trabajo` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Direccion_trabajo` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono_trabajo` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `DPI` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `NIT` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Correo` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_nacionalidad` INT NULL DEFAULT NULL,
  `Puesto` VARCHAR(100) NULL,
  `Foto_DPI_enfrente` VARCHAR(500) NULL DEFAULT NULL,
  `Foto_DPI_reverso` VARCHAR(500) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_cliente`),
  UNIQUE INDEX `Id_cliente_UNIQUE` (`Id_cliente` ASC) VISIBLE,
  INDEX `Genero_idx` (`Id_genero` ASC) VISIBLE,
  INDEX `Nacionalidad_idx` (`Id_nacionalidad` ASC) VISIBLE,
  CONSTRAINT `Genero`
    FOREIGN KEY (`Id_genero`)
    REFERENCES `FinanceApp`.`GENERO` (`Id_genero`),
  CONSTRAINT `Nacionalidad`
    FOREIGN KEY (`Id_nacionalidad`)
    REFERENCES `FinanceApp`.`PAIS` (`Id_pais`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`PUESTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`PUESTO` (
  `Id_puesto` INT NOT NULL AUTO_INCREMENT,
  `Nombre_puesto` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Descripcion` VARCHAR(250) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_puesto`),
  UNIQUE INDEX `Id_puesto_UNIQUE` (`Id_puesto` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`EMPLEADO_ASESOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`EMPLEADO_ASESOR` (
  `Id_empleado` INT NOT NULL AUTO_INCREMENT,
  `Primer_nombre` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Segundo_nombre` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Otros_nombres` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Primer_apellido` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Segundo_apellido` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Apellido_casada` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `DPI` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `NIT` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Correo` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Foto` VARCHAR(200) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_puesto` INT NULL DEFAULT NULL,
  `Interno` TINYINT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_empleado`),
  UNIQUE INDEX `Id_empleado_UNIQUE` (`Id_empleado` ASC) VISIBLE,
  INDEX `Puesto_idx` (`Id_puesto` ASC) VISIBLE,
  CONSTRAINT `Puesto`
    FOREIGN KEY (`Id_puesto`)
    REFERENCES `FinanceApp`.`PUESTO` (`Id_puesto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`ASESOR_DETALLE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`ASESOR_DETALLE` (
  `Id_detalle_asesor` INT NOT NULL AUTO_INCREMENT,
  `Id_empleado` INT NULL DEFAULT NULL,
  `Comision` DECIMAL(18,8) NULL DEFAULT NULL,
  `Meta_vental` DECIMAL(18,8) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_detalle_asesor`),
  UNIQUE INDEX `Id_detalle_asesor_UNIQUE` (`Id_detalle_asesor` ASC) VISIBLE,
  INDEX `Empleado_idx` (`Id_empleado` ASC) VISIBLE,
  CONSTRAINT `Empleado`
    FOREIGN KEY (`Id_empleado`)
    REFERENCES `FinanceApp`.`EMPLEADO_ASESOR` (`Id_empleado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`ENTIDAD_FINANCIERA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`ENTIDAD_FINANCIERA` (
  `Id_ent_financiera` INT NOT NULL AUTO_INCREMENT,
  `Razon_social` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Nombre_comercial` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Representante_legal` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `NIT` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Direccion` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Codigo_postal` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Nombre_contacto` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono_contacto` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_pais` INT NULL DEFAULT NULL,
  `Id_departamento` INT NULL DEFAULT NULL,
  `Id_municipio` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_ent_financiera`),
  UNIQUE INDEX `Id_ent_financiera_UNIQUE` (`Id_ent_financiera` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`TIPO_CREDITO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`TIPO_CREDITO` (
  `Id_tipo_credito` INT NOT NULL AUTO_INCREMENT,
  `Nombre_credito` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Descripcion` VARCHAR(200) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_tipo_credito`),
  UNIQUE INDEX `Id_tipo_credito_UNIQUE` (`Id_tipo_credito` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`DEPARTAMENTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`DEPARTAMENTO` (
  `Id_departamento` INT NOT NULL AUTO_INCREMENT,
  `Nombre_departamento` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_departamento`),
  UNIQUE INDEX `Id_departamento_UNIQUE` (`Id_departamento` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`MUNICIPIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`MUNICIPIO` (
  `Id_municipio` INT NOT NULL AUTO_INCREMENT,
  `Nombre_municipio` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_municipio`),
  UNIQUE INDEX `Id_municipio_UNIQUE` (`Id_municipio` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`EMPRESA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`EMPRESA` (
  `Id_empresa` INT NOT NULL AUTO_INCREMENT,
  `Razon_social` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Nombre_comercial` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Representante_legal` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `NIT` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `DPI` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Direccion` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Codigo_postal` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Nombre_contacto` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono_contacto` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Gerente_ventas` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono_gerente` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_pais` INT NULL DEFAULT NULL,
  `Id_departamento` INT NULL DEFAULT NULL,
  `Id_municipio` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_empresa`),
  UNIQUE INDEX `Id_empresa_UNIQUE` (`Id_empresa` ASC) VISIBLE,
  INDEX `Pais_idx` (`Id_pais` ASC) VISIBLE,
  INDEX `Departamento_idx` (`Id_departamento` ASC) VISIBLE,
  INDEX `Municipio_idx` (`Id_municipio` ASC) VISIBLE,
  CONSTRAINT `Departamento`
    FOREIGN KEY (`Id_departamento`)
    REFERENCES `FinanceApp`.`DEPARTAMENTO` (`Id_departamento`),
  CONSTRAINT `Municipio`
    FOREIGN KEY (`Id_municipio`)
    REFERENCES `FinanceApp`.`MUNICIPIO` (`Id_municipio`),
  CONSTRAINT `Pais`
    FOREIGN KEY (`Id_pais`)
    REFERENCES `FinanceApp`.`PAIS` (`Id_pais`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`TIPO_PROYECTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`TIPO_PROYECTO` (
  `Id_tipo_proyecto` INT NOT NULL AUTO_INCREMENT,
  `Descripcion` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_tipo_proyecto`),
  UNIQUE INDEX `Id_tipo_proyecto_UNIQUE` (`Id_tipo_proyecto` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`PROYECTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`PROYECTO` (
  `Id_proyecto` INT NOT NULL AUTO_INCREMENT,
  `Nombre_proyecto` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_empresa` INT NOT NULL,
  `Id_pais` INT NOT NULL,
  `Id_departamento` INT NOT NULL,
  `Id_municipio` INT NULL DEFAULT NULL,
  `Direccion` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Coordenadas` VARCHAR(100) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_tipo_proyecto` INT NULL DEFAULT NULL,
  `Cantidad_unidades` INT NULL DEFAULT NULL,
  `Fecha_inicio_venta` DATE NULL DEFAULT NULL,
  `Fecha_fin_venta` DATE NULL DEFAULT NULL,
  `Costo_promedio_unidad` DECIMAL(10,0) NULL DEFAULT NULL,
  `Costo_total_venta` DECIMAL(10,0) NULL DEFAULT NULL,
  `Logo_proyecto` VARCHAR(200) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Descripcion` VARCHAR(250) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_proyecto`, `Id_pais`, `Id_departamento`),
  UNIQUE INDEX `Id_proyecto_UNIQUE` (`Id_proyecto` ASC) VISIBLE,
  INDEX `Empresa_idx` (`Id_empresa` ASC) VISIBLE,
  INDEX `Tipo_proyecto_idx` (`Id_tipo_proyecto` ASC) VISIBLE,
  CONSTRAINT `Empresa`
    FOREIGN KEY (`Id_empresa`)
    REFERENCES `FinanceApp`.`EMPRESA` (`Id_empresa`),
  CONSTRAINT `Tipo_proyecto`
    FOREIGN KEY (`Id_tipo_proyecto`)
    REFERENCES `FinanceApp`.`TIPO_PROYECTO` (`Id_tipo_proyecto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`PLAN_FINANCIERO_PROY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`PLAN_FINANCIERO_PROY` (
  `Id_plan_financiero` INT NOT NULL AUTO_INCREMENT,
  `Id_ent_financiera` INT NULL DEFAULT NULL,
  `Id_tipo_credito` INT NULL DEFAULT NULL,
  `Tasa_interes` DECIMAL(18,8) NULL DEFAULT NULL,
  `Meses_maximo` INT NULL DEFAULT NULL,
  `Pagos_especiales` INT NULL DEFAULT NULL,
  `Enganche_minimo` DECIMAL(18,8) NULL DEFAULT NULL,
  `Id_proyecto` INT NOT NULL,
  `Id_empresa` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_plan_financiero`, `Id_proyecto`, `Id_empresa`),
  UNIQUE INDEX `Id_plan_financiero_UNIQUE` (`Id_plan_financiero` ASC) VISIBLE,
  INDEX `EntidadFinanciera_idx` (`Id_ent_financiera` ASC) VISIBLE,
  INDEX `TipoCredito_idx` (`Id_tipo_credito` ASC) VISIBLE,
  INDEX `fk_PLAN_FINANCIERO_PROY_PROYECTO1_idx` (`Id_proyecto` ASC) VISIBLE,
  INDEX `fk_PLAN_FINANCIERO_PROY_EMPRESA1_idx` (`Id_empresa` ASC) VISIBLE,
  CONSTRAINT `EntidadFinancier`
    FOREIGN KEY (`Id_ent_financiera`)
    REFERENCES `FinanceApp`.`ENTIDAD_FINANCIERA` (`Id_ent_financiera`),
  CONSTRAINT `TipoCredito`
    FOREIGN KEY (`Id_tipo_credito`)
    REFERENCES `FinanceApp`.`TIPO_CREDITO` (`Id_tipo_credito`),
  CONSTRAINT `fk_PLAN_FINANCIERO_PROY_PROYECTO1`
    FOREIGN KEY (`Id_proyecto`)
    REFERENCES `FinanceApp`.`PROYECTO` (`Id_proyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PLAN_FINANCIERO_PROY_EMPRESA1`
    FOREIGN KEY (`Id_empresa`)
    REFERENCES `FinanceApp`.`EMPRESA` (`Id_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`ESTADO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`ESTADO` (
  `Id_estado` INT NOT NULL AUTO_INCREMENT,
  `Name_estado` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_estado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`COTIZACION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`COTIZACION` (
  `Id_cotizacion` INT NOT NULL AUTO_INCREMENT,
  `Id_detalle_asesor` INT NULL DEFAULT NULL,
  `Id_estado` INT NOT NULL,
  `Id_plan_financiero` INT NULL DEFAULT NULL,
  `Id_cliente` INT NULL DEFAULT NULL,
  `Fecha` DATE NULL DEFAULT NULL,
  `Fecha_hora` DATETIME NULL DEFAULT NULL,
  `Ingreso_mensual` DECIMAL(18,8) NULL DEFAULT NULL,
  `Enganche` DECIMAL(18,8) NULL DEFAULT NULL,
  `Meses_plazo` INT NULL DEFAULT NULL,
  `Mes_inicio` INT NULL DEFAULT NULL,
  `Anio_inicio` INT NULL DEFAULT NULL,
  `Mes_fin` INT NULL DEFAULT NULL,
  `Anio_fin` INT NULL DEFAULT NULL,
  `Descuento` INT NULL,
  `Venta_descuento` DECIMAL(10,2) NULL,
  `Precio_contado` TINYINT NULL,
  `Aguinaldo` TINYINT NULL,
  `Bono_catorce` TINYINT NULL,
  `Url_cotizacion` VARCHAR(500) NULL,
  `Comentario` VARCHAR(500) NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_cotizacion`, `Id_estado`),
  UNIQUE INDEX `Id_cotizacion_UNIQUE` (`Id_cotizacion` ASC) VISIBLE,
  INDEX `DetalleAsesor_idx` (`Id_detalle_asesor` ASC) VISIBLE,
  INDEX `PlanFinanciero_idx` (`Id_plan_financiero` ASC) VISIBLE,
  INDEX `Cliente_idx` (`Id_cliente` ASC) VISIBLE,
  INDEX `fk_COTIZACION_ESTADO1_idx` (`Id_estado` ASC) VISIBLE,
  CONSTRAINT `Cliente`
    FOREIGN KEY (`Id_cliente`)
    REFERENCES `FinanceApp`.`CLIENTE` (`Id_cliente`),
  CONSTRAINT `DetalleAsesor`
    FOREIGN KEY (`Id_detalle_asesor`)
    REFERENCES `FinanceApp`.`ASESOR_DETALLE` (`Id_detalle_asesor`),
  CONSTRAINT `PlanFinanciero`
    FOREIGN KEY (`Id_plan_financiero`)
    REFERENCES `FinanceApp`.`PLAN_FINANCIERO_PROY` (`Id_plan_financiero`),
  CONSTRAINT `fk_COTIZACION_ESTADO1`
    FOREIGN KEY (`Id_estado`)
    REFERENCES `FinanceApp`.`ESTADO` (`Id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`EJECUTIVO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`EJECUTIVO` (
  `Id_ejecutivo` INT NOT NULL AUTO_INCREMENT,
  `Id_ent_financiera` INT NULL DEFAULT NULL,
  `Primer_nombre` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Segundo_nombre` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Otros_nombres` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Primer_apellido` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Segundo_apellido` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Apellido_casada` VARCHAR(60) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `DPI` VARCHAR(13) NULL DEFAULT NULL,
  `NIT` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Telefono` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Correo` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Foto` VARCHAR(200) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_plan_financiero` INT NOT NULL,
  `Id_puesto` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_ejecutivo`, `Id_plan_financiero`, `Id_puesto`),
  UNIQUE INDEX `Id_ejecutivo_UNIQUE` (`Id_ejecutivo` ASC) VISIBLE,
  INDEX `EntidadFinanciera_idx` (`Id_ent_financiera` ASC) VISIBLE,
  INDEX `fk_EJECUTIVO_PLAN_FINANCIERO_PROY1_idx` (`Id_plan_financiero` ASC) VISIBLE,
  INDEX `fk_EJECUTIVO_PUESTO1_idx` (`Id_puesto` ASC) VISIBLE,
  CONSTRAINT `EntidadFinanciera`
    FOREIGN KEY (`Id_ent_financiera`)
    REFERENCES `FinanceApp`.`ENTIDAD_FINANCIERA` (`Id_ent_financiera`),
  CONSTRAINT `fk_EJECUTIVO_PLAN_FINANCIERO_PROY1`
    FOREIGN KEY (`Id_plan_financiero`)
    REFERENCES `FinanceApp`.`PLAN_FINANCIERO_PROY` (`Id_plan_financiero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EJECUTIVO_PUESTO1`
    FOREIGN KEY (`Id_puesto`)
    REFERENCES `FinanceApp`.`PUESTO` (`Id_puesto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`PARENTESCO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`PARENTESCO` (
  `Id_parentesco` INT NOT NULL AUTO_INCREMENT,
  `Nombre_parentesco` VARCHAR(50) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Es_familia` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_parentesco`),
  UNIQUE INDEX `Id_parentesco_UNIQUE` (`Id_parentesco` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`DETALLE_FIADOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`DETALLE_FIADOR` (
  `Id_detalle_fiador` INT NOT NULL AUTO_INCREMENT,
  `Id_aplicacion` INT NULL DEFAULT NULL,
  `Id_cliente` INT NULL DEFAULT NULL,
  `Id_parentesco` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_detalle_fiador`),
  UNIQUE INDEX `Id_detalle_fiador_UNIQUE` (`Id_detalle_fiador` ASC) VISIBLE,
  INDEX `Aplicacion_idx` (`Id_aplicacion` ASC) VISIBLE,
  INDEX `Cliente_idx` (`Id_cliente` ASC) VISIBLE,
  INDEX `Parentesco_idx` (`Id_parentesco` ASC) VISIBLE,
  CONSTRAINT `Aplicacion`
    FOREIGN KEY (`Id_aplicacion`)
    REFERENCES `FinanceApp`.`APLICACION` (`Id_aplicacion`),
  CONSTRAINT `Client`
    FOREIGN KEY (`Id_cliente`)
    REFERENCES `FinanceApp`.`CLIENTE` (`Id_cliente`),
  CONSTRAINT `Parentes`
    FOREIGN KEY (`Id_parentesco`)
    REFERENCES `FinanceApp`.`PARENTESCO` (`Id_parentesco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`APLICACION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`APLICACION` (
  `Id_aplicacion` INT NOT NULL AUTO_INCREMENT,
  `Id_cotizacion` INT NULL DEFAULT NULL,
  `Id_ejecutivo` INT NULL DEFAULT NULL,
  `Id_cliente` INT NULL DEFAULT NULL,
  `Foto_DPI_enfrente` VARCHAR(200) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Foto_DPI_reverso` VARCHAR(200) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Estado` INT NULL DEFAULT NULL,
  `Id_dtalle_fiador` INT NULL DEFAULT NULL,
  `Empresa` VARCHAR(100) NULL,
  `Sueldo` VARCHAR(100) NULL,
  `Fecha_ingreso` DATE NULL,
  `DPI` VARCHAR(13) NULL DEFAULT NULL,
  `NIT` VARCHAR(13) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_aplicacion`),
  UNIQUE INDEX `Id_aplicacion_UNIQUE` (`Id_aplicacion` ASC) VISIBLE,
  INDEX `Fiadores_idx` (`Id_dtalle_fiador` ASC) VISIBLE,
  INDEX `Cotizacion_idx` (`Id_cotizacion` ASC) VISIBLE,
  INDEX `Ejecutivo_idx` (`Id_ejecutivo` ASC) VISIBLE,
  INDEX `Cliente_idx` (`Id_cliente` ASC) VISIBLE,
  CONSTRAINT `Clientt`
    FOREIGN KEY (`Id_cliente`)
    REFERENCES `FinanceApp`.`CLIENTE` (`Id_cliente`),
  CONSTRAINT `Cotizacionnes`
    FOREIGN KEY (`Id_cotizacion`)
    REFERENCES `FinanceApp`.`COTIZACION` (`Id_cotizacion`),
  CONSTRAINT `Ejecutivo`
    FOREIGN KEY (`Id_ejecutivo`)
    REFERENCES `FinanceApp`.`EJECUTIVO` (`Id_ejecutivo`),
  CONSTRAINT `Fiadores`
    FOREIGN KEY (`Id_dtalle_fiador`)
    REFERENCES `FinanceApp`.`DETALLE_FIADOR` (`Id_detalle_fiador`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`DETALLE_COTIZACION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`DETALLE_COTIZACION` (
  `Id_detalle_cotizacion` INT NOT NULL AUTO_INCREMENT,
  `Id_cotizacion` INT NULL DEFAULT NULL,
  `Cantidad_meses` INT NULL DEFAULT NULL,
  `Suma_capiltal` DECIMAL(18,8) NULL DEFAULT NULL,
  `Suma_intereses` DECIMAL(18,8) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_detalle_cotizacion`),
  UNIQUE INDEX `Id_detalle_cotizacion_UNIQUE` (`Id_detalle_cotizacion` ASC) VISIBLE,
  INDEX `Cotizacion_idx` (`Id_cotizacion` ASC) VISIBLE,
  CONSTRAINT `Cotizacion`
    FOREIGN KEY (`Id_cotizacion`)
    REFERENCES `FinanceApp`.`COTIZACION` (`Id_cotizacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`DETALLE_EJECUTIVO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`DETALLE_EJECUTIVO` (
  `Id_detalle_ejecutivo` INT NOT NULL AUTO_INCREMENT,
  `Id_plan_financiero` INT NULL DEFAULT NULL,
  `Id_ejecutivo` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_detalle_ejecutivo`),
  UNIQUE INDEX `Id_detalle_ejecutivo_UNIQUE` (`Id_detalle_ejecutivo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`FAMILIA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`FAMILIA` (
  `Id_familia` INT NOT NULL AUTO_INCREMENT,
  `Id_clinete` INT NULL DEFAULT NULL,
  `Id_parentesco` INT NULL DEFAULT NULL,
  `Nombre` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Apellido` VARCHAR(150) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Fecha_nacimiento` DATE NULL DEFAULT NULL,
  `Telefono` VARCHAR(20) COLLATE 'utf8mb3_bin' NULL DEFAULT NULL,
  `Id_nacionalidad` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_familia`),
  UNIQUE INDEX `Id_familia_UNIQUE` (`Id_familia` ASC) VISIBLE,
  INDEX `Cliente_idx` (`Id_clinete` ASC) VISIBLE,
  INDEX `Nacionalidad_idx` (`Id_nacionalidad` ASC) VISIBLE,
  INDEX `Parentesco_idx` (`Id_parentesco` ASC) VISIBLE,
  CONSTRAINT `Clientes`
    FOREIGN KEY (`Id_clinete`)
    REFERENCES `FinanceApp`.`CLIENTE` (`Id_cliente`),
  CONSTRAINT `Nacionalidads`
    FOREIGN KEY (`Id_nacionalidad`)
    REFERENCES `FinanceApp`.`PAIS` (`Id_pais`),
  CONSTRAINT `Parentesco`
    FOREIGN KEY (`Id_parentesco`)
    REFERENCES `FinanceApp`.`PARENTESCO` (`Id_parentesco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`UNIDAD`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`UNIDAD` (
  `Id_unidad` INT NOT NULL AUTO_INCREMENT,
  `Id_estado` INT NOT NULL,
  `Id_proyecto` INT NOT NULL,
  `Nombre_unidad` VARCHAR(100) NOT NULL,
  `Precio_Venta` DECIMAL(10,2) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_unidad`, `Id_estado`, `Id_proyecto`),
  UNIQUE INDEX `Id_sub_proyecto_UNIQUE` (`Id_unidad` ASC) VISIBLE,
  INDEX `fk_UNIDAD_PROYECTO1_idx` (`Id_proyecto` ASC) VISIBLE,
  INDEX `fk_UNIDAD_ESTADO1_idx` (`Id_estado` ASC) VISIBLE,
  CONSTRAINT `fk_UNIDAD_PROYECTO1`
    FOREIGN KEY (`Id_proyecto`)
    REFERENCES `FinanceApp`.`PROYECTO` (`Id_proyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UNIDAD_ESTADO1`
    FOREIGN KEY (`Id_estado`)
    REFERENCES `FinanceApp`.`ESTADO` (`Id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`User` (
  `Id_user` INT NOT NULL AUTO_INCREMENT,
  `Correo` VARCHAR(45) COLLATE 'utf8mb3_bin' NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Contrasenia` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_user`),
  UNIQUE INDEX `Correo_UNIQUE` (`Correo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`UNIDAD_COTIZACION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`UNIDAD_COTIZACION` (
  `Id_unidad_cotizacion` INT NOT NULL AUTO_INCREMENT,
  `Id_cotizacion` INT NOT NULL,
  `Id_unidad` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_unidad_cotizacion`, `Id_cotizacion`, `Id_unidad`),
  INDEX `fk_UNIDAD_has_COTIZACION_COTIZACION1_idx` (`Id_cotizacion` ASC) VISIBLE,
  INDEX `fk_UNIDAD_COTIZACION_UNIDAD1_idx` (`Id_unidad` ASC) VISIBLE,
  CONSTRAINT `fk_UNIDAD_has_COTIZACION_COTIZACION1`
    FOREIGN KEY (`Id_cotizacion`)
    REFERENCES `FinanceApp`.`COTIZACION` (`Id_cotizacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UNIDAD_COTIZACION_UNIDAD1`
    FOREIGN KEY (`Id_unidad`)
    REFERENCES `FinanceApp`.`UNIDAD` (`Id_unidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`ROL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`ROL` (
  `Id_rol` INT NOT NULL AUTO_INCREMENT,
  `Nombre_rol` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_rol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FinanceApp`.`USER_PROFILE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FinanceApp`.`USER_PROFILE` (
  `Id_user_profile` INT NOT NULL AUTO_INCREMENT,
  `Id_rol` INT NOT NULL,
  `Id_user` INT NOT NULL,
  `Id_empleado` INT NULL,
  `Id_ejecutivo` INT NULL,
  `Id_cliente` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_user_profile`),
  INDEX `fk_User_profile_EMPLEADO_ASESOR1_idx` (`Id_empleado` ASC) VISIBLE,
  INDEX `fk_User_profile_EJECUTIVO1_idx` (`Id_ejecutivo` ASC) VISIBLE,
  INDEX `fk_User_profile_CLIENTE1_idx` (`Id_cliente` ASC) VISIBLE,
  INDEX `fk_User_profile_ROL1_idx` (`Id_rol` ASC) VISIBLE,
  INDEX `fk_USER_PROFILE_User1_idx` (`Id_user` ASC) VISIBLE,
  CONSTRAINT `fk_User_profile_EMPLEADO_ASESOR1`
    FOREIGN KEY (`Id_empleado`)
    REFERENCES `FinanceApp`.`EMPLEADO_ASESOR` (`Id_empleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_profile_EJECUTIVO1`
    FOREIGN KEY (`Id_ejecutivo`)
    REFERENCES `FinanceApp`.`EJECUTIVO` (`Id_ejecutivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_profile_CLIENTE1`
    FOREIGN KEY (`Id_cliente`)
    REFERENCES `FinanceApp`.`CLIENTE` (`Id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_profile_ROL1`
    FOREIGN KEY (`Id_rol`)
    REFERENCES `FinanceApp`.`ROL` (`Id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_PROFILE_User1`
    FOREIGN KEY (`Id_user`)
    REFERENCES `FinanceApp`.`User` (`Id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

sequelize-auto -o "src/models" -d FinanceApp -h localhost -u root -p 3306 -x "Abc123**" -e mysql -t  "APLICACION" "ASESOR_DETALLE" "CLIENTE" "COTIZACION" "DEPARTAMENTO" "DETALLE_COTIZACION" "DETALLE_EJECUTIVO" "DETALLE_FIADOR" "EJECUTIVO" "EMPLEADO_ASESOR" "EMPRESA" "ENTIDAD_FINANCIERA" "ESTADO" "FAMILIA" "GENERO" "MUNICIPIO" "PAIS" "PARENTESCO" "PLAN_FINANCIERO_PROY" "PROYECTO" "PUESTO" "ROL" "TIPO_CREDITO" "TIPO_PROYECTO" "UNIDAD" "UNIDAD_COTIZACION" "User" "USER_PROFILE"