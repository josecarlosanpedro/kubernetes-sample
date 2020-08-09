CREATE TABLE `People` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `created_date` date NOT NULL DEFAULT '0000-00-00',
  `created_time` time NOT NULL DEFAULT '00:00:00',
  `created_by` varchar(64) NOT NULL,
  `updated_date` date NOT NULL DEFAULT '0000-00-00',
  `updated_time` time NOT NULL DEFAULT '00:00:00',
  `updated_by` varchar(64) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) 