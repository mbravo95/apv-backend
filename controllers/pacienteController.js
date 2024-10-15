import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req,res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteGuardado = await paciente.save();
        res.json({paciente: pacienteGuardado});
    } catch (error) {
        console.log(error);
    }
}

const obtenerPaciente = async (req, res) => {
    const paciente = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.json(paciente);
}

const obtenerPaciente2 = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'Paciente no encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no valida"});
    }

    res.json({paciente});
}

const borrarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente){
        return res.status(404).json({msg: 'Paciente no encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no valida"});
    }

    try {
        await paciente.deleteOne();
        res.json({msg: 'Paciente eliminado'});
    } catch (error) {
        console.log(error);
    }
}

const actualizarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente){
        return res.status(404).json({msg: 'Paciente no encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no valida"});
    }
    
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteAct = await paciente.save();
        res.json({paciente: pacienteAct});
    } catch (error) {
        console.log(error);
    }

}

export {
    agregarPaciente,
    obtenerPaciente,
    obtenerPaciente2,
    borrarPaciente,
    actualizarPaciente
}