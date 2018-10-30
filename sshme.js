const hosts = JSON.parse(require('fs').readFileSync('hosts.json'))
const Client = require('ssh2').Client
const readline = require('readline')
let conn = [], ssh = (params) => {
  if (params == null) return
  params.privateKey = require('fs').readFileSync(params.privateKeyPath).toString('utf8')
  conn[ params.host ] = new Client()
  conn[ params.host ].on('ready', () => console.log(params.host, 'connected')).connect(params)
}, exec = (host, command) => {
  if (conn[ host ].exec) conn[ host ].exec(command, (err, stream) => {
    if (err) return console.log(err.message)
    stream.on('data', (data) => print(host, command, data)).stderr.on('data', data => print(host, command, data))
  })
}, counter = 0, interval = setInterval(() => ssh(hosts[ counter++ ] || clearInterval(interval)), 10)
, print = (host, command, data) => console.log('>', host, ':', command, '\n' + data.toString('utf8'))
, efilter = (array, equery) => array.filter(item => new RegExp(equery).test(item))
readline.createInterface({ input: process.stdin, output: process.stdout }).on('line', line => {
  const words = line.split(' ')
  const equery = words[0] || ''
  const command = words.slice(1).join(' ')
  const filtered_hosts = efilter(Object.keys(conn), equery).sort()
  if (command) filtered_hosts.forEach(host => exec(host, command))
  else if (equery) console.log(filtered_hosts)
})
process.on('uncaughtException', err => console.error('!!', err.message))
process.on('SIGINT', code => {
  for (let hostname in conn) conn[ hostname ].end()
  process.exit(console.log('Bay!') || code)
})
