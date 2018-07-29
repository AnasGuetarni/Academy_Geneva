-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 29, 2018 at 03:24 PM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AcademyGeneva`
--

-- --------------------------------------------------------

--
-- Table structure for table `Absence`
--

CREATE TABLE `Absence` (
  `IDENTIFIANT_ABSENCE` int(11) NOT NULL,
  `TYPE_ABSENCE` varchar(45) DEFAULT NULL,
  `DATE_ABSENCE` varchar(45) NOT NULL,
  `ETAT_ABSENCE` varchar(45) NOT NULL,
  `ELEVE_ID` int(11) NOT NULL,
  `MATIERE_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Absence`
--

INSERT INTO `Absence` (`IDENTIFIANT_ABSENCE`, `TYPE_ABSENCE`, `DATE_ABSENCE`, `ETAT_ABSENCE`, `ELEVE_ID`, `MATIERE_ID`) VALUES
(1, 'Retard', '26 juillet 2015', 'Justifié', 1, 1),
(2, 'Absence', '2 janvier 1945', 'Justifié', 2, 1),
(3, 'Arrivé a la periode', '3 janvier 2018', 'Non justifié', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `IDENTIFIANT_ADMIN` int(11) NOT NULL,
  `PRENOM_ADMIN` varchar(45) DEFAULT NULL,
  `NOM_ADMIN` varchar(45) DEFAULT NULL,
  `PASSWORD_ADMIN` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`IDENTIFIANT_ADMIN`, `PRENOM_ADMIN`, `NOM_ADMIN`, `PASSWORD_ADMIN`) VALUES
(1, 'anas', 'guetarni', 'psswd'),
(2, 'Adel', 'guiren', 'passwd');

-- --------------------------------------------------------

--
-- Table structure for table `Assiduite`
--

CREATE TABLE `Assiduite` (
  `ID Assiduite` int(11) NOT NULL,
  `ValeurAssiduite` varchar(45) DEFAULT NULL,
  `Eleve_ID Eleve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Classe`
--

CREATE TABLE `Classe` (
  `IDENTIFIANT_CLASSE` int(11) NOT NULL,
  `NOM_CLASSE` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Classe`
--

INSERT INTO `Classe` (`IDENTIFIANT_CLASSE`, `NOM_CLASSE`) VALUES
(1, 'A1'),
(2, 'A2');

-- --------------------------------------------------------

--
-- Table structure for table `Document`
--

CREATE TABLE `Document` (
  `IDENTIFIANT_DOCUMENT` int(11) NOT NULL,
  `NOM_DOCUMENT` varchar(45) DEFAULT NULL,
  `TAILLE_DOCUMENT` varchar(45) DEFAULT NULL,
  `EXT_DOCUMENT` varchar(45) DEFAULT NULL,
  `MATIERE_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Document`
--

INSERT INTO `Document` (`IDENTIFIANT_DOCUMENT`, `NOM_DOCUMENT`, `TAILLE_DOCUMENT`, `EXT_DOCUMENT`, `MATIERE_ID`) VALUES
(1, 'Attestation de lancement de la plateforme', '250', 'pdf', 1),
(2, 'Test', '125', 'csv', 1),
(3, 'cloud', '0.209263', 'csv', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Eleve`
--

CREATE TABLE `Eleve` (
  `IDENTIFIANT_ELEVE` int(11) NOT NULL,
  `PRENOM_ELEVE` varchar(45) NOT NULL,
  `NOM_ELEVE` varchar(45) DEFAULT NULL,
  `DATE_ELEVE` varchar(45) DEFAULT NULL,
  `PASSWORD_ELEVE` varchar(45) NOT NULL,
  `CLASSE_ID` int(11) NOT NULL,
  `MATIERE_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Eleve`
--

INSERT INTO `Eleve` (`IDENTIFIANT_ELEVE`, `PRENOM_ELEVE`, `NOM_ELEVE`, `DATE_ELEVE`, `PASSWORD_ELEVE`, `CLASSE_ID`, `MATIERE_ID`) VALUES
(1, 'Aristote', 'De Stagire', '384 av. JC', 'aristote', 1, 1),
(2, 'Homère', 'De Ioni', '-800 av. JC', 'homere', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Evenement`
--

CREATE TABLE `Evenement` (
  `IDENTIFIANT_EVENT` int(11) NOT NULL,
  `TITRE_EVENT` varchar(45) NOT NULL,
  `ALLDAY_EVENT` tinyint(1) NOT NULL DEFAULT '0',
  `BORDERCOL_EVENT` varchar(8) NOT NULL,
  `COLOR_EVENT` varchar(8) NOT NULL,
  `TEXTCOL_EVENT` varchar(8) NOT NULL,
  `DESCRIPTION_EVENT` varchar(200) NOT NULL,
  `START_EVENT` date NOT NULL,
  `END_EVENT` date NOT NULL,
  `MATIERE_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Evenement`
--

INSERT INTO `Evenement` (`IDENTIFIANT_EVENT`, `TITRE_EVENT`, `ALLDAY_EVENT`, `BORDERCOL_EVENT`, `COLOR_EVENT`, `TEXTCOL_EVENT`, `DESCRIPTION_EVENT`, `START_EVENT`, `END_EVENT`, `MATIERE_ID`) VALUES
(1, 'Rendu de l\'application', 0, '#5173DA', '#99ABEA', '#000000', 'Description du rendu de cette application', '2018-07-25', '2018-07-26', 1),
(2, 'Test de l\'application', 1, '#820F20', '#A6113C', '#ffffff', 'Période durant laquelle nous allons tester cette application', '2018-07-25', '2018-07-25', 1),
(3, 'Test insert', 0, '#5173DA', '#99ABEA', '#000000', 'Insert de test', '2018-07-27', '2018-07-28', 1),
(10, 'cloud', 0, '#5173DA', '#99ABEA', '#000000', 'Etudas', '2018-08-01', '2018-08-02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Matiere`
--

CREATE TABLE `Matiere` (
  `IDENTIFIANT_MATIERE` int(11) NOT NULL,
  `NOM_MATIERE` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Matiere`
--

INSERT INTO `Matiere` (`IDENTIFIANT_MATIERE`, `NOM_MATIERE`) VALUES
(1, 'ETUDES DE COMMERCE');

-- --------------------------------------------------------

--
-- Table structure for table `Notes`
--

CREATE TABLE `Notes` (
  `IDENTIFIANT_NOTES` int(2) UNSIGNED NOT NULL,
  `VALEUR_NOTE` int(11) DEFAULT NULL,
  `DATE_NOTE` varchar(45) NOT NULL,
  `MATIERE_ID` int(11) NOT NULL,
  `Eleve_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Notes`
--

INSERT INTO `Notes` (`IDENTIFIANT_NOTES`, `VALEUR_NOTE`, `DATE_NOTE`, `MATIERE_ID`, `Eleve_ID`) VALUES
(1, 5, '26 janvier 2018', 1, 2),
(2, 4, '15 fevrier 2018', 1, 1),
(3, 5, '24 janvier 2016', 1, 2),
(4, 6, '5 aout 2017', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Professeur`
--

CREATE TABLE `Professeur` (
  `IDENTIFIANT_PROFESSEUR` int(11) NOT NULL,
  `PRENOM_PROFESSEUR` varchar(45) DEFAULT NULL,
  `NOM_PROFESSEUR` varchar(45) DEFAULT NULL,
  `PASSWORD_PROFESSEUR` varchar(45) NOT NULL,
  `Matiere_ID` int(11) NOT NULL,
  `Classe_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Professeur`
--

INSERT INTO `Professeur` (`IDENTIFIANT_PROFESSEUR`, `PRENOM_PROFESSEUR`, `NOM_PROFESSEUR`, `PASSWORD_PROFESSEUR`, `Matiere_ID`, `Classe_ID`) VALUES
(1, 'Killian', 'MBappé', 'k', 1, 2),
(2, 'Paul', 'Pogba', 'p', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Absence`
--
ALTER TABLE `Absence`
  ADD PRIMARY KEY (`IDENTIFIANT_ABSENCE`),
  ADD KEY `fk_Absence_Eleve1_idx` (`ELEVE_ID`),
  ADD KEY `fk_Absence_Matiere1_idx` (`MATIERE_ID`);

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`IDENTIFIANT_ADMIN`);

--
-- Indexes for table `Assiduite`
--
ALTER TABLE `Assiduite`
  ADD PRIMARY KEY (`ID Assiduite`),
  ADD KEY `fk_Assiduite_Eleve1_idx` (`Eleve_ID Eleve`);

--
-- Indexes for table `Classe`
--
ALTER TABLE `Classe`
  ADD PRIMARY KEY (`IDENTIFIANT_CLASSE`);

--
-- Indexes for table `Document`
--
ALTER TABLE `Document`
  ADD PRIMARY KEY (`IDENTIFIANT_DOCUMENT`),
  ADD KEY `IDENTIFIANT_MATIERE_ix` (`MATIERE_ID`);

--
-- Indexes for table `Eleve`
--
ALTER TABLE `Eleve`
  ADD PRIMARY KEY (`IDENTIFIANT_ELEVE`),
  ADD KEY `CLASSE_ELEVE_ix` (`CLASSE_ID`),
  ADD KEY `MATIERE_ID_ix` (`MATIERE_ID`);

--
-- Indexes for table `Evenement`
--
ALTER TABLE `Evenement`
  ADD PRIMARY KEY (`IDENTIFIANT_EVENT`),
  ADD KEY `MATIERE_ID_Event_ix` (`MATIERE_ID`);

--
-- Indexes for table `Matiere`
--
ALTER TABLE `Matiere`
  ADD PRIMARY KEY (`IDENTIFIANT_MATIERE`);

--
-- Indexes for table `Notes`
--
ALTER TABLE `Notes`
  ADD PRIMARY KEY (`IDENTIFIANT_NOTES`),
  ADD KEY `fk_Notes_Matiere1_idx` (`MATIERE_ID`),
  ADD KEY `fk_Notes_Eleve1_idx` (`Eleve_ID`);

--
-- Indexes for table `Professeur`
--
ALTER TABLE `Professeur`
  ADD PRIMARY KEY (`IDENTIFIANT_PROFESSEUR`),
  ADD KEY `fk_Professeur_Matiere1_idx` (`Matiere_ID`),
  ADD KEY `fk_Professeur_Classe1_idx` (`Classe_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Absence`
--
ALTER TABLE `Absence`
  MODIFY `IDENTIFIANT_ABSENCE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `IDENTIFIANT_ADMIN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Assiduite`
--
ALTER TABLE `Assiduite`
  MODIFY `ID Assiduite` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Classe`
--
ALTER TABLE `Classe`
  MODIFY `IDENTIFIANT_CLASSE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Document`
--
ALTER TABLE `Document`
  MODIFY `IDENTIFIANT_DOCUMENT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `Eleve`
--
ALTER TABLE `Eleve`
  MODIFY `IDENTIFIANT_ELEVE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Evenement`
--
ALTER TABLE `Evenement`
  MODIFY `IDENTIFIANT_EVENT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `Matiere`
--
ALTER TABLE `Matiere`
  MODIFY `IDENTIFIANT_MATIERE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Notes`
--
ALTER TABLE `Notes`
  MODIFY `IDENTIFIANT_NOTES` int(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `Professeur`
--
ALTER TABLE `Professeur`
  MODIFY `IDENTIFIANT_PROFESSEUR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Absence`
--
ALTER TABLE `Absence`
  ADD CONSTRAINT `fk_Absence_Eleve1` FOREIGN KEY (`ELEVE_ID`) REFERENCES `Eleve` (`IDENTIFIANT_ELEVE`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Absence_Matiere1` FOREIGN KEY (`MATIERE_ID`) REFERENCES `Matiere` (`IDENTIFIANT_MATIERE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Assiduite`
--
ALTER TABLE `Assiduite`
  ADD CONSTRAINT `fk_Assiduite_Eleve1` FOREIGN KEY (`Eleve_ID Eleve`) REFERENCES `Eleve` (`IDENTIFIANT_ELEVE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Notes`
--
ALTER TABLE `Notes`
  ADD CONSTRAINT `fk_Notes_Eleve1` FOREIGN KEY (`Eleve_ID`) REFERENCES `Eleve` (`IDENTIFIANT_ELEVE`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Notes_Matiere1` FOREIGN KEY (`MATIERE_ID`) REFERENCES `Matiere` (`IDENTIFIANT_MATIERE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Professeur`
--
ALTER TABLE `Professeur`
  ADD CONSTRAINT `fk_Professeur_Classe1` FOREIGN KEY (`Classe_ID`) REFERENCES `Classe` (`IDENTIFIANT_CLASSE`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Professeur_Matiere1` FOREIGN KEY (`Matiere_ID`) REFERENCES `Matiere` (`IDENTIFIANT_MATIERE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
