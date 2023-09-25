<h2 align="middle">Cloudinary</h2>

Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline. It is used to upload, store, manage, manipulate, and deliver images and videos for websites and apps. Cloudinary offers APIs and SDKs in different languages to help you integrate media management into your applications.

I used [Cloudinary](https://cloudinary.com/) to store the images of the products with Next [Cloudinary package](https://next.cloudinary.dev/) for my Next.js application. So I can use the images in my application without worrying about the storage and the performance of the application.

## How to use Cloudinary

### 1. Create an account

Open [Cloudinary](https://cloudinary.com/) and create an account until your screen looks like this:

![Screenshot of Cloudinary dashboard](https://i.ibb.co/0jdrSjk/cloudinary-1.png "Cloudinary dashboard")

After that, choose `Dashboard` and you will see your dashboard like this:

![Screenshot of Cloudinary dashboard](https://i.ibb.co/Vv2Wt90/cloudinary-2.png "Cloudinary dashboard")

### 2. Cloudinary with Next Cloudinary package

In my case, I used the Next Cloudinary upload widget to upload the images to Cloudinary. You can find the documentation [here](https://next.cloudinary.dev/clduploadwidget/basic-usage).

1. First, you need to install the package with this link [Next Cloudinary package](https://next.cloudinary.dev/installation).
2. Choose [cloudinary upload widget](https://next.cloudinary.dev/clduploadwidget/basic-usage) on sidebar, follow the instruction and you need to get code `upload preset`
3. Open settings on cloudinary, and choose `Upload` tab. You will see `Upload presets` and click `Add upload preset` button. You will see this:

![Screenshot of Cloudinary dashboard](https://i.ibb.co/ryS1ycC/cloudinary-3.png "Cloudinary dashboard")

4. Copy code on `Upload preset name` and choose `Unsigned` on `Signing mode` and click `Save` button.

![Screenshot of Cloudinary dashboard](https://i.ibb.co/d4BLb0n/cloudinary-4.png "Cloudinary dashboard")

5. Paste `upload preset` code to your code

```js
import { CldUploadWidget } from 'next-cloudinary';

<CldUploadWidget onUpload={onUpload} uploadPreset="your upload preset">
  // put your code here
</CldUploadWidget>
```
