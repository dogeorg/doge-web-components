
import { html, fixture, expect, waitUntil } from "@open-wc/testing";
import { http } from '@web/mocks/http.js';
import { registerMockRoutes } from '@web/mocks/browser.js';
import "./doge-price.js";

describe("DogePrice", () => {

it('displays the fetched fiat price with its currency code', async () => {
  // Setup a mocked API response
  registerMockRoutes(
    http.get('/price',
    () => Response.json({ dogecoin: { usd: 9000 } }))
  );
  
  // Initialise the component    
  const el = await fixture(html`
    <doge-price currency="usd"></doge-price>
  `);

  // Wait until price changes
  await waitUntil(() => el.price, 'Price did not become ready');

  // Test the rendered value
  expect(el.shadowRoot.textContent).to.equal("9000 USD");
});

});
