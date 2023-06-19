const fs = require('fs') 
const decompress = require('decompress')
const { XMLParser } = require('fast-xml-parser')

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
}
const parser = new XMLParser(options)

async function parse_policy_wiki_export(filepath, url_prefix) {
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
        // syntaxId: xml_parsed.xwikidoc.syntaxId,
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
        .replace(/{{(?!include)((?:.|\n)*?)}}/gm, '') // remove velocity comments (but not include macro)
        .replace(/{{box.*?}}((?:.|[\n])*?){{\/box}}/gm, '') // replace box stuff

        // replace formating of headings with markdown formating
        .replace(/^======\s?(.*?)\s?======/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `###### ${group1}\n`
        }) // remove formating of heading6
        .replace(/^=====\s?(.*?)\s?=====/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `##### ${group1}\n`
        }) // remove formating of heading5
        .replace(/^====\s?(.*?)\s?====/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `#### ${group1}\n`
        }) // remove formating of heading4
        .replace(/^===\s?(.*?)\s?===/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `### ${group1}\n`
        }) // remove formating of heading3
        .replace(/^==\s?(.*?)\s?==/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `## ${group1}\n`
        }) // remove formating of heading2
        .replace(/^=\s?(.*?)\s?=/g, (_, group1) => {
          if (group1.replace(/[\s\n]/g, '').length === 0) {
            return '\n'
          }
          return `# ${group1}\n`
        }) // remove formating of heading1
        .replace(/\=\n/g, '') // remove weird heading formatting (propbably a bug from importing)
        .replace(/ \~\[ [0-9]+ \]/g, '') // remove references

        .replace(/----/g, `\n\n`) // replace formating of horizontal line two linebreaks
        .replace(/\\\\/g, `\n`) // replace weird xwiki linebreaks with normal ones

        .replace(/~(.)/g, `$1`) // remove escape character
        .replace(/[^\S\r\n]+/g, ' ') // remove multiple spaces (source: https://itecnote.com/tecnote/r-match-whitespace-but-not-newlines/)
        .replace(/[\r\n\s]{2,}/gm, '\n\n') // max 1 empty line
        .replace(/[\r\n\s]+$/, '') // remove trailing linebreaks and whitespace

      return {
        ...data,
        content: parsed_content,
      }
    })
    .filter(data => data.content.length > 0) // remove empty files

  // const full_text_letter_count_1 = webhome_files.map(data => data.content).join('').length
  // console.log(`full_text_letter_count-1: ${full_text_letter_count_1}`)

  function replaceIncludes(webhome_files, counter = 0) {
    if (counter > 100) {
      // prevent infinite loop
      return webhome_files
    }
    counter += 1

    // replace includes
    webhome_files = webhome_files
    .map(data => {

      const include_regex = /{{include reference="(.*?)"\/}}/gm;

      const has_includes = include_regex.test(data.content)
      if (has_includes === false) {
        data.had_includes = false
        return data
      }

      data.had_includes = true

      // The substituted value will be contained in the result variable
      const parsed_content = data.content
        .replace(include_regex, (match, p1, offset, string) => {
          const include_id = p1
          const include = webhome_files.find(file => `${file.id}.WebHome` === include_id)
          if (!include) {
            return ''
          }
          return include.content
        })
        .replace(/[^\S\r\n]+/g, ' ') // remove multiple spaces (source: https://itecnote.com/tecnote/r-match-whitespace-but-not-newlines/)
        .replace(/[\r\n\s]{2,}/gm, '\n\n') // max 1 empty line
        .replace(/[\r\n\s]+$/, '') // remove trailing linebreaks and whitespace

      return {
        ...data,
        content: parsed_content,
      }
    })

    if (webhome_files.some(file => file.content.includes('{{include reference='))) {
      return replaceIncludes(webhome_files, counter)
    }

    return webhome_files
  }
  webhome_files = replaceIncludes(webhome_files)

  // const full_text_letter_count_2 = webhome_files
  //   .filter(file =>
  //     !webhome_files.some(other_file => other_file.content !== file.content && other_file.content.includes(file.content)) // only keep files that are not included in other files
  // )
  // .map(data => data.content).join('').length
  // console.log(`full_text_letter_count-2: ${full_text_letter_count_2}`)

  // // only keep files with content length < X
  // const cut_off_content_length = 10000 // 500 words = 625 tokens (roughly)
  const word_split_regex = /[\s\n\r()!?¡¿.:,;\-–—*•+<>\[\]"'’“„”\/\\#]+/g
  // webhome_files = webhome_files
  // // .filter(file => {
  // //   if (file.had_includes === true) {
  // //     return file.content.split(word_split_regex).length < cut_off_content_length
  // //   }
  // //   return true
  // // })
  // .filter(file =>
  //   !webhome_files.some(other_file => other_file.content !== file.content && other_file.content.includes(file.content)) // only keep files that are not included in other files
  // )


  // const full_text_letter_count_3 = webhome_files.map(data => data.content).join('').length
  // console.log(`full_text_letter_count-3: ${full_text_letter_count_3}`)
  // console.log(`f3/f2: ${Math.round((full_text_letter_count_3 / full_text_letter_count_2) * 100)}%`)

  webhome_files = webhome_files
    .map(data => ({
      url: `${url_prefix}${
        // encodeURI(data.id)
        data.id
        .split(/(?<!\\)\./g)
        .map(part => encodeURIComponent(part.replace(/\\/g, '')))
        .join('/')
        // .replace(/(?<!\\)\./g, '/')
        // .replace(/\+/g, '%2B') // replace + with %2B // idk why this is needed for the policy wiki // url don't work otherwise
        // .replace(/\:/g, '%3A')
        // .replace(/\./g, '%5C/')
      }`,
      ...data,
    }))

  console.info(`webhome files amount: ${webhome_files.length}`)

  const max_content_length_letters = Math.max(...webhome_files.map(file => file.content.length))
  const max_content_length_words = Math.max(...webhome_files.map(file => file.content.split(word_split_regex).length))
  console.info(`max_content_length_letters: ${max_content_length_letters}`)
  console.info(`max_content_length_words: ${max_content_length_words}`)
  console.info(`max_content_length_tokens: ~${Math.round(max_content_length_words * 1.25)}`)


  // // count of files with content length > X
  // const files_with_content_length_gt = webhome_files.filter(file => file.content.split(word_split_regex).length > cut_off_content_length)
  // console.info(`files_with_content_length_gt_${cut_off_content_length}: ${files_with_content_length_gt.length}`)

  // // count of files with content length less than X
  // const files_with_content_length_lt = webhome_files.filter(file => file.content.split(word_split_regex).length < cut_off_content_length)
  // console.info(`files_with_content_length_lt_${cut_off_content_length}: ${files_with_content_length_lt.length}`)

  // delete the folder
  fs.rmSync(output_folder_path, { recursive: true })

  return webhome_files
}

const filepath = './policy-wiki-export.xar'
const url_prefix = 'https://policy.volteuropa.org/bin/view/'
const export_path = './policy_wiki_content.json'

// const filepath = './policy-export-de.xar'
// const url_prefix = 'https://policy.volteuropa.org/wiki/voltgermany/view/'
// const export_path = './policy_wiki_content_de.json'

parse_policy_wiki_export(filepath, url_prefix)
  .then(webhome_files => {

    // write webhome_files to one json file
    const webhome_files_json = JSON.stringify(webhome_files, null, 2)
    fs.writeFileSync(export_path, webhome_files_json)

    console.info('done!')
  })
  .catch(error => {
    console.error(error)
  })

