CREATE DATABASE DATN_PRODUCT_MANAGEMENT;
USE DATN_PRODUCT_MANAGEMENT;

CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(255),
    type NVARCHAR(255),
    wage INT(10)
);

CREATE TABLE Product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    price DOUBLE,
    discount INT,
    name NVARCHAR(255),
    description NVARCHAR(255),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createBy NVARCHAR(255),
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateBy NVARCHAR(255),
    categoryId INT(10),
    FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE CASCADE
);


CREATE TABLE ProductAttribute (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255),
    size VARCHAR(255),
    color NVARCHAR(255),
    quality INT,
    productId INT,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);

CREATE TABLE Cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT
);

CREATE TABLE CartItem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quality INT,
    image VARCHAR(255),
    size VARCHAR(255),
    color NVARCHAR(255),
    price DOUBLE,
    cartId INT,
    productId INT,
    FOREIGN KEY (cartId) REFERENCES Cart(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);

CREATE TABLE `Order` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    totalPrice DOUBLE,
    shippingAddress NVARCHAR(255),
    isPaid BIT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createBy NVARCHAR(255),
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateBy NVARCHAR(255)
);

CREATE TABLE OrderItem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quality INT,
    image VARCHAR(255),
    size VARCHAR(255),
    color NVARCHAR(255),
    price DOUBLE,
    productId INT,
    orderId INT,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (orderId) REFERENCES `Order`(id) ON DELETE CASCADE
);


CREATE TABLE Material (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(255),
    price DOUBLE,
    color NVARCHAR(255),
    image VARCHAR(255),
    description NVARCHAR(255)
);

CREATE TABLE UserOrder (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bust DOUBLE,
    waist DOUBLE,
    armpit DOUBLE,
    shoulderWidth DOUBLE,
    bicep DOUBLE,
    armLength DOUBLE,
    shirtLength DOUBLE,
    wrist DOUBLE,
    hip DOUBLE,
    pantsLength DOUBLE,
    thigh DOUBLE,
    knee DOUBLE,
    calf DOUBLE,
    quality INT,
    image VARCHAR(255),
    userId INT,
    productId INT,
    materialId INT,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE,  
    FOREIGN KEY (materialId) REFERENCES Material(id) ON DELETE CASCADE
);

CREATE TABLE FeedBack (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comment NVARCHAR(255),
    rating DOUBLE ,
    userId INT,
    productId INT,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);

