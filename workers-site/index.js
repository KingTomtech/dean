import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event)
  } catch (error) {
    return await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(new URL('/index.html', req.url), req)
    })
  }
}
