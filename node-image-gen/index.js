import fs from 'fs';
import request from 'request';
import chalk from 'chalk';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);


var download = (uri, filename, callback) => {

    request.head(uri, (err, res, body) => {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


const makeCall = async () => {
    let urls = []
    let prompt = "Space with rivers floating throughout connecting galaxies with sparkling atoms everywhere, Hyper Detail 8K, Serenity, Calm"
    let n = 5
    let size = "512x512"

    const response = await openai.createImage({
      prompt,
      n,
      size,
    });

    if (response.status == 200) {
        console.log(chalk.green('Request completed successfully...'))
    } else {
        console.log(chalk.red('There was an issue with your request...', response.status))
    }
    
    console.log(chalk.blue('Downloading images...'));

    response.data.data.forEach((image, index) => {
        download(image.url, `image${index + 1}.png`, () => {
           console.log(chalk.green(`Image ${index + 1} downloaded.`))
        })

    })

    return response
}

makeCall()
