//var axios=require('axios')

const ServerURL="http://10.0.2.2:5000"

const getData=async(url)=>{
try{
const response=await fetch(`${ServerURL}/${url}`)
const result= await response.json()

if(result==='Session Expired Plz Login Again'){

    alert('Session Expired Plz Login Again')
    return([])
}

else{


return result

}

}catch(e){
console.log(e)
return null
}
}

const postData=async(url,body)=>{

    try{
const response = await fetch(`${ServerURL}/${url}`,
{method:"POST",mode:"cors",
headers:{"Content-Type":"application/json;charset=utf-8"},
body:JSON.stringify(body)
}
)
const result=await response.json()
if(result==='Session Expired Plz Login Again'){
    alert(result)
    return([])
}

else{

return result
 }

    }catch(e){
        console.log(e)
return null
    }
}
// const postDataandImage=async(url,formData,config)=>{
// try{ var response =  await axios.post(`${ServerURL}/${url}`,formData,config)
//  const result=response.data.RESULT
// // if(response.data==='Session Expired Plz Login Again'){

// //     alert(response.data)
// //     return(false)
// // }
// // else{
// // const result=response.data.RESULT
// return result
// // }


// }catch(e){
//     console.log(e)
// return null
// }

// }
export {getData,postData,ServerURL}