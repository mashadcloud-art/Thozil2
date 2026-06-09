const fs = require('fs');

const UNSPLASH_KEY = 'EzRwJHCcJJuRmmzOjlGoenPSjqCDeOEl0dZoSgba3SM';
const PEXELS_KEY = 'Qvl2Rw43Vxdb8MqPGD17PSsnPjcq9Cxg3xPibmqF4KVNbjZjK2Kzx4jQ';

const apiData = JSON.parse(fs.readFileSync('public/apiData.json', 'utf8'));

// Sleep function to avoid rate limits
const sleep = ms => new Promise(res => setTimeout(res, ms));

const fetchImage = async (query) => {
  let fallback = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
  
  try {
    // Try Unsplash first
    const uRes = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}&per_page=1`);
    if (uRes.ok) {
        const uData = await uRes.json();
        if (uData.results && uData.results.length > 0) {
          return uData.results[0].urls.regular;
        }
    } else {
        console.warn(`Unsplash skipped for "${query}", status: ${uRes.status}`);
    }
  } catch (err) {
    console.error(`Unsplash error for "${query}"`);
  }

  try {
    // Try Pexels as fallback
    const pRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: { Authorization: PEXELS_KEY }
    });
    if (pRes.ok) {
        const pData = await pRes.json();
        if (pData.photos && pData.photos.length > 0) {
          return pData.photos[0].src.large;
        }
    } else {
        console.warn(`Pexels skipped for "${query}", status: ${pRes.status}`);
    }
  } catch (err) {
    console.error(`Pexels error for "${query}"`);
  }

  // Final fallback
  return fallback;
};

const processAll = async () => {
  let count = 0;
  for (const cuisine of apiData.cuisines) {
    if (cuisine.id === 'tasty_under_30') continue; // Tasty is fine

    console.log(`Processing cuisine: ${cuisine.name}`);
    if (!cuisine.image || cuisine.image.includes('wikimedia')) {
        cuisine.image = await fetchImage(`${cuisine.name} food`);
        await sleep(250);
    }

    for (const cat of cuisine.categories) {
      if (!cat.image || cat.image.includes('wikimedia')) {
          cat.image = await fetchImage(`${cuisine.name} ${cat.name} food`);
          await sleep(250);
      }

      for (const item of cat.items) {
        if (!item.image || item.image.includes('wikimedia')) {
            let q = item.name;
            if (q === "All Items") q = `${cuisine.name} food`;
            else q = `${item.name} ${cuisine.name}`; // e.g. "Beef Fry Kerala"

            item.image = await fetchImage(q);
            console.log(`- Fetched image for: ${item.name} -> ${item.image}`);
            fs.writeFileSync('public/apiData.json', JSON.stringify(apiData, null, 2)); // Save progress
            await sleep(250); // Be respectful to APIs
            count++;
        }
      }
    }
  }
  
  // also fetch main restaurant images based on their cuisine
  for (const rest of apiData.restaurants) {
     if (!rest.image || rest.image.includes('wikimedia')) {
         const c = rest.cuisines && rest.cuisines.length > 0 ? rest.cuisines[0] : 'restaurant';
         rest.image = await fetchImage(`${c} restaurant`);
         fs.writeFileSync('public/apiData.json', JSON.stringify(apiData, null, 2)); // Save progress
         await sleep(250);
     }
  }

  console.log(`Finished processing ${count} items and updated apiData.json`);
};

processAll().catch(e => {
    console.error("FATAL ERROR", e);
    process.exit(1);
});
