const fetchN = require('node-fetch');

// 1
fetchN('https://api.ipify.org/?format=json')
  .then((response: { json: () => string; }) => {
    console.log(typeof(response))
    return response.json();
  })
  .then((data: string) => {
    console.log(data);
  });

// 2
  async function getId(): Promise<string>{
  const data = await fetchN('https://api.ipify.org/?format=json')
  const ip = await data.json()
  return await ip
}

getId().then(v =>{
  console.log(v)
})
