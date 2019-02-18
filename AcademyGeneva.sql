-- MySQL dump 10.17  Distrib 10.3.12-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: AcademyGeneva
-- ------------------------------------------------------
-- Server version	10.3.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Absence`
--

DROP TABLE IF EXISTS `Absence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Absence` (
  `IDENTIFIANT_ABSENCE` int(11) NOT NULL AUTO_INCREMENT,
  `TYPE_ABSENCE` varchar(45) DEFAULT NULL,
  `DATE_ABSENCE` varchar(45) NOT NULL,
  `ETAT_ABSENCE` varchar(45) NOT NULL,
  `ELEVE_ID` int(11) NOT NULL,
  `MATIERE_ID` int(11) NOT NULL,
  PRIMARY KEY (`IDENTIFIANT_ABSENCE`),
  KEY `fk_Absence_Eleve1_idx` (`ELEVE_ID`),
  KEY `fk_Absence_Matiere1_idx` (`MATIERE_ID`),
  CONSTRAINT `fk_Absence_Eleve1` FOREIGN KEY (`ELEVE_ID`) REFERENCES `Eleve` (`IDENTIFIANT_ELEVE`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Absence`
--

LOCK TABLES `Absence` WRITE;
/*!40000 ALTER TABLE `Absence` DISABLE KEYS */;
INSERT INTO `Absence` VALUES (32,'Arrivé à la période','2019-01-17 20:53:28.966','Justifié',1,2),(33,'Arrivé à la période','2019-01-17 20:54:55.712','Justifié',1,2),(34,'Retard','2019-01-17 21:08:23.699','Justifié',1,1),(35,'Arrivé à la période','2019-01-17 21:08:46.569','Justifié',1,2),(36,'Absence','2019-01-17 21:21:37.765','Justifié',3,2),(37,'Arrivé à la période','2019-01-17 21:27:18.408','Justifié',2,2),(38,'Retard','2019-01-17 21:27:57.075','Justifié',1,1),(39,'Retard','2019-01-17 21:29:41.319','Justifié',1,1),(40,'Retard','2019-01-17 23:46:53.720','Justifié',1,1),(41,'Retard','2019-01-18 10:53:40.815','Justifié',1,1),(42,'Arrivé à la période','2019-01-18 14:01:45.467','Justifié',3,1),(43,'Arrivé à la période','2019-01-21 20:52:11.586','Justifié',2,2),(44,'Retard','2019-01-26 16:05:19.788','Non justifié',1,1),(45,'Retard','2019-01-30 16:21:12.139','Non justifié',1,3),(46,'Retard','2019-02-12 18:18:15.608','Non justifié',4,9);
/*!40000 ALTER TABLE `Absence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `IDENTIFIANT_ADMIN` int(11) NOT NULL AUTO_INCREMENT,
  `PRENOM_ADMIN` varchar(45) DEFAULT NULL,
  `NOM_ADMIN` varchar(45) DEFAULT NULL,
  `PASSWORD_ADMIN` varchar(100) NOT NULL,
  PRIMARY KEY (`IDENTIFIANT_ADMIN`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (1,'anas','guetarni','psswd'),(2,'Adel','guiren','passwd');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Assiduite`
--

DROP TABLE IF EXISTS `Assiduite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Assiduite` (
  `ID Assiduite` int(11) NOT NULL AUTO_INCREMENT,
  `ValeurAssiduite` varchar(45) DEFAULT NULL,
  `Eleve_ID Eleve` int(11) NOT NULL,
  PRIMARY KEY (`ID Assiduite`),
  KEY `fk_Assiduite_Eleve1_idx` (`Eleve_ID Eleve`),
  CONSTRAINT `fk_Assiduite_Eleve1` FOREIGN KEY (`Eleve_ID Eleve`) REFERENCES `Eleve` (`IDENTIFIANT_ELEVE`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assiduite`
--

LOCK TABLES `Assiduite` WRITE;
/*!40000 ALTER TABLE `Assiduite` DISABLE KEYS */;
/*!40000 ALTER TABLE `Assiduite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Classe`
--

DROP TABLE IF EXISTS `Classe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Classe` (
  `IDENTIFIANT_CLASSE` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_CLASSE` varchar(45) NOT NULL,
  PRIMARY KEY (`IDENTIFIANT_CLASSE`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classe`
--

LOCK TABLES `Classe` WRITE;
/*!40000 ALTER TABLE `Classe` DISABLE KEYS */;
INSERT INTO `Classe` VALUES (1,'A1'),(2,'A2');
/*!40000 ALTER TABLE `Classe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Document` (
  `IDENTIFIANT_DOCUMENT` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_DOCUMENT` varchar(45) DEFAULT NULL,
  `TAILLE_DOCUMENT` varchar(45) DEFAULT NULL,
  `EXT_DOCUMENT` varchar(45) DEFAULT NULL,
  `MATIERE_ID` int(11) NOT NULL,
  PRIMARY KEY (`IDENTIFIANT_DOCUMENT`),
  KEY `IDENTIFIANT_MATIERE_ix` (`MATIERE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Document`
--

LOCK TABLES `Document` WRITE;
/*!40000 ALTER TABLE `Document` DISABLE KEYS */;
INSERT INTO `Document` VALUES (1,'Attestation de lancement de la plateforme','250','pdf',1),(2,'Test','125','csv',1),(3,'cloud','0.209263','csv',1),(8,'justificatif_absence_14','0.202092','pdf',1),(9,'justificatif_absence_26','0.00138','js',1),(10,'justificatif_absence_27','0.00138','js',1),(11,'justificatif_absence_28','0.202092','pdf',1),(12,'justificatif_absence_27','0.202092','pdf',1),(13,'justificatif_absence_29','0.202092','pdf',1),(14,'justificatif_absence_30','0.202092','pdf',1),(15,'justificatif_absence_31','0.202092','pdf',1),(16,'justificatif_absence_36','0.00138','js',2),(17,'justificatif_absence_35','0.202092','pdf',2),(18,'justificatif_absence_34','0.202092','pdf',1),(19,'justificatif_absence_33','0.202092','pdf',2),(20,'justificatif_absence_32','0.000689','json',2),(21,'justificatif_absence_32','0.202092','pdf',2),(22,'justificatif_absence_37','0.202092','pdf',2),(23,'justificatif_absence_38','0.202092','pdf',1),(24,'justificatif_absence_39','0.202092','pdf',1),(25,'justificatif_absence_40','0.202092','pdf',1),(26,'Bato_rendu','0.202092','pdf',1),(27,'justificatif_absence_41','0.202092','pdf',1),(28,'justificatif_absence_42','0.202092','pdf',1),(29,'justificatif_absence_43','0.202092','pdf',2);
/*!40000 ALTER TABLE `Document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Eleve`
--

DROP TABLE IF EXISTS `Eleve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Eleve` (
  `IDENTIFIANT_ELEVE` int(11) NOT NULL AUTO_INCREMENT,
  `PRENOM_ELEVE` varchar(45) NOT NULL,
  `NOM_ELEVE` varchar(45) DEFAULT NULL,
  `DATE_ELEVE` varchar(45) DEFAULT NULL,
  `PASSWORD_ELEVE` varchar(45) NOT NULL,
  `FORMATION_ID` int(11) NOT NULL,
  `IMAGE_ELEVE` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDENTIFIANT_ELEVE`),
  KEY `fk_eleve_formation` (`FORMATION_ID`),
  CONSTRAINT `fk_eleve_formation` FOREIGN KEY (`FORMATION_ID`) REFERENCES `Formation` (`id_formation`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Eleve`
--

LOCK TABLES `Eleve` WRITE;
/*!40000 ALTER TABLE `Eleve` DISABLE KEYS */;
INSERT INTO `Eleve` VALUES (1,'Aristote','De Stagire','384 av. JC','aristote',1,'economy.jpeg'),(2,'Homère','De Ioni','-800 av. JC','homere',1,'economy.jpeg'),(3,'Yvan','DeTout','15 janvier 2018','yvan',1,'economy.jpeg'),(4,'Anas','Guetarni','1 janvier 2019','anas',6,'economy.jpeg'),(7,'V','V','2019-02-12 19:09:42.780','9yT2KTgH',1,'economy.jpeg'),(8,'Z','Z','2019-02-12 19:10:38.035','iJWItrvt',1,'economy.jpeg'),(9,'I','I','2019-02-12 19:14:49.294','dcqSxy9T',1,'economy.jpeg'),(10,'Q','Q','2019-02-12 19:15:57.517','WGqXmvnP',1,'economy.jpeg');
/*!40000 ALTER TABLE `Eleve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Evenement`
--

DROP TABLE IF EXISTS `Evenement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Evenement` (
  `IDENTIFIANT_EVENT` int(11) NOT NULL AUTO_INCREMENT,
  `TITRE_EVENT` varchar(45) NOT NULL,
  `ALLDAY_EVENT` tinyint(1) NOT NULL DEFAULT 0,
  `BORDERCOL_EVENT` varchar(8) NOT NULL,
  `COLOR_EVENT` varchar(8) NOT NULL,
  `TEXTCOL_EVENT` varchar(8) NOT NULL,
  `DESCRIPTION_EVENT` varchar(200) NOT NULL,
  `START_EVENT` date NOT NULL,
  `END_EVENT` date NOT NULL,
  `MATIERE_ID` int(11) NOT NULL,
  PRIMARY KEY (`IDENTIFIANT_EVENT`),
  KEY `MATIERE_ID_Event_ix` (`MATIERE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evenement`
--

LOCK TABLES `Evenement` WRITE;
/*!40000 ALTER TABLE `Evenement` DISABLE KEYS */;
INSERT INTO `Evenement` VALUES (1,'Rendu de l\'application',0,'#5173DA','#99ABEA','#000000','Description du rendu de cette application','2018-07-25','2018-07-26',1),(2,'Test de l\'application',1,'#820F20','#A6113C','#ffffff','Période durant laquelle nous allons tester cette application','2018-07-25','2018-07-25',1),(3,'Test insert',0,'#5173DA','#99ABEA','#000000','Insert de test','2018-07-27','2018-07-28',1),(10,'cloud',0,'#5173DA','#99ABEA','#000000','Etudas','2018-08-01','2018-08-02',1);
/*!40000 ALTER TABLE `Evenement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Formation`
--

DROP TABLE IF EXISTS `Formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Formation` (
  `id_formation` int(11) NOT NULL AUTO_INCREMENT,
  `nom_formation` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_formation` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_formation`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Formation`
--

LOCK TABLES `Formation` WRITE;
/*!40000 ALTER TABLE `Formation` DISABLE KEYS */;
INSERT INTO `Formation` VALUES (1,'ETUDES DE COMMERCE','economy.jpeg'),(2,'ANGLAIS','english.jpeg'),(5,'FRANCAIS','economy.jpeg'),(6,'ETUDES SUPERIEURES DE COMMERCE','economy.jpeg');
/*!40000 ALTER TABLE `Formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Matiere`
--

DROP TABLE IF EXISTS `Matiere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Matiere` (
  `IDENTIFIANT_MATIERE` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_MATIERE` varchar(45) DEFAULT NULL,
  `IMAGE_MATIERE` varchar(100) DEFAULT NULL,
  `FORMATION_ID` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`IDENTIFIANT_MATIERE`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Matiere`
--

LOCK TABLES `Matiere` WRITE;
/*!40000 ALTER TABLE `Matiere` DISABLE KEYS */;
INSERT INTO `Matiere` VALUES (3,'Francais general et commercial','economy.jpeg',1),(4,'Anglais general et commercial','economy.jpeg',1),(5,'Allemend general et commercial','economy.jpeg',1),(6,'Italien general et commercial','economy.jpeg',1),(7,'Informatique et bureautique','economy.jpeg',1),(8,'Communication et redation commerciale','economy.jpeg',1),(9,'Comptabilite generale et financiere','economy.jpeg',1),(10,'Economie, marketing et management','economy.jpeg',1),(11,'Droit commercial prive','economy.jpeg',1),(12,'Coaching methodologique et projets','economy.jpeg',1);
/*!40000 ALTER TABLE `Matiere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notes`
--

DROP TABLE IF EXISTS `Notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notes` (
  `IDENTIFIANT_NOTES` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `VALEUR_NOTE` int(11) DEFAULT NULL,
  `DATE_NOTE` varchar(45) NOT NULL,
  `MATIERE_ID` int(11) NOT NULL,
  `Eleve_ID` int(11) NOT NULL,
  PRIMARY KEY (`IDENTIFIANT_NOTES`),
  KEY `fk_Notes_Matiere1_idx` (`MATIERE_ID`),
  KEY `fk_Notes_Eleve1_idx` (`Eleve_ID`),
  CONSTRAINT `fk_Notes_Eleve1` FOREIGN KEY (`Eleve_ID`) REFERENCES `Eleve` (`IDENTIFIANT_ELEVE`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notes`
--

LOCK TABLES `Notes` WRITE;
/*!40000 ALTER TABLE `Notes` DISABLE KEYS */;
INSERT INTO `Notes` VALUES (1,5,'26 janvier 2018',1,2),(2,4,'15 fevrier 2018',1,1),(3,5,'24 janvier 2016',1,2),(4,6,'5 aout 2017',1,1),(5,4,'1 janvier 2019',2,3),(6,5,'1 janvier 2019',2,2),(7,5,'1 janvier 2019',2,1),(8,1,'2019-01-18 00:54:00.060',2,3),(9,2,'2019-01-18 10:54:02.614',1,1),(10,5,'2019-01-18 14:03:34.584',2,1),(11,4,'2019-01-30 16:21:24.513',3,1),(12,5,'2019-01-30 16:21:41.630',7,1),(13,0,'2019-01-30 16:21:53.663',3,4);
/*!40000 ALTER TABLE `Notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Professeur`
--

DROP TABLE IF EXISTS `Professeur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Professeur` (
  `IDENTIFIANT_PROFESSEUR` int(11) NOT NULL AUTO_INCREMENT,
  `PRENOM_PROFESSEUR` varchar(45) DEFAULT NULL,
  `NOM_PROFESSEUR` varchar(45) DEFAULT NULL,
  `PASSWORD_PROFESSEUR` varchar(45) NOT NULL,
  `Matiere_ID` int(11) NOT NULL,
  `Classe_ID` int(11) NOT NULL,
  PRIMARY KEY (`IDENTIFIANT_PROFESSEUR`),
  KEY `fk_Professeur_Matiere1_idx` (`Matiere_ID`),
  KEY `fk_Professeur_Classe1_idx` (`Classe_ID`),
  CONSTRAINT `fk_Professeur_Classe1` FOREIGN KEY (`Classe_ID`) REFERENCES `Classe` (`IDENTIFIANT_CLASSE`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Professeur`
--

LOCK TABLES `Professeur` WRITE;
/*!40000 ALTER TABLE `Professeur` DISABLE KEYS */;
INSERT INTO `Professeur` VALUES (1,'Killian','MBappé','k',1,2),(2,'Paul','Pogba','p',1,1);
/*!40000 ALTER TABLE `Professeur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-18 21:25:00
