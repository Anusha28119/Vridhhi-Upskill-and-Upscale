
use Vriddhi;
CREATE TABLE IF NOT EXISTS `Vriddhi.registration` (
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_no` int NOT NULL,
  `email_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type_seeker` binary(5) NOT NULL,
  `type_provider` binary(5) NOT NULL,
  `type_entrepreneur` binary(5) NOT NULL,
  `type_investor` binary(5) NOT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
select* from `Vriddhi.seeker`;
CREATE TABLE IF NOT EXISTS `Vriddhi.seeker` (
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_no` int NOT NULL,
  `Email_id` varchar(50) NOT NULL,
  `10th` binary(2) NOT NULL,
  `12th` binary(2) NOT NULL,
  `graduation_degree` varchar(20),
  `post_graduation_degree` varchar(20),
  FOREIGN KEY (`Email_id`) REFERENCES Vriddhi.`Vriddhi.registration`(`email_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
ALTER TABLE `Vriddhi.seeker`
ADD COLUMN `10th_org` VARCHAR(100) AFTER `10th`;
ALTER TABLE `Vriddhi.seeker`
ADD COLUMN `12th_org` VARCHAR(100) AFTER `12th`;
ALTER TABLE `Vriddhi.seeker`
ADD COLUMN `graduation_org` VARCHAR(100) AFTER `graduation_degree`;
ALTER TABLE `Vriddhi.seeker`
ADD COLUMN `post_graduation_org` VARCHAR(100) AFTER `post_graduation_degree`;
ALTER TABLE `Vriddhi.seeker`
ADD COLUMN `badge_gold` VARCHAR(100);
ALTER TABLE `Vriddhi.seeker`
ADD COLUMN `badge_silver` VARCHAR(100);
ALTER TABLE `Vriddhi.seeker`
ADD COLUMN `badge_bronze` VARCHAR(100);
select* from `Vriddhi.seeker`;
CREATE TABLE IF NOT EXISTS `Vriddhi.job_provider` (
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_no` int NOT NULL,
  `Email_id` varchar(50) NOT NULL,
  `job_role` varchar(255) NOT NULL,
  `requirement_10th` binary(2) NOT NULL,
  `requirement_12th` binary(2) NOT NULL,
  `requirement_graduation_degree` varchar(20),
  `requirement_post_graduation_degree` varchar(20),
  `badge_required` VARCHAR(20),
  FOREIGN KEY (`Email_id`) REFERENCES Vriddhi.`Vriddhi.registration`(`email_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `Vriddhi.investor` (
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_no` int NOT NULL,
  `Email_id` varchar(50) NOT NULL,
  `Investment_budget` int NOT NULL,
  `expected_return` int NOT NULL,
  `profit_sharing`binary(5) NOT NULL,
  `preferred_field_first` varchar(20),
  `preferred_field_second` varchar(20),
  `preferred_qualification` varchar(20),
  FOREIGN KEY (`Email_id`) REFERENCES Vriddhi.`Vriddhi.registration`(`email_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `Vriddhi.entrepreneur` (
   `Email_id` varchar(50) NOT NULL,
  `Venture Name` varchar(100) NOT NULL,
  `Team Leader` varchar(50) NOT NULL,
  `Brief Idea Overview` varchar(100) NOT NULL,
  `Funding Required` int NOT NULL,
`Category` varchar(50) NOT NULL,
`Start Date of Venture` date NOT NULL,
`Current number of employees` int NOT NULL,
`Working Location` varchar(50) NOT NULL,
`Idea phase` binary(5) NOT NULL,
`Current annual turnover` bigint NOT NULL,
 `Job Provider` binary(5) NOT NULL,
  FOREIGN KEY (`Email_id`) REFERENCES Vriddhi.`Vriddhi.registration`(`email_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `Vriddhi.job_provider_main` (
  `Organisation Name` varchar(255) NOT NULL PRIMARY KEY,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_no` int NOT NULL,
  `Email_id` varchar(50) NOT NULL,
   `Vacancies` int NOT NULL,
   `Job Profiles` int NOT NULL,
   `Total Compensation` bigint NOT NULL,
   FOREIGN KEY (`Email_id`) REFERENCES Vriddhi.`Vriddhi.registration`(`email_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS `Vriddhi.job_provider_profiles` (
  `Organisation Name` varchar(255) NOT NULL,
  `job_profile` varchar(255) NOT NULL,
   `Vacancies` int NOT NULL,
   `Profile Compensation` bigint NOT NULL,
   `Profile Location` varchar(255) NOT NULL,
   `Brief Overview of profile` varchar(1000) NOT NULL,
  `requirement_10th` binary(2) NOT NULL,
  `requirement_12th` binary(2) NOT NULL,
  `requirement_graduation_degree` varchar(20),
  `requirement_post_graduation_degree` varchar(20),
  `badge_required` VARCHAR(20),
	FOREIGN KEY (`Organisation Name`) REFERENCES Vriddhi.`Vriddhi.job_provider_main`(`Organisation Name`),
  PRIMARY KEY(`Organisation Name`, `job_profile`)
 )ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;






