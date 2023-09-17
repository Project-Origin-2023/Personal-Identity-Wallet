const QRCode = require('qrcode');
const { PassThrough } = require('stream');

class QRCodeGenerator {
    async pipeGenerateQR(contentEncoded,res){
        try{
            const content = decodeURI(contentEncoded);
            const qrStream = new PassThrough();
            const result = await QRCode.toFileStream(qrStream, content,
                        {
                            type: 'png',
                            width: 300,
                            errorCorrectionLevel: 'H'
                        }
                    );
    
            await qrStream.pipe(res);
        } catch(err){
            console.error('Failed to return content', err);
        }
    }
}

//Export for public uses
module.exports = {
    QRCodeGenerator:QRCodeGenerator
}