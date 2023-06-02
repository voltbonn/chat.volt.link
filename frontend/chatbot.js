
function is_dev() {
  return window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0'
}
window.is_dev = is_dev

async function chatbot_imports() {

  //import {io} from 'https://chat.volt.link/socket.io.esm.min.js'
  //import 'https://chat.volt.link/remarkable.min.js';

  let socket_io_import_url = (
    window.is_dev()
      ? 'http://localhost:4009/socket.io.esm.min.js'
      : 'https://chat.volt.link/socket.io.esm.min.js'
  )

  const { io } = await import(socket_io_import_url)
  window.io = io

  const url = (
    window.is_dev()
      ? 'http://localhost:4009/'
      : 'https://chat.volt.link/'
  )
  window.socket = io(url)

  setInterval(() => {
    const start = Date.now()

    window.socket.emit('ping', () => {
      const duration = Date.now() - start;
      set_slow_status(duration)
    })
  }, 1000)

  /*
  const remarkable_module = await import('https://chat.volt.link/remarkable.min.js')
  window.remarkable = remarkable_module
  */
  return true
}

// throw new Error('This is a demo chat-bot for Volt. It can answer some basic questions about Volts policies. Please know that it may halucinate wrong information. If you\'re unsure, check the data it used to generate the answer (i) or ask a human for clarification. You can ask questions in any language. The entered data is sent to servers of the company OpenAI in America. No metadata about you is sent along. or use the Enter-Key.');

const info_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M442 787h82V536h-82v251Zm38.07-310q20.43 0 34.18-13.513Q528 449.975 528 430q0-21.95-13.795-35.475Q500.41 381 480.018 381q-21.518 0-34.768 13.525T432 429.5q0 20.6 13.82 34.05Q459.64 477 480.07 477Zm.334 524q-88.872 0-166.125-33.084-77.254-33.083-135.183-91.012-57.929-57.929-91.012-135.119Q55 664.594 55 575.638q0-88.957 33.084-166.285 33.083-77.328 90.855-134.809 57.772-57.482 135.036-91.013Q391.238 150 480.279 150q89.04 0 166.486 33.454 77.446 33.453 134.853 90.802 57.407 57.349 90.895 134.877Q906 486.66 906 575.734q0 89.01-33.531 166.247-33.531 77.237-91.013 134.86-57.481 57.623-134.831 90.891Q569.276 1001 480.404 1001Z"/></svg>`
const feedback_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M83 680q-34 0-58.5-23.944T0 597V351q0-15.529 6-30.265Q12 306 25 292L220 96l34 35.5q6 8.5 10 14.821 4 6.322 4 16.679v9l-28 128h186q26.25 0 44.125 17.981Q488 335.961 488 361.889V413q0 9-1.5 18t-3.5 14l-80 184q-13.079 29.639-34.039 40.319Q348 680 311 680H83Zm241-83 83-186v-27H154l26-129-97 99v243h241Zm416 459-33-35.5q-7-8.5-11-14.82-4-6.323-4-16.68v-9l29-129H534q-26.25 0-44.125-17.375T472 790.269V739q0-9 1.5-18t3.5-14l80-185q13-29 34-39.5t58-10.5h228q34 0 58.5 24t24.5 58v246q0 17-6 31.5T936 859l-196 197ZM636 554l-83 187v27h253l-26 129 97-98.714V554H636ZM83 597V354l97-99-26 129h253v27l-83 186H83Zm794-43v244l-97 99 26-129H553v-27l83-187h241Z"/></svg>`

// import {io} from '/socket.io.esm.min.js'

// import '/remarkable.min.js';

// const markdown = new window.remarkable.Remarkable('full', {
//   html: true,
//   typographer: true
// });

async function postData(url = '', data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      return { response: '', error: response.statusText }
    } else {
      return response.json() // parses JSON response into native JavaScript objects
    }
  } catch (error) {
    console.error('Error:', error);
    return String(error)
  }
}
window.postData = postData

function init_element_nodes() {
  window.messages_node = document.getElementById('messages')
  window.new_message_node = document.getElementById('new_message')
  window.send_message_node = document.getElementById('send_message')
  window.input_box_node = document.getElementById('input_box')
  window.loading_node = document.getElementById('bot_loading')
  window.ping_nodes = document.querySelectorAll('.ping')
}



// START events
window.event_listeners = [] // ['click', '...']
window.event_callbacks = [
  // {
  //   event_name: 'click',
  //   selector: 'kajshfg',
  //   callback: () => {
  //     console.debug('clicked')
  //   }
  // }
]
function get_node_parents(node, parents = []) {
  if (!Array.isArray(parents)) {
    parents = []
  }
  if (parents.length === 0) {
    parents.push(node)
  }

  const parentNode = node.parentNode

  if (
    parentNode.nodeName !== null
    && parentNode.nodeName !== 'BODY'
    && parentNode.nodeName !== 'HTML'
    && parentNode.nodeName !== '#document'
  ) {
    parents.push(parentNode)
    parents = get_node_parents(parentNode, parents)
  }

  return parents
}
function on_any_event(event) {
  const parentNodes = get_node_parents(event.target)
  for (const parentNode of parentNodes) {
    for (const event_callback_info of window.event_callbacks) {
      if (
        parentNode.matches(event_callback_info.selector)
        && event.type === event_callback_info.event_name
      ) {
        event_callback_info.callback(event)
      }
    }
  }
}
function re_add_event_listeners() {
  const current_event_listeners = window.event_listeners
  const wished_event_listeners = window.event_callbacks.map(ec => ec.event_name)

  const new_event_listeners = wished_event_listeners.filter(wel => !current_event_listeners.includes(wel))
  const removed_event_listeners = current_event_listeners.filter(cel => !wished_event_listeners.includes(cel))

  for (const event_listener_name of new_event_listeners) {
    window.event_listeners.push(event_listener_name)
    document.addEventListener(event_listener_name, on_any_event)
  }
  for (const event_listener_name of removed_event_listeners) {
    window.event_listeners = window.event_listeners.filter(item => item !== event_listener_name)
    document.removeEventListener(event_listener_name, on_any_event)
  }
}
function waitForElm(selector) {
  // source: https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
  // Wait till the selector is found in the dom and then resolve the promise.
  // I think this does only work in modern browsers.
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      // for (const mutation of mutations) {
      // if ([...mutation.addedNodes].find(node => node.matches(selector))) { // this only checks the added nodes. not the whole dom like with document.querySelector(selector)
      const node = document.querySelector(selector)
      if (node) { // alternative to the if above
        resolve(node);
        observer.disconnect();
      }
      // }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
function onEvent(event_name, selector, callback) {
  waitForElm(selector)
    .then(() => {
      window.event_callbacks.push({
        event_name,
        selector,
        callback,
      })
      re_add_event_listeners()
    })
}
function notOnEvent(event_name, selector) {
  // remove event listerner
  window.event_callbacks = window.event_callbacks.filter(ec => {
    return !(ec.event_name === event_name && ec.selector === selector)
  })
  re_add_event_listeners()
}
function new_node_id() {
  return `_${Math.random().toString(36).substring(2, 15)}` // an id should not start with a number. that the reason for the underscore

  // todo: maybe use nanoid
  // export let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
}
// END events



function trackEvent(...attributes) {
  if (window.hasOwnProperty('umami')) {
    window.umami.trackEvent(...attributes)
  }
}





window.backend_version = 'michael' // default / michael

function init_backend_switcher() {
  const button_default_backend = document.querySelector('#default_backend')
  if (!!button_default_backend) {
    const button_michaels_backend = document.querySelector('#michaels_backend')

    function set_backend_version(new_backend_version) {
      window.backend_version = new_backend_version
      if (new_backend_version === 'default') {
        button_default_backend.classList.remove('text')
        button_michaels_backend.classList.add('text')
      } else {
        button_default_backend.classList.add('text')
        button_michaels_backend.classList.remove('text')
      }
    }

    button_default_backend.addEventListener('click', () => set_backend_version('default'))
    button_michaels_backend.addEventListener('click', () => set_backend_version('michael'))
  }
}





window.messages = [
  // {
  //   role: 'user',
  //   content: `Was ist Volt?`,
  //   information: '',
  // },
  // {
  //   role: 'assistant',
  //   content: `You can contact Volt Potsdam via email at potsdam@voltdeutschland.org. Information about Volt Potsdam events can be found on their Instagram page (@voltpotsdam) and their website (www.voltbrandenburg.org/potsdam).`,
  //   information: `- abc\n- 123`,
  // },
]
function get_previous_messages(last_message_content) {
  const previous_messages = []
  for (const message of window.messages) {
    previous_messages.push(message)
    if (message.content === last_message_content) {
      break
    }
  }
  return previous_messages
}

function markdown_to_html(text) {
  const url_regexp = /(?<!@)\b((?:(?:https?|ftp):\/\/)?([\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?(?<!\.)))/gim;
  const email_regexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim;

  // make all URLs have a protocol
  const url_matches = text.matchAll(url_regexp)
  if (url_matches) {
    for (const url_match of url_matches) {
      const url = url_match[0]
      if (
        !url.startsWith('https://')
        && !url.startsWith('http://')
        && !url.startsWith('ftp://')
      ) {
        text = text.replaceAll(url, 'https://' + url)
      }
    }
  }

  // text = markdown.render(text)

  text = text
    .replace(url_regexp, '<a href="$1" target="_blank">$2</a>') // Make URLs clickable
    .replace(email_regexp, '<a href="mailto:$1">$1</a>') // Make emails clickable
    .replace(/^- (.+)$/gm, `<li>$1</li>`) // replace - with <li>
    .replace(/\n/g, '<br />') // replace \n with <br />
    .replace(/<\/li><br \/>/g, '</li>') // remove accidental <br /> after </li>
    .replace(/(<br \/>)+$/, '') // remove linebreaks at the end

  return text
}
function display_messages() {
  const new_messages_node = document.createElement('div')

  for (const message of window.messages) {
    const this_message_content = message.content

    const new_chatbubble = document.createElement('div')
    new_chatbubble.classList.add('chatbubble')
    new_chatbubble.classList.add(message.role)

    let text = ''
    if (typeof message.content === 'string' && message.content.length > 0) {
      text = message.content
    }
    if (typeof message.error === 'string' && message.error.length > 0) {
      new_chatbubble.classList.add('error')
      text = message.error
    }

    text = markdown_to_html(text)

    const new_content = document.createElement('div')
    new_content.classList.add('content')
    new_content.innerHTML = text
    new_chatbubble.appendChild(new_content)

    const chat_history = get_previous_messages(this_message_content)
      .map(message => `${message.role}: ${message.content}`)
      .join('\n\n')

    if (message.role === 'assistant') {
      // const new_facts = document.createElement('div')
      // new_facts.classList.add('facts')
      // for (const fact of message.facts) {
      //   const new_fact = document.createElement('div')
      //   new_fact.classList.add('fact')
      //   new_fact.innerHTML = fact
      //   new_facts.appendChild(new_fact)
      // }
      // new_chatbubble.appendChild(new_facts)

      const new_actions = document.createElement('div')
      new_actions.classList.add('actions')

      if (message.information) {
        // <button class="text" id="info_toggle_button">${info_svg}</button>
        const new_info_button = document.createElement('button')
        new_info_button.classList.add('text')
        new_info_button.innerHTML = info_svg

        const new_info_button_id = new_node_id()
        new_info_button.setAttribute('id', new_info_button_id)
        onEvent('click', `#${new_info_button_id}`, () => {
          trackEvent('clicked_show_answer_info', 'clicked_show_answer_info')
          open_popup(`
                <h2>The answer</h2>
                <br />
                ${markdown_to_html(message.content)}
                <hr />
                <h2>Data used to generate the answer</h2>
                <br />
                <p>The data changes based on the asked question and the previous context.</p>
                ${markdown_to_html(message.information)}
              `)
        })

        new_actions.append(new_info_button)
      }

      const new_feedback_button = document.createElement('a')
      new_feedback_button.setAttribute('target', '_blank')
      new_feedback_button.setAttribute('href', `https://docs.google.com/forms/d/e/1FAIpQLSebrPY7u6YWMGzj3rMRnDjhBvmCPwXLFyS1D7S1fBdpi2IwmQ/viewform?usp=pp_url&entry.190795242=${encodeURIComponent(chat_history)}`)
      new_feedback_button.innerHTML = `<button class="text">${feedback_svg}</button>`
      const new_feedback_button_id = new_node_id()
      new_feedback_button.setAttribute('id', new_feedback_button_id)
      onEvent('click', `#${new_feedback_button_id}`, () => {
        trackEvent('clicked_answer_feedback', 'clicked_answer_feedback')
      })
      new_actions.append(new_feedback_button)

      new_chatbubble.appendChild(new_actions)
    }

    new_messages_node.appendChild(new_chatbubble)
  }

  window.messages_node.innerHTML = new_messages_node.innerHTML
}

function send_messages() {
  window.loading_node.classList.add('active')

  trackEvent('send_messages', 'send_messages')

  window.socket.emit('query', {
    messages: window.messages,
    backend_version: window.backend_version,
  })

  /*
  const url = (
    is_dev()
      ? 'http://localhost:4009/api/chat'
      : 'https://chat.volt.link/api/chat'
  )
  postData(url, { messages })
    .then(new_response => {
      window.loading_node.classList.remove('active')

      window.messages.push({
        role: 'assistant',
        content: new_response.response || null,
        error: new_response.error || null,
      })
      display_messages()

      // scroll to the new_message_node
      window.input_box_node.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      // focus new_message_node
      window.new_message_node.focus()
    })
    .catch(new_response => {
      window.loading_node.classList.remove('active')

      window.messages.push({
        role: 'assistant',
        content: new_response.response || null,
        error: new_response.error || null,
      })
      display_messages()
    })
    */
}
function use_text_input() {

  const new_message = window.new_message_node.value
    .replace(/^[\s\n\r]+/gm, '') // remove lines and whitespace at the beginning
    .replace(/[\s\n\r]+$/gm, '') // remove lines and whitespace at the end

  if (new_message.length === 0) {
    return
  }

  window.messages.push({ role: 'user', content: new_message })
  display_messages()
  window.new_message_node.value = ''
  send_messages()
}

function open_popup(dialog_html) {
  const random_ele_id = new_node_id()

  const new_popup = document.createElement('div')
  new_popup.classList.add('popup')
  new_popup.setAttribute('id', random_ele_id)
  new_popup.innerHTML = `
        <div class="backdrop close_target"></div>
        <div class="dialog">
          <button class="close_target">Close</button>
          <br />
          <br />
          ${dialog_html}
        </div>
      `
  onEvent('click', `#${random_ele_id} .close_target`, () => {
    new_popup.classList.remove('open')
    setTimeout(() => {
      new_popup.remove()
      notOnEvent('click', `#${random_ele_id} .close_target`)
    }, 200)
  })

  document.querySelector('#overlays').appendChild(new_popup)

  waitForElm(`#${random_ele_id}`)
    .then(() => {
      setTimeout(() => {
        new_popup.classList.add('open')
      }, 100)
    })
}

function check_url_for_message() {
  const url = new URL(window.location.href)
  const message = url.searchParams.get('msg')
  if (message) {
    window.messages.push({ role: 'user', content: message })
    display_messages()
    send_messages()
  }
}

function set_ping(ping) {
  window.ping_nodes.forEach(ping_node => {
    ping_node.innerHTML = ping
  })
}
function set_slow_status(ping) {
  if (ping >= 300) { // if ping is longer than 300ms
    set_ping(ping)
    document.querySelector('body').classList.add('slow_connection')
  } else {
    document.querySelector('body').classList.remove('slow_connection')
  }
}
function set_online_status(online) {
  if (online) {
    document.querySelector('body').classList.remove('offline')
  } else {
    document.querySelector('body').classList.add('offline')
  }
}
function init_online_check() {
  set_online_status(navigator.onLine)

  window.addEventListener('online', () => {
    // Set set_online_status to online when they change to online.
    set_online_status(true)
  })

  window.addEventListener('offline', () => {
    // Set set_online_status to offline when they change to offline.
    set_online_status(false)
  })
}







function push_or_replace_msg(new_message, options = {}) {
  const id = new_message.id
  const content = new_message.content

  const message_index = window.messages.findIndex(message => message.id === id)
  if (message_index === -1) {
    // create new message
    window.messages.push(new_message)
  } else {
    if (options.replace === true) {
      // append to existing message by id
      window.messages[message_index] = new_message
    } else {
      // append to existing message by id
      window.messages[message_index].content += content
    }
  }
}

function init_socket() {
  window.socket.on('connect', () => set_online_status(window.socket.connected))
  window.socket.on('reconnect', () => set_online_status(window.socket.connected))
  window.socket.on('disconnect', () => set_online_status(window.socket.connected))
  window.socket.on('error', console.error.bind(console));
  window.socket.on('response', data => {
    const { id, information, content, error } = data

    window.loading_node.classList.remove('active')

    push_or_replace_msg({
      id,
      role: 'assistant',
      information: information || null,
      content: content || null,
      error: error || null,
    }, { replace: true })
    display_messages()
  })
  window.socket.on('partial_response', data => {
    const { id, information, content, error } = data

    window.loading_node.classList.remove('active')

    push_or_replace_msg({
      id,
      role: 'assistant',
      information: information || null,
      content: content || null,
      error: error || null,
    }, { replace: false })
    display_messages()
  })
}

function init_addEventListeners() {
  window.send_message_node.addEventListener('click', use_text_input)

  // fire use_text_input when pressing the shift and enter key together
  window.new_message_node.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') { // event.shiftKey === true
      event.preventDefault()
      use_text_input()
    }
  })

  window.addEventListener('load', check_url_for_message)
  window.addEventListener('popstate', check_url_for_message) // on url change
}

function show_inline_chat_bot_frame() {
  const show_chat_bot_nodes = document.querySelectorAll('.chatbot')
  for (let node of show_chat_bot_nodes) {
    node.innerHTML = `
<div class="chatbot_center">
<!--
  <p><strong>
    This is a chat-bot demo for Volt. It can answer some basic questions about Volt and its policies.
  </strong></p>
  <p>You can ask questions in any language.</p>
-->

  <div class="messages" id="messages">
      <div class="chatbubble assistant"><div class="content"><p>Please read the following disclaimer before using the chatbot: <a target="_blank" href="https://chat.volt.link/VOLT%20EUROPA%20Chatbot%20Disclaimer.pdf">Terms of Use of the Chatbot</a>.</p></div></div>
      <div class="chatbubble assistant"><div class="content"><p><strong>
        What do you want to know?
      </strong></p></div></div>
      <div class="chatbubble assistant"><div class="content"><p>You can ask questions in any language.</p></div></div>
  </div>
  <p class="offline_info caption">
    You are offline or we could not connect to our server.<br />
    Please check your internet connection.
  </p>
  <p class="slow_connection_info caption">
    Your connection seams slow.<br />
    <br />
    The website should work fine, but you may need to wait longer for an answer (at least <span class="ping"></span>ms). Please check your internet connection to fix this.
  </p>
  <div class="bot_loading" id="bot_loading">
    <p class="caption">
      Thinking…
    </p>
  </div>
  <div class="input_box" id="input_box">
    <textarea id="new_message" rows="1" cols="50" placeholder="Ask away…"></textarea>
    <br />
    <div style="display: flex; gap: 20px; margin-block-start: 5px;">
      <p class="caption"><a target="_blank" href="https://drive.google.com/file/d/1UOdlEjoF9LFwBbZOXPDfsnuvv13tqmlk/view">Terms of Use of the Chatbot</a> • The entered data is sent to servers of the company <a href="https://platform.openai.com/docs/data-usage-policies" target="_blank">OpenAI</a> in America. It is not permanently stored there. No metadata about you is sent along.</p>

      <div>
        <button class="green" id="send_message">
          <!-- Senden -->
          Send
        </button>
        <p class="caption">
          <!-- oder verwende die Enter-Taste -->
          or use the Enter-Key.
        </p>
      </div>
    </div>
    <br />
    <br />
  </div>
</div>

<div id="overlays"></div>
  `
  }
}


































function deselect_all_text() {
  document.getSelection().removeAllRanges();
}
function get_current_text_selection() {
  if (window.getSelection) {
    return String(window.getSelection().getRangeAt(0))
  }
  if (document.getSelection) {
    return String(document.getSelection().getRangeAt(0))
  }
  if (document.selection) {
    return document.selection.createRange().text
  }

  return ''
}

function show_translate_button() {
  document.querySelector('#translate_button').classList.add('active')
}
function hide_translate_button() {
  document.querySelector('#translate_button').classList.remove('active')
}

async function load_translation(text, language) {
  const url = (
    window.is_dev()
      ? 'http://localhost:4009/api/chat'
      : 'https://chat.volt.link/api/chat'
  )

  const t_messages = [
    { role: 'user', content: `Translate the following text into ${language}:` },
    { role: 'user', content: text }
  ]
  return postData(url, {
    messages: t_messages,
    backend_version: window.backend_version,
  })
}

function init_translate_on_text_selection() {

  const chatbot_corner_html = `
      <div class="chatbot_corner">
      <!-- <div class="messages">
        <div class="chatbubble user">
          <div class="content">Hello World Hello World Hello World Hello WorldHello World Hello WorldHello World Hello WorldHello WorldHello World Hello World Hello WorldHello World Hello World Hello World  Hello World  Hello World Hello World</div>
        </div>
        <div class="chatbubble assistant">
          <div class="content">Hello World Hello World Hello World Hello WorldHello World Hello WorldHello World Hello WorldHello WorldHello World Hello World Hello WorldHello World Hello World Hello World  Hello World  Hello World Hello World</div>
        </div>
      </div> -->
      <div class="chatbot_button_triggers">
          <button id="translate_button" class="purple">Translate</button>
          <!-- <button id="chat_button" class="purple active">Chat</button> -->
      </div>
    </div>
    `

  const chatbot_corner_node = document.createElement('div')
  chatbot_corner_node.classList.add('chatbot_styles')
  chatbot_corner_node.innerHTML = chatbot_corner_html
  document.body.appendChild(chatbot_corner_node)

  const translate_button = document.querySelector('#translate_button')

  if (!translate_button) {
    return null
  }

  translate_button.addEventListener('click', () => {

    const original_selected_text = get_current_text_selection()
    deselect_all_text()
    hide_translate_button()

    const translate_popup_id = new_node_id()
    const lang_input_id = `lang_input_${translate_popup_id}`
    const start_translation_id = `start_translation_${translate_popup_id}`
    const loading_result_id = `loading_result_${translate_popup_id}`
    const translation_result_id = `translation_result_${translate_popup_id}`

    open_popup(`
          <h2>Translate</h2>
          <br />

          <h4>Original Text:</h4>
          <p>${original_selected_text}</p>

          <h4>Choose a Language:</h4>
          <p>Just type what language you want to translate to.</p>
          <input type="text" value="" placeholder="English / German / French / multiple locales" id="${lang_input_id}"/>
          <br />
          <br />
          <button class="green" id="${start_translation_id}">Translate</button>
          <br />
          <br />
          <div id="${loading_result_id}" style="display:none;">Loading…<br /><br /></div>
          <div id="${translation_result_id}"></div>
        `)
    onEvent('click', `#${start_translation_id}`, () => {

      const lang_input = document.querySelector(`#${lang_input_id}`)
      const loading_result = document.querySelector(`#${loading_result_id}`)
      const translation_result = document.querySelector(`#${translation_result_id}`)

      const language = (lang_input.value).trim()

      if (language === '') {
        alert('Please enter a language.')
        return
      }

      loading_result.style.display = 'block'

      load_translation(original_selected_text, language)
        .then(({
          information,
          content,
          error,
        }) => {
          loading_result.style.display = 'none'

          if (error) {
            console.error('error', error)
            translation_result.innerHTML = markdown_to_html(String(error))
            return
          }

          if (content) {
            translation_result.innerHTML = `
                  <h3>Translation:</h3>
                  ${markdown_to_html(content)}
                `
          }
        })
        .catch(error => {
          loading_result.style.display = 'none'
          console.error('error', error)
        })

    })
  })

  function debounce(func, delay) {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }

  const handleSelectionChange = debounce(() => {
    const selected_text = get_current_text_selection()
    if (selected_text === '') {
      hide_translate_button()
    } else {
      show_translate_button()
    }
  }, 300); // Adjust the delay (in milliseconds) according to your needs

  document.addEventListener('selectionchange', handleSelectionChange)
}

function start_chatbot_scripts() {
  show_inline_chat_bot_frame()
  init_element_nodes()
  chatbot_imports()
    .then(() => {
      init_online_check()
      init_backend_switcher()
      init_socket()
      init_addEventListeners()
      init_translate_on_text_selection();
    })
}
// window.addEventListener('load', start_chatbot_scripts)
start_chatbot_scripts()
