import { kv } from '@vercel/kv'
export default async function Hospitals() {
    await kv.set('key', 'value');
  let data:any = await kv.get('key');
  console.log(data)
    return <div>{JSON.stringify(data)}</div>;
  }

  