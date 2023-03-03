function tags_1(strings) {

  const text = strings
    .filter(Boolean)
    .map(string => string.trim())
    .pop()

  class tagged_fact {
    constructor(text) {
      this.text = text
      this.tags = []
    }
    add_tags(tags) {
      this.tags.push(...tags)
    }
    get_object() {
      return {
        text: this.text,
        tags: this.tags
      }
    }
  }

  const new_fact = new tagged_fact(text)

  const append_Tag_function = (strings) => {
    if (strings) {
      new_fact.add_tags(strings)
      return append_Tag_function
    } else {
      return new_fact.get_object()
    }
  }

  return append_Tag_function
}

const fact_1 = tags_1`Volt Deutschland ist in 12 Bundesländern aktiv.``Statistiken``zwo`()
console.log('fact_1', fact_1)


function tags_2(strings) {

  function first_string(strings) {
    return strings
      .filter(Boolean)
      .map(string => string.trim())
      .pop()
  }

  const tags = first_string(strings)
    .split('|')
    .filter(Boolean)

  return (strings) => {
    const text = first_string(strings)
    return {
      text,
      tags,
    }
  }
}

const fact_2 = tags_2`Statistiken|zwo``Volt Deutschland ist in 12 Bundesländern aktiv.`
console.log('fact_2', fact_2)
