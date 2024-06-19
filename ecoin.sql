-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: ecoin
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add order',7,'add_order'),(26,'Can change order',7,'change_order'),(27,'Can delete order',7,'delete_order'),(28,'Can view order',7,'view_order'),(29,'Can add product',8,'add_product'),(30,'Can change product',8,'change_product'),(31,'Can delete product',8,'delete_product'),(32,'Can view product',8,'view_product'),(33,'Can add shipping address',9,'add_shippingaddress'),(34,'Can change shipping address',9,'change_shippingaddress'),(35,'Can delete shipping address',9,'delete_shippingaddress'),(36,'Can view shipping address',9,'view_shippingaddress'),(37,'Can add order item',10,'add_orderitem'),(38,'Can change order item',10,'change_orderitem'),(39,'Can delete order item',10,'delete_orderitem'),(40,'Can view order item',10,'view_orderitem'),(41,'Can add user info',11,'add_userinfo'),(42,'Can change user info',11,'change_userinfo'),(43,'Can delete user info',11,'delete_userinfo'),(44,'Can view user info',11,'view_userinfo');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authen_user`
--

DROP TABLE IF EXISTS `authen_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authen_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authen_user`
--

LOCK TABLES `authen_user` WRITE;
/*!40000 ALTER TABLE `authen_user` DISABLE KEYS */;
INSERT INTO `authen_user` VALUES (1,'',NULL,'nova','admin@example.com','customer','$2b$12$wkxzfms6ZhEwJsHS5NXQWOOS3vbGvHALzoXILonW9lNRGUv6wW4F6',1,1,1),(2,'pbkdf2_sha256$600000$Xr6gExfIlCvscuSXVmOUbP$2ttZWnN8c4yEG7xChsdt9x3GpT+r5vvPgCHfMaJlqz4=','2024-05-13 06:57:44.672055','','admin@admin.com','customer','',1,1,1),(3,'',NULL,'superadmin','admin@email.com','admin','$2b$12$LNqkXVazh2Tz9VpNxogr5e7R9X9AZeq.2RVgcTcRxeDndF2DV3bOi',1,1,1);
/*!40000 ALTER TABLE `authen_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authen_user_groups`
--

DROP TABLE IF EXISTS `authen_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authen_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `authen_user_groups_user_id_group_id_162fc86d_uniq` (`user_id`,`group_id`),
  KEY `authen_user_groups_group_id_bc335d58_fk_auth_group_id` (`group_id`),
  CONSTRAINT `authen_user_groups_group_id_bc335d58_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `authen_user_groups_user_id_3b4ee906_fk_authen_user_id` FOREIGN KEY (`user_id`) REFERENCES `authen_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authen_user_groups`
--

LOCK TABLES `authen_user_groups` WRITE;
/*!40000 ALTER TABLE `authen_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `authen_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authen_user_user_permissions`
--

DROP TABLE IF EXISTS `authen_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authen_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `authen_user_user_permissions_user_id_permission_id_3834585a_uniq` (`user_id`,`permission_id`),
  KEY `authen_user_user_per_permission_id_eb0a78b8_fk_auth_perm` (`permission_id`),
  CONSTRAINT `authen_user_user_per_permission_id_eb0a78b8_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `authen_user_user_permissions_user_id_766f6300_fk_authen_user_id` FOREIGN KEY (`user_id`) REFERENCES `authen_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authen_user_user_permissions`
--

LOCK TABLES `authen_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `authen_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `authen_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_authen_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_authen_user_id` FOREIGN KEY (`user_id`) REFERENCES `authen_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-02-25 06:17:39.696369','1','Apple AirPods (2nd Generation)',1,'[{\"added\": {}}]',8,2),(2,'2024-02-25 06:22:50.240159','2','Apple AirPods Pro (2nd Generation)',1,'[{\"added\": {}}]',8,2),(3,'2024-02-25 06:24:25.076073','3','Apple Watch Ultra 2 [GPS + Cellular 49mm]',1,'[{\"added\": {}}]',8,2),(4,'2024-02-25 06:27:11.080091','4','Apple Watch SE (2nd Gen) [GPS 40mm]',1,'[{\"added\": {}}]',8,2),(5,'2024-02-25 06:28:44.138831','5','Late 2020 Apple MacBook Air with Apple M1 Chip (13.3 inch, 8GB RAM, 256GB SSD)',1,'[{\"added\": {}}]',8,2),(6,'2024-05-12 16:42:11.994013','5','Late 2020 Apple MacBook Air with Apple M1 Chip (13.3 inch, 8GB RAM, 256GB SSD)',2,'[{\"changed\": {\"fields\": [\"IsHotSaled\"]}}]',8,2),(7,'2024-05-13 06:58:36.322367','5','Late 2020 Apple MacBook Air with Apple M1 Chip (13.3 inch, 8GB RAM, 256GB SSD)',2,'[{\"changed\": {\"fields\": [\"Brand\", \"Categories\", \"Model\"]}}]',8,2),(8,'2024-05-13 06:58:59.852858','4','Apple Watch SE (2nd Gen) [GPS 40mm]',2,'[{\"changed\": {\"fields\": [\"Brand\", \"Categories\", \"Model\"]}}]',8,2),(9,'2024-05-13 07:00:18.407948','3','Apple Watch Ultra 2 [GPS + Cellular 49mm]',2,'[{\"changed\": {\"fields\": [\"Brand\", \"Categories\", \"Model\"]}}]',8,2),(10,'2024-05-13 07:00:31.901921','4','Apple Watch SE (2nd Gen) [GPS 40mm]',2,'[{\"changed\": {\"fields\": [\"Model\"]}}]',8,2),(11,'2024-05-13 07:01:06.951856','2','Apple AirPods Pro (2nd Generation)',2,'[{\"changed\": {\"fields\": [\"Brand\", \"Categories\", \"Model\"]}}]',8,2),(12,'2024-05-13 07:01:46.120725','1','Apple AirPods (2nd Generation)',2,'[{\"changed\": {\"fields\": [\"Brand\", \"Categories\", \"Model\"]}}]',8,2),(13,'2024-05-13 07:03:07.933322','6','Apple iPad Air (5th Generation): with M1 chip, 10.9-inch Liquid Retina Display, 256GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Starlight',1,'[{\"added\": {}}]',8,2),(14,'2024-05-13 07:03:37.805523','6','Apple iPad Air (5th Generation): with M1 chip, 10.9-inch Liquid Retina Display, 256GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Starlight',2,'[{\"changed\": {\"fields\": [\"IsHotSaled\"]}}]',8,2),(15,'2024-05-13 07:05:24.856071','7','Apple iPad (10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue',1,'[{\"added\": {}}]',8,2),(16,'2024-05-13 07:07:39.374760','8','Apple 2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone and iPad; Midnight',1,'[{\"added\": {}}]',8,2),(17,'2024-05-13 07:08:58.242635','9','Apple AirPods (3rd Generation) Wireless Ear Buds, Bluetooth Headphones, Personalized Spatial Audio, Sweat and Water Resistant, Lightning Charging Case Included, Up to 30 Hours of Battery Life',1,'[{\"added\": {}}]',8,2),(18,'2024-05-13 07:09:09.024325','2','Apple AirPods Pro (2nd Generation)',2,'[{\"changed\": {\"fields\": [\"Categories\"]}}]',8,2),(19,'2024-05-13 07:09:16.907143','1','Apple AirPods (2nd Generation)',2,'[{\"changed\": {\"fields\": [\"Categories\"]}}]',8,2),(20,'2024-05-13 07:09:20.910094','1','Apple AirPods (2nd Generation)',2,'[{\"changed\": {\"fields\": [\"Categories\"]}}]',8,2),(21,'2024-05-13 07:41:15.342820','10','Apple 2024 MacBook Air 13-inch Laptop with M3 chip: 13.6-inch Liquid Retina Display, 8GB Unified Memory, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera, Touch ID; Starlight',1,'[{\"added\": {}}]',8,2),(22,'2024-05-13 07:42:30.275799','11','Apple AirPods Max Wireless Over-Ear Headphones, Active Noise Cancelling, Transparency Mode, Personalized Spatial Audio, Dolby Atmos, Bluetooth Headphones for iPhone – Space Gray',1,'[{\"added\": {}}]',8,2),(23,'2024-05-13 07:45:26.343426','12','ZAGG Pro Keys Wireless Keyboard & Detachable Case for iPad Pro 12.9 - Backlit Keys, Apple Pencil Holder, 6.6ft Drop Protection',1,'[{\"added\": {}}]',8,2),(24,'2024-05-13 10:06:51.244374','13','Apple 2023 MacBook Pro Laptop M3 Max chip with 16‑core CPU, 40‑core GPU: 16.2-inch Liquid Retina XDR Display, 48GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Silver',1,'[{\"added\": {}}]',8,2),(25,'2024-05-13 10:11:13.305010','14','Apple iPhone 15, 128GB, Black - Verizon (Renewed)',1,'[{\"added\": {}}]',8,2),(26,'2024-05-13 10:12:57.196151','15','Tracfone Apple iPhone SE 5G (3rd Generation), 64GB, Black - Prepaid Smartphone (Locked) Visit the TracFone Store',1,'[{\"added\": {}}]',8,2),(27,'2024-05-13 10:13:44.773102','12','ZAGG Pro Keys Wireless Keyboard & Detachable Case for iPad Pro 12.9 - Backlit Keys, Apple Pencil Holder, 6.6ft Drop Protection',2,'[{\"changed\": {\"fields\": [\"ImageUploadURL\"]}}]',8,2),(28,'2024-05-13 11:27:13.919627','16','Apple iPhone 7 32GB Unlocked - Black',1,'[{\"added\": {}}]',8,2),(29,'2024-05-13 11:28:43.179147','17','SAMSUNG Galaxy S24+ Plus Cell Phone, 512GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version 2024 Cobalt Violet',1,'[{\"added\": {}}]',8,2),(30,'2024-05-13 11:29:41.854091','18','SAMSUNG Galaxy S24+ Plus Cell Phone, 512GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version 2024, Amber Yellow',1,'[{\"added\": {}}]',8,2),(31,'2024-05-13 11:30:30.402358','19','Apple iPhone 14 Pro Max, 256GB, Space Black - Unlocked (Renewed Premium)',1,'[{\"added\": {}}]',8,2),(32,'2024-05-13 11:31:13.924095','20','Apple iPhone 13 Pro Max, 128GB, Sierra Blue - Unlocked (Renewed)',1,'[{\"added\": {}}]',8,2);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(6,'authen','user'),(4,'contenttypes','contenttype'),(5,'sessions','session'),(7,'store','order'),(10,'store','orderitem'),(8,'store','product'),(9,'store','shippingaddress'),(11,'store','userinfo');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-02-25 05:09:31.949455'),(2,'contenttypes','0002_remove_content_type_name','2024-02-25 05:09:31.967682'),(3,'auth','0001_initial','2024-02-25 05:09:32.019747'),(4,'auth','0002_alter_permission_name_max_length','2024-02-25 05:09:32.033820'),(5,'auth','0003_alter_user_email_max_length','2024-02-25 05:09:32.037275'),(6,'auth','0004_alter_user_username_opts','2024-02-25 05:09:32.040528'),(7,'auth','0005_alter_user_last_login_null','2024-02-25 05:09:32.044929'),(8,'auth','0006_require_contenttypes_0002','2024-02-25 05:09:32.045870'),(9,'auth','0007_alter_validators_add_error_messages','2024-02-25 05:09:32.048938'),(10,'auth','0008_alter_user_username_max_length','2024-02-25 05:09:32.052077'),(11,'auth','0009_alter_user_last_name_max_length','2024-02-25 05:09:32.055098'),(12,'auth','0010_alter_group_name_max_length','2024-02-25 05:09:32.061565'),(13,'auth','0011_update_proxy_permissions','2024-02-25 05:09:32.065016'),(14,'auth','0012_alter_user_first_name_max_length','2024-02-25 05:09:32.068088'),(15,'authen','0001_initial','2024-02-25 05:09:32.130776'),(16,'admin','0001_initial','2024-02-25 05:09:32.163349'),(17,'admin','0002_logentry_remove_auto_add','2024-02-25 05:09:32.168652'),(18,'admin','0003_logentry_add_action_flag_choices','2024-02-25 05:09:32.174671'),(19,'sessions','0001_initial','2024-02-25 05:09:32.183945'),(20,'store','0001_initial','2024-02-25 05:09:32.262929'),(21,'store','0002_bankinfo_userinfo','2024-02-25 05:09:32.285082'),(22,'store','0003_userinfo_user','2024-02-25 05:09:32.307901'),(23,'store','0004_alter_userinfo_date_of_birth','2024-02-25 05:09:32.322105'),(24,'store','0005_remove_userinfo_bankinfo_userinfo_account_holder_and_more','2024-02-25 05:09:32.380068'),(25,'store','0006_alter_userinfo_date_of_birth','2024-02-25 05:09:32.395914'),(26,'store','0007_userinfo_city_userinfo_home_address_and_more','2024-02-25 05:09:32.458670'),(27,'store','0008_product_description','2024-02-25 05:09:32.471800'),(28,'store','0009_product_instock','2024-02-25 05:09:32.482368'),(29,'store','0010_remove_order_date_ordered_alter_order_transaction_id','2024-02-25 05:09:32.531407'),(30,'store','0011_product_ishotsaled','2024-05-12 16:41:57.983616'),(31,'store','0012_product_brand_product_categories_product_model','2024-05-13 06:57:15.061851'),(32,'store','0013_alter_product_model','2024-05-13 07:45:20.122255'),(33,'store','0014_product_name_index_idx','2024-05-14 07:50:03.207417');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('fzd58br5thq8t2w7ily7xeb27g7vc2eu','.eJxVjLsOAiEURP-F2hDeD0t7v4EA9yKrBpJltzL-u5Jsod1kzpl5kRD3rYZ94BoWIGciyOm3SzE_sE0A99hunebetnVJdCr0oINeO-Dzcrh_BzWO-l2nDFlr5iXX4IRgGlguxaNTjhnOQSuGGdEmNxPTMZUiuTXcJ-WMleT9Ad6hN3M:1re7lr:Yz7jqFR_YCqzc_rRKUnkpb07AmxrbiXZO3mSK6QUG8o','2024-03-10 06:13:55.362460'),('mjouv95uvnr4birqbqhtiowexqf2sb2t','.eJxVjLsOAiEURP-F2hDeD0t7v4EA9yKrBpJltzL-u5Jsod1kzpl5kRD3rYZ94BoWIGciyOm3SzE_sE0A99hunebetnVJdCr0oINeO-Dzcrh_BzWO-l2nDFlr5iXX4IRgGlguxaNTjhnOQSuGGdEmNxPTMZUiuTXcJ-WMleT9Ad6hN3M:1rv7Qm:mL6X-J61N0JRgUVJIT9dwaP0YWr1ByRLxnvhEqjbC_A','2024-04-26 03:18:24.316452'),('n1vhfmalc4bb44nfdyxw4wqknl1227z4','.eJxVjLsOAiEURP-F2hDeD0t7v4EA9yKrBpJltzL-u5Jsod1kzpl5kRD3rYZ94BoWIGciyOm3SzE_sE0A99hunebetnVJdCr0oINeO-Dzcrh_BzWO-l2nDFlr5iXX4IRgGlguxaNTjhnOQSuGGdEmNxPTMZUiuTXcJ-WMleT9Ad6hN3M:1s6Pd2:JgzYBvp4TQsu8_lPMAOoHsZu6bSk1_7SbE3CVSo5Izw','2024-05-27 06:57:44.673254'),('skdyq118pi0bb18akf2hum2s2vsiwjxt','.eJxVjLsOAiEURP-F2hDeD0t7v4EA9yKrBpJltzL-u5Jsod1kzpl5kRD3rYZ94BoWIGciyOm3SzE_sE0A99hunebetnVJdCr0oINeO-Dzcrh_BzWO-l2nDFlr5iXX4IRgGlguxaNTjhnOQSuGGdEmNxPTMZUiuTXcJ-WMleT9Ad6hN3M:1s6CGR:y38CpKRegCg1IvQyWf3ZuFyU3J49hwlK4URpb3r0ofs','2024-05-26 16:41:31.824532');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_order`
--

DROP TABLE IF EXISTS `store_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `complete` tinyint(1) DEFAULT NULL,
  `transaction_id` char(32) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_order_user_id_ae5f7a5f_fk_authen_user_id` (`user_id`),
  CONSTRAINT `store_order_user_id_ae5f7a5f_fk_authen_user_id` FOREIGN KEY (`user_id`) REFERENCES `authen_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_order`
--

LOCK TABLES `store_order` WRITE;
/*!40000 ALTER TABLE `store_order` DISABLE KEYS */;
INSERT INTO `store_order` VALUES (1,1,'7ec582a3feb14df59452f27b56db4da8',1),(2,1,'d3cf09f5d4cf41da8bbf84a6d20bbf0f',1),(3,0,'1ed93bf33da1487c82aa96a7a8abeb0d',1);
/*!40000 ALTER TABLE `store_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_orderitem`
--

DROP TABLE IF EXISTS `store_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `date_added` datetime(6) NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_orderitem_order_id_acf8722d_fk_store_order_id` (`order_id`),
  KEY `store_orderitem_product_id_f2b098d4_fk_store_product_id` (`product_id`),
  CONSTRAINT `store_orderitem_order_id_acf8722d_fk_store_order_id` FOREIGN KEY (`order_id`) REFERENCES `store_order` (`id`),
  CONSTRAINT `store_orderitem_product_id_f2b098d4_fk_store_product_id` FOREIGN KEY (`product_id`) REFERENCES `store_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_orderitem`
--

LOCK TABLES `store_orderitem` WRITE;
/*!40000 ALTER TABLE `store_orderitem` DISABLE KEYS */;
INSERT INTO `store_orderitem` VALUES (1,1,'2024-02-25 06:58:04.451492',1,1),(2,1,'2024-02-25 06:58:05.097973',1,2),(3,1,'2024-02-25 06:58:05.866317',1,3),(4,1,'2024-04-11 17:18:19.792919',2,3),(10,1,'2024-05-13 11:20:03.928216',3,8);
/*!40000 ALTER TABLE `store_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_product`
--

DROP TABLE IF EXISTS `store_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `price` decimal(20,2) NOT NULL,
  `digital` tinyint(1) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `imageUploadURL` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(200) NOT NULL,
  `description` longtext NOT NULL DEFAULT (_utf8mb3''),
  `instock` tinyint(1) NOT NULL,
  `isHotSaled` tinyint(1) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `categories` varchar(50) NOT NULL,
  `model` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name_index_idx` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_product`
--

LOCK TABLES `store_product` WRITE;
/*!40000 ALTER TABLE `store_product` DISABLE KEYS */;
INSERT INTO `store_product` VALUES (1,'Apple AirPods (2nd Generation)',199.00,0,'','https://m.media-amazon.com/images/I/417OJaY3DAL._AC_SL1000_.jpg','superadmin','HIGH-QUALITY SOUND — Powered by the Apple H1 headphone chip, AirPods (2nd generation) deliver rich, vivid sound.\r\nEFFORTLESS SETUP — After a simple one-tap setup, AirPods are automatically on and always connected. They sense when they’re in your ears and pause when you take them out. And sound seamlessly switches between your iPhone, Apple Watch, Mac, iPad, and Apple TV.\r\nVOICE CONTROL WITH SIRI — Just say “Hey Siri” for assistance without having to reach for your iPhone.\r\n24-HOUR BATTERY LIFE — More than 24 hours total listening time with the Charging Case.\r\nAUDIO SHARING — Easily share audio between two sets of AirPods on your iPhone, iPad, iPod touch, or Apple TV.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features. See “Additional information” to learn more.',1,0,'Apple','Headphones','AirPods'),(2,'Apple AirPods Pro (2nd Generation)',239.04,0,'','https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg','superadmin','RICHER AUDIO EXPERIENCE — The Apple-designed H2 chip helps to create more intelligent noise cancellation and deeply immersive sound. The low-distortion, custom-built driver delivers crisp, clear high notes and full, rich bass in stunning definition.\r\nNEXT-LEVEL ACTIVE NOISE CANCELLATION — Up to 2x more Active Noise Cancellation for dramatically less noise when you want to focus. Transparency mode lets you hear the world around you, and Adaptive Audio seamlessly blends Active Noise Cancellation and Transparency mode for the best listening experience in any environment.\r\nCUSTOMIZABLE FIT — Includes four pairs of silicone tips (XS, S, M, L) to fit a wide range of ears and provide all-day comfort. The tips create an acoustic seal to help keep out noise and secure AirPods Pro in place.\r\nDUST, SWEAT, AND WATER RESISTANT — Both AirPods Pro and the MagSafe Charging Case are IP54 dust, sweat, and water resistant, so you can listen comfortably in more conditions.\r\nPERSONALIZED SPATIAL AUDIO — With sound that suits your unique ear shape along with dynamic head tracking, AirPods Pro deliver an immersive listening experience that places sound all around you. You can also listen to select songs, shows, and movies in Dolby Atmos.\r\nA HIGHER LEVEL OF CONTROL — Manage playback functions from the stem with touch control. Swipe up or down to adjust volume, press to play and pause music or mute and unmute yourself on calls, and press twice to end calls. And hold the stem to switch between listening modes.\r\nLONG BATTERY LIFE — Get up to 6 hours of listening time with Active Noise Cancellation enabled. And get up to 30 hours of total listening time with Active Noise Cancellation enabled, using the case.\r\nA MORE CAPABLE CASE — Keep track of AirPods Pro with Precision Finding and a built-in speaker. A lanyard loop helps keep your AirPods Pro close. Charge with an Apple Watch or MagSafe charger, USB-C charge cable, or Qi-certified charger.\r\nMAGICAL EXPERIENCE — Conversation Awareness intelligently switches AirPods Pro into Transparency mode and lowers your media volume — so it’s easier to interact with people nearby when you choose to. Summon Siri with a simple “Hey Siri” or just “Siri.” AirPods Pro connect to your devices in a tap, pause music when you take them out, and seamlessly switch to the device you’re using. You can even share a song or show between two sets of AirPods.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features. See “Additional information” to learn more.',1,0,'Apple','Headphones','AirPods Pro'),(3,'Apple Watch Ultra 2 [GPS + Cellular 49mm]',827.80,0,'','https://m.media-amazon.com/images/I/71l2pSLyWRL._AC_SL1500_.jpg','superadmin','CARBON NEUTRAL — Apple Watch Ultra 2 paired with the latest Alpine Loop or Trail Loop is carbon neutral. Learn more about Apple’s commitment to the environment at apple.com/2030.\r\nWHY APPLE WATCH ULTRA 2 — Rugged, capable, and built to meet the demands of endurance athletes, outdoor adventurers, and water sport enthusiasts — with a specialized band for each. The S9 SiP enables a superbright display and a magical new way to quickly and easily interact with your Apple Watch without touching the display. Up to 36 hours of battery life and 72 hours in Low Power Mode.\r\nEXTREMELY RUGGED, INCREDIBLY CAPABLE — 49mm corrosion-resistant titanium case. Large Digital Crown and Customizable Action button for instant control over a variety of functions. 100m water resistance.\r\nBIGGEST, BRIGHTEST DISPLAY YET — Apple’s brightest Always-On Retina display is easy to see, even in direct sunlight. More room for adding complications to customize your watch face and enough space to view six metrics at once.\r\nTHE FREEDOM OF CELLULAR — Cellular is built in. You can call and text without your iPhone, even overseas with international roaming. Stream your favorite music and podcasts. Get directions with Maps.\r\nFOR ATHLETES — Advanced metrics and views in the Workout app, including Heart Rate Zones, custom workouts, and new cycling workout views. Precision dual-frequency GPS provides incredible accuracy for calculating distance, pace, and route maps. Trail Loop is a light, thin, and flexible band, designed especially for all workout types.\r\nFOR OUTDOOR ADVENTURERS — The Compass app delivers helpful views and details like elevation, incline, longitude, and latitude. See the last place where you had cellular reception. Mark your location with Compass Waypoints. Backtrack uses GPS to map where you’ve been so you can retrace your steps. Alpine Loop is an extremely rugged and secure band to meet the needs of all outdoor adventurers.\r\nFOR WATER SPORTS ENTHUSIASTS — Made for recreational water sports, scuba, and free diving for descents to 40 meters. The Depth app shows the time, current depth, water temperature, duration under water, and maximum depth you’ve reached. The Oceanic+ app puts a dive computer on your wrist. Ocean Band is light and flexible, with a titanium buckle and adjustable loop for a secure fit even during high-speed water sports.\r\nADVANCED HEALTH AND SAFETY FEATURES — Heart health notifications and the ECG app keep you informed and empowered when it comes to your health. Fall Detection and Crash Detection can connect you with emergency services in the event of a hard fall or a severe car crash. Hold the Action button to activate a siren that can be heard up to 600 feet away.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features. See below to learn more.',1,0,'Apple','Watch','Apple Watch Ultra 2'),(4,'Apple Watch SE (2nd Gen) [GPS 40mm]',161.15,0,'','https://m.media-amazon.com/images/I/61ZL5tN-+GL._AC_SL1500_.jpg','superadmin','WHY APPLE WATCH SE — All the essentials to help you be motivated and active, keep connected, track your health, and stay safe. The Smart Stack and redesigned apps in watchOS 10 help you see more information at a glance. With features like Crash Detection and enhanced workout metrics, Apple Watch SE is a better value than ever.\r\nCARBON NEUTRAL — Apple Watch SE (2nd generation) paired with the latest Sport Loop is carbon neutral. Learn more about Apple’s commitment to the environment at apple.com/2030.\r\nHEALTH AND SAFETY FEATURES — Get help when you need it with Fall Detection, Crash Detection, and Emergency SOS. Get deep insights into your health, including notifications if you have an irregular heart rhythm or an unusually high or low heart rate.\r\nSIMPLY COMPATIBLE — It works seamlessly with your Apple devices and services. Unlock your Mac automatically. Find your devices easily. Pay and send money with Apple Pay. Apple Watch requires iPhone XS or later with the latest iOS version.\r\nSWIMPROOF AND STYLISH — 50m water resistance. Three finishes. And a color-matched back case made with a production process that reduces its carbon emissions.\r\nEASILY CUSTOMIZABLE — With watch bands in a range of styles, materials, and colors and fully customizable watch faces, you can change your watch to fit your mood or the moment.\r\nA POWERFUL FITNESS PARTNER — The Workout app gives you a range of ways to train plus advanced metrics for more insights about your workout performance. And Apple Watch comes with three months of Apple Fitness+ free.\r\nSTAY CONNECTED — Send a text, take a call, listen to music and podcasts, use Siri, or call for help with Emergency SOS. Apple Watch SE (GPS) works with your iPhone or Wi-Fi to keep you connected.\r\nAPPLECARE — Every Apple Watch comes with one year of hardware repair coverage through its limited warranty and up to 90 days of complimentary technical support. Get AppleCare+ to extend your coverage and reduce the stress and cost of unexpected repairs.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features. See below to learn more.',1,0,'Apple','Watch','Apple Watch SE'),(5,'Late 2020 Apple MacBook Air with Apple M1 Chip (13.3 inch, 8GB RAM, 256GB SSD)',649.00,0,'','https://m.media-amazon.com/images/I/71fMZDz2sEL._AC_SL1500_.jpg','superadmin','Apple-designed M1 chip for a giant leap in CPU, GPU, and machine learning performance\r\nGo longer than ever with up to 18 hours of battery life\r\n8-core CPU delivers up to 3.5x faster performance to tackle projects faster than ever\r\nUp to eight GPU cores with up to 5x faster graphics for graphics-intensive apps and games\r\n16-core Neural Engine for advanced machine learning',1,1,'Apple','Laptop','Macbook Air'),(6,'Apple iPad Air (5th Generation): with M1 chip, 10.9-inch Liquid Retina Display, 256GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Starlight',639.00,0,'','https://m.media-amazon.com/images/I/61-3k7FKQRL._AC_SX679_.jpg','superadmin','WHY IPAD AIR — Serious performance in a thin and light design. With an immersive 10.9-inch Liquid Retina display and the amazing performance of the M1 chip, iPad Air is a creative and gaming powerhouse. Featuring Touch ID, advanced cameras, superfast Wi-Fi 6, and a USB-C connector.\r\nIPADOS + APPS — iPadOS makes iPad more productive, intuitive, and versatile. With iPadOS, run multiple apps at once, use Apple Pencil to write in any text field with Scribble, and edit and share photos. iPad Air comes with essential apps like Safari, Messages, and Keynote, with over a million more apps available on the App Store.\r\nFAST WI-FI CONNECTIVITY — Wi-Fi 6 gives you fast access to your files, uploads, and downloads, and lets you seamlessly stream your favorite shows.\r\nPERFORMANCE AND STORAGE — The M1 chip lets you multitask smoothly between powerful apps and play graphics-intensive games. And with all-day battery life, you can keep working and playing wherever you go. Choose from 64GB or 256GB storage options depending on the room you need for apps, music, movies, and more.\r\nAPPLE PENCIL AND MAGIC KEYBOARD — With Apple Pencil (2nd generation), iPad Air transforms into an immersive drawing canvas and the world’s best note‑taking device. Magic Keyboard features a great typing experience and a built‑in trackpad, while doubling as a protective cover for iPad. Accessories sold separately.\r\n10.9-INCH LIQUID RETINA DISPLAY — The gorgeous Liquid Retina display features advanced technologies like True Tone, P3 wide color, and ultralow reflectivity, which make everything look stunning.\r\nUNLOCK AND PAY WITH TOUCH ID — Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad Air, sign in to apps, and make payments securely with Apple Pay.\r\nADVANCED CAMERAS — iPad Air features a 12MP Ultra Wide front camera that supports Center Stage for videoconferencing and selfies. The 12MP Wide back camera with True Tone flash is perfect for capturing photos and 4K videos.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features.',1,1,'Apple','Ipad','iPad Air'),(7,'Apple iPad (10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue',307.28,0,'','https://m.media-amazon.com/images/I/61uA2UVnYWL._AC_SX679_.jpg','superadmin','WHY IPAD — Colorfully reimagined and more versatile than ever, iPad is great for the things you do every day. With an all-screen design, 10.9-inch Liquid Retina display, powerful A14 Bionic chip, superfast Wi-Fi, and four gorgeous colors, iPad delivers a powerful way to create, stay connected, and get things done.\r\nIPADOS + APPS — iPadOS makes iPad more productive, intuitive, and versatile. With iPadOS, run multiple apps at once, use Apple Pencil to write in any text field with Scribble, and edit and share photos. iPad comes with essential apps like Safari, Messages, and Keynote, with over a million more apps available on the App Store.\r\nFAST WI-FI CONNECTIVITY — Wi-Fi 6 gives you fast access to your files, uploads, and downloads, and lets you seamlessly stream your favorite shows.\r\nPERFORMANCE AND STORAGE — The A14 Bionic chip delivers power and performance for any activity. And with all-day battery life, iPad is perfect for playing immersive games and editing photos and videos. Choose from 64GB or 256GB storage options.\r\nAPPLE PENCIL AND MAGIC KEYBOARD FOLIO — With Apple Pencil (1st generation), iPad transforms into an immersive drawing canvas and the world’s best note‑taking device. The Magic Keyboard Folio features a versatile two-piece design with a detachable keyboard and a protective back panel that both attach magnetically to iPad. Accessories sold separately.\r\n10.9-INCH LIQUID RETINA DISPLAY — The gorgeous Liquid Retina display is an amazing way to watch movies or draw your next masterpiece. True Tone adjusts the display to the color temperature of the room to make viewing comfortable in any light.\r\nUNLOCK AND PAY WITH TOUCH ID — Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad, sign in to apps, and make payments securely with Apple Pay.\r\nADVANCED CAMERAS — iPad features a landscape 12MP Ultra Wide front camera that supports Center Stage for videoconferencing and selfies. Shoot 4K video or photos with the 12MP Wide back camera, then edit right on your iPad.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features.',1,1,'Apple','Ipad','iPad'),(8,'Apple 2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone and iPad; Midnight',840.51,0,'','https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SX679_.jpg','superadmin','STRIKINGLY THIN DESIGN — The redesigned MacBook Air is more portable than ever and weighs just 2.7 pounds. It’s the incredibly capable laptop that lets you work, play or create just about anything — anywhere.\r\nSUPERCHARGED BY M2 — Get more done faster with a next-generation 8-core CPU, up to 10-core GPU and up to 24GB of unified memory.\r\nUP TO 18 HOURS OF BATTERY LIFE — Go all day and into the night, thanks to the power-efficient performance of the Apple M2 chip.\r\nBIG, BEAUTIFUL DISPLAY — The 13.6-inch Liquid Retina display features over 500 nits of brightness, P3 wide color and support for 1 billion colors for vibrant images and incredible detail.\r\nADVANCED CAMERA AND AUDIO — Look sharp and sound great with a 1080p FaceTime HD camera, three-mic array and four-speaker sound system with Spatial Audio.\r\nVERSATILE CONNECTIVITY — MacBook Air features a MagSafe charging port, two Thunderbolt ports and a headphone jack.\r\nEASY TO USE — Your Mac feels familiar from the moment you turn it on, and works seamlessly with all your Apple devices.\r\nBUILT TO LAST — The all-aluminium unibody enclosure is exceptionally durable. And free software updates keep things running smooth and secure for years to come.\r\nSIMPLY COMPATIBLE — All your go-to apps run lightning-fast — including Microsoft 365, Zoom, and many of your favorite iPhone and iPad apps.\r\nCOMES WITH APPLECARE WARRANTY – Every Mac comes with a one-year limited warranty and up to 90 days of complimentary technical support. Get AppleCare plus to extend your coverage.',1,1,'Apple','Laptop','MacBook Air'),(9,'Apple AirPods (3rd Generation) Wireless Ear Buds, Bluetooth Headphones, Personalized Spatial Audio, Sweat and Water Resistant, Lightning Charging Case Included, Up to 30 Hours of Battery Life',505.00,0,'','https://m.media-amazon.com/images/I/61df2M5+OnL._AC_SX679_.jpg','superadmin','PERSONALIZED SPATIAL AUDIO — With sound that suits your unique ear shape along with dynamic head tracking, AirPods (3rd generation) deliver an immersive listening experience that places sound all around you. You can also listen to select songs, shows, and movies in Dolby Atmos.\r\nSWEAT AND WATER PROTECTION — AirPods and the Lightning Charging Case is rated IPX4 sweat and water resistant, so they’ll withstand anything from heavy workouts to rain.\r\nA POWERFUL CASE — Recharge your AirPods with the portable Lightning Charging Case for power throughout the day, wherever you go.\r\nPINCH-PERFECT CONTROL — The force sensor lets you control your entertainment as well as answer, end, and mute or unmute yourself on calls.\r\nLONG BATTERY LIFE — Up to 6 hours of listening time with one charge, and up to 30 hours total listening time with the Lightning Charging Case.\r\nALWAYS-ON “HEY SIRI” — Say “Hey Siri” to activate your favorite personal assistant and stay on top of everyday tasks like playing music, making calls, getting directions, or checking your schedule.\r\nMAGICAL EXPERIENCE — Place AirPods near your iPhone or iPad and tap Connect to pair with every device in your iCloud account. Audio seamlessly switches between devices and automatically pauses when you take AirPods out of your ears.\r\nAUDIO SHARING — Audio Sharing lets you connect two sets of AirPods effortlessly to your iPhone, iPad, iPod touch, or Apple TV, with individual volume control for each set.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features. See “Additional information” to learn more.',1,1,'Apple','Headphones','AirPods'),(10,'Apple 2024 MacBook Air 13-inch Laptop with M3 chip: 13.6-inch Liquid Retina Display, 8GB Unified Memory, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera, Touch ID; Starlight',959.04,0,'','https://m.media-amazon.com/images/I/71YG+VrvrTL._AC_SX679_.jpg','superadmin','LEAN. MEAN. M3 MACHINE — The blazing-fast MacBook Air with the M3 chip is a superportable laptop that sails through work and play.\r\nPORTABLE DESIGN — Lightweight and under half an inch thin, so you can take MacBook Air anywhere you go.\r\nGET MORE DONE FASTER — The powerful 8-core CPU and up to 10-core GPU of the Apple M3 chip keep things running smoothly.\r\nUP TO 18 HOURS OF BATTERY LIFE — Amazing, all-day battery life so you can leave the power adapter at home.\r\nA BRILLIANT DISPLAY — The 13.6-inch Liquid Retina display supports 1 billion colors.\r\nLOOK SHARP, SOUND GREAT — Everything looks and sounds amazing with a 1080p FaceTime HD camera, three mics, and four speakers with Spatial Audio.\r\nAPPS FLY WITH APPLE SILICON — All your favorites, from Microsoft 365 to Adobe Creative Cloud, run lightning fast in macOS.\r\nGET CONNECTED — MacBook Air features two Thunderbolt ports, a headphone jack, Wi-Fi 6E, Bluetooth 5.3, and a MagSafe charging port. And connect up to two external displays with the laptop lid closed.\r\nIF YOU LOVE IPHONE, YOU’LL LOVE MAC — MacBook Air works like magic with your other Apple devices. Start an email on your iPhone and finish it on your Mac. Send text messages from your Mac. And much more.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features. See below to learn more.',1,1,'Apple','Laptop','MacBook Air'),(11,'Apple AirPods Max Wireless Over-Ear Headphones, Active Noise Cancelling, Transparency Mode, Personalized Spatial Audio, Dolby Atmos, Bluetooth Headphones for iPhone – Space Gray',445.49,0,'','https://m.media-amazon.com/images/I/81jqUPkIVRL._AC_SX679_.jpg','superadmin','BREATHTAKING AUDIO QUALITY — Apple-designed dynamic driver provides high-fidelity audio. Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences.\r\nFOCUS ON WHAT’S PLAYING — Active Noise Cancellation blocks outside noise so you can immerse yourself in music.\r\nHEAR THE WORLD AROUND YOU — Transparency mode lets you hear and interact with the world around you.\r\nPERSONALIZED SPATIAL AUDIO — With sound that suits your unique ear shape along with dynamic head tracking, AirPods Max deliver an immersive listening experience that places sound all around you. You can also listen to select songs, shows, and movies in Dolby Atmos.\r\nACOUSTIC-FIRST DESIGN — Designed with a knit-mesh canopy and memory foam ear cushions for an exceptional over-ear fit that perfectly seals in sound.\r\nMAGICAL EXPERIENCE — Pair AirPods Max by simply placing them near your device and tapping Connect on your screen. AirPods Max pause audio when you take them off. And Automatic Switching makes listening between your iPhone, iPad, and Mac completely effortless.\r\nLONG BATTERY LIFE — Up to 20 hours of listening, movie watching, or talk time with Active Noise Cancellation and Personalized Spatial Audio enabled.\r\nPRECISION CONTROL — Use the Digital Crown to play and pause music, to answer, end, and mute yourself on calls, and to control volume and skip between tracks.\r\nA SMARTER CASE — Store in an ultra low-power state with the slim Smart Case.\r\nLEGAL DISCLAIMERS — This is a summary of the main product features. See “Additional information” to learn more.',1,1,'Apple','Headphones','AirPods Max'),(12,'ZAGG Pro Keys Wireless Keyboard & Detachable Case for iPad Pro 12.9 - Backlit Keys, Apple Pencil Holder, 6.6ft Drop Protection',181.99,0,'','https://m.media-amazon.com/images/I/71llf8HQ5CL.__AC_SX300_SY300_QL70_FMwebp_.jpg','superadmin','Bluetooth Trackpad - Bluetooth-integrated trackpad is compatible with iPadOS and can be turned on and off.\r\nDetachable Keyboard and Case - The keyboard and case detach to accommodate different uses and environments.\r\nBacklit, Laptop-style Keys - Pro Keys have clean, precise keystrokes. Backlighting, in seven different colors, makes typing easy in low-light conditions.\r\nMulti-device Pairing - Connect with two devices simultaneously and toggle back and forth between them.\r\nThree-Month Battery - With the trackpad on, the keyboard can last up to 3 months on one charge. Turning the trackpad off preserves battery life.\r\nKeyboard Operating System: iOS',1,0,'ZAGG','iPad',NULL),(13,'Apple 2023 MacBook Pro Laptop M3 Max chip with 16‑core CPU, 40‑core GPU: 16.2-inch Liquid Retina XDR Display, 48GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Silver',3421.48,0,'','https://m.media-amazon.com/images/I/61dnax4xchL._AC_SX679_.jpg','superadmin','SUPERCHARGED BY M3 PRO OR M3 MAX — The Apple M3 Pro chip, with a 12-core CPU and 18-core GPU, delivers amazing performance for demanding workflows like manipulating gigapixel panoramas or compiling millions of lines of code. M3 Max, with an up to 16-core CPU and up to 40-core GPU, drives extreme performance for the most advanced workflows like rendering intricate 3D content or developing transformer models with billions of parameters.\r\nUP TO 22 HOURS OF BATTERY LIFE — Go all day thanks to the power-efficient design of Apple silicon. The MacBook Pro laptop delivers the same exceptional performance whether it’s running on battery or plugged in. (Battery life varies by use and configuration. See apple.com/batteries for more information.)\r\nBRILLIANT PRO DISPLAY — The 16.2-inch Liquid Retina XDR display features Extreme Dynamic Range, over 1000 nits of brightness for stunning HDR content, up to 600 nits of brightness for SDR content, and pro reference modes for doing your best work on the go. (The display has rounded corners at the top. When measured diagonally, the screen is 16.2 inches. Actual viewable area is less.)\r\nFULLY COMPATIBLE — All your pro apps run lightning fast — including Adobe Creative Cloud, Apple Xcode, Microsoft 365, SideFX Houdini, MathWorks MATLAB, Medivis SurgicalAR, and many of your favorite iPhone and iPad apps. And with macOS, work and play on your Mac are even more powerful. Elevate your presence on video calls. Access information in all-new ways. And discover even more ways to personalize your Mac. (Apps are available on the App Store.)\r\nADVANCED CAMERA AND AUDIO — Look sharp and sound great with a 1080p FaceTime HD camera, a studio-quality three-mic array, and a six-speaker sound system with Spatial Audio.\r\nCONNECT IT ALL — This MacBook Pro features a MagSafe charging port, three Thunderbolt 4 ports, an SDXC card slot, an HDMI port, and a headphone jack. Enjoy fast wireless connectivity with Wi-Fi 6E and Bluetooth 5.3. And you can connect up to two external displays with M3 Pro, or up to four with M3 Max. (Wi‑Fi 6E available in countries and regions where supported.)\r\nMAGIC KEYBOARD WITH TOUCH ID — The backlit Magic Keyboard has a full-height function key row and Touch ID, which gives you a fast, easy, secure way to unlock your laptop and sign in to apps and sites.\r\nADVANCED SECURITY — Every Mac comes with encryption, robust virus protections, and a powerful firewall system. And free security updates help keep your Mac protected.\r\nWORKS WITH ALL YOUR APPLE DEVICES — You can do amazing things when you use your Apple devices together. Copy something on iPhone and paste it on MacBook Pro. Use your MacBook Pro to answer FaceTime calls or send texts with Messages. And that’s just the beginning.\r\nBUILT TO LAST — The all-aluminum unibody enclosure is exceptionally durable. Free software updates keep things running smoothly for years to come.',1,1,'Apple','Laptop','MacBook Pro'),(14,'Apple iPhone 15, 128GB, Black - Verizon (Renewed)',669.52,0,'','https://m.media-amazon.com/images/I/51PtFHUPjBL._AC_SY879_.jpg','superadmin','- 6.1inch Super Retina XDR display. Aluminum with color-infused glass back. Ring/Silent switch\r\n- Dynamic Island. A magical way to interact with iPhone. A16 Bionic chip with 5-core GPU\r\n- Advanced dual-camera system. 48MP Main | Ultra Wide. Super-high-resolution photos (24MP and 48MP). Next-generation portraits with Focus and Depth Control. 4X optical zoom range\r\n- Emergency SOS via satellite. Crash Detection. Roadside Assistance via satellite\r\n- Up to 26 hours video playback. USB C, Supports USB 2. Face ID',1,1,'Apple','Phones','iPhone 15 (Renewed)'),(15,'Tracfone Apple iPhone SE 5G (3rd Generation), 64GB, Black - Prepaid Smartphone (Locked) Visit the TracFone Store',189.00,0,'','https://m.media-amazon.com/images/I/61TOWf11+jL._AC_SX679_.jpg','superadmin','- iPhone SE features an all-new camera system powered by A15 Bionic, with a 12-megapixel ƒ/1.8 aperture Wide camera that offers incredible computational photography benefits, including Smart HDR 4, Photographic Styles, Deep Fusion, and Portrait mode.\r\n- iPhone SE features the familiar Home button with Touch ID — an easy, private, and secure alternative for logging in to apps, authorizing App Store purchases, making Apple Pay transactions, and more.\r\n- 64GB Built-In Memory\r\n- Carrier: This phone is locked to Tracfone, which means this device can only be used on the Tracfone wireless network.\r\n- A highly efficient chip, an enhanced battery, and iOS 15 work together to boost battery life.',1,1,'TracFone','Phones','iPhone SE 5G Black'),(16,'Apple iPhone 7 32GB Unlocked - Black',79.95,0,'','https://m.media-amazon.com/images/I/510AxmTgx2L._AC_SX679_.jpg','superadmin','Preowned - Excellent Condition - Factory Unlocked - Compatible with All service Providers\r\nMinimum 80% Battery Life as compare to a new\r\nIncludes Charger and Cable - Packed in Generic Box\r\nSim card is not included\r\n4.7-Inch Retina HD display; A10 Fusion; Accelerometer; Compass; Gyroscope\r\n12MP iSight Camera with live Photos and 4K Video; 32GB of internal memory to store your apps, music, photos, and videos',1,0,'Plum','Phones','732BLK-IP'),(17,'SAMSUNG Galaxy S24+ Plus Cell Phone, 512GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version 2024 Cobalt Violet',969.99,0,'','https://m.media-amazon.com/images/I/71jbE08QOLL._AC_SX679_.jpg','superadmin','CIRCLE & SEARCH¹ IN A SNAP: What’s your favorite influencer wearing? Where’d they go on vacation? What’s that word mean? Don’t try to describe it — use Circle to Search1 with Google to get the answer; With S24 Series, circle it on your screen and learn more\r\nREAL EASY, REAL-TIME TRANSLATIONS: Speak foreign languages on the spot with Live Translate²; Unlock the power of convenient communication with near real-time voice translations, right through your Samsung Phone app\r\nNOTE SMARTER, NOT HARDER: Focus on capturing your notes and spend less time perfecting them; Note Assist³ will summarize, format, and even translate them for you; All of your notes are organized neatly so that you can find what you need\r\nMORE WOW, LESS WORK: Turn every photo into a post-worthy masterpiece; Move or remove objects; Fill in empty space; Simply snap a pic and take it from great to jaw-dropping with Generative Edit⁴\r\nCAPTURE. SHARE. IMPRESS: Share more of life’s most share-worthy moments in natural, true-to-life color with 50MP camera\r\nOUR MOST POWERFUL GALAXY SMARTPHONE YET: Jump seamlessly between apps without the wait and see content in high quality with our fastest processor yet, Snapdragon 8 Gen 3 for Galaxy⁵\r\nPUT YOUR BEST TEXT FORWARD: Say the right thing at the right time in no time with Chat Assist⁶; Get real-time tone suggestions to make your writing sound more professional or conversational; Plus, make typos a thing of the past\r\nGO BIGGER. GO BRIGHTER: See it all on the bigger⁷ and brighter screen of S24+; Look at your pics outside without squinting or looking for shade; And wind down before bed with your screen at just the right brightness, thanks to Eye Comfort Shield\r\nCAPTURE ALL THE ACTION & YOUR REACTION: Capture your favorite artist on the main cam while you record yourself singing along with the selfie camera; With Dual Recording, it’s easy to get all the action — and all the reactions\r\nESCAPE THE OUTLET. EMBRACE THE MOMENT: Life’s best moments rarely happen near an outlet; With Super Fast Charging⁸, you can get back to snapping selfies with friends, recording videos and posting it all',1,0,'SAMSUNG','Phones','Galaxy S24 Plus'),(18,'SAMSUNG Galaxy S24+ Plus Cell Phone, 512GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version 2024, Amber Yellow',969.99,0,'','https://m.media-amazon.com/images/I/71yc5A1EavL._AC_SX679_.jpg','superadmin','CIRCLE & SEARCH¹ IN A SNAP: What’s your favorite influencer wearing? Where’d they go on vacation? What’s that word mean? Don’t try to describe it — use Circle to Search1 with Google to get the answer; With S24 Series, circle it on your screen and learn more\r\nREAL EASY, REAL-TIME TRANSLATIONS: Speak foreign languages on the spot with Live Translate²; Unlock the power of convenient communication with near real-time voice translations, right through your Samsung Phone app\r\nNOTE SMARTER, NOT HARDER: Focus on capturing your notes and spend less time perfecting them; Note Assist³ will summarize, format, and even translate them for you; All of your notes are organized neatly so that you can find what you need\r\nMORE WOW, LESS WORK: Turn every photo into a post-worthy masterpiece; Move or remove objects; Fill in empty space; Simply snap a pic and take it from great to jaw-dropping with Generative Edit⁴\r\nCAPTURE. SHARE. IMPRESS: Share more of life’s most share-worthy moments in natural, true-to-life color with 50MP camera\r\nOUR MOST POWERFUL GALAXY SMARTPHONE YET: Jump seamlessly between apps without the wait and see content in high quality with our fastest processor yet, Snapdragon 8 Gen 3 for Galaxy⁵\r\nPUT YOUR BEST TEXT FORWARD: Say the right thing at the right time in no time with Chat Assist⁶; Get real-time tone suggestions to make your writing sound more professional or conversational; Plus, make typos a thing of the past\r\nGO BIGGER. GO BRIGHTER: See it all on the bigger⁷ and brighter screen of S24+; Look at your pics outside without squinting or looking for shade; And wind down before bed with your screen at just the right brightness, thanks to Eye Comfort Shield\r\nCAPTURE ALL THE ACTION & YOUR REACTION: Capture your favorite artist on the main cam while you record yourself singing along with the selfie camera; With Dual Recording, it’s easy to get all the action — and all the reactions\r\nESCAPE THE OUTLET. EMBRACE THE MOMENT: Life’s best moments rarely happen near an outlet; With Super Fast Charging⁸, you can get back to snapping selfies with friends, recording videos and posting it all',1,0,'SAMSUNG','Phones','Galaxy S24 Plus'),(19,'Apple iPhone 14 Pro Max, 256GB, Space Black - Unlocked (Renewed Premium)',839.97,0,'','https://m.media-amazon.com/images/I/51uD1lmrV8L._AC_SX679_.jpg','superadmin','Unlocked\r\nTested for battery health and guaranteed to come with a battery that exceeds 90% of original capacity.\r\nInspected and guaranteed to have minimal cosmetic damage, which is not noticeable when the device is held at arm’s length. Successfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information.\r\nIncludes a brand new, generic charging cable that is certified Mfi (Made for iPhone) and a brand new, generic wall plug that is UL certified for performance and safety. Headphones not included.\r\nBacked by the same one-year satisfaction guarantee as brand new Apple products.',1,0,'Apple','Phones','iPhone 14 Pro Max'),(20,'Apple iPhone 13 Pro Max, 128GB, Sierra Blue - Unlocked (Renewed)',500.96,0,'','https://m.media-amazon.com/images/I/51UuPZLMaCL._AC_SX679_.jpg','superadmin','This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers.\r\nThere will be no visible cosmetic imperfections when held at an arm’s length. There will be no visible cosmetic imperfections when held at an arm’s length.\r\nThis product will have a battery which exceeds 80% capacity relative to new.\r\nAccessories will not be original, but will be compatible and fully functional. Product may come in generic Box.\r\nThis product is eligible for a replacement or refund within 90 days of receipt if you are not satisfied.',1,0,'Apple','Phones','iPhone 13 Pro Max');
/*!40000 ALTER TABLE `store_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_shippingaddress`
--

DROP TABLE IF EXISTS `store_shippingaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_shippingaddress` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `state` varchar(200) DEFAULT NULL,
  `zipcode` varchar(200) DEFAULT NULL,
  `date_added` datetime(6) NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_shippingaddress_order_id_e6decfbb_fk_store_order_id` (`order_id`),
  KEY `store_shippingaddress_user_id_c149a95a_fk_authen_user_id` (`user_id`),
  CONSTRAINT `store_shippingaddress_order_id_e6decfbb_fk_store_order_id` FOREIGN KEY (`order_id`) REFERENCES `store_order` (`id`),
  CONSTRAINT `store_shippingaddress_user_id_c149a95a_fk_authen_user_id` FOREIGN KEY (`user_id`) REFERENCES `authen_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_shippingaddress`
--

LOCK TABLES `store_shippingaddress` WRITE;
/*!40000 ALTER TABLE `store_shippingaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_shippingaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_userinfo`
--

DROP TABLE IF EXISTS `store_userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_userinfo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `date_of_birth` varchar(50) DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `account_holder` varchar(50) NOT NULL,
  `account_number` varchar(20) NOT NULL,
  `bankname` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `home_address` varchar(50) NOT NULL,
  `home_number` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zip` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_userinfo_user_id_aaa0b806_fk_authen_user_id` (`user_id`),
  CONSTRAINT `store_userinfo_user_id_aaa0b806_fk_authen_user_id` FOREIGN KEY (`user_id`) REFERENCES `authen_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_userinfo`
--

LOCK TABLES `store_userinfo` WRITE;
/*!40000 ALTER TABLE `store_userinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-20  0:41:38
