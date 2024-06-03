import {test} from "@playwright/test"

test ("Upload files", async ({page}) => {

    await page.goto ("https://blueimp.github.io/jQuery-File-Upload/")
    await page.setInputFiles("input[type='file']",
    ["uploadFiles/AdobeStock_169197674 (3) (2).png", "uploadFiles/MicrosoftTeams-image (1).png"])

    // const [uploadFiles] = await Promise.all([
    //     page.waitForEvent("filechooser"),
    //     page.click("input[type='file']")
    // ])

    // const isMultiple = uploadFiles.isMultiple();
    // console.log(isMultiple);
    // uploadFiles.setFiles([
    //     "uploadFiles/AdobeStock_169197674 (3) (2).png",
    //      "uploadFiles/MicrosoftTeams-image (1).png"
    // ])

await page.waitForTimeout(3000);

})


