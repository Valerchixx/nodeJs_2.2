const fetchNode = require('node-fetch');

//Task 1
fetchNode('https://api.ipify.org/?format=json')
    .then((res: { json: () => object; }) => res.json())
    .then((text: string) => console.log(text));


//Task 2
async function myIp(url: string){
    const responce = await fetchNode(url)
    const ip = await responce.json()
    return ip

}

(async () => {
    console.log(await myIp('https://api.ipify.org/?format=json'))
 })()

//Task 3

//1
interface userName{
    id: number,
    uid: string,
    name: string,
    two_word_name: string,
    four_word_name: string,
    name_with_initials: string,
    name_with_middle: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    male_first_name: string,
    female_first_name: string,
    prefix: string,
    initials: string
}

async function nameBack(){
    const responce = await fetchNode('https://random-data-api.com/api/name/random_name')
    const nameUser = await responce.json()
    return nameUser

}

const names = [nameBack(), nameBack(), nameBack()]
async function asyncPromAll(array: Promise<userName>[]) {
    const resultArray = await Promise.all(array);
    for (let i = 0; i<resultArray.length; i++){
      console.log(resultArray[i].name);
    }
  }

asyncPromAll(names)

//2

async function asyncAwait(array:Promise<string>[]){
    for (let i = 0; i<array.length; i++){
     const res = await names[i]
     console.log(res.name)
 }
}

asyncAwait(names)

//3
function asyncPromise(array:Promise<string>[]){
   for(let i = 0; i < array.length; i++){
    names[i].then((res) => {
        const result = res.name
        console.log(result)
    })

   }
}

asyncPromise(names)

//Task4
//1

interface userFemale{
    id: number,
    first_name: string,
    last_name: string,
    gender: string
}
function returnUserPromise(){
    fetchNode('https://random-data-api.com/api/users/random_user')
    .then((responce:{ json: () => object;}) => responce.json())
    .then((user:userFemale) => {
       if(user.gender == 'Female'){
        console.log(`${user.first_name} ${user.last_name} Gender: ${user.gender}`)
       } else{
        returnUserPromise()
       }
    })

}

returnUserPromise()

//2
async function returnUserAwait(url: string): Promise<string>{
    let userFemale= '';
    let flag = false
    while(!flag){
        const responce = await  fetchNode(url)
        const user = await responce.json()
        if(user.gender == 'Female'){
            userFemale = `${user.first_name} ${user.last_name} Gender: ${user.gender}`
            flag = true
        }
    }
    return userFemale

}
(async () => {
    console.log(await returnUserAwait('https://random-data-api.com/api/users/random_user'))
 })()

//Task 5

function callback(id: string){
    console.log('Your ip:', id)
}

 function returnIp(callback: (ip:string) => void, ip: string){
    callback(ip)
}

async function returnIdAsync(){
    const responce = await fetchNode('https://api.ipify.org/?format=json');
    const ip = await responce.json()
    returnIp(callback, ip)

}

returnIdAsync()

//Task 6

function callback2(ip: string){
    console.log('Your ip task 6:', ip)
}

async function ipBack(){
    const responce = await fetchNode('https://api.ipify.org/?format=json');
    const ip = await responce.json()
    return ip
}

function backCallBack(callback: (ip:string) => void){
    ipBack().then((ip: string) => callback(ip))
}

backCallBack(callback2)