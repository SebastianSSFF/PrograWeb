CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    precio DECIMAL(10,2)
);

INSERT INTO productos (nombre, precio) VALUES
('Laptop', 1500.00),
('Mouse', 25.50);
