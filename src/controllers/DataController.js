const puppeteer = require("puppeteer");

module.exports = {
  async getData(req, res) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops"
      );
      const data = await page.evaluate(() => {
        const products = Array.from(document.querySelectorAll(".thumbnail"))
          .filter((product) => {
            const name = product.querySelector(".title").innerText;
            return name.toLowerCase().includes("lenovo");
          })
          .sort((a, b) => {
            const priceA = Number(
              a.querySelector(".price").innerText.replace("$", "")
            );
            const priceB = Number(
              b.querySelector(".price").innerText.replace("$", "")
            );
            return priceA - priceB;
          });

        return products.map((product, index) => {
          const id = index + 1;
          const name = product.querySelector(".title").innerText;
          const price = product.querySelector(".price").innerText;
          const description = product.querySelector(".description").innerText;
          const reviews = product.querySelector(
            ".ratings .pull-right"
          ).innerText;
          const rating = product.querySelectorAll(
            ".ratings .glyphicon-star"
          ).length;

          return {
            id,
            name,
            price,
            description,
            reviews,
            rating: `${rating} stars`,
          };
        });
      });

      await browser.close();

      res.send(data);
    } catch (error) {
        res.send({ error: error.message });
    }
  },
};
