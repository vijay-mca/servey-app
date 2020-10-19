-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: servey
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_question`
--

DROP TABLE IF EXISTS `tbl_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_question` (
  `ques_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`ques_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_question`
--

LOCK TABLES `tbl_question` WRITE;
/*!40000 ALTER TABLE `tbl_question` DISABLE KEYS */;
INSERT INTO `tbl_question` VALUES (10,'Next number after 11','12','2020-10-02 14:40:04',NULL),(11,'Next number after 12','13','2020-10-02 14:42:44',NULL);
/*!40000 ALTER TABLE `tbl_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_question_answer`
--

DROP TABLE IF EXISTS `tbl_question_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_question_answer` (
  `ques_ans_id` int(11) NOT NULL AUTO_INCREMENT,
  `ques_id` int(11) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `user_answer` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ques_ans_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_question_answer`
--

LOCK TABLES `tbl_question_answer` WRITE;
/*!40000 ALTER TABLE `tbl_question_answer` DISABLE KEYS */;
INSERT INTO `tbl_question_answer` VALUES (27,10,'2323','13'),(28,11,'2323','14'),(29,10,'232','13'),(30,11,'232','15'),(31,10,'232','14'),(32,10,'232','13'),(33,11,'232','14'),(34,11,'232','15'),(35,10,'232','16'),(36,10,'232','13'),(37,10,'232','16'),(38,11,'232','15'),(39,11,'232','14'),(40,10,'232','13'),(41,11,'232','17'),(42,10,'232','13'),(43,10,'232','14'),(44,11,'232','15'),(45,11,'232','16'),(46,10,'232','13'),(47,10,'232','14'),(48,11,'232','17'),(49,10,'232','13'),(50,11,'232','15'),(51,11,'232','16'),(52,10,'232','15'),(53,10,'232','14'),(54,10,'232','13'),(55,10,'232','15'),(56,10,'232','16'),(57,10,'232','13'),(58,10,'232','14'),(59,10,'232','13'),(60,10,'232','15'),(61,10,'232','13'),(62,10,'232','14'),(63,10,'232','13'),(64,10,'232','14'),(65,10,'232','15'),(66,10,'232','16'),(67,10,'232','13'),(68,10,'232','14'),(69,10,'232','15'),(70,10,'232','16'),(71,11,'232','15'),(72,11,'232','14'),(73,11,'232','17'),(74,10,'232','13'),(75,10,'232','15'),(76,11,'232','14'),(77,11,'232','17'),(78,11,'232','15'),(79,11,'232','16'),(80,10,'232','15'),(81,10,'::1','13'),(82,11,'::1','14'),(83,10,NULL,'16'),(84,10,NULL,'15'),(85,10,NULL,'14'),(86,10,NULL,'13'),(87,11,NULL,'17'),(88,11,NULL,'14'),(89,11,NULL,'15'),(90,11,NULL,'16'),(91,11,NULL,'17'),(92,10,NULL,'13'),(93,10,NULL,'14'),(94,10,NULL,'15'),(95,10,NULL,'14'),(96,10,NULL,'14'),(97,11,NULL,'16'),(98,10,NULL,'14'),(99,10,NULL,'14'),(100,10,NULL,'15'),(101,10,'157.50.19.113','16'),(102,11,'157.50.19.113','16');
/*!40000 ALTER TABLE `tbl_question_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_question_options`
--

DROP TABLE IF EXISTS `tbl_question_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_question_options` (
  `ques_opt_id` int(11) NOT NULL AUTO_INCREMENT,
  `ques_id` int(11) DEFAULT NULL,
  `options` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ques_opt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_question_options`
--

LOCK TABLES `tbl_question_options` WRITE;
/*!40000 ALTER TABLE `tbl_question_options` DISABLE KEYS */;
INSERT INTO `tbl_question_options` VALUES (26,10,'13,14,15,16'),(27,11,'17,14,15,16');
/*!40000 ALTER TABLE `tbl_question_options` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-07 20:00:31
