const puppeteer = require('puppeteer');

/**
 * Service to extract direct download links from providers
 */
class ResolverService {
    async extractVidvaultLinks(url) {
        let browser;
        try {
            browser = await puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ],
                headless: "new"
            });
            const page = await browser.newPage();

            // Set User Agent to bypass simple bot detection
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

            // Set timeout for navigation
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            // Wait for dynamic content to load (adjust time as needed)
            await new Promise(resolve => setTimeout(resolve, 5000));

            const result = await page.evaluate(() => {
                const options = [];
                const subtitles = [];

                // Scan for high-quality download links
                document.querySelectorAll('a, button').forEach(el => {
                    const text = (el.innerText || "").toLowerCase();
                    const href = el.href || el.dataset.url || "";

                    if (href && (text.includes('1080') || text.includes('720') || text.includes('480') || text.includes('download'))) {
                        options.push({
                            quality: el.innerText.trim() || "Download",
                            url: href,
                            size: el.dataset.size || null
                        });
                    }
                });

                // Scan for subtitle tracks
                document.querySelectorAll('a').forEach(a => {
                    const text = a.innerText.toLowerCase();
                    if (text.includes('.srt') || text.includes('subtitle') || text.includes('vtt')) {
                        subtitles.push({
                            language: a.innerText.trim(),
                            url: a.href
                        });
                    }
                });

                return {
                    title: document.title,
                    downloadOptions: options,
                    subtitles: subtitles
                };
            });

            return result;
        } catch (error) {
            console.error('Extraction Service Error:', error);
            throw error;
        } finally {
            if (browser) await browser.close();
        }
    }
}

module.exports = new ResolverService();
