import db from "../config/db";

export const getProductos = (req, res) => {
    const q = "SELECT * FROM productos";
    db.query(q, (err, data) => {
        if (err) 
            console.error('Error al obtener productos', err);
        return res.status(200).json(data);
    });
}