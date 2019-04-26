import fs from 'fs'
const fsPromises = fs.promises

async function readFileContent(path) {

    let filehandle
    try {

        filehandle = await fsPromises.open(path, 'r')
        const filecontent = await fsPromises.readFile(filehandle, 'utf-8')
        return filecontent

    } finally {

        if (filehandle !== undefined) {

            await filehandle.close()

        }

    }

}

export default readFileContent
