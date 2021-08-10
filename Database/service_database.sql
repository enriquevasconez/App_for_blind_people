-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema service_database
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `service_database` ;

-- -----------------------------------------------------
-- Schema service_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `service_database` DEFAULT CHARACTER SET utf8 ;
USE `service_database` ;

-- -----------------------------------------------------
-- Table `service_database`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`USER` ;

CREATE TABLE IF NOT EXISTS `service_database`.`USER` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(20) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `phone` INT NOT NULL,
  `blind_discapacity_percentage` FLOAT NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`ROLE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`ROLE` ;

CREATE TABLE IF NOT EXISTS `service_database`.`ROLE` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_description` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`USER_has_ROLE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`USER_has_ROLE` ;

CREATE TABLE IF NOT EXISTS `service_database`.`USER_has_ROLE` (
  `USER_user_id` INT NOT NULL,
  `ROLE_role_id` INT NOT NULL,
  PRIMARY KEY (`ROLE_role_id`, `USER_user_id`),
  INDEX `fk_USER_has_ROLE_ROLE1_idx` (`ROLE_role_id` ASC) VISIBLE,
  INDEX `fk_USER_has_ROLE_USER_idx` (`USER_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_USER_has_ROLE_USER`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `service_database`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_has_ROLE_ROLE1`
    FOREIGN KEY (`ROLE_role_id`)
    REFERENCES `service_database`.`ROLE` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`SERVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`SERVICE` ;

CREATE TABLE IF NOT EXISTS `service_database`.`SERVICE` (
  `service_id` INT NOT NULL AUTO_INCREMENT,
  `service_name` VARCHAR(45) NOT NULL,
  `service_description` VARCHAR(256) NOT NULL,
  `image` BLOB NULL,
  `price` VARCHAR(45) NOT NULL,
  `USER_user_id` INT NOT NULL,
  PRIMARY KEY (`service_id`),
  INDEX `fk_SERVICE_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `service_database`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`SCORE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`SCORE` ;

CREATE TABLE IF NOT EXISTS `service_database`.`SCORE` (
  `score_id` INT NOT NULL AUTO_INCREMENT,
  `score` FLOAT NOT NULL,
  `USER_user_id` INT NULL,
  `SERVICE_service_id` INT NOT NULL,
  PRIMARY KEY (`score_id`),
  INDEX `fk_SCORE_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  INDEX `fk_SCORE_SERVICE1_idx` (`SERVICE_service_id` ASC) VISIBLE,
  CONSTRAINT `fk_SCORE_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `service_database`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SCORE_SERVICE1`
    FOREIGN KEY (`SERVICE_service_id`)
    REFERENCES `service_database`.`SERVICE` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`HISTORY_CUSTOMER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`HISTORY_CUSTOMER` ;

CREATE TABLE IF NOT EXISTS `service_database`.`HISTORY_CUSTOMER` (
  `id_history` INT NOT NULL AUTO_INCREMENT,
  `history_date` DATE NOT NULL,
  `USER_user_id` INT NOT NULL,
  `SERVICE_service_id` INT NOT NULL,
  PRIMARY KEY (`id_history`),
  INDEX `fk_HISTORY_CUSTOMER_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  INDEX `fk_HISTORY_CUSTOMER_SERVICE1_idx` (`SERVICE_service_id` ASC) VISIBLE,
  CONSTRAINT `fk_HISTORY_CUSTOMER_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `service_database`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HISTORY_CUSTOMER_SERVICE1`
    FOREIGN KEY (`SERVICE_service_id`)
    REFERENCES `service_database`.`SERVICE` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`DEMAND_SERVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`DEMAND_SERVICE` ;

CREATE TABLE IF NOT EXISTS `service_database`.`DEMAND_SERVICE` (
  `demand_id` INT NOT NULL AUTO_INCREMENT,
  `demand_title` VARCHAR(45) NOT NULL,
  `demand_description` VARCHAR(256) NOT NULL,
  `USER_user_id` INT NOT NULL,
  PRIMARY KEY (`demand_id`),
  INDEX `fk_DEMAND_SERVICE_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_DEMAND_SERVICE_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `service_database`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`CITY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`CITY` ;

CREATE TABLE IF NOT EXISTS `service_database`.`CITY` (
  `place_id` INT NOT NULL AUTO_INCREMENT,
  `state` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `place_name` VARCHAR(45) NULL,
  PRIMARY KEY (`place_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`SERVICE_has_CITY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`SERVICE_has_CITY` ;

CREATE TABLE IF NOT EXISTS `service_database`.`SERVICE_has_CITY` (
  `SERVICE_service_id` INT NOT NULL,
  `CITY_place_id` INT NOT NULL,
  PRIMARY KEY (`SERVICE_service_id`, `CITY_place_id`),
  INDEX `fk_SERVICE_has_CITY_CITY1_idx` (`CITY_place_id` ASC) VISIBLE,
  INDEX `fk_SERVICE_has_CITY_SERVICE1_idx` (`SERVICE_service_id` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_has_CITY_SERVICE1`
    FOREIGN KEY (`SERVICE_service_id`)
    REFERENCES `service_database`.`SERVICE` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_has_CITY_CITY1`
    FOREIGN KEY (`CITY_place_id`)
    REFERENCES `service_database`.`CITY` (`place_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`COMMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`COMMENT` ;

CREATE TABLE IF NOT EXISTS `service_database`.`COMMENT` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(256) NOT NULL,
  `SERVICE_service_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_COMMENT_SERVICE1_idx` (`SERVICE_service_id` ASC) VISIBLE,
  CONSTRAINT `fk_COMMENT_SERVICE1`
    FOREIGN KEY (`SERVICE_service_id`)
    REFERENCES `service_database`.`SERVICE` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`SERVICE_CATEGORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`SERVICE_CATEGORY` ;

CREATE TABLE IF NOT EXISTS `service_database`.`SERVICE_CATEGORY` (
  `sc_id` INT NOT NULL AUTO_INCREMENT,
  `sc_name` VARCHAR(45) NOT NULL,
  `sc_description` VARCHAR(256) NOT NULL,
  `SERVICE_service_id` INT NOT NULL,
  PRIMARY KEY (`sc_id`),
  INDEX `fk_SERVICE_CATEGORY_SERVICE1_idx` (`SERVICE_service_id` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_CATEGORY_SERVICE1`
    FOREIGN KEY (`SERVICE_service_id`)
    REFERENCES `service_database`.`SERVICE` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_database`.`SERVICE_has_DEMAND_SERVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_database`.`SERVICE_has_DEMAND_SERVICE` ;

CREATE TABLE IF NOT EXISTS `service_database`.`SERVICE_has_DEMAND_SERVICE` (
  `SERVICE_service_id` INT NOT NULL,
  `DEMAND_SERVICE_demand_id` INT NOT NULL,
  PRIMARY KEY (`SERVICE_service_id`, `DEMAND_SERVICE_demand_id`),
  INDEX `fk_SERVICE_has_DEMAND_SERVICE_DEMAND_SERVICE1_idx` (`DEMAND_SERVICE_demand_id` ASC) VISIBLE,
  INDEX `fk_SERVICE_has_DEMAND_SERVICE_SERVICE1_idx` (`SERVICE_service_id` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_has_DEMAND_SERVICE_SERVICE1`
    FOREIGN KEY (`SERVICE_service_id`)
    REFERENCES `service_database`.`SERVICE` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_has_DEMAND_SERVICE_DEMAND_SERVICE1`
    FOREIGN KEY (`DEMAND_SERVICE_demand_id`)
    REFERENCES `service_database`.`DEMAND_SERVICE` (`demand_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
