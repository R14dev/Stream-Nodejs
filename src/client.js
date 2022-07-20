import axios from 'axios'
import {Transform,Writable} from 'stream'




const url = 'http://localhost:3000'

async function consume(){
    const consumes =  await axios({
        url: url,
        method: 'get',
        responseType: 'stream'
    })
  return consumes.data;
}

const stream = await consume()
stream.pipe( new Transform({
    transform(chunck,enc,cb){
        const items = JSON.parse(chunck)
        const numbers = /\d+/.exec(items.name)[0]
        let name = items.name;
        if(numbers % 2  === 0) name = name.concat(' e par')
        else name = name.concat(' e impar')
        cb(null,JSON.stringify(items))
    }
})).pipe( new Writable({
    write(chunck,enc,cb){
        console.log(chunck.toString())
    cb()
    }
}))