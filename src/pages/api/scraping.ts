import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';


export default async function scraping(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        if (req.method === 'POST') {
            const { url } = req.body; 

            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
        
            await page.goto(url);
        
            const imgList = await page.evaluate(()=>{
            
                const img = <any>document.querySelectorAll('img');
                const arrayImages: Array<any> = [...img];
    
    
                const imgCapture = arrayImages.map(({src})=>({
                    src
                }));
            
                return imgCapture;
            });
    
            res.status(200).json(imgList);
            await browser.close();
        }
    } catch (error) {
        res.json(error);
    }
    
    

}