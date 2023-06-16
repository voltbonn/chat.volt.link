const fs = require('fs') 
const decompress = require('decompress')
const { XMLParser } = require('fast-xml-parser')

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
}
const parser = new XMLParser(options)

async function parse_policy_wiki_export(filepath) {
  // convert xar file to folder
  const output_folder_path = './tmp_policy_wiki_export'
  await decompress(filepath, output_folder_path)



  // recursily read WebHome.xml files
  let webhome_files = []
  const read_webhome_files = (folder_path) => {
    let files = fs
      .readdirSync(folder_path, { withFileTypes: true })
    files
      .forEach(file => {
        if (file.isDirectory()) {
          read_webhome_files(`${folder_path}/${file.name}`)
        } else if (file.name === 'WebHome.xml') {
          webhome_files.push(`${folder_path}/${file.name}`)
        }
      })
  }
  read_webhome_files(output_folder_path)



  // get the content of the files and parse the xml
  webhome_files = webhome_files
    .map(filepath => {
      const xml = fs.readFileSync(filepath, 'utf8')
      const xml_parsed = parser.parse(xml)

      if (!xml_parsed.hasOwnProperty('xwikidoc')) {
        // skip files without xwikidoc (these were maybe not parsed correctly) (this should not happen)
        return null
      }

      if (xml_parsed.xwikidoc.hidden === true) {
        // skip hidden files
        return null
      }

      // const title = xml_parsed.xwikidoc.title

      // const parents = filepath
      //   .replace(output_folder_path, '')
      //   // .replace(title, '') // remove itself
      //   .replace('/WebHome.xml', '')
      //   .split('/')
      //   .filter(Boolean) // remove empty strings

      const id = (xml_parsed.xwikidoc['@_reference'] || '').replace(/\.WebHome$/, '')

      return {
        id,
        // parents,
        // title,
        syntaxId: xml_parsed.xwikidoc.syntaxId,
        content: xml_parsed.xwikidoc.content,
      }
    })
    .filter(Boolean) // remove nulls

  webhome_files = webhome_files
    .map(data => {

      // see https://www.xwiki.org/xwiki/bin/view/Documentation/UserGuide/Features/XWikiSyntax/
      const parsed_content = data.content
        .replace(/&#xd;/g, ' ') // replace weird character // TODO: find out what this character is
        .replace(/({{velocity}}(?:.|\n)*?{{\/velocity}})/gm, '') // remove velocity code
        .replace(/({{groovy}}(?:.|\n)*?{{\/groovy}})/gm, '') // remove groovy code
        .replace(/({{html}}(?:.|\n)*?{{\/html}})/gm, '') // remove html code
        .replace(/==== (Authors|Author):.*====/gm, '') // remove authors

        .replace(/\(%.*?%\)/g, '') // remove parameters and style infos

        .replace(/\*\*(.*?)\*\*/g, `$1`) // remove formating of bold
        .replace(/__(.*?)__/g, `$1`) // remove formating of underline
        .replace(/\/\/(.*?)\/\//g, `$1`) // remove formating of italic
        .replace(/--(.*?)--/g, '') // remove strikethrough text. THIS DOES NOT ONLY REMOVE THE FORMATTING BUT ALSO THE TEXT
        .replace(/##(.*?)##/g, `$1`) // remove formating of monospace
        .replace(/\^\^(.*?)\^\^/g, `^$1^`) // replace formating of superscript with markdown formating
        .replace(/,,(.*?),,/g, `~$1~`) // replace formating of subscript with markdown formating
        .replace(/\[\[([^>\|\[\]]+)(?:>>([^>\|\[\]]+))?\]\]/g, ` $1 `) // remove formating of links
        .replace(/\[\[(?:~\[\[XWiki~>~>[^~]+\]\])?image:([^|\]]+)(?:\|\|[^|\]]+)?\]\]/g, '') // remove formating of SOME images // TODO: make it match all images
        .replace(/{{{((?:.|[\n])*?)}}}/gm, `$1`) // remove formating of code
        .replace(/{{code.*?}}((?:.|[\n])*?){{\/code}}/gm, `\`\`\`$1\`\`\``) // replace formating of code with markdown formating

        // remove comments
        .replace(/<!--((?:.|\n)*?)-->/gm, '') // remove html comments
        .replace(/{{((?:.|\n)*?)}}/gm, '') // remove velocity comments
        .replace(/{{box.*?}}((?:.|[\n])*?){{\/box}}/gm, '') // replace box stuff

        // replace formating of headings with markdown formating
        .replace(/======\s?(.*?)\s?======/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `###### ${group1}\n`
        }) // remove formating of heading6
        .replace(/=====\s?(.*?)\s?=====/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `##### ${group1}\n`
        }) // remove formating of heading5
        .replace(/====\s?(.*?)\s?====/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `#### ${group1}\n`
        }) // remove formating of heading4
        .replace(/===\s?(.*?)\s?===/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `### ${group1}\n`
        }) // remove formating of heading3
        .replace(/==\s?(.*?)\s?==/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `## ${group1}\n`
        }) // remove formating of heading2
        .replace(/=\s?(.*?)\s?=/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `# ${group1}\n`
        }) // remove formating of heading1
        .replace(/\=\n/g, '') // remove weird heading formatting (propbably a bug from importing)

        .replace(/----/g, `\n\n`) // replace formating of horizontal line two linebreaks
        .replace(/\\\\/g, `\n`) // replace weird xwiki linebreaks with normal ones
        .replace(/[^\S\r\n]+/g, ' ') // remove multiple spaces (source: https://itecnote.com/tecnote/r-match-whitespace-but-not-newlines/)
        .replace(/[\r\n\s]{2,}/gm, '\n\n') // max 1 empty line
        .replace(/[\r\n\s]+$/, '') // remove trailing linebreaks and whitespace

      return {
        ...data,
        content: parsed_content,
      }
    })
    .filter(data => data.content.length > 0) // remove empty files

  function replaceIncludes(webhome_files) {
  // replace includes
  webhome_files = webhome_files
    .map(data => {

      const include_regex = /{{include reference="(.*?)"\/}}/gm;

      // The substituted value will be contained in the result variable
      const parsed_content = data.content
        .replace(include_regex, (match, p1, offset, string) => {
          const include_id = p1
          const include = webhome_files.find(file => file.id === include_id)
          if (!include) {
            return ''
          }
          return include.content
        })
        .replace(/[^\S\r\n]+/g, ' ') // remove multiple spaces (source: https://itecnote.com/tecnote/r-match-whitespace-but-not-newlines/)
        .replace(/[\r\n\s]{2,}/gm, '\n\n') // max 1 empty line
        .replace(/[\r\n\s]+$/, '') // remove trailing linebreaks and whitespace

      delete data.syntaxId; // not needed after parsing

      return {
        ...data,
        content: parsed_content,
      }
    })

    if (webhome_files.some(file => file.content.includes('{{include reference='))) {
      return replaceIncludes(webhome_files)
    }

    return webhome_files
  }
  replaceIncludes(webhome_files)

  // write webhome_files to one json file
  const webhome_files_json = JSON.stringify(webhome_files, null, 2)
  fs.writeFileSync('./webhome_files.json', webhome_files_json)

  // delete the folder
  fs.rmSync(output_folder_path, { recursive: true })
}

const filepath = './policy-wiki-export.xar'
parse_policy_wiki_export(filepath)
  .then(() => {
    console.info('done!')
  })
  .catch(error => {
    console.error(error)
  })

