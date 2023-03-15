CREATE DATABASE db;

DROP TABLE IF EXISTS `db`.`Client`;
CREATE TABLE IF NOT EXISTS `db`.`Client` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `birth` DATE,
  `cpf` VARCHAR(18),
  `rg` VARCHAR(25),
  `phone` VARCHAR(25),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;


INSERT INTO `Client` (`name`, `birth`, `cpf`, `rg`, `phone`) VALUES 
('John Doe', '2013-03-03', '123.456.789-00', '123456', '(92) 9 9999-9999'),
('David Costa', '2013-03-03', '123.456.789-00', '123456', '(92) 9 9999-9999'),
('Todd Martell', '2013-03-03', '123.456.789-00', '123456', '(92) 9 9999-9999'),
('Adela Marion', '2013-03-03', '123.456.789-00', '123456', '(92) 9 9999-9999'),
('Matthew Popp', '2013-03-03', '123.456.789-00', '123456', '(92) 9 9999-9999');


/* MySQL does not contains any “ready” options to define the one-to-one relationship, but, if you want to enforce it, you can add a foreign key from one primary key to the other primary key, by doing this, both tables will have the one-to-one relationship automatically.


DROP TABLE IF EXISTS `db`.`User`;
CREATE TABLE `db`.`User` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `client_id` FOREIGN KEY (`id`) REFERENCES `Client`(`id`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


INSERT INTO `User` (`email`, `password`) VALUES 
('wiilliian.alves@gmail.com', '123456'); */
