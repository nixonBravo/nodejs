import { Prueba } from "../models/Prueba.js";

export const getPruebas = async (req, res) => {
  try {
    const pruebas = await Prueba.findAll({ where: { state: true } });

    if (pruebas.length === 0) {
      /*
      //para indicar que no hay contenido sin mostrar sms
      return res.status(204).end();
      */
      return res.status(404).json({ message: "No hay pruebas disponibles" });
    }

    return res.status(200).json({ Pruebas: pruebas });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPrueba = async (req, res) => {
  try {
    const { id } = req.params;
    const prueba = await Prueba.findOne({
      where: {
        id: id,
        state: true,
      },
    });

    if (!prueba) {
      return res.status(404).json({ message: "La prueba no existe" });
    }

    return res.status(200).json({ Prueba: prueba });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createPrueba = async (req, res) => {
  const { name } = req.body;

  try {
    const newPrueba = await Prueba.create({
      name,
    });
    return res
      .status(200)
      .json({ message: "Prueba creada", Prueba: newPrueba });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatePrueba = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const prueba = await Prueba.findOne({
      where: {
        id: id,
        state: true,
      },
    });

    if (!prueba) {
      return res.status(404).json({ message: "La prueba no existe" });
    }

    await Prueba.update(
      {
        name: name,
      },
      { where: { id: id } }
    );

    return res
      .status(200)
      .json({
        message: "Prueba actualizada",
        Prueba: { id: id, name: name, state: true },
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePrueba = async (req, res) => {
  try {
    const { id } = req.params;

    const prueba = await Prueba.findOne({
      where: {
        id: id,
        state: true,
      },
    });

    if (!prueba) {
      return res
        .status(404)
        .json({ message: "La prueba no existe o ya fue borrada" });
    }

    await Prueba.update(
      {
        state: false,
      },
      { where: { id: id } }
    );

    /* 
    //eliminar directamente
    await Prueba.destroy({
      where: {
        id: id,
      },
    }); 
    */

    return res.status(200).json({ message: "Prueba eliminada" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
