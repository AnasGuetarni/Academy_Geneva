-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 06, 2019 at 12:33 PM
-- Server version: 5.7.24-0ubuntu0.18.04.1
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bato`
--

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id_level` int(11) NOT NULL,
  `name_level` varchar(250) COLLATE utf8_bin NOT NULL,
  `points_level` int(11) NOT NULL,
  `image_level` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id_level`, `name_level`, `points_level`, `image_level`) VALUES
(1, 'Touriste', 0, '/img/touriste.png'),
(2, 'Canapiste', 500, '/img/canapiste.png'),
(3, 'Jetski', 1000, '/img/jetski.png'),
(4, 'Titanic', 1500, '/img/titanic.png'),
(5, 'Moine', 2000, '/img/meditation.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username_user` varchar(250) NOT NULL,
  `password_user` varchar(250) NOT NULL,
  `date_creation_user` date NOT NULL,
  `total_point_solo_user` int(50) DEFAULT '0',
  `victoire_solo_user` int(50) DEFAULT '0',
  `defaite_solo_user` int(50) DEFAULT '0',
  `total_point_multi_user` int(50) DEFAULT '0',
  `victoire_multi_user` int(50) DEFAULT '0',
  `defaite_multi_user` int(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username_user`, `password_user`, `date_creation_user`, `total_point_solo_user`, `victoire_solo_user`, `defaite_solo_user`, `total_point_multi_user`, `victoire_multi_user`, `defaite_multi_user`) VALUES
(1, 'bato', '9f58efaab45c520f1b362d54ee430fb9', '2018-12-01', 2160, 45, 3, 240, 3, 2),
(3, 'bat', 'bat', '2018-12-01', 100, 2, 2, 1480, 2, 4),
(5, 'anas', '76eb649c047cbecad7c36e71374bc9a5', '2019-01-06', 0, 0, 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id_level`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id_level` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
