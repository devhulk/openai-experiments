const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


const makeCall = async () => {
    let urls = []
    const response = await openai.createImage({
      prompt: "A cute baby sea otter",
      n: 2,
      size: "1024x1024",
    });

    response.data.data.forEach((image, index) => {
        console.log(image.url)
        download(image.url, `image${index}.png`, function(){
            console.log('done')
        })

    })



    return response
}

makeCall()
