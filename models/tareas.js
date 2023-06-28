import { tarea } from "./index.js"
export class Tareas{

    _list = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._list).forEach( key => {
            const tarea = this._list[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._list = {};
    }  


    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea => {
            this._list[tarea.id] = tarea;
        });
    }
    
    crearTarea(desc = ""){

        const newTarea = new tarea.Tarea(desc);
        this._list[newTarea.id] = newTarea;
        
    }

    listarTodasTareas(){
        console.log();
        this.listadoArr.forEach( (Tareas, i) => {
            const idx = `${i+1}`.green;
            const {desc, completadoEn} = Tareas;
            const estado = (completadoEn) ? "Completado".green : "Pendiente".red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarTareas(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach( (Tareas, i) => {

            const {desc, completadoEn} = Tareas;
            const estado = (completadoEn) ? "Completado".green : "Pendiente".red;

            if(completadas){
                //Tareas completadas
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
                }}
                else{
                    //Tareas pendientes
                    if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
                }}
            });
        }

        borrarTarea(id = ""){
            if(this._list[id]){
                delete this._list[id];
            }
        }

        completarTarea(ids = []){
            ids.forEach( id => {
                const tarea = this._list[id];
                if(!tarea.completadoEn){
                    tarea.completadoEn = new Date().toISOString();
                }
            });

            this.listadoArr.forEach( tarea => {
                if(!ids.includes(tarea.id)){
                    this._list[tarea.id].completadoEn = null;
                }
            });
        }

    }// Fin