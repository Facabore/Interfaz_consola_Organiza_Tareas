import inquirer from 'inquirer';
import { inq, svFile } from "./helpers/index.js";
import {tareas} from "./models/index.js";
console.clear();

const main = async () => {
  let opt = "";
  const Tarea = new tareas.Tareas();
  const data = await svFile.readFile();

  if(data){
    Tarea.cargarTareasFromArray(data);
  }

  do {

    opt = await inq.preguntas();
    switch(opt){
        case "1":
            const desc = await inq.leerInput("Descripción: ");
            Tarea.crearTarea(desc);
            break;
        case "2":
            Tarea.listarTodasTareas();
            break;
        case "3":
            Tarea.listarTareas(true);
            break;
        case "4":
            Tarea.listarTareas(false);
            break;
        case "5":
            const idx = await inq.completaTareas(Tarea.listadoArr);
            const ok2 = await inq.confirmar("¿Está seguro de completar estas tareas?");
            if(idx !== "0"){
              (ok2) ? Tarea.completarTarea(idx) : console.log("No se han completado la tarea");
            }
            
            break;
        case "6":
            const id = await inq.listadoTareasBorrar(Tarea.listadoArr);
            if(id !== "0"){
              const ok = await inq.confirmar("¿Está seguro?");
              (ok) ? Tarea.borrarTarea(id) : console.log("No se ha borrado la tarea");
            }
            break;
            

          
    };

    svFile.saveFile(Tarea.listadoArr);

    await inq.pausa();

  } while (opt !== "0");
};



main();
