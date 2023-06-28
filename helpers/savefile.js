import fs from 'fs';
const file = './db/data.json';

export const saveFile = async ( data ) => {
    fs.writeFile( file,JSON.stringify(data), (err)=>{
        if(err) throw err;
        console.log("Archivo guardado");
    } );
}

export const readFile = async () => {
    if(!fs.existsSync(file)){
        return null;
    }
    const info = fs.readFileSync(file, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}