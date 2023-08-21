const AWS=require('aws-sdk');
require('dotenv').config();

 exports.UploadtoS3=  (data,filename)=>{
    return new Promise((resolve,reject)=>{
    let s3bucket=new AWS.S3({
        accessKeyId:process.env.IAM_ACCESS_KEY,
        secretAccessKey:process.env.IAM_SECRET_KEY
    })
  
    s3bucket.createBucket(()=>{
        var params={
            Bucket:process.env.BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
    
        }
      
        s3bucket.upload(params, (err,res)=>{
            if(err){
                console.log('error in uploading',)
                reject(err)
            }
            else{
               resolve(res.Location)
                console.log('upload sucessfull')
            }
    
        })
      })
        
    })
    }