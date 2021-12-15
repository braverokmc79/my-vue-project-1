#cmd 에서 mariadb docker 받기
#docker pull mariadb
#docker image ls

#mariadb 컨테이너 임의포트 3308포토를 통해 3306 도커 컨테이너에 접속 환경변수 root 접속 번호는 1111 mariadb 컨테이너
#docker run --name mariadb -d -p 3308:3306 -e MYSQL_ROOT_PASSWORD=1111 mariadb

#실행중인 것 확인
#docker ps

#접속 방법
#docker exec -it mariadb /bin/bash    

#mysql -u root -p
#접속 후 환경보기
#status


#툴에서 접속 방법
#서버 호스트
#ipconfig 로 확인
#ex) 192.168.174.1
#Database 입력란은 공백
#root 입력
#포트 3308
#비번 1111




CREATE TABLE `t_product` (
  `product_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `product_price` int(11) NOT NULL DEFAULT 0,
  `delivery_price` int(11) NOT NULL DEFAULT 0,
  `add_delivery_price` int(11) NOT NULL DEFAULT 0,
  `tags` varchar(100) DEFAULT NULL,
  `outbound_days` int(2) NOT NULL DEFAULT 5,
  `seller_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
 `active_yn` char(1) NOT NULL DEFAULT 'Y',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`product_id`),
  KEY `t_product_FK` (`seller_id`),
  KEY `t_product_FK_1` (`category_id`),
  CONSTRAINT `t_product_FK` FOREIGN KEY (`seller_id`) REFERENCES `t_seller` (`seller_id`),
  CONSTRAINT `t_product_FK_1` FOREIGN KEY (`category_id`) REFERENCES `t_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `t_seller` (
  `seller_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`seller_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;


CREATE TABLE `t_category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category1` varchar(100) NOT NULL,
  `category2` varchar(100) NOT NULL,
  `category3` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `t_image` (
  `image_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `type` int(1) NOT NULL DEFAULT 1 COMMENT '1-썸네일,2-제품이미지,3-제품설명이미지',
  `path` varchar(100) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `t_image_FK` (`product_id`),
  CONSTRAINT `t_image_FK` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `t_user` (
  `email` varchar(50) NOT NULL,
  `type` int(1) NOT NULL DEFAULT 1 COMMENT '1-buyer,2-seller',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



#목록
SELECT tp.*, tc.category1 , tc.category2 , tc.category3 , ti.path, ti.type
FROM t_product tp, t_category tc , t_image ti 
WHERE tp.category_id =tc.category_id  AND tp.product_id =ti.product_id AND ti.type=1;



#상세보기
SELECT tp.*, tc.category1 , tc.category2 , tc.category3 , ti.path, ti.type
FROM t_product tp, t_category tc , t_image ti 
WHERE tp.category_id =tc.category_id  AND tp.product_id =ti.product_id AND ti.type=3 AND tp.product_id=1;

SELECT * from t_image ti WHERE product_id =1 AND ti.type=2;


#등록
INSERT INTO t_product 
(product_name, product_price, delivery_price, add_delivery_price, tags, outbound_days, seller_id, category_id)
VALUES('테스트', 50000, 2500, 5000, '테스트', 5, 1, 1);

