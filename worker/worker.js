const OK=['https://iubatians99.github.io','https://localhost','capacitor://localhost','http://localhost'];
export default{async fetch(req,env){
  const o=req.headers.get('Origin')||'';
  const cors={'Access-Control-Allow-Origin':OK.includes(o)?o:'null','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'content-type'};
  if(req.method=='OPTIONS')return new Response(null,{headers:cors});
  if(req.method!='POST'||!OK.includes(o))return new Response('forbidden',{status:403,headers:cors});
  const body=await req.text();
  if(body.length>6e6)return new Response('too big',{status:413,headers:cors});
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':env.GEMINI_KEY},body});
  return new Response(r.body,{status:r.status,headers:{...cors,'content-type':'application/json'}})}}
